import avatarSVG, { type AvatarProps } from '$lib/avatarSvg';
import sharp from 'sharp';

export async function avatarPng(avatarProps: AvatarProps & { width: number; height: number }) {
	const svg = avatarSVG(avatarProps);
	return svgToPng(svg, avatarProps.width, avatarProps.height);
}

export async function svgToPng(svg: string, width: number, height: number) {
	return sharp(Buffer.from(svg)).resize(width, height).png().toBuffer();
}
