<script lang="ts">
    import { goto } from '$app/navigation';
    import Star from '../search/star.svelte';
    export let data;

    let user = data.user;
    let products = data.products;

    let addChat: HTMLFormElement;
    let selectChat: HTMLFormElement;

    let fallback = '/thumbs/dogtail.png';

    let labels = [
        ['Email', user.email, "email"], 
        ['Username', user.username, "username"], 
        ['First Name', user.fname, "fname"], 
        ['Last Name', user.lname, "lname"]];
</script>

<form class="hidden" method="POST" action="/chat?/selectChat" bind:this={selectChat}>
    <input name="selectChat" value={user.uid}/>
</form>

<form class="hidden" method="POST" action="?/addChat" bind:this={addChat}>
    <input name="ruid" value={user.uid}/>
</form>

<main class="container">
    <vgroup>
        <hgroup>
            <h1>    
                <u>{`${user.fname} ${user.lname}`}</u>
                {#if user.verified}<iconify-icon icon="lucide:verified"/>{/if}
            </h1>
            <h4><i>This person is a <mark>{user.utype}</mark></i></h4>
        </hgroup>
        <button on:click={() => addChat.submit()}>
            <iconify-icon icon="lucide:message-circle"/>
        </button>
    </vgroup>
    <hgroup>
        <h2><u>Personal Information</u></h2>
        <table role="grid">
        <tbody>
            {#each labels as info, i}
                <tr>
                <th scope="row">{info[0]}</th>
                <td>
                    {info[1]}
                </td>
                </tr>
            {/each}
        </tbody>
        </table>
    </hgroup>
    {#if user?.utype == 'seller'}
    <hgroup>
        <h2>
            <u>Products Offered</u>
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
            </article>
            {/each}
        </catalog>
    </hgroup>
    {/if}
</main>

<style lang="scss">
    .hidden {
        display: none;
    }
    vgroup {
        width: 100%;
        display: flex;
        margin-bottom: .5rem;
        justify-content: space-between;
        padding-right: .5rem;
        padding-left: .5rem;
        align-items: center;
    }
    hgroup { 
        margin-bottom: 0;
    }
    button {
        display: inline;
        padding: 0;
        width: 5rem;
        height: 2.5rem;
        margin: 0;
    }
    img {
        width:100%;
        height: 20vh;
        object-fit: cover;
        border-radius: 5px 5px 0 0;
    }
    h5 {
        margin-bottom: 0;
        text-align: end;
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
</style>