<script lang="ts">
	import { CURRENT_FACIAL_HAIR, DEFAULT_COLORS, type FacialHairStyle } from '$lib/avatarSvg';
	import Avatar from '$lib/components/Avatar.svelte';

	let circle = $state(true);
	let facialHair = $state<FacialHairStyle>(CURRENT_FACIAL_HAIR);
	let colors = $state(DEFAULT_COLORS);
	let colorKeys = $derived(Object.keys(colors)) as Array<keyof typeof colors>;

	let apiUrl = $derived(
		'/api?' + new URLSearchParams({ facialHair, ...colors }).toString() + (circle ? '&circle' : '')
	);

	const reset = () => {
		circle = true;
		facialHair = CURRENT_FACIAL_HAIR;
		colors = DEFAULT_COLORS;
	};
</script>

<h1>Build-a-Tuck Workshop</h1>
<div class="flex space-x-4">
	<aside class="space-y-4">
		<label class="flex items-center space-x-2">
			<input type="checkbox" name="circle" bind:checked={circle} />
			<span>Circle</span>
		</label>

		<label class="flex items-center space-x-5">
			<span>Facial Hair</span>
			<select bind:value={facialHair} name="facialHair">
				<option value="mustache">Mustache</option>
				<option value="beard">Beard</option>
				<option value="shaved">Shaved</option>
			</select>
		</label>

		{#each colorKeys as color}
			<label class="grid grid-cols-2 items-center space-x-5">
				<span>{color.charAt(0).toUpperCase() + color.slice(1)}</span>
				<input
					type="color"
					bind:value={colors[color]}
					name={color}
					title={`Select ${color} color`}
				/>
			</label>
		{/each}
		<button onclick={() => reset()} class="block">Reset</button>
	</aside>
	<Avatar height="500px" {circle} {facialHair} {colors} />
</div>
<h2>Download</h2>
<a class="block" href="{apiUrl}&format=svg" download="avatar.svg">SVG</a>
<a class="block" href="{apiUrl}&format=png" download="avatar.png">PNG</a>
