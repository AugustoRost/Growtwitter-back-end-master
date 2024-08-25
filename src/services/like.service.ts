import { repository } from "../database/prisma.connection";
import { ResponseDTO } from '../dtos/response.dto'
import { CreateLikeDTO, UpdateLikeDTO} from "../dtos/like.dto";
import { Like } from'../models/like.model'


export class LikeService {

    //lista todos os likes
    public async findAll(): Promise<ResponseDTO> {
        const likes = await	repository.like.findMany()

        return {
            success: true,
            code: 200,
            message: "Likes listados com sucesso!",
            data: likes
        }
    }

     // cria um like novo
     public async create(likeDTO:CreateLikeDTO): Promise<ResponseDTO>{
        const newLike = new Like(
            likeDTO.userId,
            likeDTO.tweetId
        )

        const createdLike = await repository.like.create({
        
            data:{
                userId: newLike.userId,
                tweetId: newLike.tweetId,
            }
            
        })
        return {
            success: true,
            code: 201,
            message: 'Like criado com sucesso',
            data: createdLike
        }
    }

    public async finById(id: string): Promise<ResponseDTO>{
        const like = await repository.like.findUnique({
            where: {id: String (id)}
        })

        if(!like) {
           throw new Error("Like não encontrado")
        }

        return{
            success: true,
            code: 200,
            message: "Like encontrado",
            data: like
        }
    }
    //atualiza usuario por id
    public async update(likeDTO: UpdateLikeDTO): Promise<ResponseDTO>{
        const like = await repository.like.findUnique({
            where: {
                id: likeDTO.id
            }
        })

        if(!like) {
            throw new Error("Like não encontrado")
        }

        const updatedLike = await repository.like.update({
            where: {
                id: likeDTO.id
            },
            data: {
                tweetId: likeDTO.tweetId,
                userId: likeDTO.userId
            }
        })

        return {
            success: true,
            code: 200,
            message: "Like atualizado com sucesso.",
            data: updatedLike
        }
    }

    public async delete(id: string): Promise<ResponseDTO>{
        const like = await repository.like.findUnique({
            where: {
                id
            }
        })

        if(!like) {
            throw new Error("Like não encontrado")
        }

        const deletedLike = await repository.like.delete({
            where:{
                id
            }

        })
            return{
                success: true,
                code:200,
                message:"Like removido com sucesso",
                data: deletedLike
            }
    }
}