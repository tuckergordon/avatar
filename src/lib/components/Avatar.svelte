<script lang="ts">
	import Avatar, { type AvatarProps } from '$lib/avatar';

	let props: AvatarProps = $props();
</script>

<!-- TODO: make an editor to adjust the values -->

{@html Avatar(props)}
