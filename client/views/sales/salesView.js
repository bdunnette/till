Template.SalesView.helpers({
  customerName: function(customerId){
    return People.findOne({_id: customerId}).name;
  },

  productName: function(productId){
    return Products.findOne({_id: productId}).name;
  }
});

Template.SalesView.events({

});

Template.SalesView.rendered = function () {

};

Router.route('/sales/:_id', function () {
  this.render('SalesView', {
    data: function () {
      var sale = Sales.findOne({
        _id: this.params._id
      });
      return {sale: sale};
    }
  });
}, {
  name: 'SalesView'
});
