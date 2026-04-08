import re

# 1. Update globals.css
globals_path = 'src/styles/globals.css'
globals_css = open(globals_path, 'r').read()

# Add new colors to theme inline
if '--color-accent-brand:' not in globals_css:
    globals_css = globals_css.replace(
        '  --color-secondary-foreground: var(--secondary-foreground);',
        '  --color-secondary-foreground: var(--secondary-foreground);\n  --color-tertiary: var(--tertiary);\n  --color-accent-brand: var(--accent-brand);'
    )

root_block = """
:root {
  --background: #F5F5F4;
  --foreground: #121417;
  --primary: #5A677D;
  --primary-foreground: #FFFFFF;
  --secondary: #7E909A;
  --secondary-foreground: #FFFFFF;
  --tertiary: #E67E6E;
  --accent-brand: #E67E6E;
  --muted: #E2E8F0;
  --muted-foreground: #64748B;
  --card: #FFFFFF;
  --card-foreground: #121417;
  --popover: #FFFFFF;
  --popover-foreground: #121417;
  --border: #CBD5E1;
  --input: #CBD5E1;
  --ring: #5A677D;
  --success: oklch(0.723 0.219 149.579);
  --destructive: oklch(0.577 0.245 27.325);
  --radius: 0.5rem;
}
"""

dark_block = """
.dark {
  --background: #121417;
  --foreground: #F5F5F4;
  --primary: #C0C6DB;
  --primary-foreground: #121417;
  --secondary: #9B4437;
  --secondary-foreground: #FFFFFF;
  --tertiary: #1E0F02;
  --accent-brand: #9B4437;
  --muted: #1E293B;
  --muted-foreground: #94A3B8;
  --card: #1c1f24;
  --card-foreground: #F5F5F4;
  --popover: #1c1f24;
  --popover-foreground: #F5F5F4;
  --border: #334155;
  --input: #334155;
  --ring: #C0C6DB;
  --success: oklch(0.723 0.219 149.579);
  --destructive: oklch(0.505 0.213 27.518);
  --radius: 0.5rem;
}
"""

globals_css = re.sub(r':root\s*\{.*?(?=\n\.dark|\n@layer)', root_block, globals_css, flags=re.DOTALL)
globals_css = re.sub(r'\.dark\s*\{.*?(?=\n@layer)', dark_block, globals_css, flags=re.DOTALL)
open(globals_path, 'w').write(globals_css)

# 2. Update page.tsx
page_path = 'src/app/page.tsx'
page_content = open(page_path, 'r').read()

# Remove nav items
page_content = re.sub(
    r'<div className="hidden md:flex items-center gap-8 tracking-tight text-sm font-medium">.*?</div>',
    '',
    page_content,
    flags=re.DOTALL
)

# Fix animated text
page_content = page_content.replace(
    'relative inline-block h-[1.2em] overflow-hidden min-w-[200px] text-left',
    'relative inline-block h-[1.5em] overflow-visible min-w-[320px] whitespace-nowrap text-left'
)

# Fix grid height
page_content = page_content.replace(
    'h-auto md:h-[600px]',
    'auto-rows-min'
)

# Remap colors to Shadcn
color_replacements = {
    'bg-surface-container-lowest': 'bg-card',
    'bg-surface-container-low/30': 'bg-muted/10',
    'bg-surface-container-low': 'bg-muted/30',
    'bg-surface-container-highest': 'bg-muted',
    'bg-surface-container-high': 'bg-muted/60',
    'bg-surface-container': 'bg-card',
    'bg-surface/30': 'bg-background/40',
    'bg-surface/20': 'bg-background/20',
    'bg-surface': 'bg-background',
    'text-on-surface-variant': 'text-muted-foreground',
    'text-on-surface/80': 'text-foreground/80',
    'text-on-surface': 'text-foreground',
    'border-outline-variant': 'border-border',
    'bg-primary-container': 'bg-primary/10',
    'text-on-primary-container': 'text-foreground',
    'bg-secondary-container': 'bg-accent-brand/10',
    'text-on-secondary-container': 'text-foreground',
    'border-secondary-container': 'border-accent-brand/20',
    'text-secondary': 'text-accent-brand',
    'bg-secondary': 'bg-accent-brand',
}

for old, new in color_replacements.items():
    page_content = page_content.replace(old, new)

open(page_path, 'w').write(page_content)
print("Fixes applied successfully!")
