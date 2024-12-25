<script lang="ts">
    import { page } from "$app/stores";
    export let suid: number;
    export let text: string;
    export let timeStamp: number;
    let sender = $page.data.user.uid == suid;

    const format = (timeStamp: number) => {
        return new Date(timeStamp).toDateString();
    }
</script>

<hgroup class:sender>
    <h6>{text}</h6>
    <p>{format(timeStamp)}</p>
</hgroup>

<style lang="scss">
    .sender {
        text-align: right;
    }
    p {
        margin: 0;
    }
    hgroup {
        margin: 0;
        margin-right: .5rem;
        margin-left: .5rem;
    }
</style>