import { Injectable } from '@angular/core';
import { Post } from '../../models/Post';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }
  getPosts(){
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
  }
  deletePost(post:Post){
    return this.http.delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`)

  }
  updatePost(post:Post){
    return this.http.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, post)

  }
  getPost(postId: number){
    return this.http.get<Post>(`https://jsonplaceholder.typicode.com/posts/${postId}`)
  }
}
