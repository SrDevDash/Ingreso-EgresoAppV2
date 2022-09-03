

export class User {

    static userFirebase({uid,email,nombre}){
        return new User(uid,nombre,email);
    }
    constructor( 
        public uid:string,
        public nombre: string, 
        public email: string
        )
        {}

}