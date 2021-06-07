import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from "./posts"

@Injectable({
  providedIn: 'root'
})

export class PostsService {

  private url: string = 'http://localhost:3000/posts';
  users: Post[]=[];

  constructor(private httpClient: HttpClient){}

  public getPosts(){return this.httpClient.get(this.url).toPromise();}

  public postNew(newpost: Post){return this.httpClient.post(this.url, newpost).toPromise()}

  public getPost(id: string | number){return this.httpClient.get(`${this.url}/${id}`).toPromise();}

  public querryPosts(querry: string){return this.httpClient.get(`${this.url}?q=${querry}`).toPromise();}

  public deletePost(id: string | number){return this.httpClient.delete(`${this.url}/${id}`).toPromise();}

  public postUpdate(updatepost: Post,id: string | number){return this.httpClient.put(`${this.url}/${id}`, updatepost).toPromise()}

}
