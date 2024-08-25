export interface CreateLikeDTO{
    userId: string;
    tweetId: string;
}
export interface UpdateLikeDTO{
    id: string;
    userId?: string;
    tweetId?: string;
}