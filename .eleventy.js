// .eleventy.js
module.exports = function (eleventyConfig) {
  return {
    dir: {
      input: "src/site/notes",
      output: "dist",
    },
    // Default permalink rule for all markdown files
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",

    // Optional: customize default permalinks
    templateFormats: ["md", "njk", "html"],

    // This adds a default permalink pattern
    // Example: src/site/notes/WRITING/foo.md → /WRITING/foo/index.html
    pathPrefix: "/",
  };
};

// Add this to .eleventy.js separately:
module.exports = function (eleventyConfig) {
  eleventyConfig.addGlobalData("permalink", (data) => {
    // Don’t override homepage
    if (data.page.filePathStem === "/Home") {
      return "index.html";
    }
    // Otherwise, build permalink from file path
    return data.page.filePathStem + "/index.html";
  });
};
