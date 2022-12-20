<script lang="ts">
    import type { PageData } from './$types';
    import Star from './star.svelte';
  
    export let data: PageData;

    let items = [
        {name: "Blue Dream Cannabis", src: "/strains/blue-dream.jpg", price: 420, ratings: 4.2},
        {name: "Blue Dream Cannabis", src: "/strains/blue-dream.jpg", price: 420, ratings: 4.2},
        {name: "Blue Dream Cannabis", src: "/strains/blue-dream.jpg", price: 420, ratings: 4.2},
        {name: "Blue Dream Cannabis", src: "/strains/blue-dream.jpg", price: 420, ratings: 4.2},
        {name: "Blue Dream Cannabis", src: "/strains/blue-dream.jpg", price: 420, ratings: 4.2},
        {name: "Blue Dream Cannabis", src: "/strains/blue-dream.jpg", price: 420, ratings: 4.2},
    ]
  </script>
  
<h1>Search results for {data.slug}</h1>
<div class="grid">
    {#each items as x}
    <article>
        <img src={x.src} alt=""/>
        <h5>{x.name}</h5>
        <div>
            <span><strong>${x.price}</strong></span>
            <!-- <span>Ratings: {x.ratings}</span> -->
            <Star stars={x.ratings}/>
        </div>
    </article>
    {/each}
</div>

<style lang="scss">
    div {
        &.grid {
            padding: 0 2rem 0 2rem;
        }

        &:not(.grid){
            width: 100%;
            display: flex;
            gap: 25%;
            padding: 0.5rem 0 0.5rem 0;
            justify-content: space-around;
        }
    }
    img {
        width: 100%;
        height: 10rem;
        object-fit: cover;
        border-radius: 1% 1% 0 0;
        margin: 0 0 0.3rem 0;
    }
    article {
        display: flex;
        width: fit-content;
        flex-direction: column;
        align-items: center;
        padding: 0;
    }
    h5{
        margin: 0 0.5rem 0 0.5rem;
    }
</style>