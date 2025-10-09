import { Wallet, Twitter, Facebook, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">Cashflow</span>
            </div>
            <p className="text-background/70 mb-4">
              Smart financial management made simple. Take control of your finances today.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-background/70 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-background/70 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-background/70 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-background/70 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-background/70 hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-background/70 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-background/70 hover:text-white transition-colors">Security</a></li>
              <li><a href="#" className="text-background/70 hover:text-white transition-colors">Updates</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/70 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-background/70 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-background/70 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-background/70 hover:text-white transition-colors">Press Kit</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/70 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-background/70 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-background/70 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-background/70 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8">
          <p className="text-center text-background/70 text-sm">
            © 2025 Cashflow. All rights reserved. Built with security and privacy in mind.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
