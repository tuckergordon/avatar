<script>
	import Avatar from '$lib/components/Avatar.svelte';

	let circle = $state(false);
</script>

<Avatar height="500px" {circle} />
