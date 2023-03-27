<script lang="ts">
    export let data;

    let products = data.products;
    let idx = 0;

    const submitDelete = () => {
        const form = <HTMLFormElement> document.getElementById('remove');
        form?.submit();
    }
</script>

<form style="display:none" id="remove" action="?/remove" method="POST">
    <input name="product_id" value={products[idx].product_id}/>
</form>

<main class="container">
    <hgroup>
        <h1>Cart</h1>
        <h2><i>View your saved products here</i></h2>
    </hgroup>
    <table role="grid">
        <thead>
            <tr>
              <th scope="col">Item Name</th>
              <th scope="col">Seller</th>
            </tr>
        </thead>
        <tbody>
            {#each products as item, i}
                <tr on:mouseenter={() => idx = i}>
                    <td><a href="/product?pid={item.product_id}">{item.name}</a></td>
                    <td>
                        {item.sname}
                        <iconify-icon icon="lucide:trash-2" on:click={submitDelete} on:keydown/>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</main>

<style lang="scss">
    td {
        &:last-child {
            display: flex;
            justify-content: space-between;
            iconify-icon {
                transition: .3s;
                &:hover {
                    transform: scale(1.1);
                    transition: .3s;
                }
            }
        }
    }
</style>