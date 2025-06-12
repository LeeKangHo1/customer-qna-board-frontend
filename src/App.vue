<template>
  <div id="app">
    <NavBar />
    <main class="container">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import NavBar from './components/layout/NavBar.vue'
</script>

<style scoped lang="scss">
#app {
  font-family: 'Pretendard', sans-serif;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}
</style>
