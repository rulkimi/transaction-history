module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./utils/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "var(--background)",
        },
        foreground: {
          DEFAULT: "var(--foreground)",
        },
        border: {
          DEFAULT: "var(--border)",
        },
        input: {
          DEFAULT: "var(--input)",
        },
        ring: {
          DEFAULT: "var(--ring)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: {
            DEFAULT: "var(--primary-foreground)",
          }
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: {
            DEFAULT: "var(--secondary-foreground)",
          }
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: {
            DEFAULT: "var(--destructive-foreground)",
          }
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: {
            DEFAULT: "var(--muted-foreground)",
          }
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: {
            DEFAULT: "var(--accent-foreground)",
          }
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: {
            DEFAULT: "var(--card-foreground)",
          }
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: {
            DEFAULT: "var(--popover-foreground)",
          }
        },
      },
    }
  },
  plugins: [],
}