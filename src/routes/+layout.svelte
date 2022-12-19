<script lang="ts">
    import "@picocss/pico/css/pico.min.css";
    import '../app.css';
    import "iconify-icon";
    import Darkmode from "./darkmode.svelte";
</script>

<nav class="container-fluid">
    <ul>
        <li><strong>James Bong</strong></li>
    </ul>    
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact" role="button">Contact</a></li>
        <li style="padding: 0 1rem 0 1rem;"><Darkmode/></li>
    </ul>
</nav>

<slot/>

<style>
    .profile {
        width: 2rem;
        height: 2rem;
        border-radius: 100%;
    }
</style>