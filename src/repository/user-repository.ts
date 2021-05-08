
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/User';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {

    async saveUser(user: User) {
        return await this.save(user);
    }

    async getUsers() {
        return await this.find();
    }

    async getUserById(id: number) {
        return await this.findOne({id});
    }

}