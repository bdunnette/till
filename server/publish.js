Meteor.publish('sales', function (/* args */) {
  return Sales.find();
});

Meteor.publish('sale', function (saleId) {
  return Sales.find({
    _id: saleId
  });
});

Meteor.publish('products', function (/* args */) {
  return Products.find();
});

Meteor.publish('people', function (/* args */) {
  return People.find();
});

Meteor.publish('taxes', function (/* args */) {
  return Taxes.find();
});