import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { User, prisma } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { EditDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @Get('/me')
  getMe(@GetUser() user: User) {
    return this.service.getMe(user);
  }

  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: EditDto) {
    return this.service.editUser(userId, dto);
  }
}
