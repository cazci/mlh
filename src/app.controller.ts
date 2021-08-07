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
  sayHello(): string {
    return this.appService.sayHello();
  }
}
