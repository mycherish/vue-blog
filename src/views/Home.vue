<!-- src/views/Home.vue -->
<template>
  <div class="container">
    <div>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">博客文章</div>
        </template>
        <div v-for="post in posts" :key="post.id" class="post-item">
          {{ post.title }}
        </div>
      </el-card>
    </div>
    <header class="header">
      <h1 class="site-title">My Blog</h1>
      <p class="site-description">Thoughts on design, code, and life.</p>
    </header>

    <main class="main">
      <article v-for="post in posts" :key="post.id" class="post-card">
        <time class="post-date">{{ post.date }}</time>
        <h2 class="post-title">{{ post.title }}</h2>
        <p class="post-excerpt">{{ post.excerpt }}</p>
        <a href="#" class="read-more">阅读更多 →</a>
      </article>
    </main>

    <footer class="footer">
      <p>© 2025 My Blog. Crafted with care.</p>
    </footer>
  </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'

const posts = [
  {
    id: 1,
    title: '欢迎来到我的博客',
    excerpt: '这是第一篇示例文章，分享关于前端开发的思考。',
    date: '2025-10-15',
  },
  {
    id: 2,
    title: 'Vue 3 与 Composition API',
    excerpt: '深入理解 Vue 3 的响应式系统与组合式 API。',
    date: '2025-10-10',
  },
  { id: 3, title: '苹果设计哲学的启示', excerpt: '简约不是少，而是刚刚好。', date: '2025-10-05' },
]
</script>

<style scoped>
/* 使用系统字体，符合 Apple 设计 */
:root {
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  --bg: #ffffff;
  --text: #1d1d1f;
  --text-secondary: #86868b;
  --card-bg: #ffffff;
  --border-color: #e0e0e0;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #111113;
    --text: #f5f5f7;
    --text-secondary: #aeaeb2;
    --card-bg: #1c1c1e;
    --border-color: #3a3a3c;
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
  line-height: 1.6;
}

.container {
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  padding-top: 2rem;
}

.site-title {
  font-size: 2.5rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
}

.site-description {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.main {
  flex: 1;
}

.post-card {
  padding: 1.8rem 0;
  border-bottom: 1px solid var(--border-color);
  transition: opacity 0.2s;
}

.post-card:hover {
  opacity: 0.9;
}

.post-date {
  display: block;
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 0.4rem;
}

.post-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.6rem;
  letter-spacing: -0.01em;
}

.post-excerpt {
  color: var(--text);
  margin-bottom: 1rem;
  opacity: 0.9;
}

.read-more {
  color: var(--text);
  text-decoration: none;
  font-weight: 500;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.read-more:hover {
  opacity: 1;
  text-decoration: underline;
}

.footer {
  text-align: center;
  padding-top: 2rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
}
.card-header {
  font-size: 1.1rem;
  font-weight: 600;
}
.post-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}
</style>
