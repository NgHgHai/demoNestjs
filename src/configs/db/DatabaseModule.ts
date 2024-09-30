import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
    imports: [
        //TODO: Cấu hình kết nối với database để env nha em
        TypeOrmModule.forRoot({
            type: 'mssql',
            host: 'localhost',  
            port: 1433,         
            username: 'sa', 
            password: '@Bc12345', 
            database: 'Todo_app',  
            autoLoadEntities: true,
            synchronize: false,
            options: {
                encrypt: false,
                trustServerCertificate: true, // Bỏ qua chứng chỉ tự ký
            }
        }),
    ],

})
export class DatabaseModule { }