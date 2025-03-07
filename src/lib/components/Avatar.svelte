<script lang="ts">
	import avatarSVG, { type AvatarProps } from '$lib/avatarSvg';

	let props: AvatarProps = $props();
</script>

<!-- TODO: make an editor to adjust the values -->
{@html avatarSVG(props)}
