<script lang="ts">
    export let data;
</script>

<form method="POST" action="?/reset">
    <article class="container">
        <h1>Login</h1>
        <hr>
        <label for="email">
            Email
            <input type="text" name="email" placeholder="elonmusk@gmail.com" value={data.email ?? ""} required>
        </label>
        <label for="new">
            New Password
            <input type="password" name="new" placeholder="••••••••" required> 
        </label>
        <label for="confirm">
            Confirm New Password
            <input type="password" name="confirm" placeholder="••••••••" required>
        </label>
        <button type="submit">Update Password</button>
    </article>
</form>


<style lang="scss">
    p {
        text-align: center;
        color: red;
    }
    form {
        height: 100%;
        width: 100vw;
        display: flex;
        justify-items: center;
        align-items: center;
    }
    a {
        width: 100%;
        text-align: right;
        display: block;
    }
    h1 {
        margin: 0;
        text-align: center;
    }
    article {
        background-color: $card-bg;
        width: fit-content;
        height: fit-content;
        padding: 1rem;
    }
</style>