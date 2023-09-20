export function formatContentType(type: string): string {
    const words = type.split("_");
    const formattedWords: string[] = [];

    for (const word of words) {
        formattedWords.push(word[0].toUpperCase() + word.substring(1));
    }

    return formattedWords.join(" ");
}
