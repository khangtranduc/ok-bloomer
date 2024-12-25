<script lang="ts">
    export let stars: number;
</script>


<div>
    <mark>{stars}</mark>
    {#each {length: Math.floor(stars)} as _}
        <iconify-icon icon="lucide:star"/>
    {/each}
    {#if stars > Math.floor(stars)}
        <iconify-icon icon="lucide:star-half"/>
    {/if}
</div>


<style lang="scss">
    mark {
        background-color: greenyellow;
        border-radius: 5px;
        margin-right: .3rem;
    }
    div {
        display: flex;
        align-items: center;
    }
</style>