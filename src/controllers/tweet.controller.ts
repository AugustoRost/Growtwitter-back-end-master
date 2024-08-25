import { Request, Response } from 'express'
import { TweetService } from '../services/tweet.service';
import { CreateTweetDTO } from '../dtos/tweet.dto'

const tweetService = new TweetService();

export class TweetController{

     // index -> lista todos
     public  async index (request: Request, response:Response) {
        try {
            const tweets = await  tweetService.findAll()
    
            return response.status(200).json(tweets)
        } catch (error) {
            return response.status(500).json({
                sucess: false,
                code: response.statusCode,
                message: "Erro ao listar Tweets"
            })
        }
    }

    //store -> cria um novo recurso
    public async store (request: Request, response:Response) {
        try {
            const {content, userId, type} = request.body
        
            if(!userId || !content )
            return response.status(400).json({
                sucess: false,
                code: response.statusCode,
                message: "Preencha os campos obrigatórios"
        })
        
        const tweet: CreateTweetDTO = {content, userId, type}
        
        const result = await tweetService.create(tweet)
        
        return response.status(result.code).json(result)
        
        } catch (error) {
            return response.status(500).json({
                sucess: false,
                code: response.statusCode,
                message: "Erro ao Tweetar"
            })
        }
        }

    //show -> detalhes de um unico recurso
 public async show (request: Request, response:Response) {
    try {
        const {id} = request.params

        const result = await tweetService.finById(id)

        return response.status(200).json(result)
    } catch (error) {
        return response.status(500).json({
            sucess: false,
            code: response.statusCode,
            message: "Erro ao encontrar o Tweet"
        })
    }
}

    //update -> detalhes de um unico recurso
    public async update(request: Request, response:Response) {
        try {
            const { id } = request.params
            const {content} = request.body
        
            const result = await tweetService.update({
                id,
                content
            })

            response.status(result.code).json(result)

        } catch (error) {
            return response.status(500).json({
                success: false,
                code: response.statusCode,
                message: "Erro ao atualizar o Tweet"
            })
        }
    }

    //delete/destroy -> exclui um recurso
    public async delete(request: Request, response:Response) {
        try{
            const { id } = request.params

            const result = await tweetService.delete(id)

            response.status(result.code).json(result)
        } catch (error) {
            return response.status(500).json({
                success: false,
                code: response.statusCode,
                message: "Erro ao deletar o Tweet"
            })
    }
}
}