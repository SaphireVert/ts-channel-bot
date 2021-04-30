import { User } from "../model/User";
var fs = require('fs');

export class Users{
    static storageFile: string = './../data/data.json';
    static list = Users.loadUsers();
    
    constructor(){
        Users.loadUsers();
    }

    static getUser(id: string){
        return Users.list[id];
    }    

    static check(id: string){
        if (typeof Users.list[id] == 'undefined') {
            Users.list[id] = new User(id);
            Users.save();
        }
    }
    
    static editUser(id: string){
        Users.list[id] = new User(id);
        Users.save();
    }

    static deleteUser(id: string){
        Users.list[id] = new User(id);
        Users.save();
    }
    
    static async save(){
        return fs.writeFileSync(Users.storageFile, JSON.stringify(Users.list));
    }

    private static loadUsers(){
        var tempObj:any = {};
        try {
            tempObj = JSON.parse(fs.readFileSync(Users.storageFile));
        } catch (error) {
            fs.writeFileSync(Users.storageFile, JSON.stringify(tempObj))
        }
        return tempObj;
    }

    public static setNotificationStatus(id:string ,status:boolean){
        this.check(id);
        Users.list[id].settings.notifications = status;
        Users.save()
    }

    public static setPrivilegeStatus(id:string, status:boolean){
        this.check(id);
        Users.list[id].settings.isAdmin = status;
        Users.save()
    }

}