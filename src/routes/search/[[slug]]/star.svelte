<script lang="ts">
    import { dark } from "$store";
    export let stars: number;
</script>


<div>
    {#each {length: Math.floor(stars)} as _}
        <iconify-icon icon="lucide:star"/>
    {/each}
    {#if stars > Math.floor(stars)}
        <iconify-icon icon="lucide:star-half"/>
    {/if}
    <span class:dark={$dark}>{stars}</span>
</div>


<style lang="scss">
    .dark {
        background-color: $primary-700;
    }
    span {
        background-color: $primary-300;
        padding: 0 .3rem 0 .3rem;
        margin-left: .2rem;
        border-radius: 30%;
    }
    div {
        display: flex;
        align-items: center;
    }
</style>