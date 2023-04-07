<script lang="ts">
    export let data;

    let flip: HTMLFormElement;

    let users = data.users;
    let discounts = data.discounts;

    let seller = true;
    let buyer = false;
    let discount = false;
    let disc = false;
    let selected: number;
</script>

<form method="POST" action="?/flip" bind:this={flip}>
    <input class="hidden" name="uid" value={selected}/>
</form>

{#if disc}
<dialog open>
    <article>
        <header>
            <a class="close" href={'#'} on:click={() => {disc = false}}> </a>
            Add a Discount
        </header>
        <form method="POST" action="?/addDiscount">
            <label>
                Name
                <input placeholder="Enter Name" name="name" required/>
            </label>
            <label>
                Code
                <input placeholder="Enter Code" name="code" required/>
            </label>
            <label>
                Amount
                <input type="number" value=0 name="amount" required/>
            </label>
            <button>
                Add Discount
            </button>
        </form>
    </article>
</dialog>
{/if}

<main class="container">
    <selector>
        <span class:seller on:click={() => {discount = false; buyer = false; seller = true}} on:keydown>Seller</span>
        <span class:buyer on:click={() => {seller = false; discount = false; buyer = true}} on:keydown>Buyer</span>
        <span class:discount on:click={() => {buyer = false; seller = false; discount = true}} on:keydown>Discount</span>
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
    {#if discount}
    <table>
        <thead>
            <tr>
                <th scope="col">Discount Name</th>
                <th scope="col">Code</th>
                <th scope="col">Amount</th>
            </tr>
        </thead>
        <tbody>
            {#each discounts as discount}
            <tr>
                <td>{discount.name}</td>
                <td>{discount.code}</td>
                <td>
                    <vgroup>
                        ${discount.amount}
                        <iconify-icon icon="lucide:trash-2"/>
                    </vgroup>
                </td>
            </tr>
            {/each}
        </tbody>
        <tfoot>
            <tr>
                <td/>
                <td/>
                <td><button on:click={() => disc = true}>Add More Discounts</button></td>
            </tr>
        </tfoot>
    </table>
    {/if}
</main>

<style lang="scss">
    .unselected {
        border: dotted;
        filter: grayscale(.8);
    }
    .hidden {
        display: none;
    }
    .seller, .buyer, .discount {
        color: $primary-500;
        border-color: $primary-500;
    }
    header {
        margin-bottom: 0;
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
    main > article {
        margin: .3rem;
        padding: 1rem;
    }
    dialog > article {
        padding-bottom: .2rem;
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
            &[icon="lucide:trash-2"] {
                color: gray;
                border: none;
                transition: .3s;
                &:hover {
                    transform: scale(1.1);
                    transition: .3s;
                }
            }
        }
    }
</style>