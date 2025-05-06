import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';


export class CreateResumeReqDTO {
    @ApiProperty({ example: 'my-resume' })
    @MinLength(5)
    @MaxLength(30)
    @IsString()
    title: string;

    @ApiProperty({
        type: 'string',
        format: 'binary',
        description: 'File Upload(pdf, doc, txt)'
    })
    resume: any;
}

export class FindResumeReqDTO {
    @ApiProperty({ required: true, example: 'id' })
    @IsUUID()
    id: string;
}