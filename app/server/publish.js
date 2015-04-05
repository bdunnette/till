/**
 * Meteor.publish('items', function (param1, param2) {
 *  this.ready();
 * });
 */


Meteor.publish('sales', function (/* args */) {
  return Sales.find();
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