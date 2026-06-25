import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useContractorAssignments,
  useContractors,
  useContracts,
  useCustomers,
  useDepartments,
  useEmployeeAssignments,
  useEmployees,
  useExpenses,
  useInternAssignments,
  useInterns,
  useInvoices,
  useOffices,
  useProducts,
  useProjects,
  useVendors,
} from "@/hooks/useBackend";
import type {
  Contract,
  Contractor,
  ContractorAssignment,
  Customer,
  Department,
  Employee,
  EmployeeAssignment,
  Expense,
  Intern,
  InternAssignment,
  Invoice,
  Office,
  Product,
  Project,
  Vendor,
} from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  CheckCircle,
  FileJson,
  Loader2,
  UploadCloud,
} from "lucide-react";
import { type DragEvent, useCallback, useRef, useState } from "react";

// ─── Dataset config ───────────────────────────────────────────────────────────

const DATASET_KEYS = [
  "employees",
  "contractors",
  "interns",
  "projects",
  "products",
  "offices",
  "customers",
  "vendors",
  "departments",
  "contracts",
  "invoices",
  "expenses",
  "employeeAssignments",
  "contractorAssignments",
  "internAssignments",
] as const;

type DatasetKey = (typeof DATASET_KEYS)[number];

const DATASET_LABELS: Record<DatasetKey, string> = {
  employees: "Employees",
  contractors: "Contractors",
  interns: "Interns",
  projects: "Projects",
  products: "Products",
  offices: "Offices",
  customers: "Customers",
  vendors: "Vendors",
  departments: "Departments",
  contracts: "Contracts",
  invoices: "Invoices",
  expenses: "Expenses",
  employeeAssignments: "Employee Assignments",
  contractorAssignments: "Contractor Assignments",
  internAssignments: "Intern Assignments",
};

// ─── BigInt conversion helpers ───────────────────────────────────────────────

function toBigInt(v: unknown): bigint {
  if (typeof v === "bigint") return v;
  if (typeof v === "number" || typeof v === "string") return BigInt(v);
  return BigInt(0);
}

function toOptStr(v: unknown): string | undefined {
  return v != null && v !== "" ? String(v) : undefined;
}

// ─── JSON → typed record conversions ─────────────────────────────────────────

type RawRecord = Record<string, unknown>;

function toEmployee(r: RawRecord): Employee {
  return {
    manager: toOptStr(r.manager),
    country: String(r.country ?? ""),
    hireDate: String(r.hireDate ?? ""),
    name: String(r.name ?? ""),
    office: String(r.office ?? ""),
    email: String(r.email ?? ""),
    level: toBigInt(r.level),
    jobTitle: String(r.jobTitle ?? ""),
    terminationDate: toOptStr(r.terminationDate),
    salaryUsd: toBigInt(r.salaryUsd),
    department: String(r.department ?? ""),
    employmentStatus: String(r.employmentStatus ?? ""),
    vacationDaysRemaining: toBigInt(r.vacationDaysRemaining),
  };
}

function toContractor(r: RawRecord): Contractor {
  return {
    status: String(r.status ?? ""),
    country: String(r.country ?? ""),
    contractStart: String(r.contractStart ?? ""),
    name: String(r.name ?? ""),
    agency: String(r.agency ?? ""),
    contractEnd: String(r.contractEnd ?? ""),
    email: String(r.email ?? ""),
    hourlyRateUsd: toBigInt(r.hourlyRateUsd),
    department: String(r.department ?? ""),
  };
}

function toIntern(r: RawRecord): Intern {
  return {
    mentor: String(r.mentor ?? ""),
    endDate: String(r.endDate ?? ""),
    name: String(r.name ?? ""),
    email: String(r.email ?? ""),
    university: String(r.university ?? ""),
    department: String(r.department ?? ""),
    monthlyStipendUsd: toBigInt(r.monthlyStipendUsd),
    startDate: String(r.startDate ?? ""),
  };
}

function toProject(r: RawRecord): Project {
  return {
    plannedEndDate: String(r.plannedEndDate ?? ""),
    status: String(r.status ?? ""),
    actualEndDate: toOptStr(r.actualEndDate),
    lead: String(r.lead ?? ""),
    name: String(r.name ?? ""),
    codename: String(r.codename ?? ""),
    department: String(r.department ?? ""),
    budgetUsd: toBigInt(r.budgetUsd),
    product: toOptStr(r.product),
    startDate: String(r.startDate ?? ""),
  };
}

function toProduct(r: RawRecord): Product {
  return {
    name: String(r.name ?? ""),
    annualRevenueUsd: toBigInt(r.annualRevenueUsd),
    codename: String(r.codename ?? ""),
    launchDate: String(r.launchDate ?? ""),
    lifecycle: String(r.lifecycle ?? ""),
    department: String(r.department ?? ""),
  };
}

function toOffice(r: RawRecord): Office {
  return {
    country: String(r.country ?? ""),
    openedDate: String(r.openedDate ?? ""),
    city: String(r.city ?? ""),
    isHq: Boolean(r.isHq),
    addressLine: String(r.addressLine ?? ""),
    capacity: toBigInt(r.capacity),
  };
}

function toCustomer(r: RawRecord): Customer {
  return {
    country: String(r.country ?? ""),
    signupDate: String(r.signupDate ?? ""),
    plan: String(r.plan ?? ""),
    accountManager: String(r.accountManager ?? ""),
    monthlyRevenueUsd: toBigInt(r.monthlyRevenueUsd),
    companyName: String(r.companyName ?? ""),
    churnDate: toOptStr(r.churnDate),
    industry: String(r.industry ?? ""),
  };
}

function toVendor(r: RawRecord): Vendor {
  return {
    paymentTermsDays: toBigInt(r.paymentTermsDays),
    taxId: String(r.taxId ?? ""),
    country: String(r.country ?? ""),
    name: String(r.name ?? ""),
    createdDate: String(r.createdDate ?? ""),
    primaryContactName: String(r.primaryContactName ?? ""),
  };
}

function toDepartment(r: RawRecord): Department {
  return {
    foundedYear: toBigInt(r.foundedYear),
    name: String(r.name ?? ""),
    annualBudgetUsd: toBigInt(r.annualBudgetUsd),
    costCenter: String(r.costCenter ?? ""),
  };
}

function toContract(r: RawRecord): Contract {
  return {
    status: String(r.status ?? ""),
    title: String(r.title ?? ""),
    endDate: String(r.endDate ?? ""),
    kind: String(r.kind ?? ""),
    vendor: String(r.vendor ?? ""),
    department: String(r.department ?? ""),
    valueUsd: toBigInt(r.valueUsd),
    startDate: String(r.startDate ?? ""),
  };
}

function toInvoice(r: RawRecord): Invoice {
  return {
    issueDate: String(r.issueDate ?? ""),
    status: String(r.status ?? ""),
    contract: toOptStr(r.contract),
    dueDate: String(r.dueDate ?? ""),
    paidDate: toOptStr(r.paidDate),
    vendor: String(r.vendor ?? ""),
    amountUsd: toBigInt(r.amountUsd),
  };
}

function toExpense(r: RawRecord): Expense {
  return {
    date: String(r.date ?? ""),
    submittedBy: String(r.submittedBy ?? ""),
    approvalStatus: String(r.approvalStatus ?? ""),
    category: String(r.category ?? ""),
    amountUsd: toBigInt(r.amountUsd),
    payee: String(r.payee ?? ""),
    department: String(r.department ?? ""),
    project: toOptStr(r.project),
  };
}

function toEmployeeAssignment(r: RawRecord): EmployeeAssignment {
  return {
    endDate: toOptStr(r.endDate),
    allocationPercent: toBigInt(r.allocationPercent),
    employee: String(r.employee ?? ""),
    project: String(r.project ?? ""),
    startDate: String(r.startDate ?? ""),
  };
}

function toContractorAssignment(r: RawRecord): ContractorAssignment {
  return {
    endDate: toOptStr(r.endDate),
    allocationPercent: toBigInt(r.allocationPercent),
    contractor: String(r.contractor ?? ""),
    project: String(r.project ?? ""),
    startDate: String(r.startDate ?? ""),
  };
}

function toInternAssignment(r: RawRecord): InternAssignment {
  return {
    allocationPercent: toBigInt(r.allocationPercent),
    intern: String(r.intern ?? ""),
    project: String(r.project ?? ""),
  };
}

// ─── Status counts hook ───────────────────────────────────────────────────────

function useDatasetCounts() {
  const employees = useEmployees();
  const contractors = useContractors();
  const interns = useInterns();
  const projects = useProjects();
  const products = useProducts();
  const offices = useOffices();
  const customers = useCustomers();
  const vendors = useVendors();
  const departments = useDepartments();
  const contracts = useContracts();
  const invoices = useInvoices();
  const expenses = useExpenses();
  const employeeAssignments = useEmployeeAssignments();
  const contractorAssignments = useContractorAssignments();
  const internAssignments = useInternAssignments();

  const counts: Record<DatasetKey, number | undefined> = {
    employees: employees.data?.length,
    contractors: contractors.data?.length,
    interns: interns.data?.length,
    projects: projects.data?.length,
    products: products.data?.length,
    offices: offices.data?.length,
    customers: customers.data?.length,
    vendors: vendors.data?.length,
    departments: departments.data?.length,
    contracts: contracts.data?.length,
    invoices: invoices.data?.length,
    expenses: expenses.data?.length,
    employeeAssignments: employeeAssignments.data?.length,
    contractorAssignments: contractorAssignments.data?.length,
    internAssignments: internAssignments.data?.length,
  };

  const isLoading = [
    employees,
    contractors,
    interns,
    projects,
    products,
    offices,
    customers,
    vendors,
    departments,
    contracts,
    invoices,
    expenses,
    employeeAssignments,
    contractorAssignments,
    internAssignments,
  ].some((q) => q.isLoading);

  return { counts, isLoading };
}

// ─── Page component ───────────────────────────────────────────────────────────

type UploadStatus = "idle" | "uploading" | "success" | "error";

const EXAMPLE_JSON = `{
  "employees": [
    {
      "name": "Jane Smith",
      "email": "jane@example.com",
      "department": "Engineering",
      "jobTitle": "Senior Engineer",
      "salaryUsd": 120000,
      "level": 4,
      ...
    }
  ],
  "projects": [...],
  "customers": [...]
}`;

export function UploadPage() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const { counts, isLoading: countsLoading } = useDatasetCounts();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Drag handlers ───────────────────────────────────────────────────────────
  const handleDragEnter = useCallback((e: DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.name.endsWith(".json")) {
      setSelectedFile(file);
      setUploadStatus("idle");
      setStatusMessage("");
    }
  }, []);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setSelectedFile(file);
      setUploadStatus("idle");
      setStatusMessage("");
    }
  }

  // ── Upload logic ────────────────────────────────────────────────────────────
  async function handleUpload() {
    if (!selectedFile || !actor) return;
    setUploadStatus("uploading");
    setStatusMessage("");

    try {
      const text = await selectedFile.text();
      const json = JSON.parse(text) as Record<string, RawRecord[]>;

      const keys = Object.keys(json).filter((k) =>
        DATASET_KEYS.includes(k as DatasetKey),
      ) as DatasetKey[];

      if (keys.length === 0) {
        throw new Error("No recognized dataset keys found in the JSON file.");
      }

      // Process each present key
      for (const key of keys) {
        const rows = json[key];
        if (!Array.isArray(rows)) continue;

        switch (key) {
          case "employees":
            await actor.uploadEmployees(rows.map(toEmployee));
            break;
          case "contractors":
            await actor.uploadContractors(rows.map(toContractor));
            break;
          case "interns":
            await actor.uploadInterns(rows.map(toIntern));
            break;
          case "projects":
            await actor.uploadProjects(rows.map(toProject));
            break;
          case "products":
            await actor.uploadProducts(rows.map(toProduct));
            break;
          case "offices":
            await actor.uploadOffices(rows.map(toOffice));
            break;
          case "customers":
            await actor.uploadCustomers(rows.map(toCustomer));
            break;
          case "vendors":
            await actor.uploadVendors(rows.map(toVendor));
            break;
          case "departments":
            await actor.uploadDepartments(rows.map(toDepartment));
            break;
          case "contracts":
            await actor.uploadContracts(rows.map(toContract));
            break;
          case "invoices":
            await actor.uploadInvoices(rows.map(toInvoice));
            break;
          case "expenses":
            await actor.uploadExpenses(rows.map(toExpense));
            break;
          case "employeeAssignments":
            await actor.uploadEmployeeAssignments(
              rows.map(toEmployeeAssignment),
            );
            break;
          case "contractorAssignments":
            await actor.uploadContractorAssignments(
              rows.map(toContractorAssignment),
            );
            break;
          case "internAssignments":
            await actor.uploadInternAssignments(rows.map(toInternAssignment));
            break;
        }
      }

      await queryClient.invalidateQueries();
      setUploadStatus("success");
      setStatusMessage(
        `${keys.length} dataset${keys.length !== 1 ? "s" : ""} updated successfully.`,
      );
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setUploadStatus("error");
      setStatusMessage(msg);
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div data-ocid="upload.page" className="flex flex-col h-full">
      {/* Page header */}
      <div className="border-b border-border bg-card px-6 py-5">
        <h1 className="text-2xl font-semibold text-foreground">Upload Data</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Upload a JSON file to replace all datasets. The file should be a JSON
          object with dataset names as keys.
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto bg-background">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Upload Card */}
          <div
            data-ocid="upload.card"
            className="bg-card rounded-lg border border-border shadow-sm p-6"
          >
            <h2 className="text-base font-semibold text-foreground mb-4">
              Select JSON File
            </h2>

            {/* Drop Zone */}
            <button
              type="button"
              data-ocid="upload.dropzone"
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={`
                w-full border-2 border-dashed rounded-lg p-12 text-center transition-colors duration-200 cursor-pointer
                ${
                  isDragging
                    ? "border-blue-400 bg-blue-50"
                    : selectedFile
                      ? "border-blue-300 bg-blue-50/40"
                      : "border-border hover:border-input hover:bg-muted/30"
                }
              `}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                className="sr-only"
                onChange={handleFileChange}
                data-ocid="upload.file_input"
              />

              {selectedFile ? (
                <div className="flex flex-col items-center gap-2">
                  <FileJson className="w-12 h-12 text-blue-500" />
                  <p className="text-sm font-medium text-foreground">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(selectedFile.size)}
                  </p>
                  <button
                    type="button"
                    className="text-xs text-blue-600 hover:text-blue-800 underline mt-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                      setUploadStatus("idle");
                      setStatusMessage("");
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    data-ocid="upload.clear_button"
                  >
                    Choose a different file
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <UploadCloud className="w-12 h-12 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Drop your JSON file here
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">or</p>
                  </div>
                  <Button
                    type="button"
                    variant="default"
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    data-ocid="upload.browse_button"
                  >
                    Browse Files
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Accepts .json files only
                  </p>
                </div>
              )}
            </button>

            {/* Upload Button */}
            <Button
              type="button"
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!selectedFile || uploadStatus === "uploading" || !actor}
              onClick={handleUpload}
              data-ocid="upload.submit_button"
            >
              {uploadStatus === "uploading" ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  <span data-ocid="upload.loading_state">Uploading...</span>
                </>
              ) : (
                "Upload"
              )}
            </Button>

            {/* Status banners */}
            {uploadStatus === "success" && (
              <div
                data-ocid="upload.success_state"
                className="mt-4 flex items-start gap-3 rounded-md border border-green-200 bg-green-50 px-4 py-3"
              >
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                <p className="text-sm text-green-800 font-medium">
                  Data uploaded successfully. {statusMessage}
                </p>
              </div>
            )}

            {uploadStatus === "error" && (
              <div
                data-ocid="upload.error_state"
                className="mt-4 flex items-start gap-3 rounded-md border border-red-200 bg-red-50 px-4 py-3"
              >
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                <p className="text-sm text-red-800">{statusMessage}</p>
              </div>
            )}
          </div>

          {/* JSON Format Info Card */}
          <div
            data-ocid="upload.format_card"
            className="bg-card rounded-lg border border-border shadow-sm p-6"
          >
            <h2 className="text-base font-semibold text-foreground mb-3">
              Expected JSON Format
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              The JSON file should contain an object with any combination of
              these keys:{" "}
              <span className="font-mono text-xs text-foreground break-all">
                employees, contractors, interns, projects, products, offices,
                customers, vendors, departments, contracts, invoices, expenses,
                employeeAssignments, contractorAssignments, internAssignments
              </span>
            </p>
            <pre className="bg-muted border border-border rounded-md px-4 py-3 text-xs font-mono text-foreground overflow-x-auto whitespace-pre-wrap">
              {EXAMPLE_JSON}
            </pre>
          </div>

          {/* Current Dataset Status */}
          <div
            data-ocid="upload.status_section"
            className="bg-card rounded-lg border border-border shadow-sm p-6"
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Current Dataset Status
            </h2>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
              {DATASET_KEYS.map((key, idx) => (
                <div
                  key={key}
                  data-ocid={`upload.status.item.${idx + 1}`}
                  className="bg-background rounded border border-border p-4"
                >
                  <p className="text-sm text-muted-foreground leading-tight mb-1">
                    {DATASET_LABELS[key]}
                  </p>
                  {countsLoading ? (
                    <Skeleton
                      data-ocid={`upload.status.loading_state.${idx + 1}`}
                      className="h-7 w-12 mt-1 animate-pulse"
                    />
                  ) : (
                    <p className="text-xl font-bold text-foreground">
                      {counts[key] ?? 0}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
