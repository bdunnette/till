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
