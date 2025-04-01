import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt } from "class-validator";


export class PageReqDTO {
    @ApiPropertyOptional({ description:'page, default = 1' })
    @Transform((param)=>Number(param.value)) // transform query string to number
    @IsInt()
    page?: number = 1;
    
    @ApiPropertyOptional({ description:'items, default = 10' })
    @Transform((param)=>Number(param.value))
    @IsInt()
    items?: number = 10;

    @ApiPropertyOptional({ description:'/*.pdf, *.doc, *.md' })
    sort?: string;
}