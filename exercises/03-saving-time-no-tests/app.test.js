import { describe, it } from 'mocha';
import { expect } from 'chai';
import { deviceHealth } from './app';

/**
 * Questions:
 *
 * - What should we be testing here?
 * - What are the upper / lower boundaries?
 * - Can we spot the bug in the implementation?
 * - Is there a way we can improve this code?
 *
 */
describe('deviceHealth', () => {
  const config = {
    GOOD: { min: 0, max: 30 },
    WARN: { min: 31, max: 60 },
    CRITICAL: { min: 61, max: 100 },
  };

  it('should return NULL if the value is below the minimum', () => {
    const expected = 'NULL';
    const actual = deviceHealth(config, -1).level;

    expect(actual).to.equal(expected);
  });

  it('should return NULL if the device is above the maximum', () => {
    const expected = 'NULL';
    const actual = deviceHealth(config, 101).level;

    expect(actual).to.equal(expected);
  });

  it('should return GOOD if the device is in a good state', () => {
    const expected = 'GOOD';
    const actual = deviceHealth(config, 29).level;

    expect(actual).to.equal(expected);
  });

  it('should return WARN if the device is in a warning state', () => {
    const expected = 'WARN';
    const actual = deviceHealth(config, 32).level;

    expect(actual).to.equal(expected);
  });

  it('should return CRITICAL if the device is in a critical state', () => {
    const expected = 'CRITICAL';
    const actual = deviceHealth(config, 62).level;

    expect(actual).to.equal(expected);
  });

  it('should return CRITICAL if the device is in a critical state', () => {
    const expected = 'CRITICAL';
    const actual = deviceHealth(config, 61).level;

    expect(actual).to.equal(expected);
  });
});