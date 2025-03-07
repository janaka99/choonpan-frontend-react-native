export function getFirstCharacter(input: string): string {
  if (input.length === 0) {
    return "M";
  }
  return input.charAt(0);
}
