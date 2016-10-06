import { describe, it } from 'mocha';
import { expect } from 'chai';

import { calculateWage } from './wage-calculator';


/**
 * Questions:
 *
 * - What are some of the expected / unexpected values we should test?
 * - What are some of the boundaries that we should test?
 * - How are some of the ways in which we could refactor to improve this code?
 *
 */
describe('function calculateWage: ', function() {
  it ('should return the hourly wage with no bonus if the worker worked regular time', function() {
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
