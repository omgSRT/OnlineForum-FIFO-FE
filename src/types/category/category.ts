import { Topic } from '../topic/topic';

export type Category = {
    categoryId: string;
    name: string;
    image: string;
    upvoteCount: number;
    commentCount: number;
    viewCount: number;
    description: string;
    topicListByCategory: Topic[];
};
