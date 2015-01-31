Template.ProductsEdit.helpers({
  onDelete: function () {
    return function (result) {
      //when record is deleted, go back to record listing
      Router.go('ProductsList');
    };
  },
});

Template.ProductsEdit.events({

});

Template.ProductsEdit.rendered = function () {

};

AutoForm.hooks({
  updateProductsForm: {
    onSuccess: function (operation, result, template) {
      Router.go('ProductsView', {
        _id: template.data.doc._id
      });
    },
  }
});