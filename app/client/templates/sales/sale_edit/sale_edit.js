/*****************************************************************************/
/* SaleEdit: Event Handlers */
/*****************************************************************************/
Template.SaleEdit.events({
  'click .remove-item': function() {
    console.log(this);
    var sale = Blaze.getData().sale;
    console.log(sale);
    Sales.update({_id: sale._id}, {$pullAll: {items: [this]}}, function(err, result){console.log(err); console.log(result);});
  }
});

/*****************************************************************************/
/* SaleEdit: Helpers */
/*****************************************************************************/
Template.SaleEdit.helpers({
  productName: function(productId) {
    var product = Products.findOne(productId);
    return product.name;
  },

  asDollars: function(amt) {
    return '$' + amt.toFixed(2);
  },

  asPercent: function(pct) {
    return pct * 100 + '%'
  }
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
