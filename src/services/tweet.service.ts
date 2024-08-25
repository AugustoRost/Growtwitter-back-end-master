import { repository } from "../database/prisma.connection";
import { ResponseDTO } from '../dtos/response.dto'
import { CreateTweetDTO, UpdateUserDTO } from '../dtos/tweet.dto'
import { Tweet } from '../models/tweet.model'



export class TweetService {

    //lista todos tweet
    public async findAll(): Promise<ResponseDTO> {
        const users = await	repository.tweet.findMany()

        return {
            success: true,
            code: 200,
            message: "Tweet listados com sucesso!",
            data: users
        }
    }

    // cria um tweet novo
    public async create(tweetDTO:CreateTweetDTO): Promise<ResponseDTO>{
        const newTweet = new Tweet(
            tweetDTO.content,
            tweetDTO.type,
            tweetDTO.userId
        )

        const createdTweet = await repository.tweet.create({
        
            data:{
                content: newTweet.content,
                type: newTweet.type,
                userId: newTweet.userId
            }
            
        })
        return {
            success: true,
            code: 201,
            message: 'Tweet criado com sucesso',
            data: createdTweet
        }
    }

    // encontra tweet por id
    public async finById(id: string): Promise<ResponseDTO>{
        const tweet = await repository.tweet.findUnique({
            where: {id: String (id)}
        })

        if(!tweet) {
           throw new Error("Tweet não encontrado")
        }

        return{
            success: true,
            code: 200,
            message: "Tweet encontrado",
            data: tweet
        }
    }

    public async update(tweetDTO: UpdateUserDTO): Promise<ResponseDTO>{
        const tweet = await repository.tweet.findUnique({
            where: {
                id: tweetDTO.id
            }
        })

        if(!tweet) {
            throw new Error("Tweet não encontrado")
        }

        const updatedTweet = await repository.tweet.update({
            where: {
                id: tweetDTO.id
            },
            data: {
                id: tweetDTO.id,
                content: tweetDTO.content,
                userId: tweetDTO.userId,
            }
        })

        return {
            success: true,
            code: 200,
            message: "Tweet atualizado com sucesso.",
            data: updatedTweet
        }
    }
    //
    public async delete(id: string): Promise<ResponseDTO>{
        const tweet = await repository.tweet.findUnique({
            where: {
                id
            }
        })

        if(!tweet) {
            throw new Error("Tweet não encontrado")
        }

        const deletedTweet = await repository.tweet.delete({
            where:{
                id
            }

        })
            return{
                success: true,
                code:200,
                message:"Tweet removido com sucesso",
                data: deletedTweet
            }
    }
}