<script>
    export let form;
</script>

<form method="POST" action="?/register">
    <article class="container">
        <h1>Register</h1>
        <hr>
        {#if form?.short}<p class="invalid">Password must have at least 6 characters!</p>{/if}
        {#if form?.mismatch}<p class="invalid">The passwords do not match!</p>{/if}
        <label for="username">
            Username
            <input type="text" id="username" name="username" placeholder="xae12" value={form?.username ?? ''} required>
        </label>
        <div class="grid">
        <label for="firstname">
            Firstname
            <input type="text" id="fname" name="fname" placeholder="John" value={form?.fname ?? ''} required>
        </label>
        <label for="lastname">
            Lastname
            <input type="text" id="lname" name="lname" placeholder="Doe" value={form?.lname ?? ''} required>
        </label>
        </div>
        <label for="email">
            Email
            <input type="text" id="email" name="email" placeholder="elonmusk@gmail.com" value={form?.email ?? ''} required>
        </label>
        <label for="password">
            Password
            <p><em>Must have at least 6 characters</em></p>
            <input aria-invalid={form?.short || form?.mismatch} type="password" id="password" name="password" placeholder="••••••••" required>
        </label>
        <label for="conpassword">
            Confirm Password
            <input aria-invalid={form?.mismatch} type="password" id="cpassword" name="cpassword" placeholder="••••••••" required>
        </label>
        <fieldset>
            <legend>Registering as</legend>
            <label for="buyer">
              <input type="radio" id="buyer" name="utype" value="buyer" checked>
              Buyer
            </label>
            <label for="seller">
              <input type="radio" id="seller" name="utype" value="seller">
              Seller
            </label>
        </fieldset>          
        <fieldset>
            <label for="terms">
              <input type="checkbox" id="terms" name="terms" required>
              I agree to the Terms and Conditions
            </label>
        </fieldset>
        <button type="submit">Register</button>
    </article>
</form>



<style lang="scss">
    .invalid {
        text-align: center;
        color: red;
    }
    p:not(.invalid) {
        margin: 0;
        font-size: 0.8rem;
        color: gray;
    }
    form {
        height: 100%;
        width: 100vw;
        display: flex;
        justify-items: center;
        align-items: center;
    }
    h1 {
        margin: 0;
        text-align: center;
    }
    article {
        background-color: $card-bg;
        width: fit-content;
        height: fit-content;
        padding: 1rem 2rem 1rem 2rem;
    }
</style>