import { ApiProperty } from '@nestjs/swagger';



export class CreateContResDTO {
    @ApiProperty({ required: true })
    id: string;

    @ApiProperty({ required: true })
    title: string;
}

export class FindContUserResDTO {
    @ApiProperty({ required: true })
    id: string;

    @ApiProperty({ required: true })
    email: string;
}

export class FindContResDTO {
    @ApiProperty({ required: true })
    id: string;

    @ApiProperty({ required: true })
    title: string;

    @ApiProperty({ required: true })
    user: FindContUserResDTO;
}