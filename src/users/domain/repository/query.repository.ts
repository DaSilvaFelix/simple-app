import { User } from "../entitis/users"

export interface QueryUserRepository {
     getByEmail(email: string): Promise<User | undefined>

}