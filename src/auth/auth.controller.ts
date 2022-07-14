import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/local/signup')
  localSignup(@Body() signupDto: SignupDto) {
    return this.authService.localSignup(signupDto);
  }

  @Post('/local/signin')
  localSignin(@Body() signinDto: SigninDto) {
    return this.authService.localSignin(signinDto);
  }

  //   TODO: getCurrentUserId decorator
  @Post('/logout')
  localLogout() {
    return this.authService.logout();
  }

  //   TODO: getCurrentUserId decorator
  @Post('/refresh')
  refresh() {
    return this.authService.refresh();
  }
}
