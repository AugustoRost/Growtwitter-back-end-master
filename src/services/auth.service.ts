import { randomUUID } from "crypto";
import { repository } from "../database/prisma.connection";

export class AuthService {
    public async login(email: string, password: string): Promise<string> {
        const user = await repository.user.findFirst({
            where:{
                email,
                password
            }
        })

        if(!user) {
            throw new Error("Credenciais invalidas")
        }

        const token = randomUUID()

        await repository.user.update({
            where: {
                id: user.id
            },
            data: {
                token
            }
        })

        return token
    }
}