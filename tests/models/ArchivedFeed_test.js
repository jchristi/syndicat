'use strict';

describe('ArchivedFeed', () => {
  describe('associations', () => {
    it('has User property', async () => {
      expect(readonly.models.ArchivedFeed.associations).to.have.property('User');
    });
    it('has UserEntries property', async () => {
      expect(readonly.models.ArchivedFeed.associations).to.have.property('UserEntries');
    });
  });

//   describe.skip('with fixtures', function() {
//     beforeEach('create ArchivedFeed fixtures', co.wrap(function* () {
//       db = yield getTestDB();
//       let _result = yield db.loadModels(['User', 'ArchivedFeed']);
//       _result = yield db.syncAllModels();
//       ctx.user1 = yield db.createTestModel('User', { id: 2 });
//       ctx.feed1 = yield db.createTestModel('ArchivedFeed', { id: 2, owner_uid: 2 });
//     }));
//     it('has User property', co.wrap(function* () {
//       let afeed = yield db.ArchivedFeed.findOne({ id: 2, include: [ db.User ]});
//       expect(afeed).to.have.property('User');
//     }));
//     //it('has UserEntries property', co.wrap(function* () {
//       // let afeed = yield db.ArchivedFeed.findOne({ id: 2, attributes: ['id'],
//         // include:
//     //}));
//   });

});
