module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    content: ["./src/**/*.njk"],
    options: {
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
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
