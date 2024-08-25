import { Request, Response } from 'express'
import { LikeService } from '../services/like.service'
import { CreateLikeDTO } from '../dtos/like.dto';


const likeService = new LikeService();

// index -> lista todos
export class LikeController{
    public  async index (request: Request, response:Response) {
        try {
            const likes = await  likeService.findAll()
    
            return response.status(200).json(likes)
        } catch (error) {
            return response.status(500).json({
                sucess: false,
                code: response.statusCode,
                message: "Erro ao listar Likes"
            })
        }
    }

    //store -> cria um novo recurso
    public async store (request: Request, response:Response) {
        try {
            const {userId, tweetId} = request.body
        
            if(!userId || !tweetId)
            return response.status(400).json({
                sucess: false,
                code: response.statusCode,
                message: "Preencha os campos obrigatórios"
        })
        
        const like: CreateLikeDTO = {userId, tweetId}
        
        const result = await likeService.create(like)
        
        return response.status(result.code).json(result)
        
        } catch (error) {
            return response.status(500).json({
                sucess: false,
                code: response.statusCode,
                message: "Erro ao dar Like"
            })
        }
        }

    //show -> detalhes de um unico recurso
    public async show (request: Request, response:Response) {
            try {
                const {id} = request.params
        
                const result = await likeService.finById(id)
        
                return response.status(200).json(result)
            } catch (error) {
                return response.status(500).json({
                    sucess: false,
                    code: response.statusCode,
                    message: "Erro ao encontrar o Like"
                })
            }
        }

    //update -> atualiza um recurso
    public async update(request: Request, response:Response) {
        try {
            const { id } = request.params
            const {tweetId, userId} = request.body
        
            const result = await likeService.update({
                id,
                tweetId,
                userId
            })

            response.status(result.code).json(result)

        } catch (error) {
            return response.status(500).json({
                success: false,
                code: response.statusCode,
                message: "Erro ao atualizar o Like"
            })
        }
    }
    //delete/destroy -> exclui um recurso
    public async delete(request: Request, response:Response) {
        try{
            const { id } = request.params

            const result = await likeService.delete(id)

            response.status(result.code).json(result)
        } catch (error) {
            return response.status(500).json({
                success: false,
                code: response.statusCode,
                message: "Erro ao deletar o Like"
            })
    }
}
}