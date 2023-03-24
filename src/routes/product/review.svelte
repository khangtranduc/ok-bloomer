<script lang="ts">
    import type { Review } from '$lib/types';
    import Star from '../search/star.svelte';
    export let review: Review;
</script>

<article>
    <hgroup>
        <h3>{review.title}</h3>
        <h4>by @{review.username}</h4>
    </hgroup>
    <Star stars={+review.rating.toFixed(2)}/>
    <p>{review.text}</p>
</article>

<style lang="scss">
    article {
        margin: 0;
        padding: 1rem;
    }
    p {
        margin-bottom: 0;
        &:last-child {
            margin-top: .5rem;
        }
    }
    hgroup {
        margin-bottom: .3rem;
    }
</style>