import { Component, OnInit } from '@angular/core';
import httpCustom from 'src/functions/customHttp';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './jefes.component.html',
  styleUrl: './jefes.component.css'
})
export class JefesComponent implements OnInit {

  public rowBoss: Array<any> = []
  public add_edit: boolean = false;

  public modelBoss: any = {
    id: 0,
    nombre: "",
    apellido: "",
    cargo: ""
  }

  public addBoss() {
    this.add_edit = !this.add_edit

    if (!this.add_edit) return
    this.modelBoss.id = 0
    this.modelBoss.nombre = ""
    this.modelBoss.apellido = ""
    this.modelBoss.cargo = ""
  }

  public ediData(item: any) {

    if(item.Id==1){
      Swal.fire({
        title:"Aviso",
        text:"No se puede editar este valor por defecto",
        icon:'warning'
      })
      return
    }

    this.modelBoss.id = item.Id
    this.modelBoss.nombre = item.Nombre
    this.modelBoss.apellido = item.Apellido
    this.modelBoss.cargo = item.Cargo
    this.add_edit = true
  }

  public createBoss() {

    if (this.modelBoss.nombre == "" || this.modelBoss.nombre.length < 3) {
      Swal.fire({
        title: "Error",
        text: "El campo nombre no puede estar vacio",
        icon: "error"
      })
      return
    }

    if (this.modelBoss.apellido == "" || this.modelBoss.apellido.length < 3) {
      Swal.fire({
        title: "Error",
        text: "El campo apellido no puede estar vacio",
        icon: "error"
      })
      return
    }

    if (this.modelBoss.cargo == "") {
      Swal.fire({
        title: "Error",
        text: "El campo cargo no puede estar vacio",
        icon: "error"
      })
      return
    }

    httpCustom("api/v1/jefes", this.modelBoss.id == 0 ? "POST" : "PUT", this.modelBoss)
      .then((res) => {

        Swal.fire({
          title: "Guardado",
          text: "Datos guardados de forma correcta",
          icon: "success"
        })

        this.getList()
        this.modelBoss.id = 0
        this.modelBoss.nombre = ""
        this.modelBoss.apellido = ""
        this.modelBoss.cargo = ""

      })
      .catch((error) => {
        console.log(error)
      })

  }

  public getList() {
    httpCustom("api/v1/jefes", "GET", {})
      .then((res) => {
        this.rowBoss = res.data
      })
      .catch((error) => {
        console.log(error)
      })
  }

  ngOnInit(): void {
    this.getList()
  }

}
