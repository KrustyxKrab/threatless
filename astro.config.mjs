import { defineConfig } from 'astro/config';

// Static MVP – no server, no database. Set `site` to the deployed URL for absolute OG links.
export default defineConfig({
  site: 'https://threatless.example.org',
  build: { inlineStylesheets: 'auto' },
});
