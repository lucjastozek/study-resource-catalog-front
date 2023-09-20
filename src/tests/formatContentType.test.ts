import { formatContentType } from "../utils/formatContentType";

test("Format content type replaces '_' with spaces and capitalizes the words", () => {
    expect(formatContentType("that's_a_content_type")).toEqual(
        "That's A Content Type"
    );
    expect(formatContentType("blog_post")).toEqual("Blog Post");
    expect(formatContentType("live_coding_session")).toEqual(
        "Live Coding Session"
    );
    expect(formatContentType("video")).toEqual("Video");
});
