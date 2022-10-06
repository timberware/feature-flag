import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export default class FlagGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { body } = request;
    if (!FlagGuard.hasAllProps(body))
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);

    return true;
  }

  static hasAllProps(obj: any): boolean {
    return (
      Object.hasOwnProperty.call(obj, 'name') &&
      Object.hasOwnProperty.call(obj, 'value') &&
      Object.hasOwnProperty.call(obj, 'type')
    );
  }
}
