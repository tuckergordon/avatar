import type { FacialHairStyle } from '$lib/avatarSvg';
import { avatarPng } from '$lib/server/png';
import { AtpAgent } from '@atproto/api';

const facialHair = process.env.FACIAL_HAIR as FacialHairStyle;

const agent = new AtpAgent({
	service: 'https://bsky.social'
});

await agent.login({
	identifier: '' + process.env.BSKY_IDENTIFIER,
	password: '' + process.env.BSKY_PASSWORD
});

const avatarBlob = (await avatarPng({ facialHair, width: 400, height: 400 })) as Buffer;

await agent.upsertProfile(async (existingProfile) => {
	const { data } = await agent.uploadBlob(avatarBlob);

	return {
		...existingProfile,
		avatar: data.blob
	};
});
