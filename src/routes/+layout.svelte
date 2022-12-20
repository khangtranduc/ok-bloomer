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
    <li><a href="/contact">Contact</a></li>
  </ul>
  <ul>
    <li>
      <form>
        <input type="search" id="search" name="search" placeholder="Search">
        <button>
          <span class="gradient">Go</span>
        </button>
      </form>
    </li>
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
  form {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    margin: 0;
    button {
      display: flex;
      justify-items: center;
      align-items: center;
      transform: translate(-3.5rem);
      width: min-content;
      font-size: 0.7rem;
      border-radius: 9999px;
    }
  }
</style>
