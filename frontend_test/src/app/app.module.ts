import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateComponent } from './template/template.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { JefesComponent } from './jefes/jefes.component';
import { ListChangesComponent } from './list-changes/list-changes.component';

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    HomeComponent,
    JefesComponent,
    ListChangesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
