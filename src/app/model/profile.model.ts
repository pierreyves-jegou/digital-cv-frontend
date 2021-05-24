export class Profile {

  private firstName: string;
  private lastName: string;
  private phone: string | null;
  private email: string;

  constructor(firstName: string , lastName: string , phone: string | null, email: string ){
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
  }

  static emptyProfile(): Profile {
    return new Profile('john', 'doe', '0155447778', 'jon.doe@cgi.com');
  }
}
