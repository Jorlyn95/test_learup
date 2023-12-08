export interface saveEmployersInterface{
    nombre:String,
    apellido:String,
    cedula:String,
    jefe:String
}

export interface updateEmployersInterface{
    nombre:String,
    apellido:String,
    cedula:String,
    id:String
}

export interface changeBoosEmployer{
    empleado:number,
    boss:number
}

export interface listChangeInterface{
    id_empleado:String
}