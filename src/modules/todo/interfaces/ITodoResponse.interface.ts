export interface ITodoResponse {
    id: number;
    title: string;
    description: string;
    dueTime: Date;
    status: number;
    priority: number;
    userId: number;
    createdAt: Date;
}