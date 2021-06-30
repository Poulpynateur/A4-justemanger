/**** DTO ****/
export class UserDTO {
    public username: string = '';
    public role?: string;
    public accessToken?: string;

    constructor(username: string)
    {this.username = username}
}