import { ApiProperty } from '@nestjs/swagger';



export class PagingResDTO<TData> {
    @ApiProperty({ required: true, example: 'page' })
    page: number;

    @ApiProperty({ required: true, example: 'item' })
    item: number;

    @ApiProperty({ example: 'items' })
    items: TData[];
}