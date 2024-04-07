/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: { min: "390px", max: "819px" },
        md: { min: "820px" },
      },
      colors: {
        'dark-blue': '#002c58',
        'mid-blue': '#0043f1',
        'light-blue': '#80a1f8',
      },
      fontFamily: {
        sans: ['"Pretendard-Regular"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
