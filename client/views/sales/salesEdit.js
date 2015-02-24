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
  },
  
  saleId: function(template) {
    console.log(template);
  }
});

Template.saleLines.helpers({
  productName: function(productId){
    return Products.findOne({_id: productId}).name;
  }
});

Template.SalesEdit.events({
  'change .customer-select': function (event) {
    console.log(event.target.value);
    console.log(this);
    Sales.update(this._id, {$set: {customer: event.target.value}});
  },

  'change .product-select': function (event) {
    var selectedProduct = Products.findOne(event.target.value);
    $('#eachPrice').val(selectedProduct.listPrice);
  },

  'submit .add-item': function(event, template) {
    event.preventDefault();
    var newItem = {
      product: event.target.product.value,
      quantity: event.target.quantity.value,
      eachPrice: event.target.eachPrice.value
    };
    console.log(newItem);
    console.log(template.data);
    Sales.update({_id: this._id}, {$push: {items: newItem}});
  },
  
  'click .delete-item': function(event, template) {
    event.preventDefault();
    var saleId = event.currentTarget.name;
    var item = this;
    // Since we can't $pull an item from the sale's items on the client, we'll need to call the removeItem method on the server
    Meteor.call('removeItem', saleId, item);
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
