import { User } from "../entitis/users";

export interface CrudUserRepository {
     createUser(data: User): Promise<User | undefined>

}