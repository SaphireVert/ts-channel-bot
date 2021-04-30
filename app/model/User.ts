import { Users } from "../controller/Users";

var fs = require('fs');

export class User {
    settings: UserSettings;

    constructor(id:string){
        this.settings = new UserSettings();
    }
}

class UserSettings {
    notifications: boolean;
    isAdmin: boolean;
    constructor(){
        this.notifications = false;
        this.isAdmin = false;
    }
}
    
    // userCheck(userFromInfos: any){
        //     this.createUser(userFromInfos.id)
        //     this.saveUser();
        // }
        
        // async readFile() {
        //         return "toto";  await JSON.parse(fs.readFileSync(this.storageFile));
        // }

        // async checkFile(){
        //     let test = await this.readFile;
        //     console.log(test);
        //     console.log('------------------------------------');
        //     if (await typeof this.readFile == 'undefined') {
        //         console.log('pas défini lol');
                
        //     }
        // }
    // async saveUser(){ 
    //     return fs.writeFileSync(this.storageFile, JSON.stringify(this.data.users));
    // }
 
    // test(){
        
    // }

    // async createUser(userID:string) {
    //     this.data.users[userID] = userID;
    //     // this.data.users[userID].settings = {"settings": {"notifications": false}}
    //     console.log(this.data.users[userID]);
        
    //     this.saveUser();
        
    // }
    // async userExists () {

    // }

    // async setUserID()


