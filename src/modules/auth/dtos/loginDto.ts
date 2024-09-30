export class LoginDto {
    //TODO: Em xem thêm class-validator để validate dữ liệu
    email: string;
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}