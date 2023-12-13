import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/Post/post.service';
import { Post } from '../../models/Post';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  post: Post
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPost()
  }
  getPost(){
    const id = this.route.snapshot.paramMap.get('id')
    id && this.postService.getPost(+id).subscribe(post=>{
      this.post = post
    })
  }
  goBack(){
    this.location.back()
  }
  save(){
    this.postService.updatePost(this.post).subscribe(()=>this.goBack())
  }
}
