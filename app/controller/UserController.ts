import { User } from "../model/User";
var fs = require('fs');

export class UserController{
    userList: any = {};
    storageFile: string = './../data/data.json';

    constructor(){
        this.loadUsers();
        console.log(this.userList);
    }

    getUser(id: string){
        this.userList[id] = new User(id);
    }    

    addUser(id: string){
        this.userList[id] = new User(id);
        this.saveUsers();
    }
    
    editUser(id: string){
        this.userList[id] = new User(id);
        this.saveUsers();
    }

    deleteUser(id: string){
        this.userList[id] = new User(id);
        this.saveUsers();
    }

    async saveUsers(){
        return fs.writeFileSync(this.storageFile, JSON.stringify(this.userList));
    }

    loadUsers(){
        try {
            this.userList = JSON.parse(fs.readFileSync(this.storageFile));
        } catch (error) {
            fs.writeFileSync(this.storageFile, JSON.stringify(this.userList))
        }
    }
}