import { c as createLucideIcon, j as jsxRuntimeExports, S as Skeleton } from "./index-qRdbC-rq.js";
import { u as useEmployees, a as useContractors, b as useInterns, c as useProjects, d as useProducts, e as useOffices, f as useCustomers } from "./useBackend-8uYmvNXJ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", key: "1b4qmf" }],
  ["path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", key: "i71pzd" }],
  ["path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", key: "10jefs" }],
  ["path", { d: "M10 6h4", key: "1itunk" }],
  ["path", { d: "M10 10h4", key: "tcdvrf" }],
  ["path", { d: "M10 14h4", key: "kelpxr" }],
  ["path", { d: "M10 18h4", key: "1ulq68" }]
];
const Building2 = createLucideIcon("building-2", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
      key: "usdka0"
    }
  ]
];
const FolderOpen = createLucideIcon("folder-open", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
      key: "1a0edw"
    }
  ],
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }]
];
const Package = createLucideIcon("package", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
const SKELETON_PRODUCT_ROWS = ["p1", "p2", "p3", "p4"];
const SKELETON_PRODUCT_COLS = ["c1", "c2", "c3", "c4", "c5"];
const SKELETON_OFFICE_CARDS = ["o1", "o2", "o3", "o4", "o5", "o6"];
function fmtUsd(value) {
  return `$${Number(value).toLocaleString("en-US")}`;
}
function isPresent(val) {
  if (val === void 0 || val === null) return false;
  if (Array.isArray(val)) return val.length > 0;
  return true;
}
function StatCard({
  title,
  value,
  icon,
  subLabel,
  loading,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": ocid,
      className: "bg-card rounded-lg border border-border p-6 shadow-sm flex flex-col gap-3",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-primary/70", children: icon })
        ] }),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "animate-pulse bg-muted h-8 w-24 rounded" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-semibold text-foreground tabular-nums", children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: subLabel })
      ]
    }
  );
}
const lifecycleBadge = {
  GA: "bg-green-100 text-green-700 border-green-200",
  Beta: "bg-blue-100 text-blue-700 border-blue-200",
  Alpha: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Sunset: "bg-muted text-muted-foreground border-border"
};
function ProductsTable({
  products,
  loading
}) {
  const sorted = [...products ?? []].sort(
    (a, b) => Number(b.annualRevenueUsd) - Number(a.annualRevenueUsd)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-8", "data-ocid": "dashboard.products.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground mb-4", children: "Products" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-lg border border-border overflow-hidden shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-xs font-medium text-muted-foreground uppercase tracking-wide px-4 py-3", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-xs font-medium text-muted-foreground uppercase tracking-wide px-4 py-3", children: "Codename" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-xs font-medium text-muted-foreground uppercase tracking-wide px-4 py-3", children: "Lifecycle" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-xs font-medium text-muted-foreground uppercase tracking-wide px-4 py-3", children: "Department" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right text-xs font-medium text-muted-foreground uppercase tracking-wide px-4 py-3", children: "Annual Revenue" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: loading ? SKELETON_PRODUCT_ROWS.map((rowId) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: SKELETON_PRODUCT_COLS.map((colId) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "animate-pulse bg-muted h-4 rounded w-full" }) }, `${rowId}-${colId}`)) }, rowId)) : sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "td",
        {
          colSpan: 5,
          className: "px-4 py-8 text-center text-muted-foreground text-sm",
          "data-ocid": "dashboard.products.empty_state",
          children: "No products found"
        }
      ) }) : sorted.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          "data-ocid": `dashboard.products.item.${i + 1}`,
          className: "hover:bg-muted/30 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground font-mono text-xs", children: p.codename }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${lifecycleBadge[p.lifecycle] ?? lifecycleBadge.Sunset}`,
                children: p.lifecycle
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: p.department }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-medium text-foreground tabular-nums", children: fmtUsd(p.annualRevenueUsd) })
          ]
        },
        `${p.codename}-${i}`
      )) })
    ] }) })
  ] });
}
function OfficesGrid({
  offices,
  loading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "dashboard.offices.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground mb-4", children: "Offices" }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-4", children: SKELETON_OFFICE_CARDS.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Skeleton,
      {
        className: "animate-pulse bg-muted h-32 rounded-lg"
      },
      id
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-4", children: (offices ?? []).map((office, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": `dashboard.offices.item.${i + 1}`,
        className: "bg-card rounded-lg border border-border p-4 shadow-sm hover:shadow-md transition-shadow",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: office.city }),
            office.isHq && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold bg-primary/10 text-primary border border-primary/20", children: "HQ" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: office.country }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/70 mb-2 line-clamp-2", children: office.addressLine }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Capacity: ",
            Number(office.capacity).toLocaleString(),
            " seats"
          ] })
        ]
      },
      `${office.city}-${i}`
    )) })
  ] });
}
function DashboardPage() {
  const { data: employees, isLoading: loadingEmployees } = useEmployees();
  const { data: contractors, isLoading: loadingContractors } = useContractors();
  const { data: interns, isLoading: loadingInterns } = useInterns();
  const { data: projects, isLoading: loadingProjects } = useProjects();
  const { data: products, isLoading: loadingProducts } = useProducts();
  const { data: offices, isLoading: loadingOffices } = useOffices();
  const { data: customers, isLoading: loadingCustomers } = useCustomers();
  const loadingHeadcount = loadingEmployees || loadingContractors || loadingInterns;
  const loadingMrr = loadingCustomers;
  const activeEmployees = (employees ?? []).filter(
    (e) => e.employmentStatus === "Active"
  ).length;
  const activeContractors = (contractors ?? []).filter(
    (c) => c.status === "Active"
  ).length;
  const internCount = (interns ?? []).length;
  const totalHeadcount = activeEmployees + activeContractors + internCount;
  const activeProjects = (projects ?? []).filter(
    (p) => p.status === "Active"
  ).length;
  const mrr = (customers ?? []).filter((c) => !isPresent(c.churnDate)).reduce((sum, c) => sum + Number(c.monthlyRevenueUsd), 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "dashboard.page", className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border bg-card px-6 py-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold text-foreground", children: "Company Overview" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Company-wide overview for Helix Systems" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-6 overflow-auto bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "dashboard.stats.section",
          className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                ocid: "dashboard.headcount.card",
                title: "Total Headcount",
                value: loadingHeadcount ? "—" : totalHeadcount,
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 18 }),
                subLabel: "Employees, contractors & interns",
                loading: loadingHeadcount
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                ocid: "dashboard.active-projects.card",
                title: "Active Projects",
                value: loadingProjects ? "—" : activeProjects,
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { size: 18 }),
                subLabel: "Currently in progress",
                loading: loadingProjects
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                ocid: "dashboard.mrr.card",
                title: "Monthly Recurring Revenue",
                value: loadingMrr ? "—" : fmtUsd(mrr),
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 18 }),
                subLabel: "From active customers",
                loading: loadingMrr
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                ocid: "dashboard.offices.card",
                title: "Offices",
                value: loadingOffices ? "—" : (offices == null ? void 0 : offices.length) ?? 0,
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { size: 18 }),
                subLabel: "Global locations",
                loading: loadingOffices
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                ocid: "dashboard.products.card",
                title: "Products",
                value: loadingProducts ? "—" : (products == null ? void 0 : products.length) ?? 0,
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 18 }),
                subLabel: "In portfolio",
                loading: loadingProducts
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProductsTable, { products, loading: loadingProducts }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(OfficesGrid, { offices, loading: loadingOffices })
    ] })
  ] });
}
export {
  DashboardPage
};
