import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Network Solutions",
      description: "Professional network diagnostics and hardware solutions for optimal connectivity",
      icon: "🌐"
    },
    {
      title: "Software Support", 
      description: "Comprehensive software updates and application management services",
      icon: "💻"
    },
    {
      title: "Device Management",
      description: "PC and peripheral device connections, diagnostics, and maintenance",
      icon: "🖨️"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white to-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold font-inter text-foreground mb-6">
              Optimum IT Support System
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Professional IT support where precision meets efficiency. 
              Get expert technical assistance and streamlined ticket management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="red-accent" 
                size="lg"
                onClick={() => navigate('/signup')}
                className="text-base px-8 py-3"
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/login')}
                className="text-base px-8 py-3"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-inter text-foreground mb-4">
              Services Offered
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive IT support services designed to keep your systems running smoothly
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center pb-4">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold font-inter">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-hover">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Professional IT Support?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Join our platform and experience efficient ticket management and expert technical assistance
          </p>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => navigate('/signup')}
            className="text-base px-8 py-3"
          >
            Create Your Account
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;