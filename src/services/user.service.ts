import { repository } from "../database/prisma.connection";
import { ResponseDTO } from "../dtos/response.dto";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/user.dto";
import { User } from "../models/user.model";

export class UserService {
  public async findAll(): Promise<ResponseDTO> {
    const users = await repository.user.findMany();

    return {
      success: true,
      code: 200,
      message: "Usuários listados com sucesso!",
      data: users,
    };
  }

  // cria um usuario novo
  public async create(userDTO: CreateUserDTO): Promise<ResponseDTO> {
    const newUser = new User(
      userDTO.name,
      userDTO.email,
      userDTO.password,
      userDTO.userName
    );

    const createdUser = await repository.user.create({
      data: {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        userName: newUser.userName,
      },
    });
    return {
      success: true,
      code: 201,
      message: "Usuário criado com sucesso",
      data: createdUser,
    };
  }
  // encontra usuario por id
  public async finById(id: string): Promise<ResponseDTO> {
    const user = await repository.user.findUnique({
      where: { id: String(id) },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return {
      success: true,
      code: 200,
      message: "Usuário encontrado",
      data: user,
    };
  }
  //atualiza usuario por id
  public async update(userDTO: UpdateUserDTO): Promise<ResponseDTO> {
    const user = await repository.user.findUnique({
      where: {
        id: userDTO.id,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const updatedUser = await repository.user.update({
      where: {
        id: userDTO.id,
      },
      data: {
        name: userDTO.name,
        email: userDTO.email,
        password: userDTO.password,
        userName: userDTO.userName,
      },
    });

    return {
      success: true,
      code: 200,
      message: "Usuário atualizado com sucesso.",
      data: updatedUser,
    };
  }
  // delete user por id
  public async delete(id: string): Promise<ResponseDTO> {
    const user = await repository.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const deletedUser = await repository.user.delete({
      where: {
        id,
      },
    });
    return {
      success: true,
      code: 200,
      message: "Usuário removido com sucesso",
      data: deletedUser,
    };
  }
}
