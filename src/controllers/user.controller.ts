import { Request, Response } from 'express'
import { UserService } from '../services/user.service'
import { CreateUserDTO } from '../dtos/user.dto';

const userService = new UserService();

export class UserController{

    // index -> lista todos
    public  async index (request: Request, response:Response) {
        try {
            const users = await  userService.findAll()
    
            return response.status(200).json(users)
        } catch (error) {
            return response.status(500).json({
                sucess: false,
                code: response.statusCode,
                message: "Erro ao listar Usuários"
            })
        }
    }



    //store -> cria um novo recurso
    public async store (request: Request, response:Response) {
        try {
            const {name, email, password, userName} = request.body
        
            if(!name || !email || !password || !userName)
            return response.status(400).json({
                sucess: false,
                code: response.statusCode,
                message: "Preencha os campos obrigatórios"
        })
        
        const user: CreateUserDTO = {name, email, password, userName}
        
        const result = await userService.create(user)
        
        return response.status(result.code).json(result)
        
        } catch (error) {
            return response.status(500).json({
                sucess: false,
                code: response.statusCode,
                message: "Erro ao criar Usuário"
            })
        }
        }


    //show -> detalhes de um unico recurso
 public async show (request: Request, response:Response) {
    try {
        const {id} = request.params

        const result = await userService.finById(id)

        return response.status(200).json(result)
    } catch (error) {
        return response.status(500).json({
            sucess: false,
            code: response.statusCode,
            message: "Erro ao encontrar o Usuários"
        })
    }
}
    //update -> atualiza um recurso
    public async update(request: Request, response:Response) {
        try {
            const { id } = request.params
            const {name, email, password, userName} = request.body
        
            const result = await userService.update({
                id,
                name,
                email,
                password,
                userName
            })

            response.status(result.code).json(result)

        } catch (error) {
            return response.status(500).json({
                success: false,
                code: response.statusCode,
                message: "Erro ao atualizar o Usuário"
            })
        }
    }

    //delete/destroy -> exclui um recurso
    public async delete(request: Request, response:Response) {
        try{
            const { id } = request.params

            const result = await userService.delete(id)

            response.status(result.code).json(result)
        } catch (error) {
            return response.status(500).json({
                success: false,
                code: response.statusCode,
                message: "Erro ao deletar o Usuário"
            })
    }
}
}