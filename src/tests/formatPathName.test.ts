import { formatPathName } from "../utils/formatPathName";

test("Format path name replaces '-' with spaces and capitalizes the words", () => {
    expect(formatPathName("that's-a-path-name")).toEqual("That's A Path Name");
    expect(formatPathName("home")).toEqual("Home");
    expect(formatPathName("submit-new")).toEqual("Submit New");
});
