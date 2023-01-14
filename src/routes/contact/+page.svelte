
<div>
    <article class="container">
        <h1>Contact Us</h1>
        <p><em>Leave us any feedback in the form below!</em></p>
        <hr>
        <label for="fruit">Query</label>
        <select id="fruit" required>
            <option value="" selected>Select a query…</option>
            <option>…</option>
        </select>
        <label for="name">
            Name
            <input type="text" id="name" name="name" placeholder="John Doe" required>
        </label>
        <label for="email">
            Email
            <input type="text" id="email" name="email" placeholder="elonmusk@gmail.com" required>
        </label>
        <hr>
        <textarea id="comment" name="comment" rows="3" cols="50" placeholder="Type your comment here..."/>
        <button type="submit">Submit</button>
    </article>
</div>

<style lang="scss">
    p {
        font-size: 0.8rem;
        color: gray;
        margin: 0;
        text-align: center;
    }
    div {
        height: 100%;
        width: 100vw;
        display: flex;
        justify-items: center;
        align-items: center;
    }
    textarea{
        resize: vertical;
        max-height: 10rem;
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