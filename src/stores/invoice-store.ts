import { create } from "zustand";
import { persist } from "zustand/middleware";

import { defaultInvoiceValues, type InvoiceFormValues } from "@/app/(main)/dashboard/invoice/_components/data";

interface InvoiceState {
  currentInvoice: InvoiceFormValues;
  savedInvoices: InvoiceFormValues[];
  updateInvoice: (updates: Partial<InvoiceFormValues>) => void;
  saveInvoice: () => void;
  loadInvoice: (index: number) => void;
  deleteInvoice: (index: number) => void;
  resetInvoice: () => void;
}

export const useInvoiceStore = create<InvoiceState>()(
  persist(
    (set, get) => ({
      currentInvoice: defaultInvoiceValues,
      savedInvoices: [],
      updateInvoice: (updates) =>
        set((state) => ({
          currentInvoice: { ...state.currentInvoice, ...updates },
        })),
      saveInvoice: () =>
        set((state) => ({
          savedInvoices: [...state.savedInvoices, state.currentInvoice],
        })),
      loadInvoice: (index) =>
        set((state) => ({
          currentInvoice: state.savedInvoices[index] ?? state.currentInvoice,
        })),
      deleteInvoice: (index) =>
        set((state) => ({
          savedInvoices: state.savedInvoices.filter((_, i) => i !== index),
        })),
      resetInvoice: () =>
        set({ currentInvoice: defaultInvoiceValues }),
    }),
    {
      name: "dashdeck-invoice-storage",
    }
  )
);
