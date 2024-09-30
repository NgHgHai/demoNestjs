// /home/ghost/project/demo-todo-app/todo-app/src/modules/users/dtos/updateDto.ts

export interface UpdateUserDto {
    id: string;
    name?: string;
    password?: string;
    oldpass?: string;
    isActive?: boolean;
    isVerified?: boolean;
    role?: number;
}