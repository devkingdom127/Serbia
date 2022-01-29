const purgeEnabled = process.env.NODE_ENV === "production";

console.log("\n");
console.log(`   TailwindCSS \n`);
console.log(`   ----------- \n`);
console.log(`   ✅ purgeEnabled=${purgeEnabled}\n`);

module.exports = {
  reactStrictMode: true,
  purge: {
    enabled: purgeEnabled,
    content: ["./src/**/*.html", "./src/**/*.tsx", "./src/**/*.jsx"],
  },
  images: {
    disableStaticImages: true,
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1400px'
    },

    fontSize: {
      xs: "0.75rem",
      sm: ".875rem",
      tiny: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
    },

    extend: {
      colors: {
        primary: "#141414",
        secondary: "#222222",
        brown1: "#D2BD8E",
        brown2: "#C3A46B",
        background: "#222222",
        blueviolet: "#b561ff",
        bluelight: "#65e0ff",
        dark: "#24284d",
        white: "#ffffff",
        gray: "#9f9f9f",
        gray1: "#1C1C1E",
        green: "#2feea1",
        red: "#ee2fa1",
        disabled: "rgba(255, 255, 255, 0.1)",
        green: "#008C06",
        yellow: "#FFC700",
      },

      fontFamily: {
        // frightmare: ["Frightmare"],
        sans: ["Russo One", "Helvetica", "Arial", "sans-serif"],
      },

      backgroundImage: {
        space:
          "linear-gradient(rgba(0, 0, 0, 0.727),rgba(0, 0, 0, 0.7)), url('/images/space.png')",
        "gradient-radial": "radial-gradient(var(--gradient-color-stops))",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    // Other plugins
    require('@tailwindcss/forms'),
    require("tailwindcss-text-fill-stroke")(),
  ],
};
