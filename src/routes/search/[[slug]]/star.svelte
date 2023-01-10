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
    <span>{stars}</span>
</div>


<style lang="scss">
    span {
        background-color: $star-col;
        padding: 0 .3rem 0 .3rem;
        margin-left: .2rem;
        border-radius: 30%;
    }
    div {
        display: flex;
        align-items: center;
    }
</style>