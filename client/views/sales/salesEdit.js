Template.SalesEdit.helpers({
  onDelete: function () {
    return function (result) {
      //when record is deleted, go back to record listing
      Router.go('SalesList');
    };
  },
});

Template.SalesEdit.events({

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