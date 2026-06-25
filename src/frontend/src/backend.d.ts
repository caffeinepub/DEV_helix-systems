import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    name: string;
    annualRevenueUsd: bigint;
    codename: string;
    launchDate: string;
    lifecycle: string;
    department: string;
}
export interface EmployeeAssignment {
    endDate?: string;
    allocationPercent: bigint;
    employee: string;
    project: string;
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
export interface Office {
    country: string;
    openedDate: string;
    city: string;
    isHq: boolean;
    addressLine: string;
    capacity: bigint;
}
export interface Department {
    foundedYear: bigint;
    name: string;
    annualBudgetUsd: bigint;
    costCenter: string;
}
export interface ContractorAssignment {
    endDate?: string;
    allocationPercent: bigint;
    contractor: string;
    project: string;
    startDate: string;
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
export interface InternAssignment {
    allocationPercent: bigint;
    intern: string;
    project: string;
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
export interface Vendor {
    paymentTermsDays: bigint;
    taxId: string;
    country: string;
    name: string;
    createdDate: string;
    primaryContactName: string;
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
export interface backendInterface {
    getAllContractorAssignments(): Promise<Array<ContractorAssignment>>;
    getAllContractors(): Promise<Array<Contractor>>;
    getAllContracts(): Promise<Array<Contract>>;
    getAllCustomers(): Promise<Array<Customer>>;
    getAllDepartments(): Promise<Array<Department>>;
    getAllEmployeeAssignments(): Promise<Array<EmployeeAssignment>>;
    getAllEmployees(): Promise<Array<Employee>>;
    getAllExpenses(): Promise<Array<Expense>>;
    getAllInternAssignments(): Promise<Array<InternAssignment>>;
    getAllInterns(): Promise<Array<Intern>>;
    getAllInvoices(): Promise<Array<Invoice>>;
    getAllOffices(): Promise<Array<Office>>;
    getAllProducts(): Promise<Array<Product>>;
    getAllProjects(): Promise<Array<Project>>;
    getAllVendors(): Promise<Array<Vendor>>;
    uploadContractorAssignments(data: Array<ContractorAssignment>): Promise<void>;
    uploadContractors(data: Array<Contractor>): Promise<void>;
    uploadContracts(data: Array<Contract>): Promise<void>;
    uploadCustomers(data: Array<Customer>): Promise<void>;
    uploadDepartments(data: Array<Department>): Promise<void>;
    uploadEmployeeAssignments(data: Array<EmployeeAssignment>): Promise<void>;
    uploadEmployees(data: Array<Employee>): Promise<void>;
    uploadExpenses(data: Array<Expense>): Promise<void>;
    uploadInternAssignments(data: Array<InternAssignment>): Promise<void>;
    uploadInterns(data: Array<Intern>): Promise<void>;
    uploadInvoices(data: Array<Invoice>): Promise<void>;
    uploadOffices(data: Array<Office>): Promise<void>;
    uploadProducts(data: Array<Product>): Promise<void>;
    uploadProjects(data: Array<Project>): Promise<void>;
    uploadVendors(data: Array<Vendor>): Promise<void>;
}
