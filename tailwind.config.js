/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "Poppins-Black": ["Poppins-Black", "sans-serif"],
        "Poppins-BlackItalic": ["Poppins-BlackItalic", "sans-serif"],
        "Poppins-Bold": ["Poppins-Bold", "sans-serif"],
        "Poppins-BoldItalic": ["Poppins-BoldItalic", "sans-serif"],
        "Poppins-ExtraBold": ["Poppins-ExtraBold", "sans-serif"],
        "Poppins-ExtraBoldItalic": ["Poppins-ExtraBoldItalic", "sans-serif"],
        "Poppins-ExtraLight": ["Poppins-ExtraLight", "sans-serif"],
        "Poppins-ExtraLightItalic": ["Poppins-ExtraLightItalic", "sans-serif"],
        "Poppins-Italic": ["Poppins-Italic", "sans-serif"],
        "Poppins-Light": ["Poppins-Light", "sans-serif"],
        "Poppins-LightItalic": ["Poppins-LightItalic", "sans-serif"],
        "Poppins-Medium": ["Poppins-Medium", "sans-serif"],
        "Poppins-MediumItalic": ["Poppins-MediumItalic", "sans-serif"],
        "Poppins-Regular": ["Poppins-Regular", "sans-serif"],
        "Poppins-SemiBold": ["Poppins-SemiBold", "sans-serif"],
        "Poppins-SemiBoldItalic": ["Poppins-SemiBoldItalic", "sans-serif"],
        "Poppins-Thin": ["Poppins-Thin", "sans-serif"],
        "Poppins-ThinItalic": ["Poppins-ThinItalic", "sans-serif"],
      },
      colors: {
        primary: {
          500: "#ffffff",
        },
        secondary: {
          500: "#f3f3f3",
        },
        accent: {
          50: "#FFFBEB",
          100: "#fce3ce",
          200: "#F4F0E4",
          300: "#FAD9A8",
          400: "#F1720C",
          500: "#F1720C",
        },
        gray: {
          500: "#616165",
          400: "#64748B",
          300: "#616165",
          200: "#DADADA",
          100: "#676767",
          50: "#E9EAEf",
        },
        "custom-blue": {
          50: "#EFF6FF",
        },
        brown: {
          DEFAULT: "#7E5B4E",
          200: "#EDE0D0",
        },
        black: {
          DEFAULT: "#000000",
          300: "#1E1305",
          400: "#1E1E1E",
        },
        danger: {
          DEFAULT: "#DE0A26",
          100: "#DE0A2660",
        },
      },
    },
  },
  plugins: [],
};
