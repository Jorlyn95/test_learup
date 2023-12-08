import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JefesComponent } from './jefes/jefes.component';
import { ListChangesComponent } from './list-changes/list-changes.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"jefes",
    component:JefesComponent
  },
  {
    path:"changes/:id_empleado",
    component:ListChangesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
