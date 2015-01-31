Template.PeopleEdit.helpers({
  onDelete: function () {
    return function (result) {
      //when record is deleted, go back to record listing
      Router.go('PeopleList');
    };
  },
});

Template.PeopleEdit.events({

});

Template.PeopleEdit.rendered = function () {

};

AutoForm.hooks({
  updatePeopleForm: {
    onSuccess: function (operation, result, template) {
      Router.go('PeopleView', {
        _id: template.data.doc._id
      });
    },
  }
});