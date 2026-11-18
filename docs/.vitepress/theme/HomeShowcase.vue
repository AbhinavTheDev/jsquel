<script setup>
import { ref, computed } from 'vue'
import { useData, withBase } from 'vitepress'

const { lang, localeIndex } = useData()

const isHindi = computed(() => {
  return localeIndex.value === 'hi' || (lang.value && lang.value.startsWith('hi'))
})

const copied = ref(false)
const activeTab = ref('data')

const content = {
  en: {
    copy: 'Copy',
    copied: 'Copied!',
    copyTitle: 'Copy command',
    section1Title: 'Transparent Persistence by Design',
    section1Subtitle:
      'Write declarative SQL statements directly in Node.js. Every table, schema, and index persists in clean, human-readable JSON files on your disk.',
    comment1: '// 1. Define table schema',
    comment2: '// 2. Insert records',
    comment3: '// 3. Query all rows',
    comment4: '// 4. Build index for fast lookup',
    section2Title: 'Explore the Documentation',
    section2Subtitle:
      'Everything you need to integrate, scale, and understand JSQUEL.',
    cards: [
      {
        badge: 'ONBOARDING',
        title: 'Quick Start Guide',
        description:
          'Install JSQUEL and execute your first table schema and query in under 60 seconds.',
        link: '/quickstart'
      },
      {
        badge: 'COOKBOOK',
        title: 'Examples',
        description:
          'Hands-on recipes for table creation, inserts, indexing lookups, and backups.',
        link: '/guide/examples'
      },
      {
        badge: 'DEEP DIVE',
        title: 'Architecture',
        description:
          'Learn how file-based JSON storage, table Mutex locks, and serverless runtimes work.',
        link: '/guide/architecture'
      },
      {
        badge: 'REFERENCE',
        title: 'API Specifications',
        description:
          'Complete parameter tables, return models, error codes, and low-level utilities.',
        link: '/api'
      }
    ]
  },
  hi: {
    copy: 'कॉपी करें',
    copied: 'कॉपी हो गया!',
    copyTitle: 'कमांड कॉपी करें',
    section1Title: 'डिज़ाइन से ही पारदर्शी दृढ़ता',
    section1Subtitle:
      'Node.js में सीधे डिक्लेरेटिव SQL स्टेटमेंट्स लिखें। प्रत्येक टेबल, स्कीमा और इंडेक्स आपकी डिस्क पर साफ़, आसानी से पढ़ी जा सकने वाली JSON फ़ाइलों में संग्रहीत रहते हैं।',
    comment1: '// 1. टेबल स्कीमा परिभाषित करें',
    comment2: '// 2. रिकॉर्ड्स डालें (Insert records)',
    comment3: '// 3. सभी पंक्तियाँ क्वेरी करें',
    comment4: '// 4. तेज़ लुकअप के लिए इंडेक्स बनाएं',
    section2Title: 'दस्तावेज़ एक्सप्लोर करें',
    section2Subtitle:
      'JSQUEL को एकीकृत करने, स्केल करने और समझने के लिए आवश्यक सब कुछ।',
    cards: [
      {
        badge: 'शुरुआत',
        title: 'त्वरित शुरुआत गाइड',
        description:
          'JSQUEL इंस्टॉल करें और 60 सेकंड से भी कम समय में अपना पहला टेबल स्कीमा और क्वेरी निष्पादित करें।',
        link: '/hi/quickstart'
      },
      {
        badge: 'कुकबुक',
        title: 'उदाहरण',
        description:
          'टेबल निर्माण, इंसर्ट, इंडेक्सिंग लुकअप और बैकअप के लिए व्यावहारिक उदाहरण।',
        link: '/hi/guide/examples'
      },
      {
        badge: 'डीप डाइव',
        title: 'आर्किटेक्चर',
        description:
          'जानें कि फ़ाइल-आधारित JSON स्टोरेज, टेबल म्यूटिक्स (Mutex) लॉक्स और सर्वरलेस रनटाइम कैसे काम करते हैं।',
        link: '/hi/guide/architecture'
      },
      {
        badge: 'संदर्भ',
        title: 'एपीआई विनिर्देश',
        description:
          'संपूर्ण पैरामीटर तालिकाएँ, रिटर्न मॉडल्स, एरर कोड्स और निम्न-स्तरीय उपयोगिताएँ।',
        link: '/hi/api'
      }
    ]
  }
}

const t = computed(() => (isHindi.value ? content.hi : content.en))

function copyInstall() {
  navigator.clipboard.writeText('npm install jsquel')
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<template>
  <div class="home-showcase-container">
    
    <!-- Quick Install Widget -->
    <div class="install-widget">
      <div class="install-code">
        <span class="prompt">$</span>
        <code>npm install jsquel</code>
      </div>
      <button class="copy-btn" @click="copyInstall" :title="copied ? t.copied : t.copyTitle">
        <svg v-if="!copied" class="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
        </svg>
        <svg v-else class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        <span>{{ copied ? t.copied : t.copy }}</span>
      </button>
    </div>

    <!-- Section 1: Interactive Code Showcase -->
    <div class="section-header">
      <h2 class="section-title">{{ t.section1Title }}</h2>
      <p class="section-subtitle">
        {{ t.section1Subtitle }}
      </p>
    </div>

    <!-- Split-Screen Code Showcase (Side-by-Side on Desktop) -->
    <div class="showcase-split">
      
      <!-- Left: JavaScript & SQL Execution -->
      <div class="code-window">
        <div class="window-header">
          <div class="window-dots">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <span class="window-filename">app.js &mdash; Node.js</span>
          <span class="window-badge js">JS + SQL</span>
        </div>
        <div class="window-body">
          <pre><code><span class="token-kw">import</span> { createTable, insertInto, select, createIndex } <span class="token-kw">from</span> <span class="token-str">"jsquel"</span>;

<span class="token-comment">{{ t.comment1 }}</span>
<span class="token-fn">createTable</span>(<span class="token-str">"CREATE TABLE users (id int, name txt, active boolean)"</span>);

<span class="token-comment">{{ t.comment2 }}</span>
<span class="token-fn">insertInto</span>(<span class="token-str">'INSERT INTO users (id, name, active) VALUES (1, "Alice", true)'</span>);
<span class="token-fn">insertInto</span>(<span class="token-str">'INSERT INTO users (id, name, active) VALUES (2, "Bob", true)'</span>);

<span class="token-comment">{{ t.comment3 }}</span>
<span class="token-fn">select</span>(<span class="token-str">"SELECT * FROM users"</span>);

<span class="token-comment">{{ t.comment4 }}</span>
<span class="token-fn">createIndex</span>(<span class="token-str">"users"</span>, <span class="token-str">"name"</span>);</code></pre>
        </div>
      </div>

      <!-- Right: Real Filesystem Storage -->
      <div class="code-window">
        <div class="window-header">
          <div class="tab-group">
            <button 
              class="tab-btn" 
              :class="{ active: activeTab === 'data' }" 
              @click="activeTab = 'data'"
            >
              users.data.json
            </button>
            <button 
              class="tab-btn" 
              :class="{ active: activeTab === 'schema' }" 
              @click="activeTab = 'schema'"
            >
              users.schema.json
            </button>
            <button 
              class="tab-btn" 
              :class="{ active: activeTab === 'index' }" 
              @click="activeTab = 'index'"
            >
              name.index.json
            </button>
          </div>
        </div>

        <div class="window-body">
          <!-- Data Tab -->
          <pre v-if="activeTab === 'data'"><code>[
  {
    <span class="token-key">"id"</span>: <span class="token-num">1</span>,
    <span class="token-key">"name"</span>: <span class="token-str">"Alice"</span>,
    <span class="token-key">"active"</span>: <span class="token-bool">true</span>
  },
  {
    <span class="token-key">"id"</span>: <span class="token-num">2</span>,
    <span class="token-key">"name"</span>: <span class="token-str">"Bob"</span>,
    <span class="token-key">"active"</span>: <span class="token-bool">true</span>
  }
]</code></pre>

          <!-- Schema Tab -->
          <pre v-else-if="activeTab === 'schema'"><code>{
  <span class="token-key">"id"</span>: <span class="token-str">"INT"</span>,
  <span class="token-key">"name"</span>: <span class="token-str">"TXT"</span>,
  <span class="token-key">"active"</span>: <span class="token-str">"BOOLEAN"</span>
}</code></pre>

          <!-- Index Tab -->
          <pre v-else><code>{
  <span class="token-key">"Alice"</span>: [<span class="token-num">0</span>],
  <span class="token-key">"Bob"</span>: [<span class="token-num">1</span>]
}</code></pre>
        </div>
      </div>

    </div>

    <!-- Section 2: Journey Navigation Cards -->
    <div class="section-header" style="margin-top: 72px;">
      <h2 class="section-title">{{ t.section2Title }}</h2>
      <p class="section-subtitle">
        {{ t.section2Subtitle }}
      </p>
    </div>

    <div class="journey-grid">
      <a 
        v-for="(card, index) in t.cards" 
        :key="index" 
        :href="withBase(card.link)" 
        class="journey-card"
      >
        <span class="card-badge">{{ card.badge }}</span>
        <h3 class="card-title">{{ card.title }}</h3>
        <p class="card-description">{{ card.description }}</p>
      </a>
    </div>

  </div>
</template>

<style scoped>
.home-showcase-container {
  max-width: 1152px;
  margin: 0 auto;
  padding: 48px 24px 80px;
}

/* Install Widget */
.install-widget {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 460px;
  margin: 0 auto 56px;
  padding: 8px 12px 8px 18px;
  background-color: var(--vp-c-bg-soft, #252529);
  border: 1px solid var(--vp-c-divider, #2e2e32);
  border-radius: 9999px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.install-code {
  display: flex;
  align-items: center;
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
}

.prompt {
  color: var(--vp-c-brand-1, #3b82f6);
  font-weight: 600;
  margin-right: 10px;
  user-select: none;
}

.install-code code {
  color: var(--vp-c-text-1, #ffffff);
  background: transparent !important;
  padding: 0 !important;
}

.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background-color: var(--vp-c-bg-mute, #1e1e20);
  border: 1px solid var(--vp-c-divider, #2e2e32);
  border-radius: 9999px;
  color: var(--vp-c-text-2, #a1a1aa);
  font-family: var(--vp-font-family-base);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.copy-btn:hover {
  background-color: var(--vp-c-brand-soft, rgba(59, 130, 246, 0.14));
  color: var(--vp-c-brand-1, #3b82f6);
  border-color: var(--vp-c-brand-1, #3b82f6);
}

.copy-icon, .check-icon {
  width: 14px;
  height: 14px;
}

.check-icon {
  stroke: #10b981;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 36px;
}

.section-title {
  font-family: var(--vp-font-family-base);
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1, #ffffff);
  margin: 0 0 10px;
  border-top: none;
  padding-top: 0;
}

.section-subtitle {
  font-size: 16px;
  color: var(--vp-c-text-2, #a1a1aa);
  max-width: 640px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Split-Screen Code Showcase */
.showcase-split {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 20px;
  align-items: stretch;
}

@media (max-width: 900px) {
  .showcase-split {
    grid-template-columns: 1fr;
  }
}

.code-window {
  display: flex;
  flex-direction: column;
  background-color: #121214;
  border: 1px solid var(--vp-c-divider, #2e2e32);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
}

.window-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background-color: #18181b;
  border-bottom: 1px solid var(--vp-c-divider, #2e2e32);
}

.window-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.dot.red { background-color: #ef4444; }
.dot.yellow { background-color: #f59e0b; }
.dot.green { background-color: #10b981; }

.window-filename {
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
  font-weight: 500;
  color: #a1a1aa;
}

.window-badge {
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
}
.window-badge.js {
  background-color: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
}
.window-badge.json {
  background-color: rgba(251, 187, 11, 0.15);
  color: #fbbb0b;
}

/* Tab Group */
.tab-group {
  display: flex;
  gap: 4px;
}

.tab-btn {
  background: transparent;
  border: 1px solid transparent;
  padding: 4px 10px;
  border-radius: 4px;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  color: #a1a1aa;
  cursor: pointer;
  transition: all 0.15s ease;
}

.tab-btn:hover {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.05);
}

.tab-btn.active {
  color: #ffffff;
  background-color: #27272a;
  border-color: #3f3f46;
  font-weight: 500;
}

.window-body {
  padding: 18px 20px;
  flex: 1;
  overflow-x: auto;
}

.window-body pre {
  margin: 0;
  padding: 0;
  background: transparent !important;
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
  line-height: 1.65;
  color: #e4e4e7;
}

/* Syntax Token Colors */
.token-kw { color: #f43f5e; font-weight: 500; }
.token-fn { color: #38bdf8; }
.token-str { color: #34d399; }
.token-comment { color: #71717a; font-style: italic; }
.token-key { color: #60a5fa; }
.token-num { color: #fbbf24; }
.token-bool { color: #c084fc; font-weight: 500; }

/* Journey Grid */
.journey-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

@media (max-width: 1024px) {
  .journey-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .journey-grid {
    grid-template-columns: 1fr;
  }
}

.journey-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 24px;
  background-color: var(--vp-c-bg-soft, #252529);
  border: 1px solid var(--vp-c-divider, #2e2e32);
  border-radius: 12px;
  text-decoration: none !important;
  transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.journey-card:hover {
  border-color: var(--vp-c-brand-1, #3b82f6);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
}

.card-badge {
  display: inline-block;
  align-self: flex-start;
  font-family: var(--vp-font-family-base);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--vp-c-brand-1, #3b82f6);
  margin-bottom: 12px;
}

.card-title {
  font-family: var(--vp-font-family-base);
  font-size: 20px;
  font-weight: 600;
  color: var(--vp-c-text-1, #ffffff);
  margin: 0 0 8px;
  border-top: none;
  padding-top: 0;
}

.card-description {
  font-size: 14px;
  color: var(--vp-c-text-2, #a1a1aa);
  margin: 0;
  line-height: 1.55;
  flex: 1;
}

.card-arrow {
  margin-top: 16px;
  font-size: 16px;
  color: var(--vp-c-brand-1, #3b82f6);
  transition: transform 0.2s ease;
}

.journey-card:hover .card-arrow {
  transform: translateX(4px);
}
</style>
