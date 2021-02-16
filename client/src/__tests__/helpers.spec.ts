
import {elapsedTimeFormat, firstUpperCase} from '../helpers';


describe('elapsedTimeFormat', () => {
  let dateNowSpy: any;
  beforeAll(() => {
    dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => 1487076708000);
  });

  afterAll(() => {
    dateNowSpy.mockRestore();
  });
  
  test('should display the right text', () => {
    expect(elapsedTimeFormat('2021-02-14T01:49:42.299Z')).toBe('- 4070 minutes');
  });
});

describe('firstUpperCase', () => {
  test('should display the right text', () => {
    expect(firstUpperCase('today i have to go to the market')).toBe('Today i have to go to the market')
  });
});