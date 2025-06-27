const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs = require('fs');
const path = require('path');

// Hardcoded configuration - no tokens needed for public posts
const AKKOMA_INSTANCE = 'www.threads.com';
const AKKOMA_USER = 'arbinger.iv';
const POST_LIMIT = 100; // Number of posts to fetch

// Ensure the posts directory exists
const postsDir = path.join(__dirname, '../posts');
if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

async function fetchPosts() {
  console.log(`Fetching public posts from ${AKKOMA_INSTANCE} for user ${AKKOMA_USER}...`);
  
  try {
    // Fetch statuses from the Akkoma API (public endpoint, no auth needed)
    const url = `https://${AKKOMA_INSTANCE}/api/v1/accounts/${AKKOMA_USER}/statuses?limit=${POST_LIMIT}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      console.log(await response.text())
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }
    
    const statuses = await response.json();
    console.log(`Fetched ${statuses.length} posts.`);
    
    // Process and save posts
    const posts = statuses
      .filter(status => !status.reblog && !status.in_reply_to_id)
      .map(status => {
        // Clean up content
        let content = status.content;
        
        // Extract the first paragraph as excerpt
        const excerptMatch = content.match(/<p>(.*?)<\/p>/);
        const excerpt = excerptMatch 
          ? excerptMatch[1].replace(/<[^>]*>/g, '') 
          : content.replace(/<[^>]*>/g, '').substring(0, 150) + '...';
        
        // Format date
        const date = new Date(status.created_at);
        const formattedDate = date.toISOString().split('T')[0];
        
        // Generate slug from date and first few words of content
        const textContent = content.replace(/<[^>]*>/g, '');
        const slugWords = textContent.split(' ').slice(0, 5).join(' ');
        const slug = `${formattedDate}-${slugWords}`
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .substring(0, 50);
        
        return {
          id: status.id,
          date: formattedDate,
          title: textContent.substring(0, 60) + (textContent.length > 60 ? '...' : ''),
          content: content,
          excerpt: excerpt,
          url: `/posts/${slug}/`,
          source_url: status.url,
          slug: slug
        };
      });
    
    // Save each post as an individual file
    posts.forEach(post => {
      const postContent = `---
title: "${post.title.replace(/"/g, '\\"')}"
date: ${post.date}
source_url: "${post.source_url}"
layout: layouts/post.njk
---

${post.content}
`;
      
      fs.writeFileSync(path.join(postsDir, `${post.slug}.md`), postContent);
    });
    
    // Create a posts.json file with metadata for pagination
    fs.writeFileSync(
      path.join(postsDir, 'posts.json'), 
      JSON.stringify(posts, null, 2)
    );
    
    console.log(`Successfully saved ${posts.length} posts.`);
    
  } catch (error) {
    console.error('Error fetching posts:', error);
    process.exit(1);
  }
}

fetchPosts();
