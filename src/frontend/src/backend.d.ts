import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Submission__1 {
    inquiryType: InquiryType;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export interface Submission {
    name: string;
    email: string;
    timestamp: bigint;
}
export interface UserProfile {
    name: string;
}
export interface Request {
    country: string;
    city: string;
    name: string;
    email: string;
    state: string;
    message: string;
    timestamp: bigint;
}
export enum InquiryType {
    booking = "booking",
    general = "general"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllContactSubmissions(): Promise<Array<Submission__1>>;
    getAllNewsletterSignups(): Promise<Array<Submission>>;
    getAllShowRequests(): Promise<Array<Request>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    signupNewsletter(name: string, email: string): Promise<void>;
    submitContactForm(name: string, email: string, message: string, inquiryType: InquiryType): Promise<void>;
    submitShowRequest(name: string, email: string, city: string, state: string, country: string, message: string): Promise<void>;
}
