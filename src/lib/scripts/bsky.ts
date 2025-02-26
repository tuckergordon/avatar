import { AtpAgent } from '@atproto/api';
import Avatar, { type FacialHairStyle } from '../avatar.ts';

const facialHair = process.env.FACIAL_HAIR as FacialHairStyle;

const agent = new AtpAgent({
	service: 'https://bsky.social'
});

await agent.login({
	identifier: '' + process.env.BSKY_IDENTIFIER,
	password: '' + process.env.BSKY_PASSWORD
});

const avatarBlob = (await Avatar({ facialHair, format: 'png', uint8: true })) as Buffer;

await agent.upsertProfile(async (existingProfile) => {
	const { data } = await agent.uploadBlob(avatarBlob);

	return {
		...existingProfile,
		avatar: data.blob
	};
});
