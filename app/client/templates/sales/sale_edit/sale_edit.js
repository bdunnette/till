/*****************************************************************************/
/* SaleEdit: Event Handlers */
/*****************************************************************************/
Template.SaleEdit.events({
  'change .product-select': function(event, template) {
    console.log(event.target.value);
    var product = Products.findOne(event.target.value);
    $("input[name=eachPrice]").val(product.listPrice);
  },

  'click .remove-item': function(event, template) {
    console.log(this);
    var sale = template.data.sale;
    console.log(sale);
    Sales.update({_id: sale._id}, {$pullAll: {items: [this]}}, function(err, result){console.log(err); console.log(result);});
  }
});

/*****************************************************************************/
/* SaleEdit: Helpers */
/*****************************************************************************/
Template.SaleEdit.helpers({
  
});

/*****************************************************************************/
/* SaleEdit: Lifecycle Hooks */
/*****************************************************************************/
Template.SaleEdit.created = function () {
};

Template.SaleEdit.rendered = function () {
};

Template.SaleEdit.destroyed = function () {
};

