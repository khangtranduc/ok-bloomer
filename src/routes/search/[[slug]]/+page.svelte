<script lang="ts">
    import type { PageData } from './$types';
    import {dark} from '$store';
    import Star from './star.svelte';
  
    export let data: PageData;

    let items = [
        {name: "Blue Dream Cannabis", src: "/strains/blue-dream.jpg", price: 420, ratings: 4.2},
        {name: "Blue Dream Cannabis", src: "/strains/blue-dream.jpg", price: 420, ratings: 4.2},
        {name: "Blue Dream Cannabis", src: "/strains/blue-dream.jpg", price: 420, ratings: 4.2},
        {name: "Blue Dream Cannabis", src: "/strains/blue-dream.jpg", price: 420, ratings: 4.2},
        {name: "Blue Dream Cannabis", src: "/strains/blue-dream.jpg", price: 420, ratings: 4.2},
        {name: "Blue Dream Cannabis", src: "/strains/blue-dream.jpg", price: 420, ratings: 4.2},
        {name: "Blue Dream Cannabis", src: "/strains/blue-dream.jpg", price: 420, ratings: 4.2},
        {name: "Blue Dream Cannabis", src: "/strains/blue-dream.jpg", price: 420, ratings: 4.2},
        {name: "Blue Dream Cannabis", src: "/strains/blue-dream.jpg", price: 420, ratings: 4.2},
        {name: "Blue Dream Cannabis", src: "/strains/blue-dream.jpg", price: 420, ratings: 4.2},
        {name: "Blue Dream Cannabis", src: "/strains/blue-dream.jpg", price: 420, ratings: 4.2},
        {name: "Blue Dream Cannabis", src: "/strains/blue-dream.jpg", price: 420, ratings: 4.2},
    ]
</script>
  
<div class="container-fluid">
    {#if data.slug === undefined}
    <h1>Our Products</h1>
    {:else}
    <h1>Search results for {data.slug}</h1>
    {/if}
    <div class="flex">
        {#each items as x}
        <article class:dark-card={$dark}>
            <img alt="" src={x.src}/>
            <div class="container">
                <h4>{x.name}</h4>
                <Star stars={x.ratings}/>
                <h4 class="gradient">${x.price}</h4>
            </div>
        </article>
        {/each}
    </div>
</div>

<style lang="scss">
    .flex {
        display: flex;
        width: 100vw;
        flex-flow: row wrap;
        justify-content: start;
        gap: .3rem;
        row-gap: .8rem;
        @include media(sm) {
            align-items: center;
        }
    }
    .container {
        padding: .5rem;
    }
    .gradient {
        @include gradient()   
    }
    h4 {
        margin-bottom: .3rem;
        &:not(.gradient){
            text-align: center;
        }
    }
    article {
        margin: 0;
        width: calc(100vw/6 - .6rem);
        padding: 0;
        transition: .3s;
        @include media(sm) {
            width: 92vw;
        }
        @include media(md) {
            width: calc(100vw/3 - .8rem);
        }
        &:hover {
            transform: scale(1.1);
            transition: .3s;
            margin-right: .8rem;
            margin-left: .8rem;
            box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2)
        }
    }
    img {
        width:100%;
        height: 20vh;
        object-fit: cover;
        border-radius: 5px 5px 0 0;
    }
</style>