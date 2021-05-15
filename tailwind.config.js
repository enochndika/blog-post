module.exports = {
  darkMode: 'class',
  corePlugins: {
    container: false,
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './helpers/**/*.{js,ts,jsx,tsx}',
  ],
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
        darker: '#111111',
        btn: '#212121',
      },
      padding: {
        container: '5%',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      borderWidth: ['focus'],
      fontSize: ['focus'],
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
