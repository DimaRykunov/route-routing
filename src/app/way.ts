export class User {
  name: string;
  age: number;
}
export class Way {
  constructor(public origin: {lat: number, lng: number }, public destination: {lat: number, lng: number }) { }
}
