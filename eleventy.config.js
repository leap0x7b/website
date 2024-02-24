import path from "path";
import fs from "fs";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import navigation from "@11ty/eleventy-navigation";
import markdownIt from "markdown-it";
import anchor from "markdown-it-anchor";
import * as simpleIcons from "simple-icons";
import { RetrieveGlobals } from "node-retrieve-globals";
import moment from "moment";

export default function(config) {
  config.addPlugin(syntaxHighlight);
  config.addPlugin(navigation);

  config.setLibrary("md",
    markdownIt({ html: true }).use(anchor, {
      permalink: anchor.permalink.linkAfterHeader({
        style: "aria-label",
        assistiveText: title => `Permalink to "${title}"`,
        wrapper: [`<div class="title">`, "</div>"],
        symbol: fs.readFileSync(path.normalize(`node_modules/bootstrap-icons/icons/link-45deg.svg`))
      })
    })
  );

  config.addShortcode("simpleIcons", name => simpleIcons[`si${name.charAt(0).toUpperCase()}${name.slice(1)}`].svg.replaceAll("role=\"img\"", "fill=\"currentColor\""));
  config.addShortcode("bootstrapIcons", name => fs.readFileSync(path.normalize(`node_modules/bootstrap-icons/icons/${name}.svg`)));
  config.addFilter("postDate", (date) => {
    return moment(date).format("dddd, MMMM Do YYYY");
  });
  config.addFilter("permalinkDate", (date) => {
    return moment(date).format("YYYY-MM-DD");
  });

  config.addPassthroughCopy("ring.txt");
  config.addPassthroughCopy("style.css");
  config.addPassthroughCopy("leap.svg");
  config.addPassthroughCopy("buttons");
  config.addCollection("posts", collection =>
    collection.getFilteredByGlob("_posts/*.md")
      .sort((a, b) => b.date - a.date)
  );

  config.setFrontMatterParsingOptions({
    engines: {
      "javascript": function(frontMatterCode) {
        let vm = new RetrieveGlobals(frontMatterCode);

        // Do you want to pass in your own data here?
        let data = {};
        return vm.getGlobalContext(data, {
          reuseGlobal: true,
          dynamicImport: true,
        });
      }
    }
  });

  return {
    dir: {
      includes: "_includes",
      layouts: "_layouts"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  }
};