import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";

// Simple rate limiting for contact form (in-memory store)
const contactFormRateLimit = new Map<string, { attempts: number; lastAttempt: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_ATTEMPTS = 3; // Max 3 submissions per minute per IP

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint with rate limiting
  app.post("/api/contact", async (req, res) => {
    const clientIP = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();
    
    // Check rate limit
    const rateLimitData = contactFormRateLimit.get(clientIP);
    if (rateLimitData) {
      if (now - rateLimitData.lastAttempt < RATE_LIMIT_WINDOW) {
        if (rateLimitData.attempts >= MAX_ATTEMPTS) {
          return res.status(429).json({
            success: false,
            message: "Too many submissions. Please try again in a minute."
          });
        }
        rateLimitData.attempts++;
        rateLimitData.lastAttempt = now;
      } else {
        // Reset window
        rateLimitData.attempts = 1;
        rateLimitData.lastAttempt = now;
      }
    } else {
      contactFormRateLimit.set(clientIP, { attempts: 1, lastAttempt: now });
    }
    
    // Clean up old entries (prevent memory leak)
    contactFormRateLimit.forEach((data, ip) => {
      if (now - data.lastAttempt > RATE_LIMIT_WINDOW * 2) {
        contactFormRateLimit.delete(ip);
      }
    });
    try {
      // Validate request body using Zod schema
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      
      // Store contact submission in database
      const submission = await storage.insertContactSubmission(validatedData);
      
      res.status(201).json({
        success: true,
        message: "Contact form submitted successfully",
        submissionId: submission.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid form data",
          errors: error.errors
        });
      } else {
        console.error("Contact form submission error:", error);
        res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }
    }
  });

  // GitHub repository creation and push endpoint
  app.post("/api/github/push", async (req, res) => {
    try {
      const { getUncachableGitHubClient } = await import("./github");
      const octokit = await getUncachableGitHubClient();
      
      // Get authenticated user info
      const { data: user } = await octokit.rest.users.getAuthenticated();
      
      const repoName = "roya-systems-website";
      const description = "Professional marketing website for Roya Systems Ltd - a technology consultancy specializing in custom software development, package customization, and infrastructure & DevOps solutions.";
      
      // Create repository
      let repo;
      try {
        const { data: repoData } = await octokit.rest.repos.createForAuthenticatedUser({
          name: repoName,
          description,
          private: false,
          auto_init: false,
        });
        repo = repoData;
      } catch (error: any) {
        if (error.status === 422) {
          // Repository already exists, get it
          const { data: repoData } = await octokit.rest.repos.get({
            owner: user.login,
            repo: repoName,
          });
          repo = repoData;
        } else {
          throw error;
        }
      }
      
      res.json({
        success: true,
        message: "Repository created/found successfully",
        repository: {
          name: repo.name,
          url: repo.html_url,
          clone_url: repo.clone_url,
        }
      });
    } catch (error) {
      console.error("GitHub push error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create repository",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
