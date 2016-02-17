var models = require('../models');

// models.sequelize.transaction({ isolationLevel: models.Sequelize.Transaction.SERIALIZABLE },
// function(t) { /* do stuff */ t.rollback(); });
models.
  User.create({
    id: 1,
    login: 'jeremy',
    pwd_hash: 'asdfadfds'
  })
  .then(function() {
    return models.
      FeedCategory.create({
        id: 1,
        owner_uid: 1,
        title: 'blagah'
      });
  })
  .then(function() {
    return models.
      Feed.create({
        owner_uid: 1,
        title: 'Wine HQ',
        feed_url:'http://www.winehq.org/news/rss/',
        cat_id: 1
      });
  })
  .then(function(val) {
    console.log('Done', val);
  })
;

// var feed = models.Feed.build({ feed_url: 'http://www.winehq.org/news/rss/', owner_uid: 1 });

// fetching models with associations
models.Feed.findAll({
  attributes: [ 'id', 'title' ],
  include: [
    {
      model: models.User,
      attributes: [],
      where: { id: 1 }
    },{
      model: models.FeedCategory,
      attributes: [],
      where: { id: 1 }
    }
  ]
})
.then( a => {
  a.forEach( a => {
    console.log(a.id, a.title)
  })
});

// accessing attributes on associated model
models.Feed.findAll({ limit: 1, attributes: [ 'id', 'title' ], include: [ {model: models.FeedCategory } ]}).then( a => { a.forEach( a => { console.log(a.id, a.title, a.FeedCategory.title) }) });
