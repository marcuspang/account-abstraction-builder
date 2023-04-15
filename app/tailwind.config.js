/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "gradient-x": "gradient-x 3s ease infinite",
        "gradient-y": "gradient-y 3s ease infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": {
            "background-size": "100% 200%",
            "background-position": "100% 50%",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "0 50%",
          },
        },
        "gradient-y": {
          "0%, 100%": {
            "background-size": "200% 100%",
            "background-position": "50% 100%",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "50% 0",
          },
        },
      },
    },
  },
  plugins: [],
};
