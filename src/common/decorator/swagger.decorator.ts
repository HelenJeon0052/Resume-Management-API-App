import { applyDecorators, Type } from "@nestjs/common"
import { ApiCreatedResponse, ApiOkResponse, getSchemaPath } from "@nestjs/swagger"
import { PagingResDTO } from "../dto/res.dto"

export const ApiGetResponse = <TModel extends Type<any>>(model: TModel) => {
    return applyDecorators(
        ApiOkResponse({
            schema: {
                allOf: [{ $ref: getSchemaPath(model)}]
            }
        })
    )
} //status: 200

export const ApiPostResponse = <TModel extends Type<any>>(model: TModel) => {
    return applyDecorators(
        ApiCreatedResponse({
            schema: {
                allOf: [{ $ref: getSchemaPath(model) }]
            }
        })
    )
} //status: 201

export const ApiGetItemsRes = <TModel extends Type<any>>(model: TModel) => {
    return applyDecorators(
        ApiOkResponse({
            schema: {
                allOf: [{ $ref: getSchemaPath(PagingResDTO)},
                    { 
                        properties: {
                            items:{
                                type: 'array',
                                items: { $ref: getSchemaPath(model) }
                        }},
                        required: ['items']
                    }
                ],
                
            }
        })
    )
}