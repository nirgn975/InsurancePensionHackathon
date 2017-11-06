const TODAY = new Date();
const dates = {
  registrationDate: new Date(),
  expectedDataDate: TODAY.setDate(TODAY.getDate() + 3),
};

const users = [
  { id: '200979136', password: '123', cardNumber: '1', cvv: '1', expMonth: '1', expYear: '1', dates: dates},
  { id: '306325564', password: '1234', cardNumber: '2', cvv: '2', expMonth: '2', expYear: '2', dates: dates},
  { id: '200838068', password: '12345', cardNumber: '3', cvv: '3', expMonth: '3', expYear: '3', dates: dates},
  { id: '049174337', password: '123456', cardNumber: '4', cvv: '4', expMonth: '4', expYear: '4', dates: dates}, //no data
];

exports.users = users;
