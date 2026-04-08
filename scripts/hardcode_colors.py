import re

page_path = 'src/app/page.tsx'
content = open(page_path, 'r').read()

replacements = [
    ('bg-[var(--tertiary)]', 'bg-[#E67E6E] dark:bg-[#9B4437]'),
    ('text-accent-brand', 'text-[#E67E6E] dark:text-[#9B4437]'),
    ('bg-accent-brand/10', 'bg-[#E67E6E]/10 dark:bg-[#9B4437]/10'),
    ('bg-accent-brand/15', 'bg-[#E67E6E]/15 dark:bg-[#9B4437]/15'),
    ('bg-accent-brand/20', 'bg-[#E67E6E]/20 dark:bg-[#9B4437]/20'),
    ('bg-accent-brand/30', 'bg-[#E67E6E]/30 dark:bg-[#9B4437]/30'),
    ('bg-accent-brand/50', 'bg-[#E67E6E]/50 dark:bg-[#9B4437]/50'),
    ('border-accent-brand/20', 'border-[#E67E6E]/20 dark:border-[#9B4437]/20'),
    ('bg-accent-brand', 'bg-[#E67E6E] dark:bg-[#9B4437]'),
    ('text-tertiary', 'text-[#E67E6E] dark:text-[#9B4437]'),
    ('border-tertiary/20', 'border-[#E67E6E]/20 dark:border-[#9B4437]/20'),
    
    ('bg-primary/10', 'bg-[#5A677D]/10 dark:bg-[#C0C6DB]/10'),
    ('bg-primary/20', 'bg-[#5A677D]/20 dark:bg-[#C0C6DB]/20'),
    ('bg-primary/40', 'bg-[#5A677D]/40 dark:bg-[#C0C6DB]/40'),
    ('bg-primary/60', 'bg-[#5A677D]/60 dark:bg-[#C0C6DB]/60'),
    ('text-primary', 'text-[#5A677D] dark:text-[#C0C6DB]'),
    ('bg-primary', 'bg-[#5A677D] dark:bg-[#C0C6DB]'),

    ('border-border/5', 'border-[#CBD5E1]/5 dark:border-[#334155]/5'),
    ('border-border/10', 'border-[#CBD5E1]/10 dark:border-[#334155]/10'),
    ('border-border/20', 'border-[#CBD5E1]/20 dark:border-[#334155]/20'),
    ('border-border', 'border-[#CBD5E1] dark:border-[#334155]'),

    ('bg-muted/10', 'bg-[#E2E8F0]/10 dark:bg-[#1E293B]/10'),
    ('bg-muted/30', 'bg-[#E2E8F0]/30 dark:bg-[#1E293B]/30'),
    ('bg-muted/60', 'bg-[#E2E8F0]/60 dark:bg-[#1E293B]/60'),
    ('bg-muted', 'bg-[#E2E8F0] dark:bg-[#1E293B]'),
    
    ('text-muted-foreground', 'text-[#64748B] dark:text-[#94A3B8]'),
    
    ('bg-card', 'bg-white dark:bg-[#1c1f24]'),
    ('bg-background', 'bg-[#F5F5F4] dark:bg-[#121417]'),
    ('text-foreground', 'text-[#121417] dark:text-[#F5F5F4]'),
    
    ('bg-surface-container-highest', 'bg-[#D4D4D4] dark:bg-[#333842]'),
    
    ('shadow-tertiary/20', 'shadow-[#E67E6E]/20 dark:shadow-[#9B4437]/20'),
    ('shadow-tertiary/30', 'shadow-[#E67E6E]/30 dark:shadow-[#9B4437]/30'),
]

for old, new in replacements:
    content = content.replace(f" {old}", f" {new}")
    content = content.replace(f'"{old} ', f'"{new} ')

# Also push animated text down
content = content.replace('className="absolute left-4 top-1 whitespace-nowrap"', 'className="absolute left-4 top-4 whitespace-nowrap"')

open(page_path, 'w').write(content)
print("Applied strict arbitrary replacements.")
