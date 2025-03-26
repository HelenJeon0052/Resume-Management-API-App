import { ApiProperty } from '@nestjs/swagger';



export class SignupReqDTO {
    @ApiProperty({ example: 'email@nestjs.com' })
    email: string;

    @ApiProperty({ example: '6G$TZdH(eVK' })
    password: string;

    @ApiProperty({ example: '6G$TZdH(eVK' })
    passwordValidation: string;
}

export class LoginReqDTO {
    @ApiProperty({ example: 'email@nestjs.com' })
    email: string;
    
    @ApiProperty({ example: '6G$TZdH(eVK' })
    password: string;
}