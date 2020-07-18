import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.Component';
import { LivrosComponent } from './livros/livros.component';
import { LivrosViewComponent } from './livros-view/livros-view.component';
import { LogoutComponent } from './logout/logout.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirecToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'livros', 
    component: LivrosComponent,
    canActivate : [AngularFireAuthGuard],
    data : { authGuardPipe : redirecToLogin }
  },

  { 
    path: 'livros/:id', component: LivrosViewComponent,
    canActivate : [AngularFireAuthGuard],
    data : { authGuardPipe : redirecToLogin }
  },

  { 
    path: 'logout', component: LogoutComponent,
    canActivate : [AngularFireAuthGuard],
    data : { authGuardPipe : redirecToLogin }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
