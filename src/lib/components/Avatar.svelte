<script lang="ts">
	import Avatar, { type AvatarProps } from '$lib/avatar';

	let props: AvatarProps = $props();
</script>

<!-- TODO: make an editor to adjust the values -->
 <!-- Also refactor to not need the await -->

{#await Avatar(props)}
	<p>Loading...</p>
{:then avatar}
	{@html avatar}
{/await}
