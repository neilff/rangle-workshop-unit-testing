import { expect } from 'chai';

import rbacSelector from './rbac-selector';

describe('02-saving-time', () => {
  context('rbacSelector: ', function() {
    const oldResponse = {
      userId: 'xxx',
      userName: 'someUser',
      permissions: {
        expense: {
          canUpdate : true,
          canCreate : false,
          canDelete: true,
          canApprove: true
        },
        account: {
          canUpdate : true,
          canCreate : false,
          canDelete: true,
        },
        expenseLine: {
          canUpdate : true,
          canCreate : false,
          canDelete: true,
          canApprove: true
        }
      }
    };

    // const newResponse = {
    //   userId: 'xxx',
    //   userName: 'someUser',
    //   expense: {
    //     permissions: {
    //       canUpdate : true,
    //       canCreate : false,
    //       canDelete: true,
    //       canApprove: true
    //     },
    //   },
    //   account: {
    //     permissions: {
    //       canUpdate : true,
    //       canCreate : false,
    //       canDelete: true,
    //     },
    //   },
    //   expenseLine: {
    //     permissions: {
    //       canUpdate : true,
    //       canCreate : false,
    //       canDelete: true,
    //       canApprove: true
    //     },
    //   },
    // };

    // Don't forget to test the case of when no permissions object is provided
    it('should return true if there are no permissions required', () => {
      const expected = true;
      const actual = rbacSelector(oldResponse, {});

      expect(actual).to.equal(expected);
    });

    // Don't forget to test the case of when a poorly formed permissions object
    // is provided
    it('should return an error if a poor permissions object is provided', () => {
      expect(() => rbacSelector(oldResponse, { allRequired: {} })).to.throw(TypeError);
    });

    context('allRequired', () => {
      it('should return true if the user has ALL the allRequired values', () => {
        const expected = true;
        const actual = rbacSelector(oldResponse, {
          allRequired: [
            ['account', 'canUpdate'],
            ['expense', 'canUpdate'],
          ],
        });

        expect(actual).to.equal(expected);
      });

      it('should return false if the user does not have ALL the allRequired values', () => {
        const expected = false;
        const actual = rbacSelector(oldResponse, {
          allRequired: [
            ['account', 'canCreate'],
            ['expense', 'canCreate'],
          ],
        });

        expect(actual).to.equal(expected);
      });
    });

    context('notRequired', () => {
      it('should return true if the user does NOT have ALL the notRequired values', () => {
        const expected = true;
        const actual = rbacSelector(oldResponse, {
          notRequired: [
            ['account', 'canCreate'],
            ['expense', 'canCreate'],
          ],
        });

        expect(actual).to.equal(expected);
      });

      it('should return false if the user does have ANY of the notRequired values', () => {
        const expected = false;
        const actual = rbacSelector(oldResponse, {
          notRequired: [
            ['account', 'canCreate'],
            ['expense', 'canUpdate'],
          ],
        });

        expect(actual).to.equal(expected);
      });
    });

    context('anyRequired', () => {
      it('should return true if the user has ANY of the anyRequired values', () => {
        const expected = true;
        const actual = rbacSelector(oldResponse, {
          anyRequired: [
            ['account', 'canUpdate'],
            ['account', 'canCreate'],
          ],
        });

        expect(actual).to.equal(expected);
      });

      it('should return false if the user does not have ANY the anyRequired values', () => {
        const expected = false;
        const actual = rbacSelector(oldResponse, {
          anyRequired: [
            ['account', 'canCreate'],
            ['expense', 'canCreate'],
          ],
        });

        expect(actual).to.equal(expected);
      });
    });
  });
});
