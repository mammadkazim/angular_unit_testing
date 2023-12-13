import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  let pipe:StrengthPipe
  beforeEach(()=>{
    pipe = new StrengthPipe();

  })
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('should return weak if value is less than 10', () => {
    expect(pipe.transform(3)).toEqual('3 weak');
  });
  it('should return strong if value is bigger than 10', () => {
    expect(pipe.transform(13)).toEqual('13 strong');
  });
});
