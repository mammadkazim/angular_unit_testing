import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../../models/Post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post!: Post
  @Output() deleteEvent: EventEmitter<Post> = new EventEmitter<Post>()
  constructor(){}
  ngOnInit(): void {
    
  }
  onDeletePost(event:Event){
    event.stopPropagation()
    this.deleteEvent.emit(this.post)
  }
}
