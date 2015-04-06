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
    defaultValue: new Date(),
    autoform: {
      afFieldInput: {
        type: 'datetime-local'
      }
    }
  },
  taxRate: {
    type: Number,
    decimal: true,
    autoValue: function(){
      // Return tax defined for the sale date, or 0 if none is defined
      var currentTax = Taxes.findOne({"startDate": {$lte: this.siblingField("date").value}, "endDate": {$gt: this.siblingField("date").value}});
      if (currentTax) {
        return currentTax.taxRate;
      } else {
        return 0;
      }
    }
  },
  total: {
    type: Number,
    decimal: true,
    optional: true,
    autoValue: function(){
      var total = 0;
      var items = this.field("items");
      console.log(items);
      return items.extendedPrice;
    }
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
      },
      afFieldInput: {
        firstOption: "(Select a product)"
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
