import { createActor } from "@/backend";
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
import { useQuery } from "@tanstack/react-query";

function useBackendActor() {
  return useActor(createActor);
}

export function useEmployees() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Employee[]>({
    queryKey: ["employees"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllEmployees();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useContractors() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Contractor[]>({
    queryKey: ["contractors"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContractors();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useInterns() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Intern[]>({
    queryKey: ["interns"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInterns();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProjects() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProjects();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProducts() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useOffices() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Office[]>({
    queryKey: ["offices"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllOffices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCustomers() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Customer[]>({
    queryKey: ["customers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCustomers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useVendors() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Vendor[]>({
    queryKey: ["vendors"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllVendors();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDepartments() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Department[]>({
    queryKey: ["departments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllDepartments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useContracts() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Contract[]>({
    queryKey: ["contracts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContracts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useInvoices() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Invoice[]>({
    queryKey: ["invoices"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInvoices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useExpenses() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Expense[]>({
    queryKey: ["expenses"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllExpenses();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useEmployeeAssignments() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<EmployeeAssignment[]>({
    queryKey: ["employeeAssignments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllEmployeeAssignments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useContractorAssignments() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<ContractorAssignment[]>({
    queryKey: ["contractorAssignments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContractorAssignments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useInternAssignments() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<InternAssignment[]>({
    queryKey: ["internAssignments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInternAssignments();
    },
    enabled: !!actor && !isFetching,
  });
}

// Export actor for mutations
export { useBackendActor };
