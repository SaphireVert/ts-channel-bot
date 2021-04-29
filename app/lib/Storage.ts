var fs = require('fs');

export class Storage {
    storagePath:string;
    constructor(filePath:string){
        this.storagePath = filePath;
    }
    public save(filePath:string){
    }
}