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

<style>
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

    div h1 {
        text-align: center;
        margin-bottom: 1%;
        font-size: 5rem;
        -webkit-text-stroke: 0.1rem;
        -webkit-text-stroke-color: white;
    }
    
    .gradient {
        background: linear-gradient(0.25turn, var(--primary), var(--primary-hover));
        background-clip: text;
        color: transparent;
    }

    .border {
        border: solid;
    }

    button {
        display: flex;
        align-items: center;
        background: linear-gradient(0.25turn, var(--primary), var(--primary-hover));
        justify-content: center;
        gap: 3%;
    }

    button:hover {
        display: flex;
        align-items: center;
        filter: contrast(70%);
        justify-content: center;
        gap: 3%;   
    }

    div p {
        text-align: center;
        color: white; 
        font-weight: bold;
        font-size: 1.2rem;
        -webkit-text-stroke: 0.03rem;
        -webkit-text-stroke-color: white;
    }


</style>