import { ApiProperty } from '@nestjs/swagger';



export class CreateResumeReqDTO {
    @ApiProperty({ example: 'my resume' })
    title: string;

    @ApiProperty({
        type: 'string',
        format: 'binary',
        description: 'File Upload(pdf, doc, txt)'
    })
    resume: any;
}

export class FindResumeReqDTO {
    @ApiProperty({ example: 'id' })
    id: string;
}