<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<main class="container mx-auto">
	{@render children()}
</main>
