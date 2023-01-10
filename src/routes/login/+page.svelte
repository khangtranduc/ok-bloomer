<div>
    <article class="container">
        <h1>Login</h1>
        <hr>
        <label for="email">
            Email
            <input type="text" id="email" name="email" placeholder="elonmusk@gay.com" required>
        </label>
        <label for="password">
            Password
            <input type="password" id="pwd" name="pwd" placeholder="••••••••" required>
        </label>
        <button type="submit">Login</button>
        <a href="/">Forgot password 💀</a>
    </article>
</div>



<style lang="scss">
    div {
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