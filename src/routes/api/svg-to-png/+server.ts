import { svgToPng } from '$lib/server/png.js';

export async function POST({ request }) {
	const { svg, width, height } = await request.json();

	const pngBuffer = await svgToPng(svg, width, height);

	return new Response(pngBuffer, { headers: { 'Content-Type': 'image/png' } });
}
