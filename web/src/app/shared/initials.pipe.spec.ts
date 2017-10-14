import { InitialsPipe } from './initials.pipe';

describe('InitialsPipe', () => {
  it('creates an instance', () => {
    const pipe = new InitialsPipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms empty value to question marks', () => {
    const pipe = new InitialsPipe();
    expect(pipe.transform('')).toBe('??');
  });

  it('transforms single work into single letter', () => {
    const pipe = new InitialsPipe();
    expect(pipe.transform('Victory')).toBe('V');
  });

  it('transforms two words into intials', () => {
    const pipe = new InitialsPipe();
    expect(pipe.transform('Ivan Smirnov')).toBe('IS');
  });
});
