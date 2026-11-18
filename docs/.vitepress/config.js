import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  cleanUrls: true,
  base: '/jsquel/',
  title: 'JSQUEL',
  titleTemplate: ':title | JSQUEL - JavaScript SQL Database (JS SQL)',
  description:
    'JSQUEL is a lightweight, zero-dependency, file-based SQL database engine built in pure JavaScript (JS SQL) for Node.js. Query JSON files with familiar SQLite-compatible syntax.',

  sitemap: {
    hostname: 'https://abhinavthedev.github.io/jsquel/',
    transformItems(items) {
      return items.map((item) => ({
        ...item,
        changefreq: 'weekly',
        priority: item.url === '' || item.url === '/' || item.url === 'hi/' ? 1.0 : 0.8
      }))
    }
  },

  head: [
    ['meta', { name: 'google-site-verification', content: '3Di5rCOTu5hWA0St1AcWWRHi5on_otvGOaRKcHVs_q8' }],
    ['link', { rel: 'icon', href: '/jsquel/favicon.ico' }],
    ['meta', { name: 'author', content: 'Abhinav' }],
    [
      'meta',
      {
        name: 'keywords',
        content:
          'jsquel, js sql, javascript sql, sql js, nodejs sql, node js sql database, file based database, lightweight sql engine, embedded sql database, json database, node sql'
      }
    ],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { name: 'theme-color', content: '#3c8772' }],

    // Open Graph defaults
    ['meta', { property: 'og:site_name', content: 'JSQUEL' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:image', content: 'https://abhinavthedev.github.io/jsquel/hero-image.png' }],
    ['meta', { property: 'og:image:alt', content: 'JSQUEL - Lightweight JavaScript SQL Database Engine (JS SQL)' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],

    // Twitter Card defaults
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@Abhinav_twts' }],
    ['meta', { name: 'twitter:creator', content: '@Abhinav_twts' }],
    ['meta', { name: 'twitter:image', content: 'https://abhinavthedev.github.io/jsquel/hero-image.png' }],

    // Structured Data (JSON-LD)
    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': 'https://abhinavthedev.github.io/jsquel/#website',
            url: 'https://abhinavthedev.github.io/jsquel/',
            name: 'JSQUEL - JavaScript SQL Database (JS SQL)',
            alternateName: ['JSQUEL', 'js sql', 'javascript sql', 'JS SQL Engine'],
            description:
              'A lightweight, zero-dependency, file-based SQL database engine built in pure JavaScript (JS SQL) for Node.js.',
            inLanguage: ['en-US', 'hi-IN']
          },
          {
            '@type': 'SoftwareApplication',
            '@id': 'https://abhinavthedev.github.io/jsquel/#software',
            name: 'JSQUEL',
            alternateName: ['jsquel', 'js sql', 'javascript sql', 'js-sql', 'node-sql'],
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Node.js, JavaScript',
            programmingLanguage: 'JavaScript',
            description:
              'A lightweight, zero-dependency, file-based SQL database engine built in pure JavaScript (JS SQL) for Node.js. Query JSON files with SQLite-compatible syntax.',
            url: 'https://abhinavthedev.github.io/jsquel/',
            downloadUrl: 'https://www.npmjs.com/package/jsquel',
            softwareVersion: '1.0.2',
            license: 'https://opensource.org/licenses/MIT',
            author: {
              '@type': 'Person',
              name: 'Abhinav',
              url: 'https://github.com/abhinavthedev'
            },
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            }
          }
        ]
      })
    ]
  ],

  transformHead({ pageData }) {
    const head = []

    let path = pageData.relativePath.replace(/\.md$/, '')
    if (path === 'index') {
      path = ''
    } else if (path.endsWith('/index')) {
      path = path.slice(0, -5)
    }

    const canonicalUrl = `https://abhinavthedev.github.io/jsquel/${path}`
    head.push(['link', { rel: 'canonical', href: canonicalUrl }])
    head.push(['meta', { property: 'og:url', content: canonicalUrl }])

    const isHindi = pageData.relativePath.startsWith('hi/')

    const defaultTitle = isHindi
      ? 'JSQUEL (जेएसक्यूईएल) - हल्का जावास्क्रिप्ट SQL डेटाबेस (JS SQL)'
      : 'JSQUEL - Lightweight JavaScript SQL Database (JS SQL)'

    let pageTitle = pageData.title || defaultTitle
    if (pageData.title && !pageData.title.includes('JSQUEL')) {
      pageTitle = `${pageData.title} | JSQUEL - JavaScript SQL Database (JS SQL)`
    }

    const pageDesc =
      pageData.description ||
      (isHindi
        ? 'JSQUEL Node.js के लिए एक हल्का, शून्य-निर्भरता, फ़ाइल-आधारित जावास्क्रिप्ट SQL डेटाबेस (JS SQL) इंजन है। परिचित SQLite सिंटैक्स के साथ JSON फ़ाइलों को क्वेरी करें।'
        : 'JSQUEL is a lightweight, zero-dependency, file-based SQL database engine built in pure JavaScript (JS SQL) for Node.js. Query JSON files with SQLite-compatible syntax.')

    head.push(['meta', { property: 'og:title', content: pageTitle }])
    head.push(['meta', { property: 'og:description', content: pageDesc }])
    head.push(['meta', { name: 'twitter:title', content: pageTitle }])
    head.push(['meta', { name: 'twitter:description', content: pageDesc }])
    head.push(['meta', { property: 'og:locale', content: isHindi ? 'hi_IN' : 'en_US' }])
    head.push(['meta', { property: 'og:locale:alternate', content: isHindi ? 'en_US' : 'hi_IN' }])

    const enRel = isHindi ? pageData.relativePath.slice(3) : pageData.relativePath
    const hiRel = 'hi/' + enRel

    const toCleanUrl = (rel) => {
      let p = rel.replace(/\.md$/, '')
      if (p === 'index') return 'https://abhinavthedev.github.io/jsquel/'
      if (p.endsWith('/index')) p = p.slice(0, -5)
      return `https://abhinavthedev.github.io/jsquel/${p}`
    }

    head.push(['link', { rel: 'alternate', hreflang: 'en', href: toCleanUrl(enRel) }])
    head.push(['link', { rel: 'alternate', hreflang: 'hi', href: toCleanUrl(hiRel) }])
    head.push(['link', { rel: 'alternate', hreflang: 'x-default', href: toCleanUrl(enRel) }])

    return head
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      title: 'JSQUEL',
      titleTemplate: ':title | JSQUEL - JavaScript SQL Database (JS SQL)',
      description:
        'A lightweight, zero-dependency, file-based SQL database engine built in pure JavaScript (JS SQL) for Node.js.',
      themeConfig: {
        search: {
          provider: 'local'
        },
        logo: '/favicon.ico',
        nav: [
          { text: 'Quickstart', link: '/quickstart' },
          { text: 'Guide', link: '/guide/' },
          { text: 'Examples', link: '/guide/examples' },
          { text: 'API', link: '/api' }
        ],

        sidebar: [
          { text: 'Quickstart', link: '/quickstart' },
          {
            text: 'Guide',
            items: [
              { text: 'Getting Started', link: '/guide/' },
              { text: 'Examples', link: '/guide/examples' },
              { text: 'Architecture', link: '/guide/architecture' }
            ]
          },
          { text: 'API Reference', link: '/api' },
          { text: 'Learn SQL', link: '/learn-sql' }
        ],

        socialLinks: [
          { icon: 'github', link: 'https://github.com/abhinavthedev/jsquel' },
          { icon: 'x', link: 'https://x.com/Abhinav_twts' }
        ],

        footer: {
          message: 'Released under the <a href="https://github.com/abhinavthedev/jsquel/blob/main/LICENSE">MIT License</a>.',
          copyright: 'Copyright © 2025-present <a href="https://github.com/abhinavthedev">Abhinav</a>'
        }
      }
    },
    hi: {
      label: 'हिन्दी',
      lang: 'hi-IN',
      link: '/hi/',
      title: 'जेएसक्यूईएल',
      titleTemplate: ':title | JSQUEL (जेएसक्यूईएल) - JS SQL डेटाबेस',
      description: 'JSQUEL Node.js के लिए एक हल्का, शून्य-निर्भरता, फ़ाइल-आधारित जावास्क्रिप्ट SQL डेटाबेस (JS SQL) इंजन है।',
      themeConfig: {
        logo: '/favicon.ico',
        nav: [
          { text: 'क्विकस्टार्ट', link: '/hi/quickstart' },
          { text: 'गाइड', link: '/hi/guide/' },
          { text: 'उदाहरण', link: '/hi/guide/examples' },
          { text: 'एपीआई', link: '/hi/api' }
        ],
        sidebar: [
          { text: 'क्विकस्टार्ट', link: '/hi/quickstart' },
          {
            text: 'गाइड',
            items: [
              { text: 'शुरुआत करें', link: '/hi/guide/' },
              { text: 'उदाहरण', link: '/hi/guide/examples' },
              { text: 'स्थापत्य', link: '/hi/guide/architecture' }
            ]
          },
          { text: 'एपीआई संदर्भ', link: '/hi/api' },
          { text: 'SQL सीखें', link: '/hi/learn-sql' }
        ],
        socialLinks: [
          { icon: 'github', link: 'https://github.com/abhinavthedev/jsquel' },
          { icon: 'x', link: 'https://x.com/Abhinav_twts' }
        ],
        footer: {
          message: '<a href="https://github.com/abhinavthedev/jsquel/blob/main/LICENSE">MIT लाइसेंस</a> के अंतर्गत जारी किया गया|',
          copyright: 'कॉपीराइट © 2025-वर्तमान <a href="https://github.com/abhinavthedev">अभिनव</a>'
        },
        outline: { label: 'इस पृष्ठ पर' },
        docFooter: { prev: 'पिछला पृष्ठ', next: 'अगला पृष्ठ' },
        returnToTopLabel: 'ऊपर जाएं',
        sidebarMenuLabel: 'मेनू',
        darkModeSwitchLabel: 'थीम',
        langMenuLabel: 'भाषा बदलें'
      }
    }
  },

  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
    }
  },
  vite: {
    plugins: [groupIconVitePlugin()]
  }
})
