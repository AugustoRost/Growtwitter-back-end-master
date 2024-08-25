import { NextFunction, Request, Response } from "express";
import { repository } from "../database/prisma.connection";

export async function validateToken (request: Request, response: Response, next: NextFunction){
    try {
        const { authorization } = request.headers;
        const { idUser } =  request.params

        if(!authorization){
            return response.status(401).json({
                success: false,
                code: response.statusCode,
                message: "Token de autenticação não informado."
            })
        }

        const user = await repository.user.findUnique({
            where:{
                id: idUser
            }
        })
console.log("asdasd",idUser);

        if(!user || user.token !== authorization){
            return response.status(401).json({
                success: false,
                code: response.statusCode,
                message: "Token invalido"
            })
        }

        next();
    } catch (error) {
        return response.status(500).json({
            success: false,
            code: response.statusCode,
            message: "erro"
        })
    }
}