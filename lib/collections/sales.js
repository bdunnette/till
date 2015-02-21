Sales = new Mongo.Collection("sales");

SalesLineSchema = new SimpleSchema({
  product: {
    type: String,
    autoform:{
      class: 'product-select',
      options: function(){
        return Products.find().map(function (p) {
          return {label: p.name, value: p._id};
        });
      }
    }
  },
  quantity: {
    type: Number,
    defaultValue: 1
  },
  eachPrice:{
    type: Number,
    decimal: true
  },
  extendedPrice:{
    type: Number,
    decimal: true,
    autoValue: function(){
      var extendedPrice = this.siblingField("quantity").value * this.siblingField("eachPrice").value;
      return extendedPrice;
    }
  },
  taxAmount:{
    type: Number,
    decimal: true,
    autoValue: function(){
      // Return tax defined for the current date, or 0 if none is defined
      var currentTax = Taxes.findOne({"startDate": {$lte: new Date()}, "endDate": {$gt: new Date()}})||{taxRate:0};
      var extendedPrice = this.siblingField("extendedPrice").value;
      var amt = extendedPrice * currentTax.taxRate;
      return amt;
    }
  }
});

SalesSchema = new SimpleSchema({
  customer: {
    type: String,
    optional: true,
    autoform:{
      options: function(){
        return People.find().map(function (c) {
          return {label: c.name, value: c._id};
        });
      }
    }
  },
  items: {
    type: [SalesLineSchema],
    optional: true
  }
});

Sales.attachSchema(SalesSchema);

Sales.allow({
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

Sales.deny({
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
