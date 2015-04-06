Products = new Mongo.Collection("products");

ProductsSchema = new SimpleSchema({
  name: {
    type: String,
    index: true,
    unique: true
  },
  description: {
    type: String,
    optional: true
  },
  listPrice:{
    type: Number,
    decimal: true,
    defaultValue: 1
  },
  taxable: {
    type: Boolean,
    defaultValue: true
  }
});

Products.attachSchema(ProductsSchema);

Products.allow({
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

Products.deny({
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

// On server startup, if the database is empty, create some initial data.
if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Products.find().count() === 0) {
      var defaultProducts = [
        {name: "Laptop", listPrice: 100},
        {name: "Desktop", listPrice: 40}
      ];
      defaultProducts.forEach(function(product) {
        Products.insert(product);
      });
    }
  });
}

Router.route('/products', function () {
  this.render('ProductsList', {
    data: function () {
      return Products.find();
    }
  });
}, {
  name: 'ProductsList'
});

Router.route('/products/:_id', function () {
  this.render('ProductsView', {
    data: function () {
      return Products.findOne({
        _id: this.params._id
      });
    }
  });
}, {
  name: 'ProductsView'
});

Router.route('/products/:_id/edit', function () {
  this.render('ProductsEdit', {
    data: function () {
      return Products.findOne({
        _id: this.params._id
      });
    }
  });
}, {
  name: 'ProductsEdit'
});
