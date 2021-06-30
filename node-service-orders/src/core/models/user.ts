import mongoose from "mongoose";

/**** ORM ****/
export const userSchema = new mongoose.Schema({
    id: Number,
    first_name: String,
    last_name: String
})
export const User = mongoose.model('User', userSchema);

/**** DTO ****/
export class UserDTO {
    
    public id?: number;
    public username?: string;
    public firstName?: string;
    public email?: string;
    public lastName?: string;
    public role?: string;
    public accessToken?: string;
    public refreshToken?: string;

    constructor(user?: any)
    {
        if (user)
        {
            // Convert database model to DTO
            this.id = user.id;
            this.firstName = user.first_name;
            this.lastName = user.last_name;
        }
    }
}