export declare class GroupMemberResponseDto {
    id: string;
    role: string;
    status: string;
    totalOwed: number;
    totalOwes: number;
    joinedAt: Date;
    updatedAt: Date;
    userId: string;
    groupId: string;
    get isOwner(): boolean;
    get isAdmin(): boolean;
    get isActive(): boolean;
    get netBalance(): number;
    get owesMoney(): boolean;
    get isOwedMoney(): boolean;
    get isSettled(): boolean;
}
