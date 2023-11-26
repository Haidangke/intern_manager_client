/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    // fontFamily: {
    //   sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif']
    // },
    container:{
      center: true,
    },
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif']
      },
      fontSize:{
        fs11: '11px',
        fs12: '12px',
        fs14:'14px',
        fs15: '15px',
        fs18: '18px',
        fs22: '22px',
      },
      colors: {
        sidebar: '#6f6f6f',
        dark: '#161823',
        light: '#ffffff',
        active: '#3D5EE1',
        footer: '#808191',
        button: '#6c757d',
        darkGrey: '#495057'
      },
      borderColor: {
        primary: '#3D5EE1',
        secondary: '#e3e3e3'
      },
      backgroundColor: {
        light: '#ffffff',
        content: '#F7F7FA',
        primary: '#3D5EE1',
        button: '#f5f5f5',
        dash: '#edf4ff',
        lightgray: '#f4f4f4',
        mediumGrey: '#f8f9fa',
        lightPink: '#fff9ed',
        facebook: '#1877f2',
        twitter: '#1d9bf0',
        instagram: '#fe643b',
        linkedin: '#0a66c2'

      },
      height: {
        header: '3.75rem', // Header height - 60px
        sidebar: 'calc(100vh - 3.75rem)' // Sidebar height
      },
      minHeight: {
        'screen-except-header': 'calc(100vh - 3.75rem)' // 100vh - header
      },
      spacing: {
        header: '3.75rem', // Header height
        sidebar: '16.25rem', // Sidebar width
        'mini-sidebar': '5rem' // Mini sidebar width
      },
      width: {
        sidebar: '16.25rem', // Sidebar width - 260px
        'mini-sidebar': '5rem' // Mini sidebar width - 80px
      }
    }
  },
  plugins: []
}
