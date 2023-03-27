<script>
    import {  onMount } from 'svelte'
	import Quill from "quill";
	let quill = null;
	 
	
  onMount( () => { 
		let container = document.getElementById('editor');
		quill = new Quill(container, {
            modules: {
            toolbar: [
                ["bold", "italic", "underline", "strike"],
                ["link", "code-block"]
            ]
            },
            placeholder: "Type something...",
            theme: "snow" // or 'bubble'
        });
	})
</script>

<main>
    <div id="editor"/>
</main>

<style lang="scss">
    #editor {
        height: 20rem;
    }
</style>

<svelte:head>
	<link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
</svelte:head>