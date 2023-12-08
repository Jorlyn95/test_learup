import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import httpCustom from 'src/functions/customHttp';

@Component({
  selector: 'app-list-changes',
  templateUrl: './list-changes.component.html',
  styleUrl: './list-changes.component.css'
})
export class ListChangesComponent implements OnInit {

  constructor(private route: ActivatedRoute) { 
    this.route.params.subscribe(params => {
      this.id_emplead = params['id_empleado'];
    });
  }

  public id_emplead:String=""
  public arrayList:Array<any>=[]

  ngOnInit(): void {
    this.arrayList=[]
    this.getChanges()
  }

  public getChanges(){
    let params={
      id_empleado:this.id_emplead
    }

    httpCustom("api/v1/empleados/changes", "GET", params)
    .then((res)=>{
        this.arrayList=res.data[0]
    })
    .catch((error)=>{
      console.log(error)
    })
  }


}
