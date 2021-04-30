import { Users } from "./Users";

export class Controller{
    static userController: Users = new Users();
    
    set(){
        Controller.userController = new Users();
    }
}