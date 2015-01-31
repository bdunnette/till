Meteor.publish("products", function () {
  return Products.find();
});

// Add access points for `GET`, `POST`, `PUT`, `DELETE`
HTTP.publish({
  collection: Products
}, function (data) {
  // this.userId, this.query, this.params
  return Products.find({});
});