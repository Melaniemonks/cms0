export class Document{
    public id: number;
    public name: string;
    public description: string;
    public URL:string;
    public children: Document[];


    constructor(id:number, name:string, description:string, URL:string,  children:Document[]){
        this.id = id;
        this.name = name;
        this.description = description;
        this.URL = URL;
        this.children = children;
    }

}