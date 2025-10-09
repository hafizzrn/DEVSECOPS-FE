import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, PieChart, TrendingUp, Shield, Bell, Smartphone } from "lucide-react";
import featureDashboard from "@/assets/feature-dashboard.png";
import featureTracking from "@/assets/feature-tracking.png";
import featureReports from "@/assets/feature-reports.png";
import Image from "next/image";

const features = [
  {
    icon: BarChart3,
    title: "Real-time Dashboard",
    description: "Monitor your financial health at a glance with intuitive charts and visualizations.",
    image: featureDashboard,
  },
  {
    icon: TrendingUp,
    title: "Smart Transaction Tracking",
    description: "Automatically categorize and track all your income and expenses effortlessly.",
    image: featureTracking,
  },
  {
    icon: PieChart,
    title: "Detailed Reports",
    description: "Get comprehensive insights with customizable reports and spending analytics.",
    image: featureReports,
  },
  {
    icon: Shield,
    title: "Bank-level Security",
    description: "Your data is protected with enterprise-grade encryption and security measures.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Stay informed with intelligent alerts about your spending patterns and budgets.",
  },
  {
    icon: Smartphone,
    title: "Multi-device Sync",
    description: "Access your financial data seamlessly across all your devices, anytime, anywhere.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Everything You Need to Manage Your{" "}
            <span
              className="font-extrabold text-primary"
              
            >
              Finances
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Powerful features designed to make financial management simple, efficient, and insightful.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <CardContent className="p-6">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-glow"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>

                {feature.image && (
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-40 object-contain mb-4 rounded-lg"
                  />
                )}

                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
