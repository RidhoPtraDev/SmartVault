/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4F46E5",
          deep: "#3525CD",
          container: "#4F46E5",
        },
        secondary: {
          DEFAULT: "#6366F1",
          container: "#6063EE",
        },
        tertiary: {
          DEFAULT: "#10B981",
          container: "#006E4B",
        },
        cyan: {
          accent: "#06B6D4",
        },
        error: {
          DEFAULT: "#EF4444",
          container: "#FFDAD6",
        },
        background: "#F4F5FB",
        surface: {
          DEFAULT: "#FAF8FF",
          lowest: "#FFFFFF",
          low: "#F2F3FF",
          container: "#EAEDFF",
          high: "#E2E7FF",
        },
        "on-surface": {
          DEFAULT: "#0F172A",
          variant: "#64748B",
        },
        outline: {
          DEFAULT: "#777587",
          variant: "#C7C4D8",
        },
        category: {
          shopping: "#8B5CF6",
          food: "#F97316",
          transport: "#3B82F6",
          bills: "#F59E0B",
          entertainment: "#10B981",
        },
      },
      borderRadius: {
        sm: "8px",
        DEFAULT: "16px",
        md: "24px",
        lg: "32px",
        xl: "48px",
        full: "9999px",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["PlusJakartaSans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
