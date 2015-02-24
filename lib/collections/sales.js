Sales = new Mongo.Collection("sales");

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
  date: {
    type: Date,
    defaultValue: new Date()
  },
  items: {
    type: Array,
    optional: true
  },
  'items.$':{type:Object},
  'items.$.product': {
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
  'items.$.quantity': {
    type: Number,
    defaultValue: 1
  },
  'items.$.eachPrice':{
    type: Number,
    decimal: true
  },
  'items.$.extendedPrice':{
    type: Number,
    decimal: true,
    autoValue: function(){
      var extendedPrice = this.siblingField("quantity").value * this.siblingField("eachPrice").value;
      return extendedPrice;
    }
  },
  'items.$.taxAmount':{
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
