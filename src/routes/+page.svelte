<script>
	import Avatar from '$lib/components/Avatar.svelte';

	let circle = $state(true);
</script>

<Avatar height="500px" {circle} />
