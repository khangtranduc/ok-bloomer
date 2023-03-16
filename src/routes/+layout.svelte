<script lang="ts">  
  import "@picocss/pico/scss/pico.scss";
  import "iconify-icon";
  import Darkmode from "./darkmode.svelte";
  import { goto } from "$app/navigation";
  import { page } from '$app/stores';

  let user = $page.data.user;

  let query = '';
  $: url = '/search/' + query;

  let isOpen = false;

  function submit_form(name: string){
    let form = <HTMLFormElement>document.getElementById(name)
    if (form) form.submit();
  }
</script>

<nav class="container-fluid">
  <ul on:click={() => goto("/")} on:keydown>
    <li><img src="/logo.jpg" alt="" class="logo"/></li>
    <li><strong>OK, Bloomer</strong></li>
  </ul>
  <ul class:isOpen>
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
    {#if user}
    <li><a role="button" href="/dashboard">
      <iconify-icon icon="lucide:user"/>
      <span>Profile</span>
    </a></li>
    <li><form id="logout_form" role="button" action="/logout" method="POST" on:click={() => submit_form("logout_form")} on:keydown>
      <iconify-icon icon="lucide:log-out"/>
      <span>Logout</span>
    </form></li>
    {:else}
    <li><a role="button" href="/login">
      <iconify-icon icon="lucide:user"/>
      <span>Login</span>
    </a></li>
    <li><a role="button" href="/register">
      <iconify-icon icon="lucide:user-plus"/>
      <span>Register</span>
    </a></li>
    {/if}
    <li style="padding: 0 1rem 0 1rem;"><Darkmode/></li>
  </ul>
  <ul>
    <iconify-icon role="button" icon="lucide:menu" on:click={() => isOpen = !isOpen} on:keydown/>
  </ul>
</nav>

<div class:isOpen>
  <form on:submit|preventDefault={() => goto(url)}>
    <input bind:value={query} type="search" id="search" name="search" placeholder="Search">
  </form>
  <a role="button" href="/">Home</a>
  <a role="button" href="/about">About</a>
  <a role="button" href="/contact">Contact</a>
</div>

<slot />

<style lang="scss">
  ul {
    &:first-child {
      transition: .3s;
      &:hover {
        transition: .3s;
        transform: scale(1.1);
      }
      li:last-child {
        padding: 0;
        // border: solid;
        @include media(lg, md) {
          display: none;
        }
      }
    }
    
    &:nth-child(2){
      @include media(lg, md){
        display: none;
      }
    }

    &:last-child{
      display: none;
      @include media(lg, md){
        display: grid;
        margin-right: .3rem;
      }
    }

    &:nth-child(3) {
      li {
        &:first-child {
          @include media(lg, md){
            display: none;
          }
        }

        &:nth-child(2), :last-child{
          iconify-icon {
            @include media(lg, md){
              display: none
            }
          }
        }
      }
      
    }
  }

  div {
    display: none;
    margin: 0 .2rem 0 .2rem;
    a {
      display: block;
      width: 100%;
      padding: 0;
      margin: 0 .2rem 0 .2rem;
    }
    form {
      width: 100%;
      input {
        margin: 0;
      }
    }
  }

  .isOpen {
    @include media(lg, md){
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      padding: .3rem;
    }
  }

  .logo {
    max-width: 2rem;
    height: 2rem;
    border-radius: 100%;
    object-fit: cover;
    border: solid;
  }
  form {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    margin: 0;
    button:not(.null) {
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
