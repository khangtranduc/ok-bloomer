<script lang="ts">  
  import "@picocss/pico/scss/pico.scss";
  import "iconify-icon";
  import Darkmode from "./darkmode.svelte";
  import { goto } from "$app/navigation";

  let query = '';
  $: url = '/search/' + query;
</script>

<nav class="container-fluid">
  <ul on:click={() => goto("/")} on:keydown>
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
      <form on:submit|preventDefault={() => goto(url)}>
        <input bind:value={query} type="search" id="search" name="search" placeholder="Search">
        <button type="submit">
          <span>Go</span>
        </button>
      </form>
    </li>
    <li><a role="button" href="/login">
      <iconify-icon icon="lucide:user"/>
      Login
    </a></li>
    <li><a role="button" href="/register">
      <iconify-icon icon="lucide:user-plus"/>
      Register
    </a></li>
    <li style="padding: 0 1rem 0 1rem;"><Darkmode/></li>
  </ul>
</nav>

<slot />

<style lang="scss">
  ul:first-child {
    transition: .3s;
    &:hover {
      transition: .3s;
      transform: scale(1.1);
    }
  }
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
