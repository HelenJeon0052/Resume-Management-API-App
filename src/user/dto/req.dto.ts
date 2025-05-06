import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';


export class FindUserReqDTO {
    @ApiProperty({ required: true, example: 'id' })
    @IsUUID()
    id: string;
}