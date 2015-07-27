AdminConfig = {
collections:
{
Products: {icon:'desktop',tableColumns: [
   { label: 'Name', name: 'name' },
   { label: 'List Price', name: 'listPrice' },
   { label: 'Taxable?', name: 'taxable' }
  ]},
Taxes: {icon:'usd',tableColumns: [
   { label: 'Tax Rate', name: 'taxRate' },
   { label: 'Start Date', name: 'startDate' },
   { label: 'End Date', name: 'endDate' }
  ]},
People: {icon:'users'},
Sales: {icon:'shopping-cart'}
}
};