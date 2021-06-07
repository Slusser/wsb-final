import { Component, OnInit,Inject } from '@angular/core';
import { PostsService } from '../posts.service';
import {MatDialog} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UploadFilesService } from 'src/app/upload-files.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'wsb-posts-all',
  templateUrl: `posts-all.component.html`,
  styleUrls: ['posts-all.component.css'],
})

export class PostsAllComponent implements OnInit {
  posts: any =[];

  constructor(public postService: PostsService, public dialog: MatDialog,) { }

  public deletePostbyId(id: number){
    this.postService.deletePost(id)
    setTimeout(()=>{                         
      this.postService.getPosts().then(response => {this.posts=response;})
    }, 1000);
  }

  openDialog(id,title,date,text,src) {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {data: {id,title,date,text,src},});
    
    dialogRef.afterClosed().subscribe(result => {this.postService.getPosts().then(response => {this.posts=response;})});
  }

  ngOnInit(): void {this.postService.getPosts().then(response => {this.posts=response;})
}
}

@Component({
  selector: 'modal-posts',
  templateUrl: 'modal.html',
  styleUrls: ['modal.css'],
})

export class DialogContentExampleDialog {
  public postsFormEdit: FormGroup;
  fileInfos?: Observable<any>;

  posts: any =[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: string | number,title:string,date: number,text: string,src: string},private formBuilder: FormBuilder,public postsService: PostsService, private uploadService: UploadFilesService) {}
  
  ngOnInit(): void {
    this.postsFormEdit = this.formBuilder.group({
      title: [this.data.title,Validators.minLength(3)],
      date: [this.data.date],
      src: [this.data.src],
      fileSource: ['', Validators.required],
      fileName: [''],
      text: [this.data.text,Validators.minLength(10)],
    });
    this.fileInfos = this.uploadService.getFiles();
  }

  public save(): void {

    const formValue = this.postsFormEdit.getRawValue();
    let post_new = formValue

    if (this.postsFormEdit.valid){
      post_new.src = this.postsFormEdit.get('fileName').value.name;
      this.postsService.postUpdate(post_new,this.data.id)
      .then(response => {
        this.upload();
        console.log('Post zapisany!', response)
      })
      setTimeout(()=>{                
        this.postsService.getPosts().then(response => {this.posts=response;})
   }, 1000);
    }

  }


  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  upload(): void {
    this.progress = 0;
  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
  
      if (file) {
        this.currentFile = file;
  
        this.uploadService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;
  
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
  
            this.currentFile = undefined;
          });
      }
  
      this.selectedFiles = undefined;
    }
  }

  onFileSelected(event) {
    this.selectedFiles = event.target.files;
    if(event.target.files.length > 0) 
     {
       this.postsFormEdit.patchValue({
          fileName: event.target.files[0],
       })
     }
  }

}
