import { Category } from "../category/category";

export type Topic = {
    topicId: string;
    name: string;
    category?: Category;
    imageUrl: string;
    commentAmount: number;
    postAmount: number;
    viewAmount: number;
    upvoteAmount: number;
};