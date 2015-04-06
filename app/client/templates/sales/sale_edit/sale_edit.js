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
