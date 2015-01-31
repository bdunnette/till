Template.SalesList.helpers({
  customerOptions: function () {
    return People.find().map(function (c) {
      return {label: c.name, value: c._id};
    });
  }
});

Template.SalesList.events({

});

Template.SalesList.rendered = function () {

};