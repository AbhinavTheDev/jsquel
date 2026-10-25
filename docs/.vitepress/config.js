import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "JSQUEL",
  description: "A lightweight file based, SQL database implemented using js",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/" },
      { text: "Examples", link: "/guide/examples" },
      { text: "API", link: "/api" },
    ],

    sidebar: [
      { text: "Quickstart", link: "/quickstart"},
      {
        text: "Guide",
        items: [
          { text: "Getting Started", link: "/guide/" },
          { text: "Examples", link: "/guide/examples" }
        ]
      },
      { text: "API", link: "/api" }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/abhinavthedev/jsquel' },
        {icon: 'x', link: 'https://x.com/Abhinav_twts'}
    ]
  }
})
