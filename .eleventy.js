const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);

  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/assets");

  // Collections
  eleventyConfig.addCollection("blog", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/posts/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  eleventyConfig.addCollection("adventures", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/adventures/trips/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  eleventyConfig.addCollection("projects", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/projects/*.md").sort((a, b) => {
      return (b.data.order || 0) - (a.data.order || 0);
    });
  });

  eleventyConfig.addCollection("gear", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/gear/reviews/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  // All posts (blog + adventures) for homepage
  eleventyConfig.addCollection("allPosts", function(collectionApi) {
    const blog = collectionApi.getFilteredByGlob("src/blog/posts/*.md");
    const adventures = collectionApi.getFilteredByGlob("src/adventures/trips/*.md");
    return [...blog, ...adventures].sort((a, b) => b.date - a.date);
  });

  // Date filter
  eleventyConfig.addFilter("dateFormat", function(date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  });

  // Excerpt filter
  eleventyConfig.addFilter("excerpt", function(content) {
    if (!content) return "";
    const stripped = content.replace(/<[^>]*>/g, "");
    return stripped.slice(0, 200) + (stripped.length > 200 ? "..." : "");
  });

  // Head filter (get first n items)
  eleventyConfig.addFilter("head", function(array, n) {
    if (!Array.isArray(array)) return [];
    return array.slice(0, n);
  });

  // ISO date filter for datetime attributes
  eleventyConfig.addFilter("isoDate", function(date) {
    return new Date(date).toISOString().split('T')[0];
  });

  // Year filter
  eleventyConfig.addFilter("year", function() {
    return new Date().getFullYear();
  });

  // Stars filter for ratings (1-5)
  eleventyConfig.addFilter("stars", function(rating) {
    const filled = Math.round(rating);
    const empty = 5 - filled;
    return "★".repeat(filled) + "☆".repeat(empty);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
