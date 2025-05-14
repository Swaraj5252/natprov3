module.exports = {
  purge: ["./src/**/*.{html,js}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      container: {
        zIndex: {
          '100': '100',
        },
        center: true,
        padding: "1rem",
        screens: {
        lg: "1124px",
        xl: "1124px",
        "2xl": "1124px",
      },
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"]
      }
    },
  },
  plugins: [],
}
