export declare class UserResponseDto {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    userType: string;
    preferredCurrency: string;
    isVerified: boolean;
    phoneNumber: string;
    createdAt: Date;
    updatedAt: Date;
    password: string;
    get fullName(): string;
}
