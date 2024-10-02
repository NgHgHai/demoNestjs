import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DATABASE } from 'src/common/constants'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mssql',
            host: DATABASE.HOST,
            port: DATABASE.PORT,
            username: DATABASE.USER,
            password: DATABASE.PASSWORD,
            database: DATABASE.NAME, 
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