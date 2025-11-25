import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: any): Promise<any>;
    login(loginDto: any): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            firstName: any;
            lastName: any;
            userType: any;
        };
    }>;
    test(): Promise<{
        message: string;
    }>;
}
