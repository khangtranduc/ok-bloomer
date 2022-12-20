<script lang="ts">
    import { dark } from "./store.js";

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
    <button class:gray-txt={gray}>
        <span>Explore our catalogs</span>
        <iconify-icon icon="lucide:arrow-right" width="25"/>
    </button>
</div>

<style lang="scss">
    img {
        width: 100vw;
        height: 100vh;
        object-fit: cover;
        filter: blur(5px);
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
        }
        
        p {
            @include text($color: white, $size: 1.2rem, $weight: bold, $stroke: 0.03rem, $stroke-color: white);
        }
    } 
    
    .gradient {
        background: linear-gradient(to right, $primary-500, $primary-700);
        background-clip: text;
        color: transparent;
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
        &:hover {
            background: linear-gradient(to right, #878787, #6e6e6e);
        }
    }
</style>