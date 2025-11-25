import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
export declare class GroupsController {
    private readonly groupsService;
    constructor(groupsService: GroupsService);
    create(createGroupDto: CreateGroupDto): Promise<import("./entities/group.entity").Group>;
    addMember(id: string, body: {
        userId: string;
        role?: string;
    }): Promise<import("./entities/group-member.entity").GroupMember>;
    acceptInvite(id: string, body: {
        userId: string;
    }): Promise<import("./entities/group-member.entity").GroupMember>;
    findByUser(userId: string): Promise<import("./entities/group.entity").Group[]>;
    getBalance(id: string): Promise<import("./groups.service").GroupBalance[]>;
    findOne(id: string): Promise<import("./entities/group.entity").Group>;
    update(id: string, updateGroupDto: UpdateGroupDto): Promise<import("./entities/group.entity").Group>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
