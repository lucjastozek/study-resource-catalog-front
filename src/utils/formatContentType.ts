export const formatContentType = (type: string): string => {
    if (type.includes("_")) {
        const splitType = type.split("_");

        const capitalisedTypeFirst =
            splitType[0].charAt(0).toUpperCase() + splitType[0].slice(1);
        const capitalisedTypeSecond =
            splitType[1].charAt(0).toUpperCase() + splitType[1].slice(1);

        const capitalisedType =
            capitalisedTypeFirst + " " + capitalisedTypeSecond;

        return capitalisedType;
    }
    const newType = type.charAt(0).toUpperCase() + type.slice(1);
    return newType;
};
