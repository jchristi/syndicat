'use strict';
//TEST SETUP
let Entry;
let assert = chai.assert;
let getEntry = () =>  {
  return {
    id: 1,
    title: 'Test Entry',
    guid: '1',
    link: 'Test Link 1',
    updated: new Date(),
    content: 'Test Content 1',
    content_hash: 'Test Content Hash 1',
    cached_content: 'Test Cached Content 1',
    date_entered: new Date(),
    date_updated: new Date(),
    lang: 'English'
  };
};

describe('Entry', function() {
  co.wrap(function* () {
    let sequelize = yield getTestDB();
    Entry = sequelize.models.Entry;
  })();
  it('Saves and retrieves successfully', co.wrap(function* () {
    yield Entry.sync({force: true});
    let insert = getEntry();
    yield Entry.create(insert);

    let retrieve = yield Entry.findById('1');

    expect(retrieve.id).to.equal(insert.id);
    expect(retrieve.title).to.equal(insert.title);
    expect(retrieve.guid).to.equal(insert.guid);
    expect(retrieve.link).to.equal(insert.link);
    expect(retrieve.updated.getTime()).to.equal(insert.updated.getTime());
    expect(retrieve.content).to.equal(insert.content);
    expect(retrieve.content_hash).to.equal(insert.content_hash);
    expect(retrieve.cached_content).to.equal(insert.cached_content);
    expect(retrieve.date_entered.getTime()).to.equal(insert.date_entered.getTime());
    expect(retrieve.date_updated.getTime()).to.equal(insert.date_updated.getTime());
    expect(retrieve.lang).to.equal(insert.lang);
  }));
  it('Auto increments on id', co.wrap(function* () {
    yield Entry.sync({force: true});

    let insert1 = getEntry();
    let insert2 = getEntry();
    delete(insert1.id);
    delete(insert2.id);
    yield Entry.create(insert1);
    yield Entry.create(insert2);

    let retrieve = yield Entry.findAll();
    expect(retrieve).to.have.lengthOf(2);
    expect(retrieve[1].id).to.equal(retrieve[0].id + 1);
  }));
  it('Requires id to be an integer', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let Entry = sequelize.models.Entry;
    yield Entry.sync({force: true});

    let insert = getEntry();
    insert.id = 'STRING';

    let success = false;
    yield Entry.create(insert).then(function(response) {
      success = true;
    }).catch(function(e) {
      expect(e).to.not.be.null;
    });
    assert.isFalse(success, 'Exception not thrown with id as a string');
  }));

  it('Requires id to be unique', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let Entry = sequelize.models.Entry;
    yield Entry.sync({force: true});

    let insert1 = getEntry();
    let insert2 = getEntry();
    let success = false;
    yield Entry.create(insert1);
    yield Entry.create(insert2).then(function(response) {
      success = true;
    }).catch(function(e) {
      expect(e).to.not.be.null;
    });
    assert.isFalse(success, 'Exception not thrown when id is not unique');
  }));

  it('Requires title to be present', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let Entry = sequelize.models.Entry;
    yield Entry.sync({force: true});

    let insert = getEntry();
    delete(insert.title);

    let success = false;
    yield Entry.create(insert).then(function(response) {
      success = true;
    }).catch(function(e) {
      expect(e).to.not.be.null;
    });
    assert.isFalse(success, 'Exception not thrown when title is not present');
  }));

  it('Requires guid to be present', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let Entry = sequelize.models.Entry;
    yield Entry.sync({force: true});

    let insert = getEntry();
    delete(insert.guid);

    let success = false;
    yield Entry.create(insert).then(function(response) {
      success = true;
    }).catch(function(e) {
      expect(e).to.not.be.null;
    });
    assert.isFalse(success, 'Exception not thrown when guid is not present');
  }));

  it('Requires link to be present', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let Entry = sequelize.models.Entry;
    yield Entry.sync({force: true});

    let insert = getEntry();
    delete(insert.link);

    let success = false;
    yield Entry.create(insert).then(function(response) {
      success = true;
    }).catch(function(e) {
      expect(e).to.not.be.null;
    });
    assert.isFalse(success, 'Exception not thrown when link is not present');
  }));

  it('Requires updated to be present', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let Entry = sequelize.models.Entry;
    yield Entry.sync({force: true});

    let insert = getEntry();
    delete(insert.updated);

    let success = false;
    yield Entry.create(insert).then(function(response) {
      success = true;
    }).catch(function(e) {
      expect(e).to.not.be.null;
    });
    assert.isFalse(success, 'Exception not thrown when updated is not present');
  }));

  it('Requires content to be present', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let Entry = sequelize.models.Entry;
    yield Entry.sync({force: true});

    let insert = getEntry();
    delete(insert.content);

    let success = false;
    yield Entry.create(insert).then(function(response) {
      success = true;
    }).catch(function(e) {
      expect(e).to.not.be.null;
    });
    assert.isFalse(success, 'Exception not thrown when content is not present');
  }));

  it('Requires content_hash to be present', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let Entry = sequelize.models.Entry;
    yield Entry.sync({force: true});

    let insert = getEntry();
    delete(insert.content_hash);

    let success = false;
    yield Entry.create(insert).then(function(response) {
      success = true;
    }).catch(function(e) {
      expect(e).to.not.be.null;
    });
    assert.isFalse(success, 'Exception not thrown when content_hash is not present');
  }));

  it('When no_orig_date not present default to false', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let Entry = sequelize.models.Entry;
    yield Entry.sync({force: true});

    let insert = getEntry();
    yield Entry.create(insert);

    let retrieve = yield Entry.findById(insert.id);

    expect(retrieve.no_orig_date).to.be.false;
  }));

  it('Requires date_entered to be present', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let Entry = sequelize.models.Entry;
    yield Entry.sync({force: true});

    let insert = getEntry();
    delete(insert.date_entered);

    let success = false;
    yield Entry.create(insert).then(function(response) {
      success = true;
    }).catch(function(e) {
      expect(e).to.not.be.null;
    });
    assert.isFalse(success, 'Exception not thrown when date_entered is not present');
  }));

  it('Requires date_updated to be present', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let Entry = sequelize.models.Entry;
    yield Entry.sync({force: true});

    let insert = getEntry();
    delete(insert.date_updated);

    let success = false;
    yield Entry.create(insert).then(function(response) {
      success = true;
    }).catch(function(e) {
      expect(e).to.not.be.null;
    });
    assert.isFalse(success, 'Exception not thrown when date_updated is not present');
  }));

  it('When num_comments not present default to 0', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let Entry = sequelize.models.Entry;
    yield Entry.sync({force: true});

    let insert = getEntry();
    yield Entry.create(insert);

    let retrieve = yield Entry.findById(insert.id);

    expect(retrieve.num_comments).to.equal(0);
  }));

  it('When comments not present default to empty string', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let Entry = sequelize.models.Entry;
    yield Entry.sync({force: true});

    let insert = getEntry();
    yield Entry.create(insert);

    let retrieve = yield Entry.findById(insert.id);

    expect(retrieve.comments).to.be.empty;
  }));

  it('When author not present default to empty string', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let Entry = sequelize.models.Entry;
    yield Entry.sync({force: true});

    let insert = getEntry();
    yield Entry.create(insert);

    let retrieve = yield Entry.findById(insert.id);

    expect(retrieve.author).to.be.empty;
  }));
});
