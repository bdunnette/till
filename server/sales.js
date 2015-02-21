Meteor.methods({
  removeItem: function(saleId, item){
    console.log(saleId);
    console.log(item);
    Sales.update({_id: saleId}, {$pullAll : {items : [item]}}, function(err, result){console.log(err); console.log(result);});
    console.log(Sales.findOne(saleId));
  }
});

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