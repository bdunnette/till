Sales = new Mongo.Collection("sales");

SalesLineSchema = new SimpleSchema({
  product: {
    type: String,
    autoform:{
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

Router.route('/sales', function () {
  this.render('SalesList', {
    data: function () {
      return Sales.find();
    }
  });
}, {
  name: 'SalesList'
});

Router.route('/sales/:_id', function () {
  this.render('SalesView', {
    data: function () {
      return Sales.findOne({
        _id: this.params._id
      });
    }
  });
}, {
  name: 'SalesView'
});

Router.route('/sales/:_id/edit', function () {
  this.render('SalesEdit', {
    data: function () {
      return Sales.findOne({
        _id: this.params._id
      });
    }
  });
}, {
  name: 'SalesEdit'
});
