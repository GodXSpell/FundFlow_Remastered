
export default function HomePage() {
  return (
    <>
      <div className="min-h-screen bg-background text-foreground p-8">
        <h1 className="text-4xl font-bold mb-4">
          Testing Background
        </h1>
        <p className="text-muted-foreground mb-8">
          This should show your custom background and colors from the portfolio CSS.
        </p>
        
        {/* Test different color variables */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 bg-card border border-border rounded-lg">
            <h3 className="font-semibold text-card-foreground">Card</h3>
            <p className="text-sm text-muted-foreground">bg-card</p>
          </div>
          
          <div className="p-4 bg-primary text-primary-foreground rounded-lg">
            <h3 className="font-semibold">Primary</h3>
            <p className="text-sm opacity-80">bg-primary</p>
          </div>
          
          <div className="p-4 bg-secondary text-secondary-foreground rounded-lg">
            <h3 className="font-semibold">Secondary</h3>
            <p className="text-sm opacity-80">bg-secondary</p>
          </div>
          
          <div className="p-4 bg-accent text-accent-foreground rounded-lg">
            <h3 className="font-semibold">Accent</h3>
            <p className="text-sm opacity-80">bg-accent</p>
          </div>
        </div>
        
        {/* Test custom utilities */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Custom Utilities Test</h2>
          <div className="p-4 border border-edge rounded-lg">
            <p>This uses border-edge utility</p>
          </div>
        </div>
        
        {/* Background debug info */}
        <div className="p-4 border border-border rounded-lg bg-muted">
          <h3 className="font-semibold mb-2">CSS Debug Info</h3>
          <p className="text-sm text-muted-foreground">
            Background should be: <code className="bg-code text-code-foreground px-1 rounded">oklch(1 0 0)</code> (white in light mode)
          </p>
          <p className="text-sm text-muted-foreground">
            Dark mode background: <code className="bg-code text-code-foreground px-1 rounded">oklch(0.141 0.005 285.823)</code> (zinc-950)
          </p>
        </div>
      </div>
    </>
  )
}