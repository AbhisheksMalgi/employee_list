<template>
  <div>
    <nav-bar />
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
export default {
  components: { NavBar },
  name: 'App'
}
</script>
<style></style>
