/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: { min: "390px", max: "819px" },
        md: { min: "820px" },
      },
    },
  },
  plugins: [],
};
