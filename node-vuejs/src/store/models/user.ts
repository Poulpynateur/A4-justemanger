export class UserDTO {
    public id?: number;
    public username?: string;
    public sponsorCode?: string;
    public sponsorName?: UserDTO;
    public firstName?: string;
    public email?: string;
    public lastName?: string;
    public role?: string;
    public accessToken?: string;
    public refreshToken?: string;
    public state?: string;

    public toString() {
        const fullName: string = this.firstName + " " + this.lastName;
        return fullName;
    }
}