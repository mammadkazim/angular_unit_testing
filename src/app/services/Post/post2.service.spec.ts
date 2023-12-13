import { HttpClient } from '@angular/common/http';
import { PostService } from './post.service';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('post2 service', () => {
  const POSTS = [
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

  let postService: PostService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostService],
      imports: [HttpClientTestingModule],
    });
    postService = TestBed.inject(PostService);
    // another way of injecting a service as spy
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  describe('getPosts', () => {
    it('should return posts when getPosts() is invoked', (done:DoneFn) => {
      httpClient.get('url').subscribe((data) => {
        expect(data).toEqual(POSTS)
        done()
        for (let i = 0; i < POSTS.length; i++) {
          expect(data[i].title).toEqual(POSTS[i].title);
        }
      });
      let req = httpTestingController.expectOne('url');
      req.flush(POSTS);
      expect(req.request.method).toEqual('GET');
    });
    // we can also use directly the method from actual service itself instead of httpClient.get
    it('should return posts when getPosts() is invoked', (done:DoneFn) => {
      postService.getPosts().subscribe((data) => {
        expect(data).toEqual(POSTS)
        done()
        for (let i = 0; i < POSTS.length; i++) {
          expect(data[i].title).toEqual(POSTS[i].title);
        }
      });
      let request = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/posts');
      request.flush(POSTS);
      expect(request.request.method).toEqual('GET');
    });
    it('should return one post when getPost() is called with postId', (done:DoneFn) => {
      postService.getPost(1).subscribe((data) => {
        expect(data).toEqual(POSTS[1])
        done()
      });
      let request = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/posts/1');
      request.flush(POSTS[1]);
      expect(request.request.method).toEqual('GET');
    });
  });
  afterEach(()=>{
    // this verifies that httpTestingController makes only one call for each test, so there is not any other open http request
    httpTestingController.verify()
  })
}); 
