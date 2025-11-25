import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto.userId, createGroupDto);
  }

  @Post(':id/members')
  addMember(@Param('id') id: string, @Body() body: { userId: string; role?: string }) {
    return this.groupsService.addMember(id, body.userId, body.role);
  }

  @Post(':id/accept-invite')
  acceptInvite(@Param('id') id: string, @Body() body: { userId: string }) {
    return this.groupsService.acceptInvite(id, body.userId);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.groupsService.findByUser(userId);
  }

  @Get(':id/balance')
  getBalance(@Param('id') id: string) {
    return this.groupsService.getGroupBalance(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.delete(id);
  }
}
