module {

  // ── Inline types (self-contained — no project imports) ───────────────────

  type ContractorAssignment = {
    contractor        : Text;
    project           : Text;
    allocationPercent : Nat;
    startDate         : Text;
    endDate           : ?Text;
  };

  type Contractor = {
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

  type Contract = {
    vendor     : Text;
    title      : Text;
    kind       : Text;
    startDate  : Text;
    endDate    : Text;
    valueUsd   : Nat;
    department : Text;
    status     : Text;
  };

  type Customer = {
    companyName       : Text;
    country           : Text;
    industry          : Text;
    plan              : Text;
    monthlyRevenueUsd : Nat;
    signupDate        : Text;
    churnDate         : ?Text;
    accountManager    : Text;
  };

  type Department = {
    name            : Text;
    costCenter      : Text;
    annualBudgetUsd : Nat;
    foundedYear     : Nat;
  };

  type EmployeeAssignment = {
    employee          : Text;
    project           : Text;
    allocationPercent : Nat;
    startDate         : Text;
    endDate           : ?Text;
  };

  type Employee = {
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

  type Expense = {
    date           : Text;
    amountUsd      : Nat;
    category       : Text;
    payee          : Text;
    department     : Text;
    project        : ?Text;
    submittedBy    : Text;
    approvalStatus : Text;
  };

  type InternAssignment = {
    intern            : Text;
    project           : Text;
    allocationPercent : Nat;
  };

  type Intern = {
    name              : Text;
    email             : Text;
    university        : Text;
    startDate         : Text;
    endDate           : Text;
    mentor            : Text;
    department        : Text;
    monthlyStipendUsd : Nat;
  };

  type Invoice = {
    vendor    : Text;
    contract  : ?Text;
    amountUsd : Nat;
    issueDate : Text;
    dueDate   : Text;
    paidDate  : ?Text;
    status    : Text;
  };

  type Office = {
    city        : Text;
    country     : Text;
    addressLine : Text;
    capacity    : Nat;
    openedDate  : Text;
    isHq        : Bool;
  };

  type Product = {
    name             : Text;
    codename         : Text;
    launchDate       : Text;
    lifecycle        : Text;
    department       : Text;
    annualRevenueUsd : Nat;
  };

  type Project = {
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

  type Vendor = {
    name               : Text;
    country            : Text;
    taxId              : Text;
    primaryContactName : Text;
    paymentTermsDays   : Nat;
    createdDate        : Text;
  };

  // ── Migration types ───────────────────────────────────────────────────────

  type OldActor = {};

  type NewActor = {
    contractorAssignments : [ContractorAssignment];
    contractors           : [Contractor];
    contracts             : [Contract];
    customers             : [Customer];
    departments           : [Department];
    employeeAssignments   : [EmployeeAssignment];
    employees             : [Employee];
    expenses              : [Expense];
    internAssignments     : [InternAssignment];
    interns               : [Intern];
    invoices              : [Invoice];
    offices               : [Office];
    products              : [Product];
    projects              : [Project];
    vendors               : [Vendor];
  };

  // ── Migration function ────────────────────────────────────────────────────

  public func migration(_ : OldActor) : NewActor {
    {
      contractorAssignments = [
        { contractor = "Alex Rivera";    project = "TITAN-1";     allocationPercent = 80;  startDate = "2024-01-15"; endDate = null },
        { contractor = "Jordan Kim";     project = "NEXUS-Core";  allocationPercent = 100; startDate = "2024-02-01"; endDate = null },
        { contractor = "Sam Patel";      project = "CloudOps-v2"; allocationPercent = 60;  startDate = "2024-03-01"; endDate = null },
        { contractor = "Taylor Nguyen";  project = "TITAN-1";     allocationPercent = 40;  startDate = "2024-01-20"; endDate = null },
        { contractor = "Morgan Blake";   project = "NEXUS-Core";  allocationPercent = 100; startDate = "2024-04-01"; endDate = null },
        { contractor = "Casey Huang";    project = "DataBridge";  allocationPercent = 75;  startDate = "2024-02-15"; endDate = null },
        { contractor = "Riley Okonkwo";  project = "CloudOps-v2"; allocationPercent = 50;  startDate = "2024-03-10"; endDate = null },
        { contractor = "Quinn Larsen";   project = "WebPortal-3"; allocationPercent = 100; startDate = "2024-05-01"; endDate = null },
      ];
      contractors = [
        { name = "Alex Rivera";   email = "arivera@techstaff.io";   agency = "TechStaff Pro";        hourlyRateUsd = 120; contractStart = "2024-01-15"; contractEnd = "2024-12-31"; department = "Robotics";    status = "Active"; country = "USA"     },
        { name = "Jordan Kim";    email = "jkim@devbridge.com";      agency = "DevBridge Consulting"; hourlyRateUsd = 95;  contractStart = "2024-02-01"; contractEnd = "2024-09-30"; department = "Engineering"; status = "Active"; country = "Canada"  },
        { name = "Sam Patel";     email = "spatel@cloudworks.in";    agency = "CloudWorks India";     hourlyRateUsd = 75;  contractStart = "2024-03-01"; contractEnd = "2025-02-28"; department = "Operations";  status = "Active"; country = "India"   },
        { name = "Taylor Nguyen"; email = "tnguyen@techstaff.io";    agency = "TechStaff Pro";        hourlyRateUsd = 110; contractStart = "2024-01-20"; contractEnd = "2024-10-31"; department = "Robotics";    status = "Active"; country = "USA"     },
        { name = "Morgan Blake";  email = "mblake@devbridge.com";    agency = "DevBridge Consulting"; hourlyRateUsd = 130; contractStart = "2024-04-01"; contractEnd = "2025-03-31"; department = "Engineering"; status = "Active"; country = "UK"      },
        { name = "Casey Huang";   email = "chuang@freelance.com";    agency = "Independent";          hourlyRateUsd = 85;  contractStart = "2024-02-15"; contractEnd = "2024-11-15"; department = "Product";     status = "Active"; country = "USA"     },
        { name = "Riley Okonkwo"; email = "rokonkwo@africatech.ng";  agency = "AfricaTech Hub";       hourlyRateUsd = 70;  contractStart = "2024-03-10"; contractEnd = "2024-12-31"; department = "Engineering"; status = "Active"; country = "Nigeria" },
        { name = "Quinn Larsen";  email = "qlarsen@nordic.dk";       agency = "Nordic Dev Partners";  hourlyRateUsd = 115; contractStart = "2024-05-01"; contractEnd = "2025-04-30"; department = "Sales";       status = "Active"; country = "Denmark" },
      ];
      contracts = [
        { vendor = "Acme Robotics Parts";    title = "Annual Hardware Supply Agreement"; kind = "Procurement";  startDate = "2024-01-01"; endDate = "2024-12-31"; valueUsd = 380000; department = "Robotics";    status = "Active"  },
        { vendor = "CloudInfra Services";    title = "Cloud Hosting & DevOps";           kind = "SaaS";         startDate = "2024-01-01"; endDate = "2025-12-31"; valueUsd = 96000;  department = "Engineering"; status = "Active"  },
        { vendor = "LegalEdge Partners";     title = "Corporate Legal Retainer";         kind = "Services";     startDate = "2024-01-01"; endDate = "2024-12-31"; valueUsd = 60000;  department = "Finance";     status = "Active"  },
        { vendor = "Talent Acquisition Co";  title = "Recruiting Services";              kind = "Services";     startDate = "2024-03-01"; endDate = "2024-09-30"; valueUsd = 45000;  department = "HR";          status = "Active"  },
        { vendor = "PR & Media Group";       title = "Public Relations Campaign";        kind = "Marketing";    startDate = "2024-06-01"; endDate = "2024-11-30"; valueUsd = 72000;  department = "Sales";       status = "Active"  },
        { vendor = "SensoryTech Components"; title = "Sensor Array Supply Q3-Q4";        kind = "Procurement";  startDate = "2024-07-01"; endDate = "2024-12-31"; valueUsd = 150000; department = "Robotics";    status = "Active"  },
        { vendor = "Training Platform Pro";  title = "Employee Training Licenses";       kind = "SaaS";         startDate = "2024-01-01"; endDate = "2024-12-31"; valueUsd = 18000;  department = "HR";          status = "Active"  },
        { vendor = "Office Facilities Mgmt"; title = "Facilities Maintenance Contract";  kind = "Services";     startDate = "2024-01-01"; endDate = "2024-12-31"; valueUsd = 84000;  department = "Operations";  status = "Active"  },
        { vendor = "DataSec Analytics";      title = "Security Audit & Monitoring";      kind = "Services";     startDate = "2024-04-01"; endDate = "2025-03-31"; valueUsd = 52000;  department = "Engineering"; status = "Active"  },
        { vendor = "GlobalShip Logistics";   title = "Worldwide Shipping Contract";      kind = "Logistics";    startDate = "2024-01-01"; endDate = "2024-12-31"; valueUsd = 120000; department = "Operations";  status = "Active"  },
        { vendor = "PCB Innovations Ltd";    title = "PCB Design & Manufacturing";       kind = "Procurement";  startDate = "2023-06-01"; endDate = "2024-05-31"; valueUsd = 200000; department = "Robotics";    status = "Expired" },
        { vendor = "Apex Consulting Group";  title = "Market Entry Strategy";            kind = "Consulting";   startDate = "2023-09-01"; endDate = "2024-02-29"; valueUsd = 95000;  department = "Sales";       status = "Expired" },
        { vendor = "BuildRight Construction";title = "Tokyo Office Build-Out";           kind = "Construction"; startDate = "2023-11-01"; endDate = "2024-04-30"; valueUsd = 310000; department = "Operations";  status = "Expired" },
        { vendor = "InsuranceCorp Global";   title = "Corporate Insurance Policy";       kind = "Insurance";    startDate = "2024-01-01"; endDate = "2024-12-31"; valueUsd = 75000;  department = "Finance";     status = "Active"  },
        { vendor = "IP Law Associates";      title = "Patent Filing & IP Protection";   kind = "Legal";        startDate = "2024-02-01"; endDate = "2025-01-31"; valueUsd = 48000;  department = "Finance";     status = "Active"  },
      ];
      customers = [
        { companyName = "Automata Industries";    country = "USA";          industry = "Manufacturing"; plan = "Enterprise"; monthlyRevenueUsd = 12000; signupDate = "2022-03-15"; churnDate = null;          accountManager = "Priya Sharma"   },
        { companyName = "RoboWeld Solutions";     country = "Germany";      industry = "Automotive";    plan = "Enterprise"; monthlyRevenueUsd = 15000; signupDate = "2022-06-01"; churnDate = null;          accountManager = "James O'Brien"  },
        { companyName = "NovaSense Systems";      country = "USA";          industry = "Defense";       plan = "Pro";        monthlyRevenueUsd = 5500;  signupDate = "2023-01-20"; churnDate = null;          accountManager = "Priya Sharma"   },
        { companyName = "PrecisionBuild Corp";    country = "Canada";       industry = "Construction";  plan = "Pro";        monthlyRevenueUsd = 4200;  signupDate = "2023-04-10"; churnDate = null;          accountManager = "Lucas Fernandez"},
        { companyName = "FlexAssembly Ltd";       country = "UK";           industry = "Manufacturing"; plan = "Business";   monthlyRevenueUsd = 2800;  signupDate = "2023-05-22"; churnDate = null;          accountManager = "James O'Brien"  },
        { companyName = "SmartLogistics Co";      country = "Japan";        industry = "Logistics";     plan = "Enterprise"; monthlyRevenueUsd = 11000; signupDate = "2022-11-08"; churnDate = null;          accountManager = "Yuki Tanaka"    },
        { companyName = "AeroAssist Robotics";    country = "France";       industry = "Aerospace";     plan = "Pro";        monthlyRevenueUsd = 6800;  signupDate = "2023-02-14"; churnDate = null;          accountManager = "Lucas Fernandez"},
        { companyName = "TerraForm Dynamics";     country = "Australia";    industry = "Agriculture";   plan = "Business";   monthlyRevenueUsd = 3100;  signupDate = "2023-07-19"; churnDate = null;          accountManager = "Yuki Tanaka"    },
        { companyName = "MediBot Solutions";      country = "USA";          industry = "Healthcare";    plan = "Enterprise"; monthlyRevenueUsd = 18000; signupDate = "2022-09-30"; churnDate = null;          accountManager = "Priya Sharma"   },
        { companyName = "SafeGuard Industrial";   country = "Netherlands";  industry = "Safety";        plan = "Pro";        monthlyRevenueUsd = 4700;  signupDate = "2023-03-05"; churnDate = null;          accountManager = "Lucas Fernandez"},
        { companyName = "EduBot Labs";            country = "Singapore";    industry = "Education";     plan = "Business";   monthlyRevenueUsd = 1900;  signupDate = "2023-08-17"; churnDate = null;          accountManager = "Yuki Tanaka"    },
        { companyName = "UrbanMove Tech";         country = "USA";          industry = "Transportation";plan = "Pro";        monthlyRevenueUsd = 5000;  signupDate = "2023-06-11"; churnDate = null;          accountManager = "Priya Sharma"   },
        { companyName = "ArcticExplore Systems";  country = "Norway";       industry = "Research";      plan = "Business";   monthlyRevenueUsd = 2200;  signupDate = "2023-09-25"; churnDate = null;          accountManager = "James O'Brien"  },
        { companyName = "DeepMine Automation";    country = "South Africa"; industry = "Mining";        plan = "Enterprise"; monthlyRevenueUsd = 9500;  signupDate = "2023-01-03"; churnDate = null;          accountManager = "Lucas Fernandez"},
        { companyName = "HarvestBot Inc";         country = "Brazil";       industry = "Agriculture";   plan = "Business";   monthlyRevenueUsd = 2500;  signupDate = "2023-10-15"; churnDate = null;          accountManager = "Yuki Tanaka"    },
        { companyName = "SpaceServe Dynamics";    country = "USA";          industry = "Space";         plan = "Enterprise"; monthlyRevenueUsd = 22000; signupDate = "2022-07-04"; churnDate = null;          accountManager = "Priya Sharma"   },
        { companyName = "CleanEnergy Robots";     country = "Germany";      industry = "Energy";        plan = "Pro";        monthlyRevenueUsd = 6200;  signupDate = "2023-11-20"; churnDate = null;          accountManager = "James O'Brien"  },
        { companyName = "RetailBot Solutions";    country = "India";        industry = "Retail";        plan = "Business";   monthlyRevenueUsd = 1600;  signupDate = "2024-01-08"; churnDate = null;          accountManager = "Yuki Tanaka"    },
        { companyName = "OldMach Industries";     country = "USA";          industry = "Manufacturing"; plan = "Business";   monthlyRevenueUsd = 0;     signupDate = "2021-05-20"; churnDate = ?"2023-11-30"; accountManager = "James O'Brien"  },
        { companyName = "Vintage Systems LLC";    country = "USA";          industry = "Automotive";    plan = "Pro";        monthlyRevenueUsd = 0;     signupDate = "2022-02-14"; churnDate = ?"2024-02-28"; accountManager = "Priya Sharma"   },
      ];
      departments = [
        { name = "Engineering"; costCenter = "CC-001"; annualBudgetUsd = 4200000; foundedYear = 2017 },
        { name = "Robotics";    costCenter = "CC-002"; annualBudgetUsd = 5800000; foundedYear = 2018 },
        { name = "Sales";       costCenter = "CC-003"; annualBudgetUsd = 1800000; foundedYear = 2017 },
        { name = "Operations";  costCenter = "CC-004"; annualBudgetUsd = 1200000; foundedYear = 2017 },
        { name = "Finance";     costCenter = "CC-005"; annualBudgetUsd = 900000;  foundedYear = 2017 },
        { name = "HR";          costCenter = "CC-006"; annualBudgetUsd = 650000;  foundedYear = 2018 },
        { name = "Product";     costCenter = "CC-007"; annualBudgetUsd = 2100000; foundedYear = 2019 },
      ];
      employeeAssignments = [
        { employee = "Lena Kowalski";   project = "TITAN-1";     allocationPercent = 80;  startDate = "2024-01-10"; endDate = null },
        { employee = "Marcus Webb";     project = "TITAN-1";     allocationPercent = 60;  startDate = "2024-01-10"; endDate = null },
        { employee = "Priya Sharma";    project = "NEXUS-Core";  allocationPercent = 30;  startDate = "2024-02-01"; endDate = null },
        { employee = "Tomas Velez";     project = "CloudOps-v2"; allocationPercent = 100; startDate = "2024-03-01"; endDate = null },
        { employee = "Sophia Chen";     project = "NEXUS-Core";  allocationPercent = 90;  startDate = "2024-02-01"; endDate = null },
        { employee = "Ayo Adeyemi";     project = "DataBridge";  allocationPercent = 100; startDate = "2024-02-15"; endDate = null },
        { employee = "Nina Petrov";     project = "TITAN-1";     allocationPercent = 70;  startDate = "2024-01-10"; endDate = null },
        { employee = "Carlos Mendes";   project = "WebPortal-3"; allocationPercent = 100; startDate = "2024-05-01"; endDate = null },
        { employee = "Fatima Al-Rashid";project = "NEXUS-Core";  allocationPercent = 60;  startDate = "2024-02-01"; endDate = null },
        { employee = "Owen Fitzgerald"; project = "CloudOps-v2"; allocationPercent = 80;  startDate = "2024-03-01"; endDate = null },
        { employee = "Hana Suzuki";     project = "DataBridge";  allocationPercent = 50;  startDate = "2024-02-15"; endDate = null },
        { employee = "Diego Restrepo";  project = "WebPortal-3"; allocationPercent = 80;  startDate = "2024-05-01"; endDate = null },
      ];
      employees = [
        { name = "Elena Vasquez";    email = "evasquez@helixsystems.io";   hireDate = "2017-03-10"; terminationDate = null;          jobTitle = "CTO";                        level = 9;  department = "Engineering"; manager = null;               office = "San Francisco"; salaryUsd = 280000; employmentStatus = "Active";     vacationDaysRemaining = 18; country = "USA"      },
        { name = "Raj Mehta";        email = "rmehta@helixsystems.io";     hireDate = "2017-06-01"; terminationDate = null;          jobTitle = "CEO";                        level = 10; department = "Operations";  manager = null;               office = "San Francisco"; salaryUsd = 320000; employmentStatus = "Active";     vacationDaysRemaining = 22; country = "USA"      },
        { name = "Priya Sharma";     email = "psharma@helixsystems.io";    hireDate = "2018-01-15"; terminationDate = null;          jobTitle = "VP Sales";                   level = 8;  department = "Sales";       manager = ?"Raj Mehta";       office = "New York";      salaryUsd = 210000; employmentStatus = "Active";     vacationDaysRemaining = 15; country = "USA"      },
        { name = "Lena Kowalski";    email = "lkowalski@helixsystems.io";  hireDate = "2018-04-20"; terminationDate = null;          jobTitle = "Principal Robotics Engineer";level = 7;  department = "Robotics";    manager = ?"Elena Vasquez";   office = "Berlin";        salaryUsd = 175000; employmentStatus = "Active";     vacationDaysRemaining = 20; country = "Germany"  },
        { name = "James O'Brien";    email = "jobrien@helixsystems.io";    hireDate = "2018-07-08"; terminationDate = null;          jobTitle = "Senior Account Executive";   level = 5;  department = "Sales";       manager = ?"Priya Sharma";    office = "New York";      salaryUsd = 135000; employmentStatus = "Active";     vacationDaysRemaining = 10; country = "USA"      },
        { name = "Marcus Webb";      email = "mwebb@helixsystems.io";      hireDate = "2019-02-11"; terminationDate = null;          jobTitle = "Staff Engineer";             level = 6;  department = "Engineering"; manager = ?"Elena Vasquez";   office = "San Francisco"; salaryUsd = 165000; employmentStatus = "Active";     vacationDaysRemaining = 14; country = "USA"      },
        { name = "Sophia Chen";      email = "schen@helixsystems.io";      hireDate = "2019-05-03"; terminationDate = null;          jobTitle = "Senior Software Engineer";   level = 5;  department = "Engineering"; manager = ?"Marcus Webb";     office = "San Francisco"; salaryUsd = 145000; employmentStatus = "Active";     vacationDaysRemaining = 17; country = "USA"      },
        { name = "Yuki Tanaka";      email = "ytanaka@helixsystems.io";    hireDate = "2019-08-19"; terminationDate = null;          jobTitle = "Account Executive";          level = 4;  department = "Sales";       manager = ?"Priya Sharma";    office = "Tokyo";         salaryUsd = 115000; employmentStatus = "Active";     vacationDaysRemaining = 12; country = "Japan"    },
        { name = "Lucas Fernandez";  email = "lfernandez@helixsystems.io"; hireDate = "2019-11-04"; terminationDate = null;          jobTitle = "Account Executive";          level = 4;  department = "Sales";       manager = ?"Priya Sharma";    office = "New York";      salaryUsd = 118000; employmentStatus = "Active";     vacationDaysRemaining = 9;  country = "USA"      },
        { name = "Ayo Adeyemi";      email = "aadeyemi@helixsystems.io";   hireDate = "2020-01-27"; terminationDate = null;          jobTitle = "Software Engineer";          level = 4;  department = "Engineering"; manager = ?"Sophia Chen";     office = "Lagos";         salaryUsd = 95000;  employmentStatus = "Active";     vacationDaysRemaining = 11; country = "Nigeria"  },
        { name = "Tomas Velez";      email = "tvelez@helixsystems.io";     hireDate = "2020-03-16"; terminationDate = null;          jobTitle = "DevOps Engineer";            level = 4;  department = "Engineering"; manager = ?"Marcus Webb";     office = "San Francisco"; salaryUsd = 130000; employmentStatus = "Active";     vacationDaysRemaining = 16; country = "USA"      },
        { name = "Nina Petrov";      email = "npetrov@helixsystems.io";    hireDate = "2020-06-08"; terminationDate = null;          jobTitle = "Robotics Engineer";          level = 4;  department = "Robotics";    manager = ?"Lena Kowalski";   office = "Berlin";        salaryUsd = 120000; employmentStatus = "Active";     vacationDaysRemaining = 14; country = "Russia"   },
        { name = "Fatima Al-Rashid"; email = "falrashid@helixsystems.io";  hireDate = "2020-09-14"; terminationDate = null;          jobTitle = "Software Engineer";          level = 3;  department = "Engineering"; manager = ?"Sophia Chen";     office = "Dubai";         salaryUsd = 105000; employmentStatus = "Active";     vacationDaysRemaining = 13; country = "UAE"      },
        { name = "Carlos Mendes";    email = "cmendes@helixsystems.io";    hireDate = "2020-11-30"; terminationDate = null;          jobTitle = "Frontend Engineer";          level = 3;  department = "Engineering"; manager = ?"Marcus Webb";     office = "Sao Paulo";     salaryUsd = 88000;  employmentStatus = "Active";     vacationDaysRemaining = 8;  country = "Brazil"   },
        { name = "Owen Fitzgerald";  email = "ofitzgerald@helixsystems.io";hireDate = "2021-02-22"; terminationDate = null;          jobTitle = "Platform Engineer";          level = 4;  department = "Engineering"; manager = ?"Tomas Velez";     office = "San Francisco"; salaryUsd = 132000; employmentStatus = "Active";     vacationDaysRemaining = 15; country = "Ireland"  },
        { name = "Hana Suzuki";      email = "hsuzuki@helixsystems.io";    hireDate = "2021-04-05"; terminationDate = null;          jobTitle = "Product Designer";           level = 4;  department = "Product";     manager = null;               office = "Tokyo";         salaryUsd = 110000; employmentStatus = "Active";     vacationDaysRemaining = 10; country = "Japan"    },
        { name = "Diego Restrepo";   email = "drestrepo@helixsystems.io";  hireDate = "2021-06-17"; terminationDate = null;          jobTitle = "Full Stack Engineer";        level = 3;  department = "Engineering"; manager = ?"Sophia Chen";     office = "Bogota";        salaryUsd = 85000;  employmentStatus = "Active";     vacationDaysRemaining = 12; country = "Colombia" },
        { name = "Amara Diallo";     email = "adiallo@helixsystems.io";    hireDate = "2021-08-23"; terminationDate = null;          jobTitle = "HR Manager";                 level = 5;  department = "HR";          manager = ?"Raj Mehta";       office = "San Francisco"; salaryUsd = 125000; employmentStatus = "Active";     vacationDaysRemaining = 19; country = "Senegal"  },
        { name = "Viktor Hoffman";   email = "vhoffman@helixsystems.io";   hireDate = "2021-10-11"; terminationDate = null;          jobTitle = "Senior Robotics Engineer";   level = 6;  department = "Robotics";    manager = ?"Lena Kowalski";   office = "Berlin";        salaryUsd = 155000; employmentStatus = "Active";     vacationDaysRemaining = 16; country = "Germany"  },
        { name = "Mei Lin";          email = "mlin@helixsystems.io";       hireDate = "2022-01-03"; terminationDate = null;          jobTitle = "Financial Analyst";          level = 3;  department = "Finance";     manager = null;               office = "San Francisco"; salaryUsd = 95000;  employmentStatus = "Active";     vacationDaysRemaining = 11; country = "China"    },
        { name = "Omar Hassan";      email = "ohassan@helixsystems.io";    hireDate = "2022-03-14"; terminationDate = null;          jobTitle = "Software Engineer";          level = 3;  department = "Engineering"; manager = ?"Sophia Chen";     office = "Cairo";         salaryUsd = 78000;  employmentStatus = "Active";     vacationDaysRemaining = 9;  country = "Egypt"    },
        { name = "Isabelle Morel";   email = "imorel@helixsystems.io";     hireDate = "2022-05-09"; terminationDate = null;          jobTitle = "Operations Manager";         level = 5;  department = "Operations";  manager = ?"Raj Mehta";       office = "Paris";         salaryUsd = 128000; employmentStatus = "Active";     vacationDaysRemaining = 13; country = "France"   },
        { name = "Kwame Asante";     email = "kasante@helixsystems.io";    hireDate = "2022-07-25"; terminationDate = null;          jobTitle = "Mechatronics Engineer";      level = 3;  department = "Robotics";    manager = ?"Viktor Hoffman";  office = "Berlin";        salaryUsd = 95000;  employmentStatus = "Active";     vacationDaysRemaining = 10; country = "Ghana"    },
        { name = "Pooja Gupta";      email = "pgupta@helixsystems.io";     hireDate = "2022-09-19"; terminationDate = null;          jobTitle = "Product Manager";            level = 5;  department = "Product";     manager = null;               office = "San Francisco"; salaryUsd = 148000; employmentStatus = "Active";     vacationDaysRemaining = 14; country = "India"    },
        { name = "Natan Goldberg";   email = "ngoldberg@helixsystems.io";  hireDate = "2022-11-07"; terminationDate = null;          jobTitle = "ML Engineer";                level = 4;  department = "Engineering"; manager = ?"Marcus Webb";     office = "Tel Aviv";      salaryUsd = 142000; employmentStatus = "Active";     vacationDaysRemaining = 16; country = "Israel"   },
        { name = "Sakura Yamamoto";  email = "syamamoto@helixsystems.io";  hireDate = "2023-01-16"; terminationDate = null;          jobTitle = "Embedded Systems Engineer";  level = 3;  department = "Robotics";    manager = ?"Viktor Hoffman";  office = "Tokyo";         salaryUsd = 102000; employmentStatus = "Active";     vacationDaysRemaining = 8;  country = "Japan"    },
        { name = "Paulo Gomes";      email = "pgomes@helixsystems.io";     hireDate = "2023-03-06"; terminationDate = null;          jobTitle = "Sales Engineer";             level = 4;  department = "Sales";       manager = ?"Priya Sharma";    office = "Sao Paulo";     salaryUsd = 108000; employmentStatus = "Active";     vacationDaysRemaining = 11; country = "Brazil"   },
        { name = "Anita Kovacs";     email = "akovacs@helixsystems.io";    hireDate = "2023-05-22"; terminationDate = null;          jobTitle = "Junior Software Engineer";   level = 2;  department = "Engineering"; manager = ?"Fatima Al-Rashid";office = "Budapest";      salaryUsd = 72000;  employmentStatus = "Active";     vacationDaysRemaining = 15; country = "Hungary"  },
        { name = "Soren Andersen";   email = "sandersen@helixsystems.io";  hireDate = "2023-07-10"; terminationDate = null;          jobTitle = "Data Engineer";              level = 3;  department = "Engineering"; manager = ?"Natan Goldberg";  office = "Copenhagen";    salaryUsd = 112000; employmentStatus = "Active";     vacationDaysRemaining = 12; country = "Denmark"  },
        { name = "Aisha Osei";       email = "aosei@helixsystems.io";      hireDate = "2023-09-04"; terminationDate = null;          jobTitle = "Customer Success Manager";   level = 4;  department = "Sales";       manager = ?"Priya Sharma";    office = "New York";      salaryUsd = 105000; employmentStatus = "Active";     vacationDaysRemaining = 7;  country = "Ghana"    },
        { name = "Florian Braun";    email = "fbraun@helixsystems.io";     hireDate = "2023-11-13"; terminationDate = null;          jobTitle = "Hardware Engineer";          level = 3;  department = "Robotics";    manager = ?"Nina Petrov";     office = "Berlin";        salaryUsd = 98000;  employmentStatus = "Active";     vacationDaysRemaining = 10; country = "Germany"  },
        { name = "Zara Qureshi";     email = "zqureshi@helixsystems.io";   hireDate = "2024-01-08"; terminationDate = null;          jobTitle = "Junior Product Designer";    level = 2;  department = "Product";     manager = ?"Hana Suzuki";     office = "San Francisco"; salaryUsd = 68000;  employmentStatus = "Active";     vacationDaysRemaining = 20; country = "Pakistan" },
        { name = "Leo Nakamura";     email = "lnakamura@helixsystems.io";  hireDate = "2024-02-19"; terminationDate = null;          jobTitle = "Junior Robotics Engineer";   level = 2;  department = "Robotics";    manager = ?"Kwame Asante";    office = "Tokyo";         salaryUsd = 75000;  employmentStatus = "Active";     vacationDaysRemaining = 18; country = "Japan"    },
        { name = "Maria Santos";     email = "msantos@helixsystems.io";    hireDate = "2024-03-11"; terminationDate = null;          jobTitle = "Finance Manager";            level = 5;  department = "Finance";     manager = ?"Raj Mehta";       office = "Lisbon";        salaryUsd = 122000; employmentStatus = "Active";     vacationDaysRemaining = 15; country = "Portugal" },
        { name = "Daniel Ochieng";   email = "dochieng@helixsystems.io";   hireDate = "2024-04-01"; terminationDate = null;          jobTitle = "Backend Engineer";           level = 2;  department = "Engineering"; manager = ?"Ayo Adeyemi";     office = "Nairobi";       salaryUsd = 65000;  employmentStatus = "Active";     vacationDaysRemaining = 20; country = "Kenya"    },
        { name = "Ingrid Lindqvist"; email = "ilindqvist@helixsystems.io"; hireDate = "2024-04-15"; terminationDate = null;          jobTitle = "HR Specialist";              level = 2;  department = "HR";          manager = ?"Amara Diallo";    office = "Stockholm";     salaryUsd = 70000;  employmentStatus = "Active";     vacationDaysRemaining = 22; country = "Sweden"   },
        { name = "Chen Wei";         email = "cwei@helixsystems.io";       hireDate = "2024-05-06"; terminationDate = null;          jobTitle = "QA Engineer";                level = 2;  department = "Engineering"; manager = ?"Diego Restrepo";  office = "Shanghai";      salaryUsd = 63000;  employmentStatus = "Active";     vacationDaysRemaining = 18; country = "China"    },
        { name = "Rachel Thompson";  email = "rthompson@helixsystems.io";  hireDate = "2024-05-20"; terminationDate = null;          jobTitle = "Business Analyst";           level = 2;  department = "Operations";  manager = ?"Isabelle Morel";  office = "San Francisco"; salaryUsd = 72000;  employmentStatus = "Active";     vacationDaysRemaining = 20; country = "USA"      },
        { name = "Erik Gustafsson";  email = "egustafsson@helixsystems.io";hireDate = "2024-06-03"; terminationDate = null;          jobTitle = "Junior ML Engineer";         level = 1;  department = "Engineering"; manager = ?"Natan Goldberg";  office = "Stockholm";     salaryUsd = 58000;  employmentStatus = "Active";     vacationDaysRemaining = 25; country = "Sweden"   },
        { name = "Amelia Park";      email = "apark@helixsystems.io";      hireDate = "2024-06-10"; terminationDate = null;          jobTitle = "Operations Analyst";         level = 1;  department = "Operations";  manager = ?"Isabelle Morel";  office = "San Francisco"; salaryUsd = 62000;  employmentStatus = "Active";     vacationDaysRemaining = 25; country = "USA"      },
        { name = "Thomas Grunwald";  email = "tgrunwald@helixsystems.io";  hireDate = "2023-02-14"; terminationDate = ?"2024-01-31"; jobTitle = "Senior Engineer";            level = 5;  department = "Engineering"; manager = ?"Marcus Webb";     office = "Berlin";        salaryUsd = 155000; employmentStatus = "Terminated"; vacationDaysRemaining = 0;  country = "Germany"  },
        { name = "Lisa Chang";       email = "lchang@helixsystems.io";     hireDate = "2022-08-01"; terminationDate = ?"2024-03-15"; jobTitle = "Marketing Manager";          level = 4;  department = "Sales";       manager = ?"Priya Sharma";    office = "New York";      salaryUsd = 118000; employmentStatus = "Terminated"; vacationDaysRemaining = 0;  country = "USA"      },
      ];
      expenses = [
        { date = "2024-01-15"; amountUsd = 4200;  category = "Travel";         payee = "Delta Airlines";           department = "Sales";       project = ?"NEXUS-Core"; submittedBy = "Priya Sharma";   approvalStatus = "Approved" },
        { date = "2024-01-22"; amountUsd = 18500; category = "Equipment";      payee = "Boston Dynamics Reseller"; department = "Robotics";    project = ?"TITAN-1";    submittedBy = "Lena Kowalski";  approvalStatus = "Approved" },
        { date = "2024-02-05"; amountUsd = 850;   category = "Software";       payee = "JetBrains";                department = "Engineering"; project = null;          submittedBy = "Marcus Webb";    approvalStatus = "Approved" },
        { date = "2024-02-14"; amountUsd = 3200;  category = "Marketing";      payee = "LinkedIn Ads";             department = "Sales";       project = null;          submittedBy = "James O'Brien";  approvalStatus = "Approved" },
        { date = "2024-02-28"; amountUsd = 12000; category = "Equipment";      payee = "Festo Robotics";           department = "Robotics";    project = ?"TITAN-1";    submittedBy = "Viktor Hoffman"; approvalStatus = "Approved" },
        { date = "2024-03-07"; amountUsd = 1500;  category = "Training";       payee = "AWS Training";             department = "Engineering"; project = null;          submittedBy = "Tomas Velez";    approvalStatus = "Approved" },
        { date = "2024-03-12"; amountUsd = 6800;  category = "Travel";         payee = "United Airlines + Hotel";  department = "Sales";       project = null;          submittedBy = "Priya Sharma";   approvalStatus = "Approved" },
        { date = "2024-03-19"; amountUsd = 950;   category = "Office Supplies";payee = "Staples";                  department = "Operations";  project = null;          submittedBy = "Isabelle Morel"; approvalStatus = "Approved" },
        { date = "2024-04-02"; amountUsd = 24000; category = "Equipment";      payee = "NVIDIA Corporation";       department = "Robotics";    project = ?"NEXUS-Core"; submittedBy = "Lena Kowalski";  approvalStatus = "Approved" },
        { date = "2024-04-09"; amountUsd = 2100;  category = "Software";       payee = "GitHub Enterprise";        department = "Engineering"; project = null;          submittedBy = "Marcus Webb";    approvalStatus = "Approved" },
        { date = "2024-04-17"; amountUsd = 4500;  category = "Consulting";     payee = "McKinsey & Co";            department = "Operations";  project = null;          submittedBy = "Raj Mehta";      approvalStatus = "Approved" },
        { date = "2024-04-25"; amountUsd = 780;   category = "Travel";         payee = "Airbnb";                   department = "Engineering"; project = ?"DataBridge"; submittedBy = "Ayo Adeyemi";    approvalStatus = "Approved" },
        { date = "2024-05-03"; amountUsd = 15000; category = "Equipment";      payee = "Rethink Robotics";         department = "Robotics";    project = ?"TITAN-1";    submittedBy = "Nina Petrov";    approvalStatus = "Pending"  },
        { date = "2024-05-10"; amountUsd = 3600;  category = "Marketing";      payee = "Google Ads";               department = "Sales";       project = null;          submittedBy = "Lisa Chang";     approvalStatus = "Approved" },
        { date = "2024-05-16"; amountUsd = 1200;  category = "Recruitment";    payee = "LinkedIn Recruiter";       department = "HR";          project = null;          submittedBy = "Amara Diallo";   approvalStatus = "Approved" },
        { date = "2024-05-22"; amountUsd = 8900;  category = "Software";       payee = "Salesforce";               department = "Sales";       project = null;          submittedBy = "Priya Sharma";   approvalStatus = "Approved" },
        { date = "2024-06-04"; amountUsd = 2300;  category = "Travel";         payee = "Lufthansa";                department = "Robotics";    project = ?"NEXUS-Core"; submittedBy = "Viktor Hoffman"; approvalStatus = "Approved" },
        { date = "2024-06-11"; amountUsd = 5400;  category = "Equipment";      payee = "Sick AG (sensors)";        department = "Robotics";    project = ?"TITAN-1";    submittedBy = "Lena Kowalski";  approvalStatus = "Pending"  },
        { date = "2024-06-18"; amountUsd = 1800;  category = "Training";       payee = "Coursera for Business";    department = "HR";          project = null;          submittedBy = "Amara Diallo";   approvalStatus = "Approved" },
        { date = "2024-06-25"; amountUsd = 32000; category = "Equipment";      payee = "Clearpath Robotics";       department = "Robotics";    project = ?"TITAN-1";    submittedBy = "Viktor Hoffman"; approvalStatus = "Pending"  },
      ];
      internAssignments = [
        { intern = "Kai Nakashima"; project = "WebPortal-3"; allocationPercent = 100 },
        { intern = "Sofia Petersen";project = "DataBridge";  allocationPercent = 80  },
        { intern = "James Oduya";   project = "TITAN-1";     allocationPercent = 100 },
        { intern = "Mia Bergstrom"; project = "CloudOps-v2"; allocationPercent = 50  },
        { intern = "Ryan Choi";     project = "NEXUS-Core";  allocationPercent = 60  },
        { intern = "Layla Hassan";  project = "DataBridge";  allocationPercent = 100 },
      ];
      interns = [
        { name = "Kai Nakashima"; email = "knakashima@intern.helixsystems.io"; university = "Stanford University";              startDate = "2024-06-03"; endDate = "2024-08-30"; mentor = "Carlos Mendes";  department = "Engineering"; monthlyStipendUsd = 3500 },
        { name = "Sofia Petersen";email = "spetersen@intern.helixsystems.io";  university = "TU Delft";                         startDate = "2024-06-03"; endDate = "2024-08-30"; mentor = "Ayo Adeyemi";    department = "Engineering"; monthlyStipendUsd = 3000 },
        { name = "James Oduya";   email = "joduya@intern.helixsystems.io";     university = "MIT";                              startDate = "2024-06-03"; endDate = "2024-08-30"; mentor = "Nina Petrov";    department = "Robotics";    monthlyStipendUsd = 3800 },
        { name = "Mia Bergstrom"; email = "mbergstrom@intern.helixsystems.io"; university = "KTH Royal Institute of Technology";startDate = "2024-06-03"; endDate = "2024-08-30"; mentor = "Tomas Velez";    department = "Engineering"; monthlyStipendUsd = 3200 },
        { name = "Ryan Choi";     email = "rchoi@intern.helixsystems.io";      university = "Carnegie Mellon University";       startDate = "2024-06-03"; endDate = "2024-08-30"; mentor = "Fatima Al-Rashid";department = "Engineering"; monthlyStipendUsd = 3600 },
        { name = "Layla Hassan";  email = "lhassan@intern.helixsystems.io";    university = "American University of Beirut";    startDate = "2024-06-03"; endDate = "2024-08-30"; mentor = "Soren Andersen"; department = "Engineering"; monthlyStipendUsd = 2800 },
      ];
      invoices = [
        { vendor = "Acme Robotics Parts";    contract = ?"Annual Hardware Supply Agreement"; amountUsd = 95000; issueDate = "2024-01-05"; dueDate = "2024-02-04"; paidDate = ?"2024-01-28"; status = "Paid"    },
        { vendor = "CloudInfra Services";    contract = ?"Cloud Hosting & DevOps";           amountUsd = 8000;  issueDate = "2024-01-31"; dueDate = "2024-02-28"; paidDate = ?"2024-02-15"; status = "Paid"    },
        { vendor = "LegalEdge Partners";     contract = ?"Corporate Legal Retainer";         amountUsd = 5000;  issueDate = "2024-01-31"; dueDate = "2024-02-28"; paidDate = ?"2024-02-20"; status = "Paid"    },
        { vendor = "Acme Robotics Parts";    contract = ?"Annual Hardware Supply Agreement"; amountUsd = 95000; issueDate = "2024-02-05"; dueDate = "2024-03-06"; paidDate = ?"2024-02-28"; status = "Paid"    },
        { vendor = "PR & Media Group";       contract = ?"Public Relations Campaign";        amountUsd = 12000; issueDate = "2024-06-05"; dueDate = "2024-07-05"; paidDate = null;          status = "Pending" },
        { vendor = "SensoryTech Components"; contract = ?"Sensor Array Supply Q3-Q4";        amountUsd = 75000; issueDate = "2024-07-01"; dueDate = "2024-07-31"; paidDate = null;          status = "Pending" },
        { vendor = "GlobalShip Logistics";   contract = ?"Worldwide Shipping Contract";      amountUsd = 10000; issueDate = "2024-05-01"; dueDate = "2024-05-31"; paidDate = ?"2024-05-25"; status = "Paid"    },
        { vendor = "Office Facilities Mgmt"; contract = ?"Facilities Maintenance Contract";  amountUsd = 7000;  issueDate = "2024-04-01"; dueDate = "2024-04-30"; paidDate = ?"2024-04-22"; status = "Paid"    },
        { vendor = "DataSec Analytics";      contract = ?"Security Audit & Monitoring";      amountUsd = 13000; issueDate = "2024-04-01"; dueDate = "2024-04-30"; paidDate = ?"2024-04-20"; status = "Paid"    },
        { vendor = "Talent Acquisition Co";  contract = ?"Recruiting Services";              amountUsd = 15000; issueDate = "2024-03-01"; dueDate = "2024-03-31"; paidDate = ?"2024-03-28"; status = "Paid"    },
        { vendor = "Training Platform Pro";  contract = ?"Employee Training Licenses";       amountUsd = 1500;  issueDate = "2024-01-15"; dueDate = "2024-02-14"; paidDate = ?"2024-02-10"; status = "Paid"    },
        { vendor = "IP Law Associates";      contract = ?"Patent Filing & IP Protection";   amountUsd = 4000;  issueDate = "2024-02-01"; dueDate = "2024-03-01"; paidDate = ?"2024-02-25"; status = "Paid"    },
        { vendor = "InsuranceCorp Global";   contract = ?"Corporate Insurance Policy";       amountUsd = 75000; issueDate = "2024-01-01"; dueDate = "2024-01-31"; paidDate = ?"2024-01-15"; status = "Paid"    },
        { vendor = "SensoryTech Components"; contract = null;                                amountUsd = 25000; issueDate = "2024-06-01"; dueDate = "2024-06-30"; paidDate = null;          status = "Overdue" },
        { vendor = "CloudInfra Services";    contract = ?"Cloud Hosting & DevOps";           amountUsd = 8000;  issueDate = "2024-05-31"; dueDate = "2024-06-30"; paidDate = null;          status = "Pending" },
      ];
      offices = [
        { city = "San Francisco"; country = "USA";       addressLine = "101 Innovation Drive, Suite 500, San Francisco, CA 94105"; capacity = 80; openedDate = "2017-01-15"; isHq = true  },
        { city = "Berlin";        country = "Germany";   addressLine = "Unter den Linden 45, 10117 Berlin";                        capacity = 35; openedDate = "2019-03-01"; isHq = false },
        { city = "New York";      country = "USA";       addressLine = "350 Fifth Avenue, 59th Floor, New York, NY 10118";         capacity = 25; openedDate = "2018-09-15"; isHq = false },
        { city = "Tokyo";         country = "Japan";     addressLine = "2-7-1 Nishi-Shinjuku, Shinjuku-ku, Tokyo 163-0022";       capacity = 20; openedDate = "2020-06-01"; isHq = false },
        { city = "Singapore";     country = "Singapore"; addressLine = "1 Raffles Place, #40-02, Singapore 048616";                capacity = 15; openedDate = "2023-01-10"; isHq = false },
      ];
      products = [
        { name = "TITAN Arm";           codename = "TITAN-1";    launchDate = "2021-09-15"; lifecycle = "GA";     department = "Robotics";    annualRevenueUsd = 8500000 },
        { name = "NEXUS Platform";      codename = "NEXUS-Core"; launchDate = "2022-03-01"; lifecycle = "Beta";   department = "Engineering"; annualRevenueUsd = 3200000 },
        { name = "FlexBot 200";         codename = "FB-200";     launchDate = "2020-06-10"; lifecycle = "GA";     department = "Robotics";    annualRevenueUsd = 5600000 },
        { name = "DataBridge SDK";      codename = "DataBridge"; launchDate = "2023-11-20"; lifecycle = "GA";     department = "Engineering"; annualRevenueUsd = 1800000 },
        { name = "CloudOps Suite";      codename = "CloudOps-v2";launchDate = "2023-06-01"; lifecycle = "Beta";   department = "Engineering"; annualRevenueUsd = 2400000 },
        { name = "SensAI Module";       codename = "SENSAI-1";   launchDate = "2024-01-15"; lifecycle = "Alpha";  department = "Robotics";    annualRevenueUsd = 420000  },
        { name = "WebPortal Enterprise";codename = "WebPortal-3";launchDate = "2019-04-05"; lifecycle = "Sunset"; department = "Product";     annualRevenueUsd = 950000  },
        { name = "AutoNav System";      codename = "AutoNav";    launchDate = "2022-10-01"; lifecycle = "GA";     department = "Robotics";    annualRevenueUsd = 4100000 },
      ];
      projects = [
        { name = "TITAN Arm v2 Development";    codename = "TITAN-1";     startDate = "2024-01-10"; plannedEndDate = "2024-12-31"; actualEndDate = null;          status = "Active";    budgetUsd = 2800000; lead = "Lena Kowalski";   department = "Robotics";    product = ?"TITAN Arm"           },
        { name = "NEXUS Platform Core Engine";  codename = "NEXUS-Core";  startDate = "2024-02-01"; plannedEndDate = "2024-09-30"; actualEndDate = null;          status = "Active";    budgetUsd = 1500000; lead = "Sophia Chen";     department = "Engineering"; product = ?"NEXUS Platform"       },
        { name = "Cloud Operations v2 Overhaul";codename = "CloudOps-v2"; startDate = "2024-03-01"; plannedEndDate = "2024-10-31"; actualEndDate = null;          status = "Active";    budgetUsd = 980000;  lead = "Tomas Velez";     department = "Engineering"; product = ?"CloudOps Suite"       },
        { name = "DataBridge Multi-Protocol";   codename = "DataBridge";  startDate = "2024-02-15"; plannedEndDate = "2024-08-31"; actualEndDate = null;          status = "Active";    budgetUsd = 650000;  lead = "Ayo Adeyemi";     department = "Engineering"; product = ?"DataBridge SDK"       },
        { name = "Web Portal v3 Refresh";       codename = "WebPortal-3"; startDate = "2024-05-01"; plannedEndDate = "2024-07-31"; actualEndDate = null;          status = "Active";    budgetUsd = 320000;  lead = "Carlos Mendes";   department = "Engineering"; product = ?"WebPortal Enterprise" },
        { name = "SensAI Alpha Program";        codename = "SENSAI-Alpha";startDate = "2024-01-15"; plannedEndDate = "2024-06-30"; actualEndDate = ?"2024-06-28"; status = "Completed"; budgetUsd = 450000;  lead = "Viktor Hoffman";  department = "Robotics";    product = ?"SensAI Module"        },
        { name = "AutoNav Gen2 Research";       codename = "AutoNav-R2";  startDate = "2023-09-01"; plannedEndDate = "2024-06-30"; actualEndDate = ?"2024-07-05"; status = "Completed"; budgetUsd = 780000;  lead = "Nina Petrov";     department = "Robotics";    product = ?"AutoNav System"       },
        { name = "Tokyo Office Setup";          codename = "TYO-Setup";   startDate = "2020-03-01"; plannedEndDate = "2020-06-01"; actualEndDate = ?"2020-05-28"; status = "Completed"; budgetUsd = 200000;  lead = "Isabelle Morel";  department = "Operations";  product = null                   },
        { name = "Singapore Expansion";         codename = "SGP-Expand";  startDate = "2022-09-01"; plannedEndDate = "2023-01-31"; actualEndDate = ?"2023-01-10"; status = "Completed"; budgetUsd = 350000;  lead = "Isabelle Morel";  department = "Operations";  product = null                   },
        { name = "FlexBot 300 Planning";        codename = "FB-300-Plan"; startDate = "2024-08-01"; plannedEndDate = "2025-06-30"; actualEndDate = null;          status = "Planned";   budgetUsd = 3500000; lead = "Lena Kowalski";   department = "Robotics";    product = null                   },
      ];
      vendors = [
        { name = "Acme Robotics Parts";    country = "USA";         taxId = "US-83-1234567";   primaryContactName = "Robert Steele";      paymentTermsDays = 30; createdDate = "2021-12-01" },
        { name = "CloudInfra Services";    country = "USA";         taxId = "US-45-9876543";   primaryContactName = "Andrea Chang";       paymentTermsDays = 14; createdDate = "2022-01-15" },
        { name = "LegalEdge Partners";     country = "USA";         taxId = "US-27-5432109";   primaryContactName = "Michael Forde";      paymentTermsDays = 30; createdDate = "2022-02-10" },
        { name = "Talent Acquisition Co";  country = "USA";         taxId = "US-61-8765432";   primaryContactName = "Susan Park";         paymentTermsDays = 30; createdDate = "2022-03-05" },
        { name = "PR & Media Group";       country = "UK";          taxId = "GB-987654321";    primaryContactName = "Charlotte Evans";    paymentTermsDays = 45; createdDate = "2022-04-20" },
        { name = "SensoryTech Components"; country = "Germany";     taxId = "DE-123456789";    primaryContactName = "Klaus Brandt";       paymentTermsDays = 30; createdDate = "2022-06-01" },
        { name = "Training Platform Pro";  country = "USA";         taxId = "US-33-2345678";   primaryContactName = "Derek Adams";        paymentTermsDays = 14; createdDate = "2022-07-15" },
        { name = "Office Facilities Mgmt"; country = "USA";         taxId = "US-72-3456789";   primaryContactName = "Patricia Lee";       paymentTermsDays = 30; createdDate = "2022-08-30" },
        { name = "DataSec Analytics";      country = "Israel";      taxId = "IL-512345678";    primaryContactName = "Moshe Katz";         paymentTermsDays = 30; createdDate = "2022-10-10" },
        { name = "GlobalShip Logistics";   country = "Netherlands"; taxId = "NL-987654321B01"; primaryContactName = "Jan van der Berg";   paymentTermsDays = 30; createdDate = "2022-11-25" },
        { name = "PCB Innovations Ltd";    country = "Taiwan";      taxId = "TW-12345678";     primaryContactName = "Wei Chen";           paymentTermsDays = 45; createdDate = "2021-05-01" },
        { name = "Apex Consulting Group";  country = "USA";         taxId = "US-55-6543210";   primaryContactName = "Jennifer Walsh";     paymentTermsDays = 30; createdDate = "2021-08-15" },
        { name = "BuildRight Construction";country = "Japan";       taxId = "JP-1234567890";   primaryContactName = "Hiroshi Yamamoto";   paymentTermsDays = 60; createdDate = "2023-10-01" },
        { name = "InsuranceCorp Global";   country = "Switzerland"; taxId = "CHE-123456789";   primaryContactName = "Pierre Dubois";      paymentTermsDays = 14; createdDate = "2022-01-01" },
        { name = "IP Law Associates";      country = "USA";         taxId = "US-88-7654321";   primaryContactName = "Rachel Goldman";     paymentTermsDays = 30; createdDate = "2023-12-01" },
      ];
    };
  };
};
