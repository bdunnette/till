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