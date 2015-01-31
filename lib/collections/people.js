People = new Mongo.Collection("people");

PeopleSchema = new SimpleSchema({
  name: {
    type: String
  },
  email: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Email
  }
});

People.attachSchema(PeopleSchema);

People.allow({
  insert: function (userId, doc) {
    return true
  },
  update: function (userId, doc, fieldNames, modifier) {
    return true
  },
  remove: function (userId, doc) {
    return true
  }
});

People.deny({
  insert: function (userId, doc) {
    return false
  },
  update: function (userId, doc, fieldNames, modifier) {
    return false
  },
  remove: function (userId, doc) {
    return false
  }
});

Router.route('/people', function () {
  this.render('PeopleList', {
    data: function () {
      return People.find();
    }
  });
}, {
  name: 'PeopleList'
});

Router.route('/people/:_id', function () {
  this.render('PeopleView', {
    data: function () {
      return People.findOne({
        _id: this.params._id
      });
    }
  });
}, {
  name: 'PeopleView'
});

Router.route('/people/:_id/edit', function () {
  this.render('PeopleEdit', {
    data: function () {
      return People.findOne({
        _id: this.params._id
      });
    }
  });
}, {
  name: 'PeopleEdit'
});
