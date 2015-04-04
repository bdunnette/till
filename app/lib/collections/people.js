People = new Mongo.Collection('people');

PersonSchema = new SimpleSchema({
    name: {
        type: String
    },
    email: {
        type: String,
        optional: true
    }
});

People.attachSchema(PersonSchema);

if (Meteor.isServer) {
  People.allow({
    insert: function (userId, doc) {
      return true;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return true;
    },

    remove: function (userId, doc) {
      return false;
    }
  });

  People.deny({
    insert: function (userId, doc) {
      return false;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return false;
    },

    remove: function (userId, doc) {
      return true;
    }
  });
}
