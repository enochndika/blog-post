module.exports = {
  mode: 'jit',
  darkMode: 'class',
  corePlugins: {
    container: false,
  },
  purge: ['./src/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      outline: {
        blue: '1px solid #2563EB',
        white: '1px solid #E5E7EB',
      },
      fontSize: {
        small: ['14px', '20px'],
      },
      textColor: {
        yellow: '#FFFF00',
        grayer: '#808080',
        info: '#33b5e5',
      },
      backgroundColor: {
        btn: '#212121',
        darker: '#111111',
        dashboard: '#25074d',
      },
      padding: {
        container: '5%',
      },
      width: {
        99: 'calc(100% - 17rem);', //get the width of the main content from lg:viewport by dividing
        // (the total width by the width of the side navigation)
      },
    },
  },
  plugins: [
    require('tailwind-bootstrap-grid')({
      containerMaxWidths: {
        sm: '640px',
        md: '768px',
        lg: '1280px',
        xl: '1140px',
      },
    }),
  ],
};
