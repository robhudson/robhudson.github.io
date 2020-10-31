const { mdLib } = require("./markdown");

const purgeMarkdown = (content) => {
  const md = mdLib.render(content);

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
      whitelist: [
        "bg-green-900",
        "bg-teal-800",
        "bg-blue-800",
        "bg-circuit",
        "bg-signal",
        "bg-autumn",
        "bg-clouds",
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
