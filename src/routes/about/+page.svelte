<main class="grid">
    <img src="/splashes/weed-2.jpg" alt=""/>
    
    <div>
        <hgroup>
            <h1>About Us</h1>
            <p>
                We pride ourselves to be the best one stop shop for everything weed related. 
                From marijunaa strains to smoking equipment, we've got it all!
            </p>
        </hgroup>
    </div>
</main>

<style lang="scss">
    img {
        height: 89vh;
        @include media(lg, md) {
            height: 50vh;
        }
        object-fit: cover;
        object-position: 50% 20%;
    }
    div {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
    }
</style>