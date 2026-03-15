import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/registry/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  // plugins: [
  // require('tw-animate-css')
  // ],

  // For Tailwind v4, most theme configuration should be in CSS
  // Keep config minimal for v4
}

export default config