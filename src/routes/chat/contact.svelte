<script lang="ts">
    export let name: string;
    export let last: string;
    export let selected: boolean;
</script>

<hr class:selected>
<hgroup on:click on:keydown on:mouseenter>
    <h3>{name}</h3>
    {#if last != "emptyasdadbbusdbasudasbduah"}
        <h4>{last}</h4>
    {:else}
        <h4></h4>
    {/if}
</hgroup>
<hr class:selected>

<style lang="scss">
    .selected {
        border-color: $primary-500;
    }
    hgroup {
        margin: 0;
    }
</style>