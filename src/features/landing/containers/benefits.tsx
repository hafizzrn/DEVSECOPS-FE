import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Target, LineChart, Clock } from "lucide-react";

const benefits = [
  {
    icon: Target,
    title: "Achieve Financial Goals",
    description: "Set and track your financial goals with our intelligent budgeting tools. Whether you're saving for a vacation, a new car, or building an emergency fund, Cashflow helps you stay on track.",
    stats: "85% of users reach their goals faster"
  },
  {
    icon: LineChart,
    title: "Understand Your Spending",
    description: "Gain deep insights into your spending patterns with visual analytics. Identify areas where you can save and make informed decisions about your money.",
    stats: "Average user saves $500/month"
  },
  {
    icon: Clock,
    title: "Save Time Every Day",
    description: "Automate your financial tracking and spend less time on bookkeeping. Our smart categorization learns from your habits to make tracking effortless.",
    stats: "Save 10+ hours per month"
  },
  {
    icon: CheckCircle2,
    title: "Make Better Decisions",
    description: "Access real-time financial data and comprehensive reports to make confident financial decisions backed by accurate information.",
    stats: "Improved financial confidence by 92%"
  }
];

const Benefits = () => {
  return (
    <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Why Choose <span className="text-gradient">Cashflow</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of users who have transformed their financial lives with Cashflow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <Card 
              key={index}
              className="border-0 bg-card shadow-md hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center flex-shrink-0 shadow-glow">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{benefit.description}</p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 text-success rounded-full text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4" />
                      {benefit.stats}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
