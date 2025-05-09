# Akkoma Blog - Federated Blog from Akkoma

kkoma Blog (OpLog) is a static site generator that fetches blog posts from your Akkoma/Pleroma/Mastodon feed and renders them using Eleventy (11ty). It creates a beautiful, fast, and SEO-friendly blog from your ActivityPub content.

![OpLog Screenshot](https://raw.githubusercontent.com/hotheadhacker/akkoma-blog/main/screenshots/1.png)

## Live Demo

Visit [oplog.isalman.dev](https://oplog.isalman.dev) to see OpLog in action. This is based on my fedirated instance [social.isalman.dev](https://social.isalman.dev)

## Features

- **Federated Content**: Automatically pulls posts from your Akkoma/Pleroma/Mastodon account
- **Media Support**: Properly displays images, videos, and embedded content
- **Responsive Design**: Looks great on all devices with dark mode support
- **Fast & SEO-friendly**: Static site with excellent performance and SEO
- **Automatic Updates**: GitHub Actions workflow fetches new posts every 6 hours
- **Zero Backend**: No server-side code or database required

## Quick Start

1. Fork this repository
2. Update the configuration in `utils/fetch-posts.js` with your Akkoma instance and username
3. Enable GitHub Pages in your repository settings
4. Your blog will be automatically built and deployed

## Configuration

### Basic Configuration

Edit `utils/fetch-posts.js` to set your Akkoma instance and username:

```javascript
const AKKOMA_INSTANCE = 'social.example.com';
const AKKOMA_USER = 'yourusername';
```

### Customization

- **Site Title/Description**: Edit `_data/site.json`
- **Styling**: Modify `css/style.css`
- **Templates**: Update files in `_includes/layouts/`

## Local Development

```bash
# Install dependencies
npm install

# Fetch posts from your Akkoma instance
npm run fetch-posts

# Start development server
npm run start
```

## Deployment

OpLog is designed to be deployed to GitHub Pages. The included GitHub Actions workflow will:

1. Fetch your latest posts from Akkoma
2. Build the site with Eleventy
3. Deploy to GitHub Pages

The workflow runs automatically:
- When you push changes to the main branch
- Every 6 hours to fetch new posts
- When manually triggered from the Actions tab

## Customizing Your Blog

### Site Information

Edit `_data/site.json` to update your site's title, description, and other metadata.

### Styling

The blog uses a clean, minimal design that you can customize by editing `css/style.css`.

### Templates

The blog templates are in the `_includes/layouts` directory:
- `base.njk`: The main layout template
- `post.njk`: Individual post template
- `index.njk`: Home page template

## Media Handling

OpLog includes special handling for various media types:
- Images with lightbox functionality
- Responsive video embeds
- Audio players
- Automatic gallery creation for multiple consecutive images

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Eleventy](https://www.11ty.dev/)
- Powered by [Akkoma](https://akkoma.social/) and the [ActivityPub](https://activitypub.rocks/) protocol
