import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactModule } from './contact/contact.module';
import { PostsModule } from './posts/posts.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule} from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
// import { UploadFilesComponent } from './upload-files/upload-files.component';


var config = {
  apiKey: "AIzaSyADfdFvIiZujEwXR37MIoZXWxg-cKcZXSg",
  authDomain: "blogpage-cc687.firebaseapp.com",
  projectId: "blogpage-cc687",
  storageBucket: "blogpage-cc687.appspot.com",
  messagingSenderId: "354029469826",
  appId: "1:354029469826:web:879036eaa38eaa57cf349b",
  measurementId: "G-89Z8M0LXG1"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    FooterComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ContactModule,
    PostsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    NgbModule,
    RouterModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {

  
 }

