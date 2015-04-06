/*****************************************************************************/
/* SaleEdit: Event Handlers */
/*****************************************************************************/
Template.SaleEdit.events({
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
