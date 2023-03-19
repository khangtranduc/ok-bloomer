<script lang="ts">
    import { each } from "svelte/internal";
    import Contact from "./contact.svelte";
    import Message from "./message.svelte";


    let contacts = [
        {name: "George 1", last: "You ni**er"},
        {name: "George 2", last: "You ni**er"},
        {name: "George 3", last: "You ni**er"},
        {name: "George 4", last: "You ni**er"},
        {name: "George 5", last: "You ni**er"}
    ];

    let convo = [ 
        {} 
    ];
</script>

<main class="container-fluid">
    <vgroup>
        <hgroup>
            {#each contacts as contact}
                <Contact name = {contact.name} last = {contact.last}/>
            {/each}
        </hgroup>
        <vline/>
        <hgroup>
            {#each convo as message}
                <Message/>
            {/each}
            <form method="POST" action="?/sendMessage">
                <input id="message" name="message" placeholder="Send message..."/>
                <button type="submit">
                    Send
                </button>
            </form>
        </hgroup>
    </vgroup>
</main>

<style lang="scss">
    vline {
        border: solid;
        border-width: .01rem;
        border-color: #edf0f3;
        height: 88vh;
    }
    vgroup {
        display: flex;
        gap: .3rem;
        margin-top: .3rem;
        hgroup {
            margin: 0;
            &:first-child {
                width: 20%;
            }
            &:last-child {
                width: 80%;
                display: flex;
                flex-direction: column-reverse;
                padding-left: .8rem;
                form {
                    display: flex;
                    gap: .5rem;

                    button {
                        flex: 1;
                    }
                    input {
                        flex: 9;
                    }
                }
            }
        }
    }
</style>