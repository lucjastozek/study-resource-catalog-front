export function formatPathName(path: string): string {
    if (path.includes("-")) {
        const splitPath = path.split("-");

        const capitalisedTypeFirst =
            splitPath[0].charAt(0).toUpperCase() + splitPath[0].slice(1);
        const capitalisedTypeSecond =
            splitPath[1].charAt(0).toUpperCase() + splitPath[1].slice(1);

        const capitalisedType =
            capitalisedTypeFirst + " " + capitalisedTypeSecond;

        return capitalisedType;
    }
    const newPath = path.charAt(0).toUpperCase() + path.slice(1);
    return newPath;
}
