<script lang="ts">
    import Contact from "./contact.svelte";
    import Message from "./message.svelte";
    import { onMount } from "svelte";

    export let data;
    export let form;

    let contacts = data.contacts;
    let select: HTMLFormElement;

    let selected = form?.ruid ?? -1;
    let hoverer = data.ruid ?? -1;

    let convo = form?.convo ?? [];

    onMount(() => {if (data.ruid) select.submit()});
</script>

<form style="display: none" id="select" method="POST" action="?/selectChat" bind:this={select}>
    <input type="hidden" name="selectChat" id="selectChat" value={hoverer}/>
</form>

<main class="container-fluid">
    <vgroup>
        <hgroup>
            {#each contacts as contact}
                <Contact on:mouseenter={() => hoverer = contact.uid} on:click={() => {selected = contact.uid; select.submit()}}
                    name = {contact.fname.concat(" ", contact.lname)}
                    last = {contact.last ?? "No messages sent yet"}
                    selected = {selected == contact.uid}/>
            {/each}
        </hgroup>
        <vline/>
        <hgroup>
            {#if form?.convo}
            <form method="POST" action="?/sendMessage">
                <input id="message" name="message" placeholder="Send message..."/>
                <input type="hidden" name="ruid" value={selected}/>
                <button type="submit">
                    Send
                </button>
            </form>
            <scroll>
                {#each convo as message}
                {#if message.text != "emptyasdadbbusdbasudasbduah"}
                    <Message suid={message.suid} text={message.text} timeStamp={message.timeStamp}/>
                {/if}
                {/each}
            </scroll>
            {/if}
        </hgroup>
    </vgroup>
</main>

<style lang="scss">
    scroll {
        flex: 1;
        overflow: auto;
    }
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
                height: 88vh;
                width: 80%;
                display: flex;
                flex-direction: column-reverse;
                padding-left: .8rem;
                overflow-y: scroll;
                scroll {
                    display: flex;
                    flex-direction: column-reverse;
                    padding-bottom: .5rem;
                }
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