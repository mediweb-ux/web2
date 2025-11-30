module.exports = {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './build/**/*.html'
  ],
  theme: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
};
