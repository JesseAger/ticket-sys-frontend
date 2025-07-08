const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Optimum Hospital IT Support. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Professional IT Support Management System
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;