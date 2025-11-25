import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: any): Promise<User> {
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Validate and set userType
    const validUserTypes = ['personal', 'business', 'admin', 'group'];
    const userType = validUserTypes.includes(createUserDto.userType) 
      ? createUserDto.userType 
      : 'personal'; // Default to personal

    const user = new User();
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.userType = userType; // ← USE VALIDATED userType
    user.preferredCurrency = createUserDto.preferredCurrency || 'USD';
    user.phoneNumber = createUserDto.phoneNumber;

    const savedUser = await this.usersRepository.save(user);
    return savedUser;
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ 
      where: { id } 
    });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ 
      where: { email } 
    });
  }

  // ADD THIS MISSING METHOD
  async findOne(username: string): Promise<User | null> {
    // Using email as username for authentication
    return await this.findByEmail(username);
  }

  async update(id: string, updateData: Partial<User>): Promise<User> {
    const user = await this.findById(id);
    Object.assign(user, updateData);
    return await this.usersRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    const user = await this.findById(id);
    await this.usersRepository.remove(user);
  }
}
