const moment = require('moment');
const markdownIt = require('markdown-it');
const fs = require('fs');

module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy('css');
  
  // Add date filter using Luxon (built into Eleventy)
  eleventyConfig.addFilter("dateToFormat", function(date, format) {
    return moment(date).format(format);
  });
  
  // Configure Markdown
  const md = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  });
  
  eleventyConfig.setLibrary('md', md);
  
  // Load posts data
  eleventyConfig.addGlobalData('posts', () => {
    try {
      const postsPath = './posts/posts.json';
      if (fs.existsSync(postsPath)) {
        return require(postsPath);
      }
      return [];
    } catch (e) {
      console.error('Error loading posts data:', e);
      return [];
    }
  });
  
  return {
    dir: {
      input: '.',
      output: '_site',
      includes: '_includes'
    },
    templateFormats: ['md', 'njk', 'html'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk'
  };
};
