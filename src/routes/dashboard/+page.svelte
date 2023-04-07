<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import type { Discount, Product, User } from "$lib/types";
    import { each } from "svelte/internal";
    import Star from "../search/star.svelte";
    
    export let data;

    let user = <User> $page.data.user;
    let products = <Product[]> data.products;
    let categories = <string[]> data.categories;

    let fallback = '/thumbs/dogtail.png';

    let infoChange: HTMLFormElement;
    let deleteProduct: HTMLFormElement;
    let files: FileList;
    let add = false;
    let imagePath: string;
    let image: string;
    let index: number;

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

    $: if (files) {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = e => {
            image = (<string> e.target?.result).split(',')[1];
            imagePath = (<string> e.target?.result);
        };
    }
</script>

{#if add}
<dialog open>
    <article>
        <header>
            <a class="close" href={'#'} on:click={() => {add = false}}> </a>
            Add a product
        </header>
        <form action="?/addProduct" method="POST">
            <input type="hidden" name="suid" value={user.uid}/>
            <input type="hidden" name="thumbnail" value={image}/>
            <label for="category">Category</label>
            <select name="category" required>
                <option selected>Select a category</option>
                {#each categories as cat}
                <option>{cat}</option>
                {/each}
            </select>
            <label for="title">
                Title
                <input name="title"/>
            </label>
            {#if imagePath}
                <img src={imagePath} alt=""/>
            {/if}
            <input type="file" name="filename" bind:files/>
            <button type="submit">Add</button>
        </form>
    </article>
</dialog>
{/if}

<form class="hidden" action="?/deleteProduct" method="POST" bind:this={deleteProduct}>
    <input name="product_id" value={products[index]?.product_id}/>
    <input name="filename" value={products[index]?.thumbnail}/>
</form>

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
        <h2>
            <u>Your Products</u>
            {#if user.verified}
            <button on:click={() => add = true}>
                Add More Products
            </button>
            {/if}
        </h2>
        <catalog>
            {#each products as product, i}
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
                <iconify-icon icon="lucide:trash-2" 
                    on:mouseenter={() => index = i}
                    on:click={() => deleteProduct.submit()} on:keydown/>
            </article>
            {/each}
        </catalog>
    </hgroup>
    {/if}
    <hr>
    <form method="POST" action="?/deleteAcc">
        <button>
            <iconify-icon icon="lucide:trash-2"/>
            Delete Account 💀
        </button>
    </form>
</main>

<style lang="scss">
    .gradient {
        @include gradient()
    }
    .hidden {
        display: none;
    }
    main {
        > form > button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: .3rem;
            background-color: rgb(255, 87, 87);
            border: none;
            transition: .3s;
            &:hover {
                background-color:rgb(255, 49, 49);
                transition: .3s;
            }
        }   
    }
    header {
        margin-bottom: 1rem;
    }
    article {
        padding-bottom: .3rem;
        width: 20vw;
        form {
            margin-bottom: 0;
        }
    }
    catalog {
        display: flex;
        width: 100%;
        flex-flow: row wrap;
        justify-content: start;
        gap: .3rem;
        row-gap: .8rem;
        
        @include media(md) {
            align-items: center;
        }

        > article {
            position: relative;
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
            > h4 {
                width: 100%;
                text-align: center;
                margin-bottom: .3rem;
            }
            
            &:hover {
                transform: scale(1.1);
                transition: .3s;
                margin-right: .8rem;
                margin-left: .8rem;
                box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2)
            }
            iconify-icon {
                position: absolute;
                top: 3%;
                left: 88%;
                background-color: $primary-500;
                padding: .2rem;
                color: white;
                transition: .3s;
                border-radius: 5px;
                &:hover {
                    transition: .3s;
                    transform: scale(1.1);
                }
            }
        }
    }
    h3 {
        border: solid;
        margin-bottom: 1rem;
    }
    h2 {
        display: flex;
        justify-content: space-between;
        button {
            width: fit-content;
        }
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
        > form {
            margin: 0;
            height: 1rem;
            input {
                height: 100%;
                margin: 0;
            }
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
    img {
        width:100%;
        height: 20vh;
        object-fit: cover;
        border-radius: 5px 5px 0 0;
    }
</style>