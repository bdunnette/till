Taxes = new Mongo.Collection('taxes');

TaxSchema = new SimpleSchema({
  taxRate: {
    type: Number,
    decimal: true
  },
  startDate: {
    type: Date,
    optional: true
  },
  endDate: {
    type: Date,
    optional: true
  }
});

Taxes.attachSchema(TaxSchema);

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Taxes.find().count() === 0) {
      Taxes.insert({
        startDate: new Date("2000-01-01"),
        endDate: new Date("2040-12-31"),
        taxRate: 0.07775
      });
    }
  });
  
  Taxes.allow({
    insert: function (userId, doc) {
      return false;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return false;
    },

    remove: function (userId, doc) {
      return false;
    }
  });

  Taxes.deny({
    insert: function (userId, doc) {
      return true;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return true;
    },

    remove: function (userId, doc) {
      return true;
    }
  });
}
