const path = require("path");
const slugify = require("slugify");

module.exports = function (eleventyConfig) {
  eleventyConfig.addGlobalData("eleventyComputed", {
    permalink: (data) => {
      // If Eleventy hasn’t attached page info yet, bail out
      if (!data.page || !data.page.filePathStem) {
        return false;
      }

      // Special case: keep Home.md as the root index
      if (data.page.filePathStem === "/Home") {
        return "index.html";
      }

      // Slugify the last part of the path
      const slug = slugify(path.basename(data.page.filePathStem), {
        lower: true,
        strict: true,
      });

      return `${slug}/index.html`;
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
