<script lang="ts">
    import { onMount } from "svelte";
    let doc: HTMLElement;

    onMount(() => {
        doc = document.documentElement;
    });

    let icon = "moon";

    const toggle = () => {
        if (doc.getAttribute("data-theme") === "dark") {
            doc.setAttribute("data-theme", "light");
            icon = "moon";
        }
        else {
            doc.setAttribute("data-theme", "dark");
            icon = "sun";
        }
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