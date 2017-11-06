export interface Registration {
  id: string;
  password: string;
  passwordConfirmation: string;
  cardNumber: number;
  cvv: number;
  expMonth: number;
  expYear: number;
}

export interface RegistrationResponse {
  token: string;
}
