import { TypeTweet } from "@prisma/client";

export interface CreateTweetDTO{
    content: string;
    userId: string;
    type: TypeTweet;
}

export interface UpdateUserDTO{
    id: string;
    content: string;
    userId?: string;
    type?: TypeTweet;
}