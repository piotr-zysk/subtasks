import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: 'task', loadChildren: () => import('./task/task.module').then(m => m.TaskModule) },
  { path: 'test', component: TestComponent},
  { path: '**', redirectTo: 'task' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
