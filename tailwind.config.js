const { trueGray } = require("tailwindcss/colors");
const colors = require("tailwindcss/colors");
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
  purge: {
    content: ["./src/**/*.{njk,md}"],
    options: {
      extractors: [
        {
          extractor: purgeMarkdown,
          extensions: ["md"],
        },
      ],
      safelist: [
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
    colors: {
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      green: colors.green,
      teal: colors.teal,
      blue: colors.blue,
      indigo: colors.indigo,
    },
    extend: {
      fontFamily: {
        heading: ["Fira Sans", "sans-serif"],
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
