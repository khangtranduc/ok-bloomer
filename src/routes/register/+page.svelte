<script>
    import {dark} from '$store';
</script>

<div>
    <article class="container" class:dark-card={$dark}>
        <h1>Register</h1>
        <hr>
        <div class="grid">
        <label for="firstname">
            Firstname
            <input type="text" id="firstname" name="firstname" placeholder="John" required>
        </label>
        <label for="lastname">
            Lastname
            <input type="text" id="lastname" name="lastname" placeholder="Doe" required>
        </label>
        </div>
        <label for="email">
            Email
            <input type="text" id="email" name="email" placeholder="elonmusk@gay.com" required>
        </label>
        <label for="password">
            Password
            <p><em>Must have at least 6 characters</em></p>
            <input type="password" id="pwd" name="pwd" placeholder="••••••••" required>
        </label>
        <label for="conpassword">
            Confirm Password
            <input type="password" id="cpwd" name="cpwd" placeholder="••••••••" required>
        </label>
        <fieldset>
            <label for="terms">
              <input type="checkbox" id="terms" name="terms">
              I agree to the Terms and Conditions
            </label>
        </fieldset>
        <button type="submit">Register</button>
    </article>
</div>



<style lang="scss">
    p {
        margin: 0;
        font-size: 0.8rem;
        color: gray;
    }
    div:not(.grid) {
        height: 89vh;
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
        width: fit-content;
        height: fit-content;
        padding: 1rem 2rem 1rem 2rem;
    }
</style>