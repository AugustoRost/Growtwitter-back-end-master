export interface CreateUserDTO{
    name: string;
    email: string;
    password: string;
    userName: string;
}

export interface UpdateUserDTO{
    id: string;
    name?: string;
    email?: string;
    password?: string;
    userName?: string;
}