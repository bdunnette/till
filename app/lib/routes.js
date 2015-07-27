Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

Router.route('/', {
  name: 'home',
  controller: 'HomeController',
  action: 'action',
  where: 'client'
});

Router.route('sales', {
  name: 'sales',
  controller: 'SalesController',
  action: 'action',
  where: 'client'
});

Router.route('sales/:_id', {
  name: 'saleView',
  controller: 'SaleViewController',
  action: 'action',
  where: 'client'
});

Router.route('sales/:_id/edit', {
  name: 'saleEdit',
  controller: 'SaleEditController',
  action: 'action',
  where: 'client'
});

Router.route('people', {
  name: 'people',
  controller: 'PeopleController',
  action: 'action',
  where: 'client'
});

