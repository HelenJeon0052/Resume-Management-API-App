import { ApiProperty } from '@nestjs/swagger';



export class SignupResDTO {
    @ApiProperty({ required: true, example: 'id' })
    id: string;
}

export class LoginResDTO {
    @ApiProperty({ required: true })
    accessToken: string;

    @ApiProperty({ required: true })
    refreshToken: string;
}

export class RefreshTokenDTO {
    @ApiProperty({ required: true })
    accessToken: string;

    @ApiProperty({ required: true })
    refreshToken: string;
}