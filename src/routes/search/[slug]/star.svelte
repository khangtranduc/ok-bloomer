<script lang="ts">
    export let stars: number;
</script>


<div>
    {#each {length: Math.floor(stars)} as _}
        <iconify-icon icon="lucide:star"/>
    {/each}
    {#if stars > Math.floor(stars)}
        <iconify-icon icon="lucide:star-half"/>
    {/if}
</div>


<style lang="scss">
    div {
        display: flex;
        align-items: center;
    }
</style>