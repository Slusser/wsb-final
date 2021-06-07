import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsListComponent } from './posts-list/posts-list.component';
import { HttpClientModule } from '@angular/common/http';
import { PostsNewComponent } from './posts-new/posts-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogContentExampleDialog, PostsAllComponent } from './posts-all/posts-all.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md'
// import { UploadFilesComponent } from '../upload-files/upload-files.component';


@NgModule({
  declarations: [
    PostsListComponent,
    PostsNewComponent,
    PostsAllComponent,
    DialogContentExampleDialog,
    // UploadFilesComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    CarouselModule,
    WavesModule,
  ],
  exports: [
    PostsListComponent,
    PostsNewComponent,
    PostsAllComponent,
    DialogContentExampleDialog
  ]
})

export class PostsModule{}
