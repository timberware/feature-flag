import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import FlagDto from './flag.dts';

@Injectable()
export default class FlagGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { body } = request;

    if (!FlagGuard.checkValueType(body))
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);

    return true;
  }

  static checkValueType(obj: FlagDto): boolean {
    return typeof obj.value === obj.type;
  }
}
