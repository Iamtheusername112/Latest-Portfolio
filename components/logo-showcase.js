"use client";

import Logo from "@/components/logo";

const LogoShowcase = () => {
  const variants = [
    { name: "Default", variant: "default", description: "Modern gradient with clean typography" },
    { name: "Minimal", variant: "minimal", description: "Clean geometric design" },
    { name: "Tech", variant: "tech", description: "Tech-inspired hexagonal design" }
  ];

  const sizes = ["sm", "md", "lg", "xl"];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Logo Variants</h2>
        <p className="text-muted-foreground">Choose your preferred logo style</p>
      </div>

      {/* Logo Variants */}
      <div className="grid md:grid-cols-3 gap-8">
        {variants.map(({ name, variant, description }) => (
          <div key={variant} className="text-center space-y-4 p-6 glass rounded-lg">
            <Logo 
              variant={variant} 
              size="xl" 
              showText={true}
              className="justify-center"
            />
            <h3 className="text-lg font-semibold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>

      {/* Size Variations */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground text-center">Size Variations</h3>
        <div className="flex items-center justify-center space-x-8 flex-wrap gap-4">
          {sizes.map((size) => (
            <div key={size} className="text-center space-y-2">
              <Logo 
                variant="default" 
                size={size} 
                showText={true}
                className="justify-center"
              />
              <p className="text-xs text-muted-foreground uppercase">{size}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Examples */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground text-center">Usage Examples</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Header Example */}
          <div className="p-4 glass rounded-lg">
            <h4 className="text-sm font-medium text-foreground mb-3">Header Navigation</h4>
            <div className="flex items-center space-x-4">
              <Logo variant="default" size="md" showText={false} />
              <span className="text-sm text-muted-foreground">Logo only</span>
            </div>
            <div className="flex items-center space-x-4 mt-2">
              <Logo variant="default" size="md" showText={true} />
              <span className="text-sm text-muted-foreground">With text</span>
            </div>
          </div>

          {/* Footer Example */}
          <div className="p-4 glass rounded-lg">
            <h4 className="text-sm font-medium text-foreground mb-3">Footer Branding</h4>
            <Logo variant="default" size="lg" showText={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoShowcase;
