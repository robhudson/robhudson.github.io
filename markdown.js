const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

let mdLib = markdownIt({
  html: true,
  breaks: true,
  linkify: true,
}).use(markdownItAnchor, {
  permalink: true,
  permalinkSymbol: "#",
});

exports.mdLib = mdLib;
