import { Injectable, ExecutionContext } from "@nestjs/common";
import { ThrottlerGuard, ThrottlerRequest } from "@nestjs/throttler";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
    protected async getTracker (req:Record<string, any>): Promise<string> {
        return req.ips.length ? req.ips[0] : req.ip
    }
}

@Injectable()
export class WsThrottlerGuard extends ThrottlerGuard {
    protected async handleRequest(requestProps: ThrottlerRequest): Promise<boolean> {
        const {
            context: ctx,
            limit,
            ttl,
            throttler,
            blockDuration,
            getTracker,
            generateKey,
        } = requestProps;
        
        const client = ctx.switchToWs().getClient();
        const tracker = client._socket.remoteAddress;

        if(!throttler.name) {
            throw new Error('e')
        }
        const key = generateKey(ctx, tracker, throttler.name)
        const { totalHits, timeToExpire, isBlocked, timeToBlockExpire } = 
        await this.storageService.increment(
            key,
            ttl,
            limit,
            blockDuration,
            throttler.name,
        )

        const getThrottlerSuffix = (name: string) => 
            name === 'user' ? '' : `-${name}`;

        if(isBlocked) {
            await this.throwThrottlingException(ctx, {
                limit,
                ttl,
                key,
                tracker,
                totalHits,
                timeToExpire,
                isBlocked,
                timeToBlockExpire,
            })
        }
        return true;
    }
}

@Injectable()
export class GraphQLGuard extends ThrottlerGuard {
    getRequestResponse(ctx: ExecutionContext) {
        const gqlCtx = GqlExecutionContext.create(ctx);
        const ctxRetreiveReq = gqlCtx.getContext().req;

        return { req: ctxRetreiveReq, res: ctxRetreiveReq.res }
    }
}