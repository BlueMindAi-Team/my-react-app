export interface Teacher {
  id: string;
  name: string;
  subject: string;
  domain: string;
  email: string;
  password: string;
  websiteUrl: string;
  parentUrl: string;
  registrationDate: string;
  subscriptionExpiry: string;
  status: 'active' | 'expired';
}