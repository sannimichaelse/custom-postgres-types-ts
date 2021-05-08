import "reflect-metadata";
import {getCustomRepository} from "typeorm";
import {User} from "./entity/User";
import {Plan} from "./entity/Plan";
import Price from "./interface/Price";
import { dbConnection } from './config/connection';
import UserRepository from './repository/user-repository';
import PlanRepository from './repository/plan-repository';

dbConnection().then(async connection => {

    const userRepository = getCustomRepository(UserRepository);
    // Add user
    console.log("Inserting a new user into the database...");
    const user = new User();
    user.first_name = "Sanni";
    user.last_name = "Michael";
    user.age = 50;
    user.date_of_birth.date = 5;
    user.date_of_birth.month = 'dec';
    user.date_of_birth.year = '2021'
    await userRepository.saveUser(user)
    console.log("Saved a new user with id: " + user.id);

    // get all users
    const users = await userRepository.getUsers();
    console.log("Loaded users: ", users);

    //get single user
    const singleUser = await userRepository.getUserById(1);
    console.log("Single user : ", singleUser);
    console.log("User dob ", singleUser.date_of_birth)
    console.log("User dob - date ", singleUser.date_of_birth.date)
    console.log("User dob - month ", singleUser.date_of_birth.month)
    console.log("User dob - year ", singleUser.date_of_birth.year)


    // // get all plans
    // const planRepository = getCustomRepository(PlanRepository);
    // const plans = await planRepository.getPlans();
    // console.log("Loaded plans: ", plans);

    // // get single plan
    // const singlePlan = await planRepository.getPlanById(1);
    // console.log("Single plan: ", singlePlan);
    // console.log("Plan Price ", singlePlan.price)
    // console.log("Plan Amount ", singlePlan.price.amount)
    // console.log("Plan currency ", singlePlan.price.currency)


    // // Add plan
    // console.log("Add a new plan into the database...");
    // const plan = new Plan()
    // const price: Price = new Price('yen', 100);
    // plan.price = price;
    // await planRepository.savePlan(plan)
    // console.log('Saved a new plan')


}).catch(error => console.log(error));
