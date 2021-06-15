// ? : pros and cons of using class with static methods vs namespace ?
// From what I know typescript will not create JS class (may be slower than function), IDK, I am not a JS pro
// Anyway it is the only place we need namespace since modules are enought most of the time

// FIXME : replace role type by enum
export class User {
    constructor(
        public username: string,
        public role: string,
        public accessToken: string,
        public refreshToken: string
    ) {}
}

export namespace UserRepository {

    export function updateUser(user: User)
    {
        // Save refresh token hash
    }

    export function getUser(username: string)
    {
        const user = new User(username, '', '', '');
        return user;
    }

    export function checkCredentials(username: string, password: string)
    {
        return true;
    }

    export function checkRefreshToken(username: string, refreshToken: string)
    {
        return true;
    }
}