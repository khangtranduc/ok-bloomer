<script lang="ts">
    export let categories: Map<string, number>;
    export let min: number;
    export let max: number;

    let range: HTMLInputElement;
    let cock: number = (min + max)/2;

    let reviewRating = 0;
    let root = 0;
    let posX = 0;

    const setRoot = (event: MouseEvent) => {
        root = event.clientX;
    }
    const setPos = (event: MouseEvent) => {
        posX = event.clientX;
    }
    $: relPosX = posX - root;
    $: isHalf = relPosX < 0 ? relPosX + 30 < 15 : relPosX < 15;
    $: rating = reviewRating >= 0 ? reviewRating + (isHalf ? 0.5 : 1) : 0;
</script>

<form>
    <h2><u>Filters</u></h2>
    <details>
        <summary>Category</summary>
        {#each [...categories.keys()] as cat}
        <vgroup>
            <label>
                <input type="checkbox" name={cat.toLowerCase()}>
                {cat}
            </label>
            <mark>{categories.get(cat)}</mark>
        </vgroup>
        {/each}
    </details>
    <label>
        Price: <mark>${cock?.toFixed(2)}</mark>
        <vgroup>
            <span><i>${Math.floor(min)}</i></span>
            <span><i>${Math.ceil(max)}</i></span>
        </vgroup>
        <input 
                type="range" 
                bind:this={range} 
                min={min} max={max} 
                value={(min + max)/2} 
                name="price"
                on:input={() => cock = +range.value}>
        <hr>
    </label>
    <label>
        Rating
        <input type="hidden" name="rating" value={rating}/>
    </label>
    <stargroup>
        {#each Array(5) as _, i}
        <star>
            <iconify-icon   on:mouseenter={setRoot}
                            on:mousemove={setPos} 
                            on:mouseenter={() => reviewRating = i}
                            on:keydown
                            icon={`lucide:${isHalf && i == reviewRating ? "star-half" : "star"}`}
                            width=30 
                            mode="mask"
                            class:selected={i <= reviewRating}/>
            <iconify-icon icon="lucide:star" width=30/>
        </star>
        {/each}
        <mark>{rating.toFixed(1)}</mark>
    </stargroup>
    <hr>
    <label>
        <input type="checkbox"/>
        In Stock
    </label>
</form>

<style lang="scss">
    h2 {
        margin-bottom: .5rem;
    }
    form {
        margin-right: 3rem;
        width: 15%;
    }
    .selected {
        color: $primary-500;
    }
    stargroup {
        display: flex;
        margin-bottom: .5rem;
        align-items: center;
        gap: .3rem;
        star {
            display: flex;
            align-items: center;
            position: relative;
            iconify-icon {
                &:first-child {
                    position: absolute;
                    left: 0;
                    top: 0;
                }
            }
        }
    }
    vgroup {
        display: flex;
        justify-content: space-between;
        margin-bottom: .1rem;
    }
    mark {
        background-color: greenyellow;
        border-radius: 5px;
        margin-right: .3rem;
    }
</style>