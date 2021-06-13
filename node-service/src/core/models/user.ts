// ? : pros and cons of using class with static methods vs namespace ?
// From what I know typescript will not create JS class (may be slower than function), IDK, I am not a JS pro
// Anyway it is the only place we need namespace since modules are enought most of the time

// FIXME : replace role type by enum
export class User {
    constructor(
        public username: string,
        public role: string,
        public jwt: {
            accessToken: string,
            refreshToken: string
        }
    ) {}
}

export namespace UserRepository {
    export function getUser(username: string)
    {
        const user = new User(username, '', {accessToken: '', refreshToken:''});
        return user;
    }

    export function checkCredentials(username: string, password: string)
    {
        return true;
    }
}