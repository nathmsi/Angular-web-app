export class User {
    name: string;
    email: string;
    uid: string;
    isAuth: boolean;
    photo: string;
    phone: string;
    constructor( name: string, email: string, uid: string,isAuth: boolean,photo: string,phone: string) {
        this.name = name;
        this.email = email;
        this.uid = uid;
        this.isAuth = isAuth;
        this.photo = photo;
        this.phone = phone;
    }
}
