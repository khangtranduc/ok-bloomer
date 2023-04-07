<script lang="ts">
    export let data;

    let flip: HTMLFormElement;

    let users = data.users
    let seller = true;
    let selected: number;
    $: buyer = !seller;
</script>

<form method="POST" action="?/flip" bind:this={flip}>
    <input class="hidden" name="uid" value={selected}/>
</form>

<main class="container">
    <selector>
        <span class:seller on:click={() => seller = !seller} on:keydown>Seller</span>
        <span class:buyer on:click={() => seller = !seller} on:keydown>Buyer</span>
    </selector>
    {#each users as user}
        {#if user.utype == 'seller' && seller}
            <article>
                <vgroup>
                    <h4>{`${user.fname} ${user.lname}`}</h4>
                    <vgroup>
                        <span>Balance: <mark>${user.balance?.toFixed(2)}</mark></span>
                        <vline/>
                        <hgroup>
                            <p>Verified</p>
                            <vgroup>
                                <iconify-icon 
                                    class:unselected={user.verified}
                                    icon="lucide:x" width=30
                                    on:keydown
                                    on:click={() => {
                                        selected = user.uid;
                                        setTimeout(() => flip.submit(), 0);
                                    }}
                                    />
                                <iconify-icon 
                                    class:unselected={!user.verified}
                                    icon="lucide:check" width=30
                                    on:keydown
                                    on:click={() => {
                                        selected = user.uid;
                                        setTimeout(() => flip.submit(), 0);
                                    }}
                                    />
                            </vgroup>
                        </hgroup>
                    </vgroup>
                </vgroup>
            </article>
        {:else if user.utype == 'buyer' && buyer}
            <article>
                <vgroup>
                    <h4>{`${user.fname} ${user.lname}`}</h4>
                    <p>Credits: <mark>{user.credit}</mark></p>
                </vgroup>
            </article>
        {/if}
    {/each}
</main>

<style lang="scss">
    .unselected {
        border: dotted;
        filter: grayscale(.8);
    }
    .hidden {
        display: none;
    }
    .seller, .buyer {
        color: $primary-500;
        border-color: $primary-500;
    }
    selector {
        display: flex;
        justify-content: space-around;
        gap: 1rem;
        width: 100%;
        margin-bottom: 1rem;
        span {
            flex: 1;
            text-align: center;
            border-bottom-style: solid;
        }
    }
    article {
        margin: .3rem;
        padding: 1rem;
    }
    hgroup, h4 {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 0;
    }
    p {
        margin-bottom: 0;
    }
    vgroup {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: .3rem;
        iconify-icon {
            border: solid;
            color: white;
            border-radius: 5px;
            transition: .3s;
            &:hover {
                transition: .3s;
                filter: grayscale(.3);
            }
            &[icon="lucide:x"] {
                background-color: rgb(255, 107, 107);
                border-color:rgb(180, 0, 0);
            }
            &[icon="lucide:check"] {
                background-color: $primary-500;
                border-color: $primary-700;
            }
        }
    }
</style>