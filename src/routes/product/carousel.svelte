<script lang="ts">
    export let splashes: string[];
    let idx = 0;
    let fallback = '/splashes/weed-1.jpg'
</script>

<main>
    <vgroup>
        <iconify-icon icon="lucide:chevron-left" on:click={() => idx = ((idx - 1) % splashes.length + splashes.length) % splashes.length} on:keydown/>
        <img alt="" src={splashes[idx]} 
        on:click={() => idx = (idx + 1) % splashes.length}
        {...{onerror:`this.onerror=null;this.src='${fallback}'`}} />
        <iconify-icon icon="lucide:chevron-right" on:click={() => idx = (idx + 1) % splashes.length} on:keydown/>
    </vgroup>
    <vgroup>
        {#each Array(splashes.length) as _, i}
            <dot class:selected={idx == i}/>
        {/each}
    </vgroup>
</main>

<style lang="scss">
    .selected {
        background-color: $primary-500;
    }
    main {
        width: fit-content;
        display: flex;
        flex-direction: column;
    }
    dot {
        background-color: $primary-300;
        width: 1rem;
        height: 1rem;
        border-radius: 100%;   
    }
    iconify-icon {
        transition: .3s;
        border: solid;
        &[icon="lucide:chevron-right"] {
            &:hover {
                transform: translateX(.3rem);
                transition: .3s;
            }
        }
        &[icon="lucide:chevron-left"] {
            &:hover {
                transform: translateX(-.3rem);
                transition: .3s;
            }
        }
    }
    vgroup {
        display: flex;
        gap: .3rem;
        justify-content: center;
        margin-top: .3rem;
        align-items: center;
    }
    img {
        border: solid;
        width: 50vh;
        height: 50vh;
        object-fit: cover;
    }
</style>