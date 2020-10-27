module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    content: ["./src/**/*.njk"],
    options: {
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
      whitelist: ['bg-green-900', 'bg-teal-800', 'bg-blue-800']
    },
  },
  theme: {
    extend: {
      fontFamily: {
        'heading': ['Fira Sans', 'sans-serif'],
      }
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
