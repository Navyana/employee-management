export class Employee{
    id: string;
    name: string;
    position: string;
    about: string;
    joining_date: string;
    
    constructor(
        id:string,
        name: string,
        position: string,
        about: string,
        joining_date: string
    ){
        this.id = id,
        this.name = name;
        this.position = position;
        this.about = about;
        this.joining_date = joining_date
    }
}