import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  cleanUrls: true,
  base: '/jsquel/',
  title: "JSQUEL",
  description: "A lightweight file based, SQL database implemented using js",
  head: [
    ['link', { rel: 'icon', href: '/jsquel/favicon.ico' }]
  ],
  themeConfig: {
    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
    logo: '/favicon.ico',
    nav: [
      { text: "Quickstart", link: "/quickstart" },
      { text: "Guide", link: "/guide/" },
      { text: "Examples", link: "/guide/examples" },
      { text: "API", link: "/api" },
    ],

    sidebar: [
      { text: "Quickstart", link: "/quickstart" },
      {
        text: "Guide",
        items: [
          { text: "Getting Started", link: "/guide/" },
          { text: "Examples", link: "/guide/examples" },
          { text: "Architecture", link: "/guide/architecture" }
        ]
      },
      { text: "API Reference", link: "/api" },
      { text: "Learn SQL", link: "/learn-sql" }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/abhinavthedev/jsquel' },
        {icon: 'x', link: 'https://x.com/Abhinav_twts'}
    ],

    footer: {
      message: 'Released under the <a href="https://github.com/abhinavthedev/jsquel/blob/main/LICENSE">MIT License</a>.',
      copyright: 'Copyright © 2025-present <a href="https://github.com/abhinavthedev">Abhinav</a>'
    }
  },
    markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
    },
  },
  vite: {
    plugins: [
      groupIconVitePlugin()
    ],
  }
})

