import { take } from 'rxjs';
import { PostComponent } from './post.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('post component', () => {
  let fixture: ComponentFixture<PostComponent>;
  let component: PostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
  });
  it('should create the component using testbed', () => {
    expect(component).toBeTruthy();
  });
  it('should render the title in template inside a when post is defined', () => {
    component.post = { id: 1, body: 'body 1', title: 'title 1' };
    fixture.detectChanges();
    let a = fixture.nativeElement.querySelector('a');
    expect(a.textContent).toEqual('title 1');
  });
  //using debugElement
  it('should render the title in template inside a when post is defined', () => {
    component.post = { id: 1, body: 'body 1', title: 'title 1' };
    fixture.detectChanges();
    let a = fixture.debugElement.query(By.css('a')).nativeElement;
    expect(a.textContent).toEqual('title 1');
  });
  it('should raise event when delete button is clicked', () => {
    const post = { id: 1, body: 'body1', title: 'title1' };
    component.post = post;
    component.onDeletePost(new MouseEvent('click'));
    component.deleteEvent
      .pipe(take(1))
      .subscribe((emittedValue) => {expect(emittedValue).toEqual(post)
      });
  });

});
