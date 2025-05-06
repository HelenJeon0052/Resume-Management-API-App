import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable, tap } from "rxjs";

@Injectable()
export class GraphQLGuardInterceptor implements NestInterceptor {
    intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
        const ctxRetreive = GqlExecutionContext.create(ctx);
        const request = ctxRetreive.getContext().req;
        const userRetreive = req.user;

        const operation = ctxRetreive.getInfo().fieldName;
        console.log(`[graphql] ${ userRetreive?.id ?? 'id register'} - ${ operation }`);

        return next.handle().pipe(
            tap(() => {
                console.log(`[graphql] ${operation}`)
            })
        )
        

    }
}