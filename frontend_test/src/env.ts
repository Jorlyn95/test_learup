import { isDevMode } from '@angular/core';
export function enviroment(){

    let dev={
        apis:"http://localhost:3000/",
    }

    let prod={
        apis:"http://localhost:3000/"
    }

    if(isDevMode()){
        return dev
    }else{
        return prod
    }

}