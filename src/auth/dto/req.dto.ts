import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches } from 'class-validator';


export class SignupReqDTO {
    @ApiProperty({ required: true, example: 'email@nestjs.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ required: true, example: '6G$TZdH2eVK' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,30}$/)
    password: string;

    @ApiProperty({ required: true, example: '6G$TZdH2eVK' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,30}$/)
    passwordValidation: string;
}

export class LoginReqDTO {
    @ApiProperty({ required: true, example: 'email@nestjs.com' })
    @IsEmail()
    email: string;
    
    @ApiProperty({ required: true, example: '6G$TZdH2eVK' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,30}$/)
    password: string;
}