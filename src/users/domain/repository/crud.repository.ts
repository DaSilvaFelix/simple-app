import { User } from "../entitis/users";

export interface CrudRepository {
     createUser(data: User): Promise<User | undefined>
}