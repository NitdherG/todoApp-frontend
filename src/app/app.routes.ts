import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./modules/example-page/example-page.component').then(
        (m) => m.ExamplePageComponent,
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./core/auth/components/login/login.component').then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: 'todo',
    loadComponent: () => import('./feature/todo/layout/todo-layout.component').then((m) => m.TodoLayoutComponent),
  }
];
