/*****************************************************************************/
/* Sales: Event Handlers */
/*****************************************************************************/
Template.Sales.events({
  'click .new-sale': function () {
    Sales.insert({taxIncluded: true}, function (error, saleId) {
      Router.go('saleEdit', {
        _id: saleId
      });
    });
  }
});

/*****************************************************************************/
/* Sales: Helpers */
/*****************************************************************************/
Template.Sales.helpers({
});

/*****************************************************************************/
/* Sales: Lifecycle Hooks */
/*****************************************************************************/
Template.Sales.created = function () {
};

Template.Sales.rendered = function () {
};

Template.Sales.destroyed = function () {
};

Template.registerHelper('productName', function(productId) {
    var product = Products.findOne(productId);
    return product.name;
});

Template.registerHelper('asDollars', function(amt) {
    return '$' + amt.toFixed(2);
});

Template.registerHelper('asPercent', function(pct) {
    return pct * 100 + '%';
});