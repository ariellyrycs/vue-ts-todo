
import {elapsedTimeFormat, firstUpperCase} from '../helpers';


describe('elapsedTimeFormat', () => {
  let realDateNow: any;
  beforeAll(() => {
    realDateNow = Date.now.bind(global.Date);
    const dateNowStub = jest.fn(() => 1613267502299);
    global.Date.now = dateNowStub;
  });

  afterAll(() => {
    global.Date.now = realDateNow;
  });
  
  test('should display the right text', () => {
    expect(elapsedTimeFormat('2021-02-14T01:49:42.299Z')).toBe('- 2 minutes');
  });
});

describe('firstUpperCase', () => {
  test('should display the right text', () => {
    expect(firstUpperCase('today i have to go to the market')).toBe('Today i have to go to the market')
  });
});