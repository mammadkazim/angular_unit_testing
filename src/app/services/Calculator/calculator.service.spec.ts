import { TestBed } from '@angular/core/testing';
import { LoggerService } from '../Logger/logger.service';
import { CalculatorService } from './calculator.service';

describe('calc service', () => {
  let mockLoggerService:any
  let calcService: CalculatorService
  // as a different method to spy an injected service
  let loggerServiceSpy: jasmine.SpyObj<LoggerService>
  // we can use both mockLoggerservice or loggerServiceSpy
  beforeEach(()=>{
    mockLoggerService = jasmine.createSpyObj('service',['log','ko']); //instead of instanciating the actual service we create spy obj and add log method
    TestBed.configureTestingModule({
      providers:[CalculatorService,
        {
          provide: LoggerService, useValue: mockLoggerService
        }
      ]
    })
    calcService = TestBed.inject(CalculatorService);
    // to inject the log service we can also use the below method:
    loggerServiceSpy = TestBed.inject(LoggerService) as jasmine.SpyObj<LoggerService> // we need to provuide the type as ...
  })

  it('should add 2 nums', () => {
    let result = calcService.add(2, 3);
    expect(result).toEqual(5);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1)
    expect(mockLoggerService.ko).not.toHaveBeenCalled() // because actual loggerservice does not have this method even we add in spy obj
    
  });
  it('should subtract 2 nums', () => {
    // const loggerService = new LoggerService();
    // spyOn(loggerService,'log').and.callThrough() // callthrough makes actual call even we spy
    // above 2 lines are also the simple different method to spy a service
    // const calcService = new CalculatorService(loggerService);
    let result = calcService.subtract(2, 3);
    expect(result).toEqual(-1);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1)

  });
});
 