import { HttpClient } from "@angular/common/http"
import { TestBed } from "@angular/core/testing"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"

describe('http client testing',()=>{
    let httpClient: HttpClient
    let httpTestingController: HttpTestingController
    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        })
        httpClient = TestBed.inject(HttpClient)
        httpTestingController = TestBed.inject(HttpTestingController)
    })

    it('should make a get request',()=>{
        const testData = {name:"km"}
        httpClient.get('/testUrl').subscribe(data=>{
            expect(data).toEqual(testData)
        })
        const request = httpTestingController.expectOne('/testUrl')
        request.flush(testData)
        expect(request.request.method).toBe('GET')
    })
    it('should make multiple get requests',()=>{
        const testDataArray = [{name:"km"},{name:'kz'}]
        httpClient.get('/testUrl').subscribe(data=>{
            expect(data).toEqual(testDataArray)
        })
        httpClient.get('/testUrl').subscribe(data=>{
            expect(data).toEqual(testDataArray[0])
        })
        httpClient.get('/testUrl').subscribe(data=>{
            expect(data).toBe(null)
        })

        const requests = httpTestingController.match('/testUrl')
        expect(requests.length).toEqual(3)
        requests[0].flush(testDataArray)
        requests[1].flush(testDataArray[0])
        requests[2].flush(null)
        expect(requests[0].request.method).toBe('GET')
        expect(requests[1].request.method).toBe('GET')
        expect(requests[2].request.method).toBe('GET')
    })

})
