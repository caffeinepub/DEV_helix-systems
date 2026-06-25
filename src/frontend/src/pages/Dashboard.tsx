import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useContractors,
  useCustomers,
  useEmployees,
  useInterns,
  useOffices,
  useProducts,
  useProjects,
} from "@/hooks/useBackend";
import type { Office, Product } from "@/types";
import {
  Building2,
  FolderOpen,
  Package,
  TrendingUp,
  Users,
} from "lucide-react";

// ─── Skeleton stable keys ────────────────────────────────────────────────────

const SKELETON_PRODUCT_ROWS = ["p1", "p2", "p3", "p4"];
const SKELETON_PRODUCT_COLS = ["c1", "c2", "c3", "c4", "c5"];
const SKELETON_OFFICE_CARDS = ["o1", "o2", "o3", "o4", "o5", "o6"];

// ─── helpers ────────────────────────────────────────────────────────────────

function fmtUsd(value: bigint | number): string {
  return `$${Number(value).toLocaleString("en-US")}`;
}

// Candid optional ?T arrives as [] | [T] at runtime even if typed as T | undefined
function isPresent(val: unknown): boolean {
  if (val === undefined || val === null) return false;
  if (Array.isArray(val)) return val.length > 0;
  return true;
}

// ─── Stat Card ───────────────────────────────────────────────────────────────

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  subLabel: string;
  loading?: boolean;
  ocid: string;
}

function StatCard({
  title,
  value,
  icon,
  subLabel,
  loading,
  ocid,
}: StatCardProps) {
  return (
    <div
      data-ocid={ocid}
      className="bg-card rounded-lg border border-border p-6 shadow-sm flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {title}
        </span>
        <div className="text-primary/70">{icon}</div>
      </div>
      {loading ? (
        <Skeleton className="animate-pulse bg-muted h-8 w-24 rounded" />
      ) : (
        <div className="text-2xl font-semibold text-foreground tabular-nums">
          {value}
        </div>
      )}
      <p className="text-xs text-muted-foreground">{subLabel}</p>
    </div>
  );
}

// ─── Products Table ───────────────────────────────────────────────────────────

const lifecycleBadge: Record<string, string> = {
  GA: "bg-green-100 text-green-700 border-green-200",
  Beta: "bg-blue-100 text-blue-700 border-blue-200",
  Alpha: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Sunset: "bg-muted text-muted-foreground border-border",
};

function ProductsTable({
  products,
  loading,
}: { products: Product[] | undefined; loading: boolean }) {
  const sorted = [...(products ?? [])].sort(
    (a, b) => Number(b.annualRevenueUsd) - Number(a.annualRevenueUsd),
  );

  return (
    <section className="mb-8" data-ocid="dashboard.products.section">
      <h2 className="text-lg font-semibold text-foreground mb-4">Products</h2>
      <div className="bg-card rounded-lg border border-border overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wide px-4 py-3">
                Name
              </th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wide px-4 py-3">
                Codename
              </th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wide px-4 py-3">
                Lifecycle
              </th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wide px-4 py-3">
                Department
              </th>
              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wide px-4 py-3">
                Annual Revenue
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              SKELETON_PRODUCT_ROWS.map((rowId) => (
                <tr key={rowId}>
                  {SKELETON_PRODUCT_COLS.map((colId) => (
                    <td key={`${rowId}-${colId}`} className="px-4 py-3">
                      <Skeleton className="animate-pulse bg-muted h-4 rounded w-full" />
                    </td>
                  ))}
                </tr>
              ))
            ) : sorted.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-muted-foreground text-sm"
                  data-ocid="dashboard.products.empty_state"
                >
                  No products found
                </td>
              </tr>
            ) : (
              sorted.map((p, i) => (
                <tr
                  key={`${p.codename}-${i}`}
                  data-ocid={`dashboard.products.item.${i + 1}`}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {p.name}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
                    {p.codename}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
                        lifecycleBadge[p.lifecycle] ?? lifecycleBadge.Sunset
                      }`}
                    >
                      {p.lifecycle}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {p.department}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-foreground tabular-nums">
                    {fmtUsd(p.annualRevenueUsd)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ─── Offices Grid ─────────────────────────────────────────────────────────────

function OfficesGrid({
  offices,
  loading,
}: { offices: Office[] | undefined; loading: boolean }) {
  return (
    <section data-ocid="dashboard.offices.section">
      <h2 className="text-lg font-semibold text-foreground mb-4">Offices</h2>
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {SKELETON_OFFICE_CARDS.map((id) => (
            <Skeleton
              key={id}
              className="animate-pulse bg-muted h-32 rounded-lg"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {(offices ?? []).map((office, i) => (
            <div
              key={`${office.city}-${i}`}
              data-ocid={`dashboard.offices.item.${i + 1}`}
              className="bg-card rounded-lg border border-border p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-foreground">
                  {office.city}
                </span>
                {office.isHq && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                    HQ
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {office.country}
              </p>
              <p className="text-sm text-foreground/70 mb-2 line-clamp-2">
                {office.addressLine}
              </p>
              <p className="text-xs text-muted-foreground">
                Capacity: {Number(office.capacity).toLocaleString()} seats
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function DashboardPage() {
  const { data: employees, isLoading: loadingEmployees } = useEmployees();
  const { data: contractors, isLoading: loadingContractors } = useContractors();
  const { data: interns, isLoading: loadingInterns } = useInterns();
  const { data: projects, isLoading: loadingProjects } = useProjects();
  const { data: products, isLoading: loadingProducts } = useProducts();
  const { data: offices, isLoading: loadingOffices } = useOffices();
  const { data: customers, isLoading: loadingCustomers } = useCustomers();

  const loadingHeadcount =
    loadingEmployees || loadingContractors || loadingInterns;
  const loadingMrr = loadingCustomers;

  const activeEmployees = (employees ?? []).filter(
    (e) => e.employmentStatus === "Active",
  ).length;
  const activeContractors = (contractors ?? []).filter(
    (c) => c.status === "Active",
  ).length;
  const internCount = (interns ?? []).length;
  const totalHeadcount = activeEmployees + activeContractors + internCount;

  const activeProjects = (projects ?? []).filter(
    (p) => p.status === "Active",
  ).length;

  const mrr = (customers ?? [])
    .filter((c) => !isPresent(c.churnDate))
    .reduce((sum, c) => sum + Number(c.monthlyRevenueUsd), 0);

  return (
    <div data-ocid="dashboard.page" className="flex flex-col h-full">
      {/* Page header */}
      <div className="border-b border-border bg-card px-6 py-5">
        <h1 className="text-2xl font-semibold text-foreground">
          Company Overview
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Company-wide overview for Helix Systems
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto bg-background">
        {/* Stat Cards */}
        <div
          data-ocid="dashboard.stats.section"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8"
        >
          <StatCard
            ocid="dashboard.headcount.card"
            title="Total Headcount"
            value={loadingHeadcount ? "—" : totalHeadcount}
            icon={<Users size={18} />}
            subLabel="Employees, contractors & interns"
            loading={loadingHeadcount}
          />
          <StatCard
            ocid="dashboard.active-projects.card"
            title="Active Projects"
            value={loadingProjects ? "—" : activeProjects}
            icon={<FolderOpen size={18} />}
            subLabel="Currently in progress"
            loading={loadingProjects}
          />
          <StatCard
            ocid="dashboard.mrr.card"
            title="Monthly Recurring Revenue"
            value={loadingMrr ? "—" : fmtUsd(mrr)}
            icon={<TrendingUp size={18} />}
            subLabel="From active customers"
            loading={loadingMrr}
          />
          <StatCard
            ocid="dashboard.offices.card"
            title="Offices"
            value={loadingOffices ? "—" : (offices?.length ?? 0)}
            icon={<Building2 size={18} />}
            subLabel="Global locations"
            loading={loadingOffices}
          />
          <StatCard
            ocid="dashboard.products.card"
            title="Products"
            value={loadingProducts ? "—" : (products?.length ?? 0)}
            icon={<Package size={18} />}
            subLabel="In portfolio"
            loading={loadingProducts}
          />
        </div>

        {/* Products Table */}
        <ProductsTable products={products} loading={loadingProducts} />

        {/* Offices Grid */}
        <OfficesGrid offices={offices} loading={loadingOffices} />
      </div>
    </div>
  );
}
