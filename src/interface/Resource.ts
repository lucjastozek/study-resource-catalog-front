export interface Resource {
    resource_id: number;
    name: string;
    url: string;
    description: string;
    content_type: string;
    stage: number;
    creation_date: string;
    user_id: number;
    recommendation_type: string;
    reason: string;
    likes: number;
    dislikes: number;
    author: string;
}
