export class Product {
    id: string;
    name: string;
    photo: string;
    price: string;
    description: string;
    categorie: string;
    quality: string;
    size: string;
    count: number;
    constructor( name: string, price: string, description: string, categorie: string) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.categorie = categorie;
    }
}
