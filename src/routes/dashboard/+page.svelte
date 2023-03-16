<script lang="ts">
    import { page } from "$app/stores";
    let user = $page.data.user;
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
    {#if user.utype == "seller"}<h3>Balance: <ins>${user.balance ?? 0}</ins></h3>{/if}
    
    <hgroup>
        <h2><u>Personal Information</u></h2>
        <table role="grid">
            <tbody>
                <tr>
                    <th scope="row">Email</th>
                    <td>{user.email}</td>
                </tr>
                <tr>
                    <th scope="row">Username</th>
                    <td>{user.username}</td>
                </tr>
                <tr>
                    <th scope="row">First Name</th>
                    <td>{user.fname}</td>
                </tr>
                <tr>
                    <th scope="row">Last Name</th>
                    <td>{user.lname}</td>
                </tr>
            </tbody>
        </table>
    </hgroup>
</div>

<style lang="scss">
    h3 {
        border: solid;
        margin-bottom: 1rem;
    }
</style>