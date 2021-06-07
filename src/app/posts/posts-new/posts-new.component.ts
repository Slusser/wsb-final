import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';


import { UploadFilesService } from 'src/app/upload-files.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'wsb-posts-new',
  templateUrl: `./posts-new.component.html`,
  styleUrls: [`./posts-new-component.css`]
})

export class PostsNewComponent implements OnInit {
  public postsForm: FormGroup;
  public showErrors: boolean;

  constructor(private formBuilder: FormBuilder, private postsService: PostsService, private uploadService: UploadFilesService){}

  ngOnInit(): void {
    this.postsForm = this.formBuilder.group({
      title: [' ',Validators.minLength(3)],
      date: [' '],
      src: [''],
      fileSource: ['', Validators.required],
      fileName: [''],
      text: [' ',Validators.minLength(10)],
    });
    this.fileInfos = this.uploadService.getFiles();
  }

  public save(): void {
    this.showErrors = true;
    const formValue = this.postsForm.getRawValue();
    let post_new = formValue
    console.log(post_new)


    if (this.postsForm.valid){
      post_new.src = this.postsForm.get('fileName').value.name;
      console.log(post_new)
      this.postsService.postNew(post_new)
      .then(() => {
        this.showErrors=false;
        this.upload()
        this.reset();
      })
    }
  }

  public reset(): void{
    this.postsForm = this.formBuilder.group({
      title: [' ',Validators.minLength(3)],
      date: [' '],
      src: [''],
      fileSource: ['', Validators.required],
      fileName: [''],
      text: [' ',Validators.minLength(10)],
    })
  }

  
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  fileInfos?: Observable<any>;

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
         this.postsForm.patchValue({
            fileName: event.target.files[0],
         })
       }
    }
  }
