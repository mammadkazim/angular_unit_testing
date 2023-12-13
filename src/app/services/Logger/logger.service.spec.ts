 import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[LoggerService]
    });
    service = TestBed.inject(LoggerService);
    // service= new LoggerService() // we can use this simple instantiation of service method tooo
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('messages should be empty initially',()=>{
    expect(service.messages.length).toEqual(0)
  })
  it('messages should add message to messages when log method is init',()=>{
    service.log('message')
    expect(service.messages.length).toEqual(1)
    expect(service.messages.includes('message')).toBe(true)
  })
  it('messages should clear messages array when clear method is init',()=>{
    service.clear()
    expect(service.messages.length).toEqual(0)
  })
});
