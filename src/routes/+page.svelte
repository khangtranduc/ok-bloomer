<script lang="ts">
    import { goto } from "$app/navigation";

    let curr = 0;
    setInterval(() => curr = (curr + 1) % 6, 3000)
</script>

<img src="splashes/weed-{curr + 1}.jpg" alt=""/> 

<div class="title">
    <h1 class="gradient">OK, Bloomer!</h1>
    <p>Your one stop shop for everything <span class="gradient">botany</span></p>
    <form action="/search?/all" method="POST">
        <button type="submit">
            <span>Explore our catalogs</span>
            <iconify-icon icon="lucide:arrow-right" width="25"/>
        </button>
    </form>
</div>

<style lang="scss">
    img {
        width: 100%;
        height: 89vh;
        object-fit: cover;
        filter: $filter-img;
        @include media(lg, md) {
            height: 92vh;
        }
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
            @include media(md){
                font-size: 3rem;
                width: 90vw;
            }
        }

        p {
            @include text($color: white, $size: 1.2rem, $weight: bold, $stroke: 0.03rem, $stroke-color: white);
        }
    } 
    
    .gradient {
        @include gradient();
        filter: $filter-text;
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