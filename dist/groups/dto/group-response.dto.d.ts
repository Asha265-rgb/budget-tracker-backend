export declare class GroupResponseDto {
    id: string;
    name: string;
    description: string;
    status: string;
    currency: string;
    color: string;
    icon: string;
    createdAt: Date;
    updatedAt: Date;
    createdById: string;
    get isActive(): boolean;
    get isFrozen(): boolean;
}
