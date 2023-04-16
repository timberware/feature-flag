import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export default class EnableGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { body } = request;

    if (!EnableGuard.checkBodyType(body))
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);

    return true;
  }

  static checkBodyType(obj: { id: string; isEnabled: boolean }): boolean {
    return typeof obj?.id === 'string' && typeof obj?.isEnabled === 'boolean';
  }
}
