<script lang="ts">
    import { dark } from "./store.js";

    $: icon = $dark ? "sun" : "moon";

    const toggle = () => {
        $dark = !$dark;
        $dark
            ? document.documentElement.setAttribute("data-theme", "dark")
            : document.documentElement.setAttribute("data-theme", "light");
    }
</script>

<div on:click={toggle} on:keydown>
    <iconify-icon icon="lucide:{icon}"></iconify-icon>
</div>

<style>
    div {
        transition: .5s;
        display: flex;
        justify-content: center;
        align-items: center;
        border: solid;
        border-radius: 100%;
        width: 2rem;
        height: 2rem;
    }
</style>