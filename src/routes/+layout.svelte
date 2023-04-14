<script lang="ts">  
  import "@picocss/pico/scss/pico.scss";
  import "iconify-icon";
  import Darkmode from "./darkmode.svelte";
  import { goto } from "$app/navigation";
  import { page } from '$app/stores';
  import { isOpen, query } from '$lib/stores';
  import { slide, fade } from 'svelte/transition';

  let user = $page.data.user;
  $: queryString = $query;
  $: utype = user?.utype;

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
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/thread">Threads</a></li>
    <li><a href="/blog">Blogs</a></li>
    {#if utype == 'buyer'}
      <li><a href="/saved">Saved</a></li>
    {:else if utype == 'admin'}
      <li><a href="/aspace">AdminSpace</a></li>
    {/if}
  </ul>
  <ul>
    {#if utype != 'seller' && utype != 'admin'}
    <li>
      <form action={`/search?/${!!queryString? 'search' : 'all'}`} method='POST'>
        <input bind:value={queryString} type="search" id="query" name="query" placeholder="Search">
        <button type="submit">
          <span>Go</span>
        </button>
      </form>
    </li>
    {/if}
    {#if user}
    <li><a role="button" href="/dashboard">
      <iconify-icon icon="lucide:user"/>
      <span>Profile</span>
    </a></li>
    <li><form id="logout_form" role="button" action="/logout" method="POST" on:click={() => submit_form("logout_form")} on:keydown>
      <iconify-icon icon="lucide:log-out"/>
      <span>Logout</span>
    </form></li>
    <li>
      <button on:click={() => goto('/chat')}>
        <iconify-icon class="fab" icon="lucide:message-circle"/>
      </button>
    </li>
    {#if utype == 'buyer'}
    <li>
      <button on:click={() => goto('/cart')}>
        <iconify-icon class="fab" icon="lucide:shopping-cart"/>
      </button>
    </li>
    {/if}
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
    <iconify-icon role="button" icon="lucide:menu" on:click={() => $isOpen = !$isOpen} on:keydown/>
  </ul>
</nav>

<slot />

{#if $isOpen}
<aside in:slide="{{ duration: 200 }}" out:slide="{{ duration: 200 }}">
  <nav>
      <ol>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/thread">Thread</a></li>
          <li><a href="/blog">Blog</a></li>
          {#if utype == 'buyer'}
          <li><a href="/saved">Saved</a></li>
          {:else if utype == 'admin'}
          <li><a href="/aspace">Admin Space</a></li>
          {/if}
          <hr>
          <li>
              <form action={`/search?/${!!queryString? 'search' : 'all'}`} method='POST'>
                  <input bind:value={queryString} type="search" id="query" name="query" placeholder="Search">
              </form>
          </li>
      </ol>
  </nav>
</aside>
<gray transition:fade="{{ duration: 200 }}"/>
{/if}

<style lang="scss">
  a[href='/aspace'] {
    color: red;
    font-weight: bold;
  }

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
          iconify-icon:not(.fab) {
            @include media(lg, md){
              display: none
            }
          }
        }

        > button {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 100%;
          width: 2.5rem;
          height: 2.5rem;
        }
      }
      
    }
  }

  gray {
      position: absolute;
      width: 100%;
      height: 90%;
      top: 10%;
      background-color: gray;
      filter: opacity(.4);
  }

  aside {
      position: absolute;
      top: 8%;
      width: 100%;
      background-color:white;
      padding-top: 1rem;
      padding-bottom: 1rem;
      margin: 0;
      z-index: 1;
      li {
          padding: 0;
          >form {
                padding: 0;
                margin: 0;
                margin-top: .3rem;
                display: flex;
                justify-content: center;
                input {
                    margin: 0;
                    width: 80%;
                }
          }
          a {
              text-align: center;
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
