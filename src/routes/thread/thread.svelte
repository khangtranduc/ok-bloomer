<script lang="ts">
    import { goto } from "$app/navigation";

    export let thread_id: number;
    export let title: string;
    export let timeStamp: number;
    export let resolved: boolean;
    export let labels: string[];
    $: date = new Date(timeStamp);
    $: url = '/threadp/' + thread_id;
</script>

<article class:resolved={resolved} on:click={() => goto(url)} on:keydown>
    <hgroup>
        <h3>{title}</h3>
        <h3>{date.toDateString()}</h3>
    </hgroup>
    <vgroup>
        {#each labels as label}
            <span> {label} </span>
        {/each}
    </vgroup>
</article>

<style lang="scss">
    .resolved{
        border: solid;
        border-color: $primary-300;
    }
    hgroup {
        margin-bottom: .3rem;
    }
    vgroup {
        display: flex;
        gap: .3rem;
        margin-bottom: .3rem;
        > span {
            border-radius: 5px;
            padding: .1rem;
            background-color: $star-col;
        }
    }
    article {
        margin-top: .3rem;
        margin-bottom: .3rem;
        padding-top: .3rem;
        padding-bottom: .3rem;
        transition: .3s;
        width: 100%;

        &:hover {
            transform: scale(1.01);
            transition: .3s;
        }
    }
</style>