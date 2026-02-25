import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: '#144a7b',
          light: '#1E88E5',
          dark: '#0d3454',
        },
        secondary: {
          DEFAULT: '#00bf63',
          dark: '#009950',
        },
        'surface': '#fafafa',
        'surface-alt': '#f2f5f6',
      },
      spacing: {
        'navbar-mobile': '121px',
        'navbar-desktop': '182px',
      },
      screens: {
        'navbar-bp': '901px', // Custom breakpoint for navbar
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
export default config;
