/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with basic financial tracking",
    features: [
      "Up to 100 transactions/month",
      "Basic income & expense tracking",
      "Simple reports & visualizations",
      "Mobile app access",
      "Email support"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "per month",
    description: "Advanced features for serious financial management",
    features: [
      "Unlimited transactions",
      "Advanced analytics & insights",
      "Custom categories & tags",
      "Budget planning & alerts",
      "Priority support",
      "Export to CSV/PDF",
      "Multi-currency support"
    ],
    cta: "Start Free Trial",
    popular: true
  },
  {
    name: "Business",
    price: "$29.99",
    period: "per month",
    description: "Comprehensive solution for business finances",
    features: [
      "Everything in Pro",
      "Team collaboration (up to 5 users)",
      "Invoice management",
      "Tax report generation",
      "API access",
      "Dedicated account manager",
      "Custom integrations"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the plan that fits your needs. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                plan.popular ? 'bg-gradient-card border-2 border-primary scale-105 ring-2 ring-primary shadow-glow' : 'bg-card'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-medium shadow-glow">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-8 pt-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-gradient">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">/{plan.period}</span>
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </CardHeader>

              <CardContent className="pb-8">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-0 pb-8">
                <Button 
                  className={`w-full h-12 text-base ${
                    plan.popular ? 'shadow-glow' : ''
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <p className="text-center text-muted-foreground mt-12">
          All plans include secure data encryption, automatic backups, and 24/7 uptime monitoring.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
