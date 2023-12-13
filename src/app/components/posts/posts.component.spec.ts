import { HttpClient } from '@angular/common/http';
import { Post } from '../../models/Post';
import { PostService } from '../../services/Post/post.service';
import { PostsComponent } from './posts.component';
import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-post',
  template: '<div>App Child</div>',
})
class FakeChildComponent {
  @Input() post: Post;
}
describe('posts component', () => {
  let POSTS: Post[];
  let fixture: ComponentFixture<PostsComponent>;
  let component: PostsComponent;
  let mockPostService: any;
  beforeEach(() => {
    POSTS = [
      {
        id: 1,
        body: 'body 1',
        title: 'title 1',
      },
      {
        id: 2,
        body: 'body 2',
        title: 'title 2',
      },
      {
        id: 3,
        body: 'body 3',
        title: 'title 3',
      },
    ];
    mockPostService = jasmine.createSpyObj(['getPosts', 'deletePost']);
    TestBed.configureTestingModule({
      declarations: [PostsComponent, PostComponent],
      providers: [
        {
          provide: PostService,
          useValue: mockPostService,
        },
      ],
      // schemas:[CUSTOM_ELEMENTS_SCHEMA] //this is for preventing app-post unknown error, but the best way is to fake child component
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
  });

  it('should assign the return value of getPosts to posts at ngOnInit', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS));
    component.ngOnInit();
    expect(component.posts.length).toEqual(3);
  });

  it('should delete the selected post when delete method is init', () => {
    let post = {
      id: 2,
      body: 'body 2',
      title: 'title 2',
    };
    mockPostService.deletePost.and.returnValue(of('anything'));
    component.posts = POSTS;
    component.delete(post);
    expect(component.posts.includes(post)).toBe(false);
  });
  it('should call the deletePost from the injected service once when the delete method is init', () => {
    component.posts = POSTS;
    mockPostService.deletePost.and.returnValue(of('anything'));
    component.delete(POSTS[1]);
    expect(mockPostService.deletePost).toHaveBeenCalled();
  });
  it('should create one child post component for every post in posts array', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();
    const postComponents = fixture.debugElement.queryAll(
      By.css('.post-wrapper')
    );
    expect(postComponents.length).toEqual(POSTS.length);
  });
  it('should create one child post component directive for every post in posts array', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();
    const postComponentDirectives = fixture.debugElement.queryAll(
      By.directive(PostComponent)
    );
    expect(postComponentDirectives.length).toEqual(POSTS.length);
  });
  it('should sent the correct post to child post component', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();
    const postComponentDirectives = fixture.debugElement.queryAll(
      By.directive(PostComponent)
    );
    postComponentDirectives.forEach((comp) => {
      expect(comp.componentInstance.post.title).toBeDefined();
    });
    for (let i = 0; i < postComponentDirectives.length; i++) {
      expect(postComponentDirectives[i].componentInstance.post.title).toEqual(
        POSTS[i].title
      );
    }
  });

  it('should trigger delete() with deletEvent from child post component when the button in child is clicked', () => {
    spyOn(component, 'delete');
    mockPostService.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();
    let PostComponentDEs = fixture.debugElement.queryAll(
      By.directive(PostComponent)
    );
    PostComponentDEs[0]
      .query(By.css('button'))
      .triggerEventHandler('click', { stopPropagation: () => {} });
    expect(component.delete).toHaveBeenCalled();
    expect(component.delete).toHaveBeenCalledTimes(1);
    expect(component.delete).toHaveBeenCalledWith(POSTS[0]);
  });
  it('should trigger delete() when deletEvent in child is emitted', () => {
    spyOn(component, 'delete');
    mockPostService.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();
    let PostComponentDEs = fixture.debugElement.queryAll(
      By.directive(PostComponent)
    );
    PostComponentDEs[1].componentInstance.deleteEvent.emit(POSTS[122]);
    expect(component.delete).toHaveBeenCalledWith(POSTS[1]);
    PostComponentDEs[0].componentInstance.deleteEvent.emit(POSTS[122]);
    expect(component.delete).toHaveBeenCalledWith(POSTS[0]);
    PostComponentDEs[2].componentInstance.deleteEvent.emit(POSTS[122]);
    expect(component.delete).toHaveBeenCalledWith(POSTS[2]);
    expect(component.delete).toHaveBeenCalledTimes(3);
    
  });
});
