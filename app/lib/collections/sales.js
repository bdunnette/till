Sales = new Mongo.Collection('sales');

Sales.helpers({
  customer: function() {
    return People.findOne(this.customerId);
  },
  
  subtotal: function() {
      var subtotal = 0;
      for (var i in this.items) {
          subtotal += this.items[i].extendedPrice;
      }
      return subtotal;
  }
});

if (Meteor.isServer) {
  Sales.allow({
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

  Sales.deny({
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
