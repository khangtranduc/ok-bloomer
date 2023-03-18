<script>
    export let form;
</script>

<form method="POST" action="?/login">
    <article class="container">
        <h1>Login</h1>
        <hr>
        {#if form?.credentials}<p>Account not found!</p>{/if}
        {#if form?.mail_re}<p>Invalid email format!</p>{/if}
        {#if form?.password}<p>Wrong password!</p>{/if}
        <label for="email">
            Email
            <input type="text" id="email" name="email" placeholder="elonmusk@gmail.com" value={form?.email ?? ''} required>
        </label>
        <label for="password">
            Password
            <input type="password" id="password" name="password" placeholder="••••••••" required>
        </label>
        <button type="submit">Login</button>
        <a href="/">Forgot password 💀</a>
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