import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        muted: "hsl(210 40% 96.1%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(222.2 84% 4.9%)",
        "muted-foreground": "hsl(215.4 16.3% 46.9%)",
        input: "hsl(214.3 31.8% 91.4%)",
        primary: "hsl(222.2 47.4% 11.2%)",
        "primary-foreground": "hsl(210 40% 98%)",
        destructive: "hsl(0 84.2% 60.2%)",
        "destructive-foreground": "hsl(10 40% 98%)",
      },
    },
  },
  plugins: [],
};
export default config;
