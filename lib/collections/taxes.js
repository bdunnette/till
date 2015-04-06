Taxes = new Mongo.Collection("taxes");

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

// On server startup, if the database is empty, create some initial data.
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
}
