import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  //{ path: 'pageName', component: pageNameComponent },   // create the component and fill in path and 
  //{ path: 'pageName', component:  pageNameComponent}     // component name and it should route the page 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
