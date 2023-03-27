<script lang="ts">
    import { page } from "$app/stores";
    import type { User } from "$lib/types";
    let user = <User> $page.data.user;
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

<div class="container">
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
                                <form method="POST" action="?/updateInfo">
                                    <input type="hidden" name="field" id="field" value={info[2]}/>
                                    <input name="value" id="value" value={info[1]}/>
                                </form>
                            {:else}
                                {info[1]}
                            {/if}
                            <iconify-icon icon="lucide:pencil" on:click={()=>edit[i] = !edit[i]} on:keydown/>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </hgroup>
</div>

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
</style>