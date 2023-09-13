export interface SubmitForm {
    author_name: string;
    resource_name: string;
    description: string;
    url: string;
    recommendation_type: "recommend" | "promising" | "disrecommend";
    stage: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
    reason: string;
    user_id: number;
    content_type:
        | "video"
        | "article"
        | "ebook"
        | "podcast"
        | "exercise"
        | "exercise_set"
        | "software_tool"
        | "course"
        | "diagram"
        | "cheat_sheet"
        | "reference"
        | "resource_list"
        | "youtube_channel"
        | "organisation"
        | "blog_post"
        | "forum"
        | "tutorial"
        | "live_coding_session"
        | "mentoring_session"
        | "conference"
        | "hackathon";
}
