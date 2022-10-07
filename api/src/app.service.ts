import { Injectable } from '@nestjs/common';

@Injectable()
class AppService {
  getHello(): string {
    return 'Hello World from App!';
  }
}

export default AppService;
