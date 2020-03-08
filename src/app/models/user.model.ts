export class User {
    name: string;
    email: string;
    uid: string;
    isAuth: boolean;
    constructor( name: string, email: string, uid: string,isAuth: boolean) {
        this.name = name;
        this.email = email;
        this.uid = uid;
        this.isAuth = isAuth;
    }
}
