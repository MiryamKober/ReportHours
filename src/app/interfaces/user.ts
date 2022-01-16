import { UserRole } from "../enums/userRole";

export interface User {
    id: string;
    userName: string;
    password: string;
    role: UserRole;
    projectIds: string[];
}