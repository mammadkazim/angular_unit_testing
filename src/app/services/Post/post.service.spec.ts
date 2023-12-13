import { HttpClient } from "@angular/common/http";
import { PostService } from "./post.service";
import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";

describe('post service', () => {
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
    let postService: PostService
    let httpClientSpy: jasmine.SpyObj<HttpClient>
    let httpClientSpy2: jasmine.SpyObj<HttpClient>
    beforeEach(()=>{

        httpClientSpy = jasmine.createSpyObj('HttpClient',['get'])
        TestBed.configureTestingModule({
            providers:[
                PostService,
                {
                    provide: HttpClient,
                    useValue: httpClientSpy
                }
            ]
        })
        postService = TestBed.inject(PostService)
        // another way of injecting a service as spy
        httpClientSpy2 = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>
    })
    describe('getPosts',()=>{
        it('should return posts when getPosts() is invoked sp2',(done: DoneFn)=>{
            httpClientSpy2.get.and.returnValue(of(POSTS))
            postService.getPosts().subscribe(
             {
                next: posts=> {
                    expect(posts).toEqual(POSTS)
                    done()
                },
                error: done.fail
             }
            )
            expect(httpClientSpy2.get).toHaveBeenCalledTimes(1)
        })
        it('should return posts when getPosts() is invoked',(done: DoneFn)=>{
            httpClientSpy.get.and.returnValue(of(POSTS))
            postService.getPosts().subscribe(
             {
                next: posts=> {
                    expect(posts).toEqual(POSTS)
                    done()
                },
                error: done.fail
             }
            )
            expect(httpClientSpy.get).toHaveBeenCalledTimes(1)
        })
    })
});

