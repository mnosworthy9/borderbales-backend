
// User schema
export interface IUser {
    id: number;
    name: string;
    email: string;
}

export interface IUsers {
    created_at?: Date;
    email?: string;
    first_name?: string;
    id?: number;
    is_admin?: boolean;
    last_name?: string;
    password?: string;
    reputation?: number;
    sales?: number;
    username?: string;
}


/**
 * Get a new User object.
 * 
 * @returns 
 */
function getNew(name: string, email: string): IUser {
    return {
        id: -1,
        email,
        name,
    };
}


/**
 * Copy a user object.
 * 
 * @param user 
 * @returns 
 */
function copy(user: IUser): IUser {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
    }
}


// Export default
export default {
    new: getNew,
    copy,
}
