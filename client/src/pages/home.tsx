import { useState, useEffect } from "react";
import { Menu, X, Code, Package, Server, Shield, Link, BarChart3, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 64; // Height of sticky header
      const targetPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Extract form data
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const company = formData.get('company') as string;
    const message = formData.get('message') as string;
    
    // Basic validation
    if (!name || !email || !message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Submit to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          company: company || null,
          message,
        }),
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        toast({
          title: "Message Sent!",
          description: "Thank you for your message. We'll get back to you within 24 hours.",
        });
        
        // Reset form safely
        if (form) {
          form.reset();
        }
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to send message. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please check your connection and try again.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">R</span>
                </div>
                <span className="text-xl font-bold text-foreground">Roya Systems</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button 
                  onClick={() => scrollToSection('services')} 
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                  data-testid="nav-services"
                >
                  Services
                </button>
                <button 
                  onClick={() => scrollToSection('approach')} 
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                  data-testid="nav-approach"
                >
                  Our Approach
                </button>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                  data-testid="nav-about"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                  data-testid="nav-contact"
                >
                  Contact
                </button>
              </div>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                data-testid="button-cta-header"
              >
                Get a Free Consultation
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-foreground hover:text-primary focus:outline-none focus:text-primary transition-colors duration-200"
                data-testid="button-mobile-menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-background border-t border-border" data-testid="mobile-menu">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button 
                  onClick={() => scrollToSection('services')} 
                  className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200 font-medium w-full text-left"
                  data-testid="mobile-nav-services"
                >
                  Services
                </button>
                <button 
                  onClick={() => scrollToSection('approach')} 
                  className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200 font-medium w-full text-left"
                  data-testid="mobile-nav-approach"
                >
                  Our Approach
                </button>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200 font-medium w-full text-left"
                  data-testid="mobile-nav-about"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200 font-medium w-full text-left"
                  data-testid="mobile-nav-contact"
                >
                  Contact
                </button>
                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="w-full mt-4 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                  data-testid="button-cta-mobile"
                >
                  Get a Free Consultation
                </Button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-muted via-background to-accent/5 pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Custom Software Solutions That{" "}
              <span className="text-primary">Fuel Your Growth</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Partner with Roya Systems for bespoke software development, seamless integrations, and robust infrastructure solutions. We deliver secure, scalable technology that drives your business forward.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
                data-testid="button-hero-primary"
              >
                Start Your Project Today
              </Button>
              <Button 
                variant="outline"
                onClick={() => scrollToSection('services')}
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold py-4 px-8 rounded-lg transition-all duration-200 w-full sm:w-auto"
                data-testid="button-hero-secondary"
              >
                Explore Our Services
              </Button>
            </div>
          </div>
        </div>
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Our Core Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive technology solutions tailored to your business needs, from concept to deployment and beyond.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Service Card 1 */}
            <div className="bg-muted/50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/20 group" data-testid="card-service-bespoke">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <Code className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Bespoke Software Development</h3>
              <p className="text-muted-foreground leading-relaxed">
                Custom-built software solutions designed from the ground up to meet your unique business requirements. We create scalable, maintainable applications that grow with your business.
              </p>
            </div>

            {/* Service Card 2 */}
            <div className="bg-muted/50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/20 group" data-testid="card-service-customisation">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <Package className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Package Customisation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Transform off-the-shelf software into powerful, integrated solutions. We customize and integrate existing packages to perfectly align with your workflows and business processes.
              </p>
            </div>

            {/* Service Card 3 */}
            <div className="bg-muted/50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/20 group" data-testid="card-service-infrastructure">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <Server className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Infrastructure & DevOps</h3>
              <p className="text-muted-foreground leading-relaxed">
                Robust infrastructure provisioning and automated DevOps pipelines that ensure your applications run smoothly, scale efficiently, and maintain optimal performance around the clock.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section id="approach" className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Our Holistic Approach</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We believe in comprehensive solutions that integrate security, compliance, and monitoring from day one. DevOps principles guide every aspect of our development process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Principle 1 */}
            <div className="text-center group bg-background/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-primary/20" data-testid="approach-security">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <Shield className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Security & Compliance First</h3>
              <p className="text-muted-foreground">Built-in security measures and compliance standards from project inception, not as an afterthought.</p>
            </div>

            {/* Principle 2 */}
            <div className="text-center group bg-background/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-primary/20" data-testid="approach-integration">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <Link className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Seamless Integration</h3>
              <p className="text-muted-foreground">Smooth integration with your existing systems and workflows, minimizing disruption to your operations.</p>
            </div>

            {/* Principle 3 */}
            <div className="text-center group bg-background/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-primary/20" data-testid="approach-monitoring">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <BarChart3 className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Proactive Monitoring</h3>
              <p className="text-muted-foreground">Comprehensive monitoring and alerting systems that identify and resolve issues before they impact your business.</p>
            </div>

            {/* Principle 4 */}
            <div className="text-center group bg-background/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-primary/20" data-testid="approach-devops">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <Heart className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">DevOps at the Core</h3>
              <p className="text-muted-foreground">DevOps principles drive our methodology, ensuring rapid deployment, quality assurance, and continuous improvement.</p>
            </div>
          </div>

          {/* Additional Content */}
          <div className="mt-16 max-w-4xl mx-auto text-center">
            <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
              <h3 className="text-2xl font-semibold text-foreground mb-4">Why Our Approach Works</h3>
              <p className="text-muted-foreground leading-relaxed">
                By embedding DevOps principles into every stage of development, we deliver solutions that are not only functional but also maintainable, scalable, and secure. Our holistic approach means fewer surprises, faster time-to-market, and software that truly serves your business goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">About Roya Systems</h2>
            <div className="prose prose-lg mx-auto text-muted-foreground">
              <p className="text-xl leading-relaxed mb-6">
                At Roya Systems, we're passionate about transforming businesses through innovative technology solutions. Founded on the belief that every organization deserves access to enterprise-grade software, we specialize in creating custom applications that drive growth and efficiency.
              </p>
              <p className="text-lg leading-relaxed mb-8">
                Our team combines deep technical expertise with a genuine understanding of business challenges. We don't just build software – we forge partnerships that help our clients achieve their ambitious goals. From startups looking to disrupt their industry to established companies seeking digital transformation, we bring the same level of dedication and quality to every project.
              </p>
              <div className="bg-muted/50 rounded-2xl p-8 text-left">
                <h3 className="text-xl font-semibold text-foreground mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To empower small and medium-sized businesses with world-class software solutions that were once only available to large enterprises. We believe that exceptional technology should be accessible, affordable, and tailored to your unique needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-foreground mb-4">Ready to Get Started?</h2>
              <p className="text-lg text-secondary-foreground/80">
                Let's discuss how we can help transform your business with custom software solutions.
              </p>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-6" data-testid="form-contact">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-secondary-foreground mb-2">Name *</label>
                  <Input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    placeholder="Your full name"
                    className="w-full px-4 py-3 bg-background/10 border border-background/20 rounded-lg text-secondary-foreground placeholder-secondary-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-secondary-foreground mb-2">Email *</label>
                  <Input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    placeholder="your.email@company.com"
                    className="w-full px-4 py-3 bg-background/10 border border-background/20 rounded-lg text-secondary-foreground placeholder-secondary-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                    data-testid="input-email"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-secondary-foreground mb-2">Company</label>
                <Input 
                  type="text" 
                  id="company" 
                  name="company" 
                  placeholder="Your company name"
                  className="w-full px-4 py-3 bg-background/10 border border-background/20 rounded-lg text-secondary-foreground placeholder-secondary-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                  data-testid="input-company"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-secondary-foreground mb-2">Message *</label>
                <Textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  required 
                  placeholder="Tell us about your project and how we can help..."
                  className="w-full px-4 py-3 bg-background/10 border border-background/20 rounded-lg text-secondary-foreground placeholder-secondary-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 resize-vertical"
                  data-testid="textarea-message"
                />
              </div>
              
              <div className="text-center">
                <Button 
                  type="submit" 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 w-full sm:w-auto"
                  data-testid="button-submit-contact"
                >
                  Send Message
                </Button>
              </div>
              
              <p className="text-sm text-secondary-foreground/60 text-center">
                We typically respond within 24 hours. Your information is kept confidential.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-background/80">
              © 2024 Roya Systems Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
