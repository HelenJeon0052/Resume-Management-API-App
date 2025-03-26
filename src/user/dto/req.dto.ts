import { ApiProperty } from '@nestjs/swagger';



export class FindUserReqDTO {
    @ApiProperty({ example: 'id' })
    id: string;
}

export class FindUSersReqDTO {
    @ApiProperty({ example: 'id' })
    ids: string[];
}