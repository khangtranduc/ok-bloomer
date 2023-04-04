<script lang="ts">
    import { cart } from '$lib/stores';

    export let data;
    export let form;
    
    if (form?.success) {
        $cart = [];
    }

    let success = form?.success ?? false;
    let confirm = false;
    let methods = data.methods;
    let sum = 0;
    let sc = 0
    $cart.forEach(x => {sum += x.count * x.price; sc += x.count});
</script>

{#if success}
<dialog open>
    <article>
        <header>
            <a class="close" href={'#'} on:click={() => {success = false}}> </a>
            Order Success
        </header>        
        Your order was succesfully placed!
    </article>
</dialog>
{/if}

{#if confirm}
<dialog open>
    <article>
        <header>
            <a class="close" href={'#'} on:click={() => {confirm = false}}> </a>
            Confirm order
        </header>
        <form action="?/order" method="POST">
            <input type="hidden" name="cart" value={JSON.stringify($cart.map(x => ({
                    product_id: x.product_id, 
                    count: x.count,
                    price: x.price,
                    suid: x.suid
                }
            )))}/>
            <label for="method">Payment Method</label>
            <select id="method" name="method" required>
                <option value="" selected>Select a payment method</option>
                {#each methods as method}
                    <option value={method}>{method}</option>
                {/each}
            </select>
            <h3>Amount Payable: ${sum.toFixed(2)}</h3>
            <button type="submit">Continue check out</button>
        </form>
    </article>
</dialog>
{/if}


<main class="container">
    <hgroup>
        <h1>Cart</h1>
        <h2><i>View your order here before checkout</i></h2>
    </hgroup>
    <table role="grid">
        <thead>
            <tr>
              <th scope="col">Item Name</th>
              <th scope="col">Count</th>
              <th scope="col">Price</th>
            </tr>
        </thead>
        <tbody>
            {#each $cart as item, i}
                <tr>
                    <td><a href={`/product?pid=${item.product_id}`}>{item.name}</a></td>
                    <td>{item.count}</td>
                    <td>
                        <vgroup>
                            ${(item.count * item.price).toFixed(2)}
                            <iconify-icon icon="lucide:trash-2" on:keydown on:click = {() => {
                                $cart = [...$cart.slice(0, i), ...$cart.slice(i + 1)]
                            }}/>
                        </vgroup>
                    </td>
                </tr>
            {/each}
        </tbody>
        <tfoot>
            <tr>
              <th scope="col"><b>Order Summary:</b></th>
              <th scope="col"><b>{sc}</b></th>
              <th scope="col"><b>${sum.toFixed(2)}</b></th>
            </tr>
        </tfoot>
    </table>
    <button on:click={() => confirm = true}>
        Checkout Order
    </button>
</main>

<style lang="scss">
    vgroup {
        display: flex;
        justify-content: space-between;
        align-items: center;
        iconify-icon {
            transition: .3s;
            &:hover {
                transition: .3s;
                transform: scale(1.1);
            }
        }
    }
    header {
        margin-bottom: .3rem;
    }
    vgroup {
        display: flex;
        justify-content: space-between;
        padding-right: .3rem;
        padding-left: .3rem;
    }
    button {
        margin-top: 2rem;
    }
    hr {
        border-color: black;
    }
    h6 {
        margin: 0;
    }
</style>