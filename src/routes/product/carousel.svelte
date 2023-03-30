<script lang="ts">
    import { page } from '$app/stores';
    
    export let splashes: string[];
    
    let user = $page.data.user;
    $: isSeller = user?.utype == 'seller';

    let idx = 0;
    let fallback = '/splashes/weed-1.jpg'

</script>

<main>
    <vgroup>
        <iconify-icon icon="lucide:chevron-left" on:click={() => idx = ((idx - 1) % splashes.length + splashes.length) % splashes.length} on:keydown/>
        <zgroup class:isSeller>
            <img alt="" src={splashes[idx]}
            on:click={() => idx = (idx + 1) % splashes.length}
            {...{onerror:`this.onerror=null;this.src='${fallback}'`}} />
            <button on:click>Edit Splashes</button>
        </zgroup>
        <iconify-icon icon="lucide:chevron-right" on:click={() => idx = (idx + 1) % splashes.length} on:keydown/>
    </vgroup>
    <vgroup>
        {#each Array(splashes.length) as _, i}
            <dot class:selected={idx == i}/>
        {/each}
    </vgroup>
</main>

<style lang="scss">
    .isSeller {
        &:hover {
            img {
                transition: .3s;
                opacity: .4;
            }
            button {
                transition: .3s;
                opacity: 1;
            }
        }
    }
    zgroup {
        position: relative;
        > button {
            transition: .3s;
            opacity: 0;
            width: fit-content;
            height: fit-content;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
    .selected {
        background-color: $primary-500;
    }
    main {
        width: fit-content;
        display: flex;
        flex-direction: column;
        flex: 1;
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
        transition: .3s;
        border: solid;
        width: 50vh;
        height: 50vh;
        object-fit: cover;
    }
</style>