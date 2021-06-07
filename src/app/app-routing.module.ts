import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component'
import { LoginComponent } from './login/login.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { PostsAllComponent } from './posts/posts-all/posts-all.component';
import { PostsNewComponent } from './posts/posts-new/posts-new.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { ContactComponent } from './contact/contact.component';
import { WrongpathComponent } from './wrongpath/wrongpath.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full'},
  { path: 'admin-panel', component: AdminPanelComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: "posts-all", component: PostsAllComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: "posts-new", component: PostsNewComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'login', component: LoginComponent },
  { path: "homepage", component: HomepageComponent},
  { path: "posts", component: PostsListComponent},
  { path: "contact", component: ContactComponent},
  { path: "wrongpath", component: WrongpathComponent},
  { path: "**", redirectTo: "/wrongpath"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
