import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthRoute } from './auth/decorators/auth.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * @returns {string}
   */
  @ApiExcludeEndpoint()
  @AuthRoute()
  @Get()
  async sayHello(): Promise<string> {
    return this.appService.sayHello();
  }
}
