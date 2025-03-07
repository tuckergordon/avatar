import type { RequestHandler } from './$types';
import { createClient } from '@vercel/edge-config';
import { EDGE_CONFIG } from '$env/static/private';
import { svgToPng } from '$lib/server/png';
import avatarSVG, { type FacialHairStyle, DEFAULT_COLORS, type AvatarProps } from '$lib/avatarSvg';

const edgeConfig = createClient(EDGE_CONFIG);

export const GET: RequestHandler = async ({ url }) => {
	// Get the current facial hair setting from Vercel (its stored in an edge config)
	const currentFacialHair = await edgeConfig.get<FacialHairStyle>('facialHair');
	const facialHair = (url.searchParams.get('facial-hair') as FacialHairStyle) ?? currentFacialHair;
	const format = (url.searchParams.get('format') as 'svg' | 'png') ?? 'svg';
	const width = Number(url.searchParams.get('w') ?? 500);
	const height = Number(url.searchParams.get('h') ?? 500);
	const circle = url.searchParams.has('circle');

	const colors = Object.fromEntries(
		Object.entries(DEFAULT_COLORS).map(([key, defaultValue]) => [
			key,
			url.searchParams.get(key) ?? defaultValue
		])
	) as AvatarProps['colors'];

	const svg = avatarSVG({ format, facialHair, colors, circle, width, height });

	const response = format === 'svg' ? svg : await svgToPng(svg, width, height);
	const contentType = format === 'svg' ? 'image/svg+xml' : 'image/png';

	return new Response(response, { headers: { 'Content-Type': contentType } });
};
