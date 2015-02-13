Template.SalesList.helpers({
  customerName: function(customerId){
    return People.findOne({_id: customerId}).name;
  },
});

Template.SalesList.events({
  'click button.new-sale': function () {
    Sales.insert({}, function (error, saleId) {
      console.log(error);
      console.log(saleId);
      Router.go('SalesEdit', {
        _id: saleId
      });
    });
  }
});

Template.SalesList.rendered = function () {

};

Router.route('/sales', function () {
  this.render('SalesList', {
    data: function () {
      return Sales.find();
    }
  });
}, {
  name: 'SalesList'
});
