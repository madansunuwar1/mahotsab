/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },

    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1220px",
    },

    extend: {
      colors: {
        facebook: "#1877f2",
        instagram: "#e4405f",
        viber: "#7360f2",
        whatsapp: "#075e54",
        youtube: "#ff0000",
      },

      fontFamily: {
        primary: ["Kalimati", "sans-serif"],
        suse: ["SUSE", "sans-serif"],
        arya: ["Arya", "sans-serif"],
      },

      keyframes: {
        swish: {
          "0%, 44%, 88.1%, 100%": { transformOrigin: "left" },
          "0%, 100%, 88%": { transform: "scaleX(0)" },
          "44.1%, 88%": { transformOrigin: "right" },
          "33%, 44%": { transform: "scaleX(1)" },
        },

        bounceCustom: {
          "0%, 100%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
          "50%": {
            transform: "translateY(-20%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
        },
      },

      animation: {
        swish: "swish 0.8s cubic-bezier(0, 0, 0.03, 0.9) infinite",
        bounceCustom: "bounceCustom 1s infinite",
      },

      zIndex: {
        100: "100",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".flex-center": {
          display: "flex",
          "justify-content": "center",
          "align-items": "center",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
    flowbite.plugin(),
  ],
};
