import { describe, it } from 'mocha';
import { expect } from 'chai';

import { calculateWage } from './wage-calculator';

describe('function calculateWage: ', function() {
  it ('should return the hourly wage with no bonus if the worker worked regular time', function() {
    // Using Date can be risky here, depending on what day this test is run
    // it might fail. The function might be considered easier to test if it
    // did not use Date at all and instead used unix time
    const startDate = new Date('July 18, 2015');
    startDate.setDate(startDate.getDate() - 2);

    const endDate = new Date('July 18, 2015');

    const expected = '480.00';
    const actual = calculateWage(startDate, endDate, 10);

    expect(actual).to.equal(expected);
  });

  it ('should return the hourly wage with a bonus if the worker worked overtime', function() {
    const startDate = new Date('September 12, 2016');
    startDate.setDate(startDate.getDate() - 2);

    const endDate = new Date('September 12, 2016');

    const expected = '720.00';
    const actual = calculateWage(startDate, endDate, 10);

    expect(actual).to.equal(expected);
  });
});
