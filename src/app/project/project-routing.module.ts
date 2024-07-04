import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
 
const routes: Routes = [
  { path: '', redirectTo: 'project/index', pathMatch: 'full'},
  { path: 'project', redirectTo: 'project/index', pathMatch: 'full'},
  { path: 'project/index', component: IndexComponent },
  { path: 'project/:id/show', component: ShowComponent },
  { path: 'project/create', component: CreateComponent },
  { path: 'project/:id/edit', component: EditComponent } 
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }