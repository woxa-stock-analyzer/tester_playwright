// Helper to detect emoji in a string
export function containsEmoji(input: string): boolean {
  const emojiRegex = /\p{Extended_Pictographic}/u;
  return emojiRegex.test(input);
}
