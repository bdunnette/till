Products = new Mongo.Collection('products');

ProductSchema = new SimpleSchema({
  name: {
    type: String
  },
  description: {
    type: String,
    optional: true
  },
  listPrice:{
    type: Number,
    decimal: true,
    defaultValue: 1
  },
  taxable: {
    type: Boolean,
    defaultValue: true
  }
});

Products.attachSchema(ProductSchema);

if (Meteor.isServer) {
  Products.allow({
    insert: function (userId, doc) {
      return true;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return true;
    },

    remove: function (userId, doc) {
      return false;
    }
  });

  Products.deny({
    insert: function (userId, doc) {
      return false;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return false;
    },

    remove: function (userId, doc) {
      return true;
    }
  });
}
