const path = require("path");
const slugify = require("slugify");

module.exports = function (eleventyConfig) {
  eleventyConfig.addGlobalData("eleventyComputed", {
    permalink: (data) => {
      // Don’t try if no page data yet
      if (!data.page || !data.page.filePathStem) return false;

      // Special case: keep Home.md as the root index
      if (data.page.filePathStem === "/Home") {
        return "index.html";
      }

      // Preserve folder structure for uniqueness
      // Example: src/site/notes/📃Constitution/Amendment 1.md
      // → /constitution/amendment-1/index.html
      const parts = data.page.filePathStem
        .split(path.sep)               // break into folder parts
        .filter(Boolean)               // remove empty
        .map((p) =>
          slugify(p, { lower: true, strict: true })
        );

      return parts.join("/") + "/index.html";
    },
  });

  return {
    dir: {
      input: "src/site/notes",
      output: "dist",
    },
    templateFormats: ["md", "njk", "html"],
  };
};
