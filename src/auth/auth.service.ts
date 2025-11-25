// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: any): Promise<any> {
    try {
      // Check if user already exists
      const existingUser = await this.usersService.findByEmail(registerDto.email);
      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }

      // Create user using UsersService
      const user = await this.usersService.create(registerDto);
      
      // Generate token for the new user
      const payload = { 
        email: user.email, 
        sub: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType // ← ADD THIS LINE
      };
      
      return {
        access_token: this.jwtService.sign(payload),
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          userType: user.userType // ← ADD THIS LINE
        }
      };
    } catch (error) {
      if (error.status === 409) {
        throw error;
      }
      throw new ConflictException('Registration failed');
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    
    // Use bcrypt to compare hashed password
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    
    return null;
  }

  async login(user: any) {
    const payload = { 
      email: user.email, 
      sub: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      userType: user.userType // ← ADD THIS LINE
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType // ← ADD THIS LINE
      }
    };
  }
}
