import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    //Context is a wrapper around incoming request
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
