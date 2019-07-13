import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasklistComponent } from './tasklist.component';

const routes: Routes = [
  { path: 'tasklist', component: TasklistComponent },
  { path: '**', redirectTo: 'tasklist'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
