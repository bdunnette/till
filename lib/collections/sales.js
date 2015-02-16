Sales = new Mongo.Collection("sales");

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
      var result = this.siblingField("quantity").value * this.siblingField("eachPrice").value;
      return result;
    }
  },
  taxAmount:{
    type: Number,
    decimal: true,
    autoValue: function(){
      var currentTax = Taxes.findOne({"startDate": {$lte: new Date()}, "endDate": {$gt: new Date()}});
      console.log(currentTax);
      var result = this.siblingField("extendedPrice").value * currentTax.taxRate;
      console.log(result);
      return result;
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
    optional: true,
    autoform: {
      template: "bootstrap3-horizontal"
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
