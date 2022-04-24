class User{
    set name(values){
        this._name=value;
    }
    get name(){
        return this._name
    }
}

const newUser=new User();

newUser.name='Ali';
console.log(newUser.name);