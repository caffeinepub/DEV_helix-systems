import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Upload } from "lucide-react";
import { HelixLogo } from "./HelixLogo";

interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
  ocid: string;
}

const navItems: NavItem[] = [
  {
    to: "/",
    label: "Dashboard",
    icon: <LayoutDashboard size={18} />,
    ocid: "nav.dashboard.link",
  },
  {
    to: "/upload",
    label: "Upload Data",
    icon: <Upload size={18} />,
    ocid: "nav.upload.link",
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="flex w-64 flex-shrink-0 flex-col border-r border-border bg-card">
        {/* Logo + brand */}
        <div className="flex items-center gap-3 border-b border-border px-6 py-5">
          <HelixLogo size={36} />
          <span className="font-display text-[15px] font-semibold text-foreground tracking-tight">
            Helix Systems
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const isActive =
              item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                data-ocid={item.ocid}
                className={[
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors duration-150",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                ].join(" ")}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-border px-5 py-4">
          <p className="text-[11px] text-muted-foreground">
            © {new Date().getFullYear()}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors"
            >
              Built with caffeine.ai
            </a>
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex flex-1 flex-col overflow-auto bg-muted/30">
        {children}
      </main>
    </div>
  );
}
