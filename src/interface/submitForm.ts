export interface SubmitForm {
    author_name: string;
    resource_name: string;
    description: string;
    url: string;
    recommend: "recommend" | "promising" | "disrecommend";
    buildWeek: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
    reason: string;
    user_id: number;
}
