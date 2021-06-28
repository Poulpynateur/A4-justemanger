export class UserDTO {
    public id?: number;
    public username?: string;
    public firstName?: string;
    public email?: string;
    public lastName?: string;
    public role?: string;
    public accessToken?: string;
    public refreshToken?: string;

    public toString() {
        const fullName: string = this.firstName + " " + this.lastName;
        return fullName;
    }
}