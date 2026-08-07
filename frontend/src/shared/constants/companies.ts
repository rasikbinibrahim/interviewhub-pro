// Company set mirrors CLAUDE.md's Company Tags list exactly — this file
// adds one more dimension on top of it: whether each company is
// "product-based" (builds and owns its own software product) or
// "service-based" (builds software for other companies as a paid
// service/consulting engagement). This is the real distinction India-
// market candidates mean by "product company vs service company," not
// a claim about a company's full legal/business structure.
//
// A few of these (IBM, Accenture, Deloitte, KPMG) run real product
// lines alongside large consulting arms — they're classified here by
// the hiring pattern most candidates actually experience (a services/
// consulting-style interview loop), not as an absolute statement that
// they build nothing of their own.

export type CompanyType = 'product' | 'service';

export const PRODUCT_COMPANIES = [
  'Google',
  'Meta',
  'Amazon',
  'Microsoft',
  'Apple',
  'Netflix',
  'Uber',
  'Stripe',
  'Adobe',
  'Atlassian',
  'Oracle',
  'LinkedIn',
  'Airbnb',
  'Salesforce',
  'Shopify',
  'Walmart',
  'Bloomberg',
  'Cloudflare',
  'GitHub',
  'ServiceNow',
  'Zoho',
  'Freshworks',
  'PayPal',
  'Paytm',
  'PhonePe',
  'Razorpay',
  'Flipkart',
  'Swiggy',
  'Zomato',
] as const;

export const SERVICE_COMPANIES = [
  'TCS',
  'Infosys',
  'Wipro',
  'Accenture',
  'Capgemini',
  'IBM',
  'HCL',
  'Cognizant',
  'EPAM',
  'Thoughtworks',
  'GlobalLogic',
  'KPMG',
  'Deloitte',
] as const;

export const ALL_COMPANIES: readonly string[] = [...PRODUCT_COMPANIES, ...SERVICE_COMPANIES];

const COMPANY_TYPE_MAP: ReadonlyMap<string, CompanyType> = new Map([
  ...PRODUCT_COMPANIES.map((name) => [name, 'product'] as const),
  ...SERVICE_COMPANIES.map((name) => [name, 'service'] as const),
]);

export function getCompanyType(company: string): CompanyType | undefined {
  return COMPANY_TYPE_MAP.get(company);
}
