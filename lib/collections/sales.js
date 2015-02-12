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
      console.log(this.siblingField("product").value);
      var result = this.siblingField("quantity").value * this.siblingField("eachPrice").value;
      console.log(result);
      return result;
    }
  }
});

SalesSchema = new SimpleSchema({
  customer: {
    type: String,
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
