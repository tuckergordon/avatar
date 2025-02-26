import Avatar, { DEFAULT_COLORS, type AvatarProps } from '$lib/avatar';
import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const facialHair = url.searchParams.get('facial-hair') as AvatarProps['facialHair'];
	const width = url.searchParams.get('w') ?? '500px';
	const height = url.searchParams.get('h') ?? '500px';
	const circle = url.searchParams.has('circle');

	const colors = Object.fromEntries(
		Object.entries(DEFAULT_COLORS).map(([key, defaultValue]) => [
			key,
			url.searchParams.get(key) ?? defaultValue
		])
	) as AvatarProps['colors'];

	const svg = await Avatar({ facialHair, colors, circle, width, height });

	try {
		return new Response(svg, {
			headers: {
				'Content-Type': 'image/svg+xml'
			}
		});
	} catch (err) {
		console.error(err);
		throw error(404, 'Image not found');
	}
};
