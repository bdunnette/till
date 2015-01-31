Meteor.publish("people", function () {
  return People.find();
});

// Add access points for `GET`, `POST`, `PUT`, `DELETE`
HTTP.publish({
  collection: People
}, function (data) {
  // this.userId, this.query, this.params
  return People.find({});
});