export const data = async () => {
  const posts = await import("../_data/posts.js").then((mod) => mod.default());

  return {
    pagination: {
      data: posts,
      size: 1,
      alias: "post"
    },
    permalink: ({ post }) => `/posts/${post.slug}/`,
    layout: "post.njk"
  };
};

export const render = ({ post }) => {
  return `<h1>${post.title}</h1><p><em>${post.published}</em></p><div>${post.content}</div>`;
};
