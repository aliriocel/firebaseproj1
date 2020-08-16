import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.Component';
import { LivrosComponent } from './livros/livros.component';
import { LivrosViewComponent } from './livros-view/livros-view.component';
import { LogoutComponent } from './logout/logout.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { LivrosDeleteComponent } from './livros-delete/livros-delete.component';
import { LivrosUpdateComponent } from './livros-update/livros-update.component';
import { LivrosNewComponent } from './livros-new/livros-new.component';
import { UsuarioNewComponent } from './usuario-new/usuario-new.component';
import { LivroImagemComponent } from './livro-imagem/livro-imagem.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LivroBuscaTituloComponent } from './livro-busca-titulo/livro-busca-titulo.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ClienteDeleteComponent } from './cliente-delete/cliente-delete.component';
import { ClienteNewComponent } from './cliente-new/cliente-new.component';
import { ClienteUpdateComponent } from './cliente-update/cliente-update.component';
import { ClienteViewComponent } from './cliente-view/cliente-view.component';
import { ClienteBuscaNomeComponent } from './cliente-busca-nome/cliente-busca-nome.component';

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
    path: 'livros/new', component: LivrosNewComponent,
    canActivate : [AngularFireAuthGuard],
    data : { authGuardPipe : redirecToLogin }
  

  },

  { 
    path: 'livros/update/:id', component: LivrosUpdateComponent,
    canActivate : [AngularFireAuthGuard],
    data : { authGuardPipe : redirecToLogin }
  

  },

  { 
    path: 'livros/delete/:id', component: LivrosDeleteComponent,
    canActivate : [AngularFireAuthGuard],
    data : { authGuardPipe : redirecToLogin }
  

  },


  { 
    path: 'livros/:id', 
    component: LivrosViewComponent, 
    canActivate: [AngularFireAuthGuard],
    data : { authGuardPipe : redirecToLogin }
  },

  { 
    path: 'livros/busca/titulo', 
    component: LivroBuscaTituloComponent, 
    canActivate: [AngularFireAuthGuard],
    data : { authGuardPipe : redirecToLogin }  
  },

  { 
    path: 'login/new', component: UsuarioNewComponent,
  },

  { 
    path: 'perfil', component: PerfilComponent,
    canActivate : [AngularFireAuthGuard],
    data : { authGuardPipe : redirecToLogin }
  },

  { 
    path: 'cliente', component: ClienteComponent,
    canActivate : [AngularFireAuthGuard],
    data : { authGuardPipe : redirecToLogin }
  },

  { 
    path: 'cliente/delete/:id', component: ClienteDeleteComponent,
    canActivate : [AngularFireAuthGuard],
    data : { authGuardPipe : redirecToLogin }
  },

  { 
    path: 'cliente/:id', 
    component: ClienteViewComponent, 
    canActivate: [AngularFireAuthGuard],
    data : { authGuardPipe : redirecToLogin }
  },

  { 
    path: 'cliente/new', component: ClienteNewComponent,
    canActivate : [AngularFireAuthGuard],
    data : { authGuardPipe : redirecToLogin }
  },

  { 
    path: 'cliente/update/:id', component: ClienteUpdateComponent,
    canActivate : [AngularFireAuthGuard],
    data : { authGuardPipe : redirecToLogin }
  },

  { 
    path: 'cliente/busca/titulo', 
    component: ClienteBuscaNomeComponent, 
    canActivate: [AngularFireAuthGuard],
    data : { authGuardPipe : redirecToLogin }  
  },
  

  { 
    path: 'livros/imagem/:id', component: LivroImagemComponent,
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
