import { Injectable } from '@nestjs/common';

@Injectable()
class FlagsService {
  getHello(): string {
    return 'Hello World from flags!';
  }
}

export default FlagsService;
