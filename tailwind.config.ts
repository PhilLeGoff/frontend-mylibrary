import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "dark-grey": "#515151",
        "bone-white": "#F9F6EE",
        bone: "#E1DCC5",
      },
      fontFamily: {
        custom: ['"Kaisei Opti"', "serif"],
      },
      boxShadow: {
        "book-action-btn": "0 4px 6px rgba(0, 0, 0, 0.1)",
      },
      borderWidth: {
        "book-action-btn": "2px",
      },
      borderColor: {
        "book-action-btn": "#515151",
      },
      cursor: {
        "book-action-btn": "pointer",
      },
      
    },
  },
  plugins: [],
};
export default config;
