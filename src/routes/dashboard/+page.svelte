<script lang="ts">
    import { page } from "$app/stores";
    let user = $page.data.user;
</script>

<div class="container">
    <hgroup>
        <h1><u>Welcome {user.fname + " " + user.lname}!</u></h1>
        <h2><mark><i>You are a {user.utype}</i></mark></h2>
    </hgroup>
    
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
</style>