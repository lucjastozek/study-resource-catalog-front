export function formatPathName(path: string): string {
    const words = path.split("-");
    const formattedWords: string[] = [];

    for (const word of words) {
        formattedWords.push(word[0].toUpperCase() + word.substring(1));
    }

    return formattedWords.join(" ");
}
