
import { EntityRepository, Repository } from 'typeorm';
import { Plan } from '../entity/Plan';

@EntityRepository(Plan)
export default class PlanRepository extends Repository<Plan> {

    async savePlan(plan: Plan) {
        return await this.save(plan);
    }

    async getPlans() {
        return await this.find();
    }

    async getPlanById(id: number) {
        return await this.findOne({id});
    }

}