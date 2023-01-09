<script lang="ts">
    import { dark } from "$store";
    import { goto } from "$app/navigation";

    $: gray = $dark;

    const images = [
        "/splashes/snoop-dogg-puffing.jpg",
        "/splashes/person-smoking-marijuana-pipe.jpg"
    ];

    let curr = 0;

    setInterval(() => curr = (curr + 1) % images.length, 3000)
</script>

<img class:gray src={images[curr]} alt=""/>

<div class="title">
    <h1 class:gray-txt={gray} class="gradient">James Bong</h1>
    <p>Your one stop shop for everything <span class:gray-txt={gray} class="gradient">weed</span></p>
    <button on:click={() => goto('/search')}>
        <span>Explore our catalogs</span>
        <iconify-icon icon="lucide:arrow-right" width="25"/>
    </button>
</div>

<style lang="scss">
    img {
        width: 100%;
        height: 89vh;
        object-fit: cover;
        filter: blur(5px);
        @include media(sm, md) {
            height: 92vh;
        }
    }

    .gray {
        filter: blur(5px) grayscale(100%);
    }

    .gray-txt {
        filter: grayscale(100%);
    }

    .title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    div {
        h1 {
            @include text($size: 5rem, $stroke: 0.1rem, $stroke-color: white);
            margin-bottom: 1%;
            @include media(sm){
                font-size: 3rem;
                width: 90vw;
            }
        }

        p {
            @include text($color: white, $size: 1.2rem, $weight: bold, $stroke: 0.03rem, $stroke-color: white);
        }
    } 
    
    .gradient {
        @include gradient()
    }

    .border {
        border: solid;
    }

    button {
        display: flex;
        align-items: center;
        background: linear-gradient(to right, $primary-500, $primary-700);
        justify-content: center;
        gap: 3%;
        border: none;
        transition: .3s;
        &:hover {
            transition: .3s;
            transform: scale(1.1);
            background: linear-gradient(to right, #878787, #6e6e6e);
        }
    }
</style>