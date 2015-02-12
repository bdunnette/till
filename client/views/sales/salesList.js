Template.SalesList.helpers({
  customerName: function(customerId){
    return People.findOne({_id: customerId}).name;
  },
});

Template.SalesList.events({
  'change .product-select': function (event) {
    console.log(this);
    var selectedProduct = Products.findOne({_id: this.value});
    console.log(selectedProduct);
    this.siblingField("eachPrice").value = selectedProduct.listPrice;
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
