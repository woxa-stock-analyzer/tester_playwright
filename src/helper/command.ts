// Helper to detect emoji in a string
export function containsEmoji(input: string): boolean {
	// Covers most emojis
	const emojiRegex = /[\p{Emoji}]/u;
	return emojiRegex.test(input);
}

