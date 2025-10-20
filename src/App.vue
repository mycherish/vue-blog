<!-- src/App.vue -->
<template>
  <div id="app">
    <!-- 导航栏 -->
    <nav class="global-nav">
      <router-link to="/" class="nav-link">首页</router-link>
      <router-link to="/about" class="nav-link">关于</router-link>
    </nav>

    <!-- 主要内容 -->
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
// 全局逻辑
</script>

<style>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.6;
}

.global-nav {
  background: #f8f9fa;
  padding: 1rem 2rem;
  border-bottom: 1px solid #e9ecef;
}

.nav-link {
  margin-right: 1rem;
  text-decoration: none;
  color: #495057;
}

.nav-link.router-link-active {
  color: #007bff;
  font-weight: 500;
}
</style>
