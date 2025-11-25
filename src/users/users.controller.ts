import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard) // ← ADD BOTH GUARDS
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Public endpoint - Anyone can create a user (registration)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // Admin only - Get all users
  @Get()
  @Roles('admin') // ← ONLY ADMIN CAN ACCESS
  findAll() {
    return this.usersService.findAll();
  }

  // Users can see their own profile, admins can see any profile
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    // Users can only access their own data, unless they're admin
    if (req.user.userType !== 'admin' && req.user.userId !== id) {
      throw new Error('You can only access your own user data');
    }
    return this.usersService.findById(id);
  }

  // Users can update their own profile, admins can update any profile
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Req() req: any) {
    // Users can only update their own data, unless they're admin
    if (req.user.userType !== 'admin' && req.user.userId !== id) {
      throw new Error('You can only update your own user data');
    }
    return this.usersService.update(id, updateUserDto);
  }

  // Admin only - Delete users
  @Delete(':id')
  @Roles('admin') // ← ONLY ADMIN CAN ACCESS
  remove(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

  // ========== AUTHORIZATION TEST ENDPOINTS ==========

  // Test endpoint - Anyone can access (any authenticated user)
  @Get('test/public')
  testPublic(@Req() req: any) {
    return { 
      message: 'This is public - any authenticated user can see this',
      user: req.user 
    };
  }

  // Admin only endpoint
  @Get('test/admin')
  @Roles('admin') // ← ONLY ADMIN
  testAdmin(@Req() req: any) {
    return { 
      message: 'This is admin only - you must be an admin to see this',
      user: req.user 
    };
  }

  // Business or Admin endpoint
  @Get('test/business')
  @Roles('admin', 'business') // ← ADMIN OR BUSINESS
  testBusiness(@Req() req: any) {
    return { 
      message: 'This is for business users or admins',
      user: req.user 
    };
  }

  // Personal users only
  @Get('test/personal')
  @Roles('personal') // ← ONLY PERSONAL USERS
  testPersonal(@Req() req: any) {
    return { 
      message: 'This is for personal users only',
      user: req.user 
    };
  }

  // Get current user profile (any authenticated user)
  @Get('profile/me')
  getMyProfile(@Req() req: any) {
    return this.usersService.findById(req.user.userId);
  }
}
