/*****************************************************************************/
/* Sales: Event Handlers */
/*****************************************************************************/
Template.Sales.events({
  'click .new-sale': function () {
    Sales.insert({}, function (error, saleId) {
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
