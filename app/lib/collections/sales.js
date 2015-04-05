Sales = new Mongo.Collection('sales');

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
  taxRate:{
    type: Number,
    decimal: true,
    autoValue: function(){
      // Return tax defined for the current date, or 0 if none is defined
      var currentTax = Taxes.findOne({"startDate": {$lte: new Date()}, "endDate": {$gt: new Date()}})||{
          taxRate: 0
      };
      return currentTax.taxRate;
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
  },
  
  taxAmount: function() {
      var taxAmount = this.subtotal() * this.taxRate;
      return parseFloat(taxAmount.toFixed(2));
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
