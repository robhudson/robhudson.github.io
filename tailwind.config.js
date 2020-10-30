const markdownIt = require("markdown-it");

const purgeMarkdown = (content) => {
  const md = markdownIt().render(content);

  // Capture as liberally as possible, including things like `h-(screen-1.5)`
  const broadMatches = md.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];

  // Capture classes within other delimiters like .block(class="w-1/2") in Pug
  const innerMatches =
    md.match(/[^<>"'`\s.(){}[\]#=%]*[^<>"'`\s.(){}[\]#=%:]/g) || [];

  return broadMatches.concat(innerMatches);
};

module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    mode: "all",
    content: ["./src/**/*.{njk,md}"],
    options: {
      extractors: [
        {
          extractor: purgeMarkdown,
          extensions: ["md"],
        },
      ],
    },
  },
  theme: {
    extend: {
      fontFamily: {
        heading: ["Fira Sans", "sans-serif"],
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
