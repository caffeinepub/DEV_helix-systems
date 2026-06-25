import MixinViews "mo:caffeineai-data-viewer/MixinViews";

actor {
  include MixinViews();


  // ── Type definitions ──────────────────────────────────────────────────────

  public type ContractorAssignment = {
    contractor      : Text;
    project         : Text;
    allocationPercent : Nat;
    startDate       : Text;
    endDate         : ?Text;
  };

  public type Contractor = {
    name          : Text;
    email         : Text;
    agency        : Text;
    hourlyRateUsd : Nat;
    contractStart : Text;
    contractEnd   : Text;
    department    : Text;
    status        : Text;
    country       : Text;
  };

  public type Contract = {
    vendor      : Text;
    title       : Text;
    kind        : Text;
    startDate   : Text;
    endDate     : Text;
    valueUsd    : Nat;
    department  : Text;
    status      : Text;
  };

  public type Customer = {
    companyName        : Text;
    country            : Text;
    industry           : Text;
    plan               : Text;
    monthlyRevenueUsd  : Nat;
    signupDate         : Text;
    churnDate          : ?Text;
    accountManager     : Text;
  };

  public type Department = {
    name             : Text;
    costCenter       : Text;
    annualBudgetUsd  : Nat;
    foundedYear      : Nat;
  };

  public type EmployeeAssignment = {
    employee          : Text;
    project           : Text;
    allocationPercent : Nat;
    startDate         : Text;
    endDate           : ?Text;
  };

  public type Employee = {
    name                  : Text;
    email                 : Text;
    hireDate              : Text;
    terminationDate       : ?Text;
    jobTitle              : Text;
    level                 : Nat;
    department            : Text;
    manager               : ?Text;
    office                : Text;
    salaryUsd             : Nat;
    employmentStatus      : Text;
    vacationDaysRemaining : Nat;
    country               : Text;
  };

  public type Expense = {
    date            : Text;
    amountUsd       : Nat;
    category        : Text;
    payee           : Text;
    department      : Text;
    project         : ?Text;
    submittedBy     : Text;
    approvalStatus  : Text;
  };

  public type InternAssignment = {
    intern            : Text;
    project           : Text;
    allocationPercent : Nat;
  };

  public type Intern = {
    name              : Text;
    email             : Text;
    university        : Text;
    startDate         : Text;
    endDate           : Text;
    mentor            : Text;
    department        : Text;
    monthlyStipendUsd : Nat;
  };

  public type Invoice = {
    vendor    : Text;
    contract  : ?Text;
    amountUsd : Nat;
    issueDate : Text;
    dueDate   : Text;
    paidDate  : ?Text;
    status    : Text;
  };

  public type Office = {
    city        : Text;
    country     : Text;
    addressLine : Text;
    capacity    : Nat;
    openedDate  : Text;
    isHq        : Bool;
  };

  public type Product = {
    name             : Text;
    codename         : Text;
    launchDate       : Text;
    lifecycle        : Text;
    department       : Text;
    annualRevenueUsd : Nat;
  };

  public type Project = {
    name           : Text;
    codename       : Text;
    startDate      : Text;
    plannedEndDate : Text;
    actualEndDate  : ?Text;
    status         : Text;
    budgetUsd      : Nat;
    lead           : Text;
    department     : Text;
    product        : ?Text;
  };

  public type Vendor = {
    name                : Text;
    country             : Text;
    taxId               : Text;
    primaryContactName  : Text;
    paymentTermsDays    : Nat;
    createdDate         : Text;
  };

  // ── Stable state (initialized by migration chain) ────────────────────────

  var contractorAssignments : [ContractorAssignment];
  var contractors           : [Contractor];
  var contracts             : [Contract];
  var customers             : [Customer];
  var departments           : [Department];
  var employeeAssignments   : [EmployeeAssignment];
  var employees             : [Employee];
  var expenses              : [Expense];
  var internAssignments     : [InternAssignment];
  var interns               : [Intern];
  var invoices              : [Invoice];
  var offices               : [Office];
  var products              : [Product];
  var projects              : [Project];
  var vendors               : [Vendor];

  // ── Contractor Assignments ────────────────────────────────────────────────

  public query func getAllContractorAssignments() : async [ContractorAssignment] {
    contractorAssignments
  };

  public func uploadContractorAssignments(data : [ContractorAssignment]) : async () {
    contractorAssignments := data;
  };

  // ── Contractors ───────────────────────────────────────────────────────────

  public query func getAllContractors() : async [Contractor] {
    contractors
  };

  public func uploadContractors(data : [Contractor]) : async () {
    contractors := data;
  };

  // ── Contracts ─────────────────────────────────────────────────────────────

  public query func getAllContracts() : async [Contract] {
    contracts
  };

  public func uploadContracts(data : [Contract]) : async () {
    contracts := data;
  };

  // ── Customers ─────────────────────────────────────────────────────────────

  public query func getAllCustomers() : async [Customer] {
    customers
  };

  public func uploadCustomers(data : [Customer]) : async () {
    customers := data;
  };

  // ── Departments ───────────────────────────────────────────────────────────

  public query func getAllDepartments() : async [Department] {
    departments
  };

  public func uploadDepartments(data : [Department]) : async () {
    departments := data;
  };

  // ── Employee Assignments ──────────────────────────────────────────────────

  public query func getAllEmployeeAssignments() : async [EmployeeAssignment] {
    employeeAssignments
  };

  public func uploadEmployeeAssignments(data : [EmployeeAssignment]) : async () {
    employeeAssignments := data;
  };

  // ── Employees ─────────────────────────────────────────────────────────────

  public query func getAllEmployees() : async [Employee] {
    employees
  };

  public func uploadEmployees(data : [Employee]) : async () {
    employees := data;
  };

  // ── Expenses ──────────────────────────────────────────────────────────────

  public query func getAllExpenses() : async [Expense] {
    expenses
  };

  public func uploadExpenses(data : [Expense]) : async () {
    expenses := data;
  };

  // ── Intern Assignments ────────────────────────────────────────────────────

  public query func getAllInternAssignments() : async [InternAssignment] {
    internAssignments
  };

  public func uploadInternAssignments(data : [InternAssignment]) : async () {
    internAssignments := data;
  };

  // ── Interns ───────────────────────────────────────────────────────────────

  public query func getAllInterns() : async [Intern] {
    interns
  };

  public func uploadInterns(data : [Intern]) : async () {
    interns := data;
  };

  // ── Invoices ──────────────────────────────────────────────────────────────

  public query func getAllInvoices() : async [Invoice] {
    invoices
  };

  public func uploadInvoices(data : [Invoice]) : async () {
    invoices := data;
  };

  // ── Offices ───────────────────────────────────────────────────────────────

  public query func getAllOffices() : async [Office] {
    offices
  };

  public func uploadOffices(data : [Office]) : async () {
    offices := data;
  };

  // ── Products ──────────────────────────────────────────────────────────────

  public query func getAllProducts() : async [Product] {
    products
  };

  public func uploadProducts(data : [Product]) : async () {
    products := data;
  };

  // ── Projects ──────────────────────────────────────────────────────────────

  public query func getAllProjects() : async [Project] {
    projects
  };

  public func uploadProjects(data : [Project]) : async () {
    projects := data;
  };

  // ── Vendors ───────────────────────────────────────────────────────────────

  public query func getAllVendors() : async [Vendor] {
    vendors
  };

  public func uploadVendors(data : [Vendor]) : async () {
    vendors := data;
  };

};
