import { Component, OnInit, ViewChild } from '@angular/core';
import { PostsService } from '../posts.service';


@Component({
  selector: 'wsb-posts-list',
  templateUrl: `./posts-list.component.html`,
  styleUrls: [ './posts-list.component.css' ]
})
export class PostsListComponent implements OnInit {

  @ViewChild('querryInput') querryInputElement;

 
  posts: any =[];
  constructor(public postService: PostsService){}

public find(){
    const querry = this.querryInputElement.nativeElement.value;
    this.postService.querryPosts(querry).then(response => {this.posts=response;})
}

  ngOnInit(): void{ 
    this.postService.getPosts().then(response => {this.posts=response;})
}

ngAfterViewInit(): void {
  console.log(this.querryInputElement)}
}

