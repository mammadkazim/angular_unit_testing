import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';

import { PostDetailComponent } from './post-detail.component';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/Post/post.service';
import { of } from 'rxjs';
import { Post } from '../../models/Post';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;
  let mockActivatedRoute: any;
  let mockLocation: any;
  let mockPostService: jasmine.SpyObj<PostService>;
  let mockPost = {
    id: 3,
    body: 'body 3',
    title: 'title 3',
  } as Post
  beforeEach(() => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get'),
        },
      },
    };
    mockLocation = jasmine.createSpyObj(['back']);
    mockPostService = jasmine.createSpyObj(['updatePost', 'getPost']);
    TestBed.configureTestingModule({
      declarations: [PostDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: PostService, useValue: mockPostService },
        { provide: Location, useValue: mockLocation },
      ],
      imports:[FormsModule]
      // schemas:[NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render the title in h3', () => {
    mockPostService.getPost.and.returnValue(
      of(mockPost)
    );
    component.post = mockPost
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h3').textContent).toEqual(fixture.componentInstance.post.title)
    //using debugElement
    let title = fixture.debugElement.query(By.css('h3')).nativeElement
    expect(title.textContent).toEqual('title 3')
  });
});
