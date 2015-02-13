Template.SalesEdit.helpers({
  onDelete: function () {
    return function (result) {
      //when record is deleted, go back to record listing
      Router.go('SalesList');
    };
  },
  
  customerOptions: function(){
    return People.find().fetch().map(function (c) {
      return {label: c.name, value: c._id};
    });
  },
  
  isSaleCustomer: function(parent, customerId){
    return parent.customer == customerId;
  },
  
  //list all products for use in select box
  productOptions: function(){
    return Products.find().map(function (p) {
      return {label: p.name, value: p._id};
    });
  }
});

Template.SalesEdit.events({
  'change .customer-select': function (event) {
    Sales.update(this._id, {$set: {customer: event.target.value}});
  },
  
  'change .product-select': function (event) {
    var selectedProduct = Products.findOne(event.target.value);
    console.log(selectedProduct);
    $('#eachPrice').val(selectedProduct.listPrice);
  }
});

Template.SalesEdit.rendered = function () {

};

AutoForm.hooks({
  updateSalesForm: {
    onSuccess: function (operation, result, template) {
      Router.go('SalesView', {
        _id: template.data.doc._id
      });
    },
  }
});

Router.route('/sales/:_id/edit', function () {
  this.render('SalesEdit', {
    data: function () {
      return Sales.findOne({
        _id: this.params._id
      });
    }
  });
}, {
  name: 'SalesEdit'
});
