<script lang="ts">  
  import "@picocss/pico/scss/pico.scss";
  import "iconify-icon";
  import Darkmode from "./darkmode.svelte";
</script>

<nav class="container-fluid">
  <ul>
    <li><img src="/logo.jpg" alt="" class="logo"/></li>
    <li><strong>James Bong</strong></li>
  </ul>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact" role="button">Contact</a></li>
    <li style="padding: 0 1rem 0 1rem;"><Darkmode/></li>
  </ul>
</nav>

<slot />

<style lang="scss">
  .logo {
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
    object-fit: cover;
  }
</style>
