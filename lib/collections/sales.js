Sales = new Mongo.Collection("sales");

SalesLineSchema = new SimpleSchema({
  product: {
    type: String
  },
  quantity: {
    type: Number,
    defaultValue: 1
  }
});

SalesSchema = new SimpleSchema({
  customer: {
    type: String
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
