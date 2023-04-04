<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import type { Product, User } from "$lib/types";
    import Star from "../search/star.svelte";
    
    export let data;

    let user = <User> $page.data.user;
    let products = <Product[]> data.products;

    let fallback = '/thumbs/dogtail.png';

    let infoChange: HTMLFormElement;

    $: utype = user?.utype;

    let labels = [
        ['Email', user.email, "email"], 
        ['Username', user.username, "username"], 
        ['First Name', user.fname, "fname"], 
        ['Last Name', user.lname, "lname"]];

    let edit = [
        false,
        false,
        false,
        false
    ]

</script>

<main class="container">
    <hgroup>
        <h1>
            <u>Welcome {user.fname + " " + user.lname}</u>
            {#if user.verified}<iconify-icon icon="lucide:verified"/>{/if}
        </h1>
        <h4><mark><i>You are a {user.utype}</i></mark></h4>
    </hgroup>

    {#if user.utype == "buyer"}<h3>Credits: {user.credit ?? 0}</h3>{/if}
    {#if user.utype == "seller"}<h3>Balance: <ins>${(user.balance ?? 0).toFixed(2)}</ins></h3>{/if}
    
    <hr>

    <hgroup>
        <h2><u>Personal Information</u></h2>
        <table role="grid">
        <tbody>
            {#each labels as info, i}
                <tr>
                <th scope="row">{info[0]}</th>
                <td>
                    {#if edit[i]}
                        <form method="POST" action="?/updateInfo" bind:this={infoChange}>
                            <input type="hidden" name="field" id="field" value={info[2]}/>
                            <input name="value" id="value" value={info[1]}/>
                        </form>
                    {:else}
                        {info[1]}
                    {/if}
                    <iconify-icon icon="lucide:pencil" on:click={()=>{
                        if (!edit[i]) edit[i] = true;
                        else {
                            edit[i] = false;
                            infoChange.submit();
                        }
                    }} on:keydown/>
                </td>
                </tr>
            {/each}
        </tbody>
        </table>
    </hgroup>

    {#if utype == 'seller'}
    <hgroup>
        <h2><u>Your Products</u></h2>
        <catalog class="flex">
            {#each products as product}
            <article on:click={() => goto(`/product/?pid=${product.product_id}`)} on:keydown>
                <img alt="" src={product.thumbnail} {...{onerror: `this.onerror=null;this.src='${fallback}'`}}/>
                <h4>{product.name}</h4>
                <vgroup>
                    <div>
                        <Star stars={+product.rating.toFixed(2)}/>
                        <mark>{product.category}</mark>
                    </div>
                    <div>
                        Stocks: {product.stock}
                        <h5 class="gradient">${product.price.toFixed(2)}</h5>
                    </div>
                </vgroup>
            </article>
            {/each}
        </catalog>
    </hgroup>
    {/if}
</main>

<style lang="scss">
    h3 {
        border: solid;
        margin-bottom: 1rem;
    }

    td {
        display: flex;
        justify-content: space-between;
        align-items: center;
        iconify-icon {
            transition: .3s;
            &:hover {
                transform: scale(1.1);
                transition: .3s;
            }
        }
    }

    form {
        margin: 0;
        height: 1rem;
        input {
            height: 100%;
            margin: 0;
        }
    }
    .flex {
        display: flex;
        width: 100%;
        flex-flow: row wrap;
        justify-content: start;
        gap: .3rem;
        row-gap: .8rem;
        
        @include media(md) {
            align-items: center;
        }
    }
    .gradient {
        @include gradient()
    }
    article {
        > h4 {
            width: 100%;
            text-align: center;
            margin-bottom: .3rem;
        }
    }
    h5 {
        margin-bottom: 0;
        text-align: end;
    }
    vgroup {
        width: 100%;
        display: flex;
        margin-bottom: .5rem;
        justify-content: space-between;
        padding-right: .5rem;
        padding-left: .5rem;
    }
    article {
        background-color: $card-bg;
        margin: 0;
        width: calc(100%/4 - .7rem);
        padding: 0;
        transition: .3s;
        
        @include media(lg) {
            width: calc(100%/3 - .8rem);
        }

        @include media(md) {
            width: 92vw;
        }
        
        &:hover {
            transform: scale(1.1);
            transition: .3s;
            margin-right: .8rem;
            margin-left: .8rem;
            box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2)
        }
    }
    img {
        width:100%;
        height: 20vh;
        object-fit: cover;
        border-radius: 5px 5px 0 0;
    }
</style>