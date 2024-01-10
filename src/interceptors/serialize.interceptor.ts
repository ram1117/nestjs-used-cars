import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

// to check if argument passed to the decorator is of type class
interface ClassConstructor{
  new (...args:any[]):{}
}

export function Serialize(dto:ClassConstructor){
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private userDto:any){}

  intercept(
    context: ExecutionContext,
    handler: CallHandler<any>,
  ): Observable<any> {
    return handler.handle().pipe(
      map((data: any) => {
        //run something before response is sent out
        return plainToClass(this.userDto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
