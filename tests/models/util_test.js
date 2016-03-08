'use strict';

describe('models/util', function() {
  it('has method dateSubtract()', function(done) {
    expect(new ModelUtils()).to.respondTo('dateSubtract');
    done();
  });
  it('has method colToMinutes()', function(done) {
    expect(new ModelUtils()).to.respondTo('colToMinutes');
    done();
  });
  describe('pgsql', function() {
    it('dateSubtract() returns expected value', function(done) {
      let actual = new ModelUtils('pgsql').dateSubtract('now', 'value');
      expect(actual).to.have.property('val', 'NOW() - value');
      done();
    });
    it('colToMinutes() returns expected value', function(done) {
      let actual = new ModelUtils('pgsql').colToMinutes('table.col');
      expect(actual).to.equal("CAST(table.col || ' minutes')");
      done();
    });
  });
  describe('mysql', function() {
    it('dateSubtract() returns expected value', function(done) {
      let actual = new ModelUtils('mysql').dateSubtract('now', 'value');
      expect(actual).to.have.property('fn', 'DATE_SUB');
      expect(actual.args).to.eql(['NOW()','value']);
      done();
    });
    it('colToMinutes() returns expected value', function(done) {
      let actual = new ModelUtils('mysql').colToMinutes('table.col');
      expect(actual).to.equal('INTERVAL CONVERT(`table.col` SIGNED INTEGER) MINUTE)');
      done();
    });
  });
  describe('sqlite', function() {
    it('dateSubtract() returns expected value', function(done) {
      let actual = new ModelUtils('sqlite').dateSubtract('now', 'value');
      expect(actual).to.have.property('fn', 'date');
      expect(actual).to.have.deep.property('args[0]', 'now');
      expect(actual).to.have.deep.property('args[1].val', "'-'||value");
      // expect(actual).to.eql(expected); // TODO: YTF doesn't this work???
      //  probably because it is not a simple Object, but a type of object
      done();
    });
    it('colToMinutes() returns expected value', function(done) {
      let actual = new ModelUtils('sqlite').colToMinutes('table.col');
      expect(actual).to.equal("table.col||' minutes'");
      done();
    });
  });
});
