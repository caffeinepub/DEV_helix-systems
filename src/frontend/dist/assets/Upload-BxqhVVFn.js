import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, R as React, a as clsx, b as cn, u as useQueryClient, S as Skeleton } from "./index-qRdbC-rq.js";
import { g as useActor, u as useEmployees, a as useContractors, b as useInterns, c as useProjects, d as useProducts, e as useOffices, f as useCustomers, h as useVendors, i as useDepartments, j as useContracts, k as useInvoices, l as useExpenses, m as useEmployeeAssignments, n as useContractorAssignments, o as useInternAssignments, p as createActor } from "./useBackend-8uYmvNXJ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M12 13v8", key: "1l5pq0" }],
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "m8 17 4-4 4 4", key: "1quai1" }]
];
const CloudUpload = createLucideIcon("cloud-upload", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  [
    "path",
    { d: "M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1", key: "1oajmo" }
  ],
  [
    "path",
    { d: "M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1", key: "mpwhp6" }
  ]
];
const FileJson = createLucideIcon("file-json", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode);
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup == "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup == "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
var REACT_LAZY_TYPE = Symbol.for("react.lazy");
var use = React[" use ".trim().toString()];
function isPromiseLike(value) {
  return typeof value === "object" && value !== null && "then" in value;
}
function isLazyComponent(element) {
  return element != null && typeof element === "object" && "$$typeof" in element && element.$$typeof === REACT_LAZY_TYPE && "_payload" in element && isPromiseLike(element._payload);
}
// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
  const Slot2 = reactExports.forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props;
    if (isLazyComponent(children) && typeof use === "function") {
      children = use(children._payload);
    }
    const childrenArray = reactExports.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (reactExports.Children.count(newElement) > 1) return reactExports.Children.only(null);
          return reactExports.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children: reactExports.isValidElement(newElement) ? reactExports.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
var Slot = /* @__PURE__ */ createSlot("Slot");
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
  const SlotClone = reactExports.forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props;
    if (isLazyComponent(children) && typeof use === "function") {
      children = use(children._payload);
    }
    if (reactExports.isValidElement(children)) {
      const childrenRef = getElementRef(children);
      const props2 = mergeProps(slotProps, children.props);
      if (children.type !== reactExports.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return reactExports.cloneElement(children, props2);
    }
    return reactExports.Children.count(children) > 1 ? reactExports.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
function isSlottable(child) {
  return reactExports.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef(element) {
  var _a, _b;
  let getter = (_a = Object.getOwnPropertyDescriptor(element.props, "ref")) == null ? void 0 : _a.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = (_b = Object.getOwnPropertyDescriptor(element, "ref")) == null ? void 0 : _b.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
const falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
const cx = clsx;
const cva = (base, config) => (props) => {
  var _config_compoundVariants;
  if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
  const { variants, defaultVariants } = config;
  const getVariantClassNames = Object.keys(variants).map((variant) => {
    const variantProp = props === null || props === void 0 ? void 0 : props[variant];
    const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
    if (variantProp === null) return null;
    const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
    return variants[variant][variantKey];
  });
  const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
    let [key, value] = param;
    if (value === void 0) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
  const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param) => {
    let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
    return Object.entries(compoundVariantOptions).every((param2) => {
      let [key, value] = param2;
      return Array.isArray(value) ? value.includes({
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key]) : {
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key] === value;
    }) ? [
      ...acc,
      cvClass,
      cvClassName
    ] : acc;
  }, []);
  return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
};
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
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
  "internAssignments"
];
const DATASET_LABELS = {
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
  internAssignments: "Intern Assignments"
};
function toBigInt(v) {
  if (typeof v === "bigint") return v;
  if (typeof v === "number" || typeof v === "string") return BigInt(v);
  return BigInt(0);
}
function toOptStr(v) {
  return v != null && v !== "" ? String(v) : void 0;
}
function toEmployee(r) {
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
    vacationDaysRemaining: toBigInt(r.vacationDaysRemaining)
  };
}
function toContractor(r) {
  return {
    status: String(r.status ?? ""),
    country: String(r.country ?? ""),
    contractStart: String(r.contractStart ?? ""),
    name: String(r.name ?? ""),
    agency: String(r.agency ?? ""),
    contractEnd: String(r.contractEnd ?? ""),
    email: String(r.email ?? ""),
    hourlyRateUsd: toBigInt(r.hourlyRateUsd),
    department: String(r.department ?? "")
  };
}
function toIntern(r) {
  return {
    mentor: String(r.mentor ?? ""),
    endDate: String(r.endDate ?? ""),
    name: String(r.name ?? ""),
    email: String(r.email ?? ""),
    university: String(r.university ?? ""),
    department: String(r.department ?? ""),
    monthlyStipendUsd: toBigInt(r.monthlyStipendUsd),
    startDate: String(r.startDate ?? "")
  };
}
function toProject(r) {
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
    startDate: String(r.startDate ?? "")
  };
}
function toProduct(r) {
  return {
    name: String(r.name ?? ""),
    annualRevenueUsd: toBigInt(r.annualRevenueUsd),
    codename: String(r.codename ?? ""),
    launchDate: String(r.launchDate ?? ""),
    lifecycle: String(r.lifecycle ?? ""),
    department: String(r.department ?? "")
  };
}
function toOffice(r) {
  return {
    country: String(r.country ?? ""),
    openedDate: String(r.openedDate ?? ""),
    city: String(r.city ?? ""),
    isHq: Boolean(r.isHq),
    addressLine: String(r.addressLine ?? ""),
    capacity: toBigInt(r.capacity)
  };
}
function toCustomer(r) {
  return {
    country: String(r.country ?? ""),
    signupDate: String(r.signupDate ?? ""),
    plan: String(r.plan ?? ""),
    accountManager: String(r.accountManager ?? ""),
    monthlyRevenueUsd: toBigInt(r.monthlyRevenueUsd),
    companyName: String(r.companyName ?? ""),
    churnDate: toOptStr(r.churnDate),
    industry: String(r.industry ?? "")
  };
}
function toVendor(r) {
  return {
    paymentTermsDays: toBigInt(r.paymentTermsDays),
    taxId: String(r.taxId ?? ""),
    country: String(r.country ?? ""),
    name: String(r.name ?? ""),
    createdDate: String(r.createdDate ?? ""),
    primaryContactName: String(r.primaryContactName ?? "")
  };
}
function toDepartment(r) {
  return {
    foundedYear: toBigInt(r.foundedYear),
    name: String(r.name ?? ""),
    annualBudgetUsd: toBigInt(r.annualBudgetUsd),
    costCenter: String(r.costCenter ?? "")
  };
}
function toContract(r) {
  return {
    status: String(r.status ?? ""),
    title: String(r.title ?? ""),
    endDate: String(r.endDate ?? ""),
    kind: String(r.kind ?? ""),
    vendor: String(r.vendor ?? ""),
    department: String(r.department ?? ""),
    valueUsd: toBigInt(r.valueUsd),
    startDate: String(r.startDate ?? "")
  };
}
function toInvoice(r) {
  return {
    issueDate: String(r.issueDate ?? ""),
    status: String(r.status ?? ""),
    contract: toOptStr(r.contract),
    dueDate: String(r.dueDate ?? ""),
    paidDate: toOptStr(r.paidDate),
    vendor: String(r.vendor ?? ""),
    amountUsd: toBigInt(r.amountUsd)
  };
}
function toExpense(r) {
  return {
    date: String(r.date ?? ""),
    submittedBy: String(r.submittedBy ?? ""),
    approvalStatus: String(r.approvalStatus ?? ""),
    category: String(r.category ?? ""),
    amountUsd: toBigInt(r.amountUsd),
    payee: String(r.payee ?? ""),
    department: String(r.department ?? ""),
    project: toOptStr(r.project)
  };
}
function toEmployeeAssignment(r) {
  return {
    endDate: toOptStr(r.endDate),
    allocationPercent: toBigInt(r.allocationPercent),
    employee: String(r.employee ?? ""),
    project: String(r.project ?? ""),
    startDate: String(r.startDate ?? "")
  };
}
function toContractorAssignment(r) {
  return {
    endDate: toOptStr(r.endDate),
    allocationPercent: toBigInt(r.allocationPercent),
    contractor: String(r.contractor ?? ""),
    project: String(r.project ?? ""),
    startDate: String(r.startDate ?? "")
  };
}
function toInternAssignment(r) {
  return {
    allocationPercent: toBigInt(r.allocationPercent),
    intern: String(r.intern ?? ""),
    project: String(r.project ?? "")
  };
}
function useDatasetCounts() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
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
  const counts = {
    employees: (_a = employees.data) == null ? void 0 : _a.length,
    contractors: (_b = contractors.data) == null ? void 0 : _b.length,
    interns: (_c = interns.data) == null ? void 0 : _c.length,
    projects: (_d = projects.data) == null ? void 0 : _d.length,
    products: (_e = products.data) == null ? void 0 : _e.length,
    offices: (_f = offices.data) == null ? void 0 : _f.length,
    customers: (_g = customers.data) == null ? void 0 : _g.length,
    vendors: (_h = vendors.data) == null ? void 0 : _h.length,
    departments: (_i = departments.data) == null ? void 0 : _i.length,
    contracts: (_j = contracts.data) == null ? void 0 : _j.length,
    invoices: (_k = invoices.data) == null ? void 0 : _k.length,
    expenses: (_l = expenses.data) == null ? void 0 : _l.length,
    employeeAssignments: (_m = employeeAssignments.data) == null ? void 0 : _m.length,
    contractorAssignments: (_n = contractorAssignments.data) == null ? void 0 : _n.length,
    internAssignments: (_o = internAssignments.data) == null ? void 0 : _o.length
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
    internAssignments
  ].some((q) => q.isLoading);
  return { counts, isLoading };
}
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
function UploadPage() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const { counts, isLoading: countsLoading } = useDatasetCounts();
  const [selectedFile, setSelectedFile] = reactExports.useState(null);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const [uploadStatus, setUploadStatus] = reactExports.useState("idle");
  const [statusMessage, setStatusMessage] = reactExports.useState("");
  const fileInputRef = reactExports.useRef(null);
  const handleDragEnter = reactExports.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  const handleDragLeave = reactExports.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  const handleDragOver = reactExports.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  const handleDrop = reactExports.useCallback((e) => {
    var _a;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = (_a = e.dataTransfer.files) == null ? void 0 : _a[0];
    if (file == null ? void 0 : file.name.endsWith(".json")) {
      setSelectedFile(file);
      setUploadStatus("idle");
      setStatusMessage("");
    }
  }, []);
  function handleFileChange(e) {
    var _a;
    const file = ((_a = e.target.files) == null ? void 0 : _a[0]) ?? null;
    if (file) {
      setSelectedFile(file);
      setUploadStatus("idle");
      setStatusMessage("");
    }
  }
  async function handleUpload() {
    if (!selectedFile || !actor) return;
    setUploadStatus("uploading");
    setStatusMessage("");
    try {
      const text = await selectedFile.text();
      const json = JSON.parse(text);
      const keys = Object.keys(json).filter(
        (k) => DATASET_KEYS.includes(k)
      );
      if (keys.length === 0) {
        throw new Error("No recognized dataset keys found in the JSON file.");
      }
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
              rows.map(toEmployeeAssignment)
            );
            break;
          case "contractorAssignments":
            await actor.uploadContractorAssignments(
              rows.map(toContractorAssignment)
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
        `${keys.length} dataset${keys.length !== 1 ? "s" : ""} updated successfully.`
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setUploadStatus("error");
      setStatusMessage(msg);
    }
  }
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "upload.page", className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border bg-card px-6 py-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold text-foreground", children: "Upload Data" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Upload a JSON file to replace all datasets. The file should be a JSON object with dataset names as keys." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 p-6 overflow-auto bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "upload.card",
          className: "bg-card rounded-lg border border-border shadow-sm p-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground mb-4", children: "Select JSON File" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": "upload.dropzone",
                onDragEnter: handleDragEnter,
                onDragLeave: handleDragLeave,
                onDragOver: handleDragOver,
                onDrop: handleDrop,
                className: `
                w-full border-2 border-dashed rounded-lg p-12 text-center transition-colors duration-200 cursor-pointer
                ${isDragging ? "border-blue-400 bg-blue-50" : selectedFile ? "border-blue-300 bg-blue-50/40" : "border-border hover:border-input hover:bg-muted/30"}
              `,
                onClick: () => {
                  var _a;
                  return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      ref: fileInputRef,
                      type: "file",
                      accept: ".json,application/json",
                      className: "sr-only",
                      onChange: handleFileChange,
                      "data-ocid": "upload.file_input"
                    }
                  ),
                  selectedFile ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FileJson, { className: "w-12 h-12 text-blue-500" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: selectedFile.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatFileSize(selectedFile.size) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "text-xs text-blue-600 hover:text-blue-800 underline mt-1",
                        onClick: (e) => {
                          e.stopPropagation();
                          setSelectedFile(null);
                          setUploadStatus("idle");
                          setStatusMessage("");
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        },
                        "data-ocid": "upload.clear_button",
                        children: "Choose a different file"
                      }
                    )
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CloudUpload, { className: "w-12 h-12 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Drop your JSON file here" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "or" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "default",
                        size: "sm",
                        className: "bg-blue-600 hover:bg-blue-700 text-white",
                        onClick: (e) => {
                          var _a;
                          e.stopPropagation();
                          (_a = fileInputRef.current) == null ? void 0 : _a.click();
                        },
                        "data-ocid": "upload.browse_button",
                        children: "Browse Files"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Accepts .json files only" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                className: "w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white",
                disabled: !selectedFile || uploadStatus === "uploading" || !actor,
                onClick: handleUpload,
                "data-ocid": "upload.submit_button",
                children: uploadStatus === "uploading" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "data-ocid": "upload.loading_state", children: "Uploading..." })
                ] }) : "Upload"
              }
            ),
            uploadStatus === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "upload.success_state",
                className: "mt-4 flex items-start gap-3 rounded-md border border-green-200 bg-green-50 px-4 py-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5 text-green-600 mt-0.5 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-green-800 font-medium", children: [
                    "Data uploaded successfully. ",
                    statusMessage
                  ] })
                ]
              }
            ),
            uploadStatus === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "upload.error_state",
                className: "mt-4 flex items-start gap-3 rounded-md border border-red-200 bg-red-50 px-4 py-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-red-600 mt-0.5 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-800", children: statusMessage })
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "upload.format_card",
          className: "bg-card rounded-lg border border-border shadow-sm p-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground mb-3", children: "Expected JSON Format" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-4", children: [
              "The JSON file should contain an object with any combination of these keys:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-foreground break-all", children: "employees, contractors, interns, projects, products, offices, customers, vendors, departments, contracts, invoices, expenses, employeeAssignments, contractorAssignments, internAssignments" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "bg-muted border border-border rounded-md px-4 py-3 text-xs font-mono text-foreground overflow-x-auto whitespace-pre-wrap", children: EXAMPLE_JSON })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "upload.status_section",
          className: "bg-card rounded-lg border border-border shadow-sm p-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground mb-4", children: "Current Dataset Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5", children: DATASET_KEYS.map((key, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": `upload.status.item.${idx + 1}`,
                className: "bg-background rounded border border-border p-4",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-tight mb-1", children: DATASET_LABELS[key] }),
                  countsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Skeleton,
                    {
                      "data-ocid": `upload.status.loading_state.${idx + 1}`,
                      className: "h-7 w-12 mt-1 animate-pulse"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-foreground", children: counts[key] ?? 0 })
                ]
              },
              key
            )) })
          ]
        }
      )
    ] }) })
  ] });
}
export {
  UploadPage
};
