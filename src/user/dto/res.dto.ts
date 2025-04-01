import { ApiProperty } from '@nestjs/swagger';



export class FindUserResDTO {
    @ApiProperty({ required: true })
    id: string;

    @ApiProperty({ required: true })
    email: string;

    @ApiProperty()
    createdAt: string;
}
