import { Component, OnInit } from '@angular/core';
import httpCustom from 'src/functions/customHttp';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public rowEmpleados:Array<any>=[]

  public arrayBoss:Array<any>=[]
  public add_edit:boolean=false
  public changeBoos:boolean=false
  public blockEdit:boolean=false

  modelEmployers:any={
    id:0,
    nombre:"",
    apellido:"",
    cedula:"",
    jefe:""
  }

  public addEmployer(){
    this.add_edit=!this.add_edit

    if(!this.add_edit) return
    this.blockEdit=false
    this.changeBoos=false
  }

  public getList(){
    try {
      
      httpCustom("api/v1/empleados", "GET", {})
      .then((res)=>{
        console.log(res)
        this.rowEmpleados=res.data[0]
      })
      .catch((error)=>{
        console.log(error)
      })

    } catch (error) {
      console.log(error)
    }
  }

  public getListBoss(){

    httpCustom("api/v1/jefes", "GET", {})
    .then((res)=>{
      this.arrayBoss=res.data
    })
    .catch((error)=>{
      console.log(error)
    })

  }

  public createEmployer(){

    if(this.modelEmployers.nombre=="" || this.modelEmployers.nombre.length<3){
      Swal.fire({
        title:"Error",
        text:"El nombre no puede estar vacio",
        icon:"error"
      })
      return
    }

    if(this.modelEmployers.apellido=="" || this.modelEmployers.apellido.length<3){
      Swal.fire({
        title:"Error",
        text:"El apellido no puede estar vacio",
        icon:"error"
      })
      return
    }

    if(this.modelEmployers.jefe==""){
      Swal.fire({
        title:"Error",
        text:"El campo jefe puede estar vacio",
        icon:"error"
      })
      return
    }

    httpCustom(this.blockEdit==false ? "api/v1/empleados" : "api/v1/empleados/change_boss", this.modelEmployers.id==0 ? "POST" : "PUT", this.modelEmployers)
    .then((res)=>{
      
      Swal.fire({
        title:"Completo",
        text:"Dato Guardado",
        icon:"success"
      })

      this.getList()
      this.modelEmployers.id=0
      this.modelEmployers.nombre=""
      this.modelEmployers.apellido=""
      this.modelEmployers.jefe=""
      this.add_edit=false
    })
    .catch((error)=>{
      console.log(error)
    })

  }

  public ediData(item:any){
    this.modelEmployers.id=item.Id
    this.modelEmployers.nombre=item.Nombre
    this.modelEmployers.apellido=item.Apellido
    this.modelEmployers.cedula=item.Cedula
    this.modelEmployers.jefe=item.id_jefe
    this.changeBoos=true
    this.add_edit=true
  }

  public changeBoss(item:any){
    this.modelEmployers.id=item.Id
    this.modelEmployers.nombre=item.Nombre
    this.modelEmployers.apellido=item.Apellido
    this.modelEmployers.cedula=item.Cedula
    this.modelEmployers.jefe=item.id_jefe
    this.changeBoos=false
    this.blockEdit=true
    this.add_edit=true
  }

  ngOnInit(): void {
      this.getList()
      this.getListBoss()
  }

}
