const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const navigation = require("@11ty/eleventy-navigation");

module.exports = function(config) {
  config.addPlugin(syntaxHighlight);
  config.addPlugin(navigation);
  config.addPassthroughCopy("style.css");
  config.addPassthroughCopy("buttons");
  return {
    dir: {
      includes: "_includes",
      layouts: "_layouts"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  }
};