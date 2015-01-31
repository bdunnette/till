Meteor.publish("sales", function () {
  return Sales.find();
});

// Add access points for `GET`, `POST`, `PUT`, `DELETE`
HTTP.publish({
  collection: Sales
}, function (data) {
  // this.userId, this.query, this.params
  return Sales.find({});
});