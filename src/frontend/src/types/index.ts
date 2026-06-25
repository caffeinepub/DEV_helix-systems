// TypeScript interfaces matching the 15 backend dataset types
// bigint fields from the backend are kept as bigint here (runtime wrapper handles candid conversion)

export interface Employee {
  manager?: string;
  country: string;
  hireDate: string;
  name: string;
  office: string;
  email: string;
  level: bigint;
  jobTitle: string;
  terminationDate?: string;
  salaryUsd: bigint;
  department: string;
  employmentStatus: string;
  vacationDaysRemaining: bigint;
}

export interface Contractor {
  status: string;
  country: string;
  contractStart: string;
  name: string;
  agency: string;
  contractEnd: string;
  email: string;
  hourlyRateUsd: bigint;
  department: string;
}

export interface Intern {
  mentor: string;
  endDate: string;
  name: string;
  email: string;
  university: string;
  department: string;
  monthlyStipendUsd: bigint;
  startDate: string;
}

export interface Project {
  plannedEndDate: string;
  status: string;
  actualEndDate?: string;
  lead: string;
  name: string;
  codename: string;
  department: string;
  budgetUsd: bigint;
  product?: string;
  startDate: string;
}

export interface Product {
  name: string;
  annualRevenueUsd: bigint;
  codename: string;
  launchDate: string;
  lifecycle: string;
  department: string;
}

export interface Office {
  country: string;
  openedDate: string;
  city: string;
  isHq: boolean;
  addressLine: string;
  capacity: bigint;
}

export interface Customer {
  country: string;
  signupDate: string;
  plan: string;
  accountManager: string;
  monthlyRevenueUsd: bigint;
  companyName: string;
  churnDate?: string;
  industry: string;
}

export interface Vendor {
  paymentTermsDays: bigint;
  taxId: string;
  country: string;
  name: string;
  createdDate: string;
  primaryContactName: string;
}

export interface Department {
  foundedYear: bigint;
  name: string;
  annualBudgetUsd: bigint;
  costCenter: string;
}

export interface Contract {
  status: string;
  title: string;
  endDate: string;
  kind: string;
  vendor: string;
  department: string;
  valueUsd: bigint;
  startDate: string;
}

export interface Invoice {
  issueDate: string;
  status: string;
  contract?: string;
  dueDate: string;
  paidDate?: string;
  vendor: string;
  amountUsd: bigint;
}

export interface Expense {
  date: string;
  submittedBy: string;
  approvalStatus: string;
  category: string;
  amountUsd: bigint;
  payee: string;
  department: string;
  project?: string;
}

export interface EmployeeAssignment {
  endDate?: string;
  allocationPercent: bigint;
  employee: string;
  project: string;
  startDate: string;
}

export interface ContractorAssignment {
  endDate?: string;
  allocationPercent: bigint;
  contractor: string;
  project: string;
  startDate: string;
}

export interface InternAssignment {
  allocationPercent: bigint;
  intern: string;
  project: string;
}
