import { TypeTweet } from "@prisma/client";
import { randomUUID } from "crypto";

export class Tweet {
    private _id: string;

constructor(
   private _content: string,
   private _type: TypeTweet,
   private _userId: string
){
    this._id = randomUUID()
}

get id(): string {
    return this._id
}

get content(): string {
    return this._content
}

get type(): TypeTweet {
    return this._type
}

get userId(): string {
    return this._userId
}

}

