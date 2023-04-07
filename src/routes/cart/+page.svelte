<script lang="ts">
    import { cart, discounts } from '$lib/stores';

    export let data;
    export let form;
    
    if (form?.success) {
        $cart = [];
        $discounts = [];
    }

    if (form?.discount && !$discounts.map(x => x.code).includes(form.discount.code)) {
        $discounts = [...$discounts, form.discount];
    }

    let success = form?.success ?? false;
    let discnts = data.discounts;
    let confirm = false;
    let discount = false;
    let methods = data.methods;
    $: sc = $cart.map(x => x.count).reduce((acc, res) => {return acc + res}, 0);
    $: sum = $cart.map(x => x.count * x.price).reduce((acc, res) => {return acc + res}, 0);
    $: sumDis = $discounts.map(x => x.amount).reduce((acc, res) => {return acc + res}, 0);
</script>

{#if form?.noDiscount}
    <p class="caution">Discount does not exists or has already been applied!</p>
{/if}

{#if success}
<dialog open>
    <article>
        <header>
            <a class="close" href={'#'} on:click={() => {success = false}}> </a>
            Order Success
        </header>        
        <p>Your order was succesfully placed!</p>
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
            <input type="hidden" name="discounts" value={JSON.stringify($discounts.map(x => x.code))}/>
            <label for="method">Payment Method</label>
            <select id="method" name="method" required>
                <option value="" selected>Select a payment method</option>
                {#each methods as method}
                    <option value={method}>{method}</option>
                {/each}
            </select>
            <h3>Amount Payable: ${(sum - sumDis).toFixed(2)}</h3>
            <button type="submit">Continue check out</button>
        </form>
    </article>
</dialog>
{/if}

{#if discount}
<dialog open>
    <article>
        <header>
            <a class="close" href={'#'} on:click={() => {discount = false}}> </a>
            Add a Discount
        </header>
        <form method="POST" action="?/addDiscount">
            <select name="code" required>
                <option value="" selected>Select a Discount</option>
                {#each discnts as discnt}
                    <option value={discnt.code}>{discnt.code} : ${discnt.amount}</option>
                {/each}
            </select>
            <button>
                Add
            </button>
        </form>
    </article>
</dialog>
{/if}

<main class="container">
    <vgroup>
        <hgroup>
            <h1>Cart</h1>
            <h2><i>View your order here before checkout</i></h2>
        </hgroup>
        <button on:click={() => discount = true}>
            Add Discount
        </button>
    </vgroup>
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
            {#each $discounts as discount, i}
                <tr>
                    <td>{discount.name}</td>
                    <td>{discount.code}</td>
                    <td>
                        <vgroup>
                            -${discount.amount.toFixed(2)}
                            <iconify-icon icon="lucide:trash-2" on:keydown on:click={() => {
                                $discounts = [...$discounts.slice(0, i), ...$discounts.slice(i + 1)]
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
              <th scope="col"><b>${(sum - sumDis).toFixed(2)}</b></th>
            </tr>
        </tfoot>
    </table>
    <button on:click={() => {
        if ($cart.length)
            confirm = true
        else
            alert("No products in Cart");
    }}>
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
        button {
            margin: 0;
            width: fit-content;
        }
    }
    article {
        padding-bottom: .2rem;
        > form > button {
            margin-top: .3rem;
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
    p {
        margin-bottom: 2rem;
        margin-top: 2rem;
        &.caution {
            text-align: center;
            color: red;
        }
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