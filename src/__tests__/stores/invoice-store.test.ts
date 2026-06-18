import { beforeEach, describe, expect, it } from "vitest";

import { useInvoiceStore } from "@/stores/invoice-store";

const store = useInvoiceStore;

describe("Invoice Store", () => {
  beforeEach(() => {
    store.getState().resetInvoice();
    // Clear savedInvoices for isolation
    store.setState({ savedInvoices: [] });
  });

  describe("initial state", () => {
    it("has a currentInvoice with default values", () => {
      const { currentInvoice } = store.getState();
      expect(currentInvoice).toHaveProperty("referenceNumber");
      expect(currentInvoice).toHaveProperty("issuedDate");
      expect(currentInvoice).toHaveProperty("paymentDueDate");
      expect(currentInvoice).toHaveProperty("from");
      expect(currentInvoice).toHaveProperty("to");
      expect(currentInvoice).toHaveProperty("items");
    });

    it("currentInvoice has expected from details", () => {
      const { from } = store.getState().currentInvoice;
      expect(from.name).toBe("Weblabs Studio");
      expect(from.email).toBe("hello@weblabs.studio");
      expect(from.addressLines.length).toBeGreaterThan(0);
    });

    it("currentInvoice has line items", () => {
      const { items } = store.getState().currentInvoice;
      expect(Array.isArray(items)).toBe(true);
      expect(items.length).toBeGreaterThan(0);
      for (const item of items) {
        expect(item).toHaveProperty("id");
        expect(item).toHaveProperty("description");
        expect(item).toHaveProperty("quantity");
        expect(item).toHaveProperty("unitPrice");
      }
    });

    it("starts with empty savedInvoices array", () => {
      expect(store.getState().savedInvoices).toEqual([]);
    });
  });

  describe("updateInvoice", () => {
    it("updates the referenceNumber", () => {
      store.getState().updateInvoice({ referenceNumber: "INV-9999" });
      expect(store.getState().currentInvoice.referenceNumber).toBe("INV-9999");
    });

    it("updates discountType and discountValue", () => {
      store.getState().updateInvoice({ discountType: "percent", discountValue: 15 });

      const { currentInvoice } = store.getState();
      expect(currentInvoice.discountType).toBe("percent");
      expect(currentInvoice.discountValue).toBe(15);
    });

    it("preserves fields not included in the update", () => {
      const originalFrom = store.getState().currentInvoice.from;

      store.getState().updateInvoice({ referenceNumber: "CHANGED" });

      expect(store.getState().currentInvoice.from).toEqual(originalFrom);
    });

    it("can update the to field", () => {
      const newTo = {
        id: "test-client",
        name: "Test Client",
        email: "test@client.com",
        addressLines: ["123 Test St"],
        taxId: "TAX-123",
      };

      store.getState().updateInvoice({ to: newTo });

      expect(store.getState().currentInvoice.to).toEqual(newTo);
    });
  });

  describe("saveInvoice", () => {
    it("saves the current invoice to savedInvoices", () => {
      store.getState().saveInvoice();

      const { savedInvoices, currentInvoice } = store.getState();
      expect(savedInvoices.length).toBe(1);
      expect(savedInvoices[0]).toEqual(currentInvoice);
    });

    it("can save multiple invoices", () => {
      store.getState().saveInvoice();
      store.getState().updateInvoice({ referenceNumber: "INV-002" });
      store.getState().saveInvoice();

      expect(store.getState().savedInvoices.length).toBe(2);
      expect(store.getState().savedInvoices[1].referenceNumber).toBe("INV-002");
    });

    it("saves a snapshot, not a reference — later updates do not affect saved copy", () => {
      store.getState().saveInvoice();
      const savedRef = store.getState().savedInvoices[0].referenceNumber;

      store.getState().updateInvoice({ referenceNumber: "DIFFERENT" });

      expect(store.getState().savedInvoices[0].referenceNumber).toBe(savedRef);
    });
  });

  describe("loadInvoice", () => {
    it("loads a saved invoice into currentInvoice", () => {
      store.getState().updateInvoice({ referenceNumber: "LOAD-TEST" });
      store.getState().saveInvoice();
      store.getState().resetInvoice();

      store.getState().loadInvoice(0);

      expect(store.getState().currentInvoice.referenceNumber).toBe("LOAD-TEST");
    });

    it("keeps currentInvoice unchanged if index is out of bounds", () => {
      const currentBefore = JSON.stringify(store.getState().currentInvoice);

      store.getState().loadInvoice(999);

      expect(JSON.stringify(store.getState().currentInvoice)).toBe(currentBefore);
    });

    it("does not modify savedInvoices when loading", () => {
      store.getState().saveInvoice();
      const savedBefore = JSON.stringify(store.getState().savedInvoices);

      store.getState().loadInvoice(0);

      expect(JSON.stringify(store.getState().savedInvoices)).toBe(savedBefore);
    });
  });

  describe("deleteInvoice", () => {
    it("removes the invoice at the given index", () => {
      store.getState().saveInvoice();
      store.getState().updateInvoice({ referenceNumber: "SECOND" });
      store.getState().saveInvoice();

      store.getState().deleteInvoice(0);

      expect(store.getState().savedInvoices.length).toBe(1);
      expect(store.getState().savedInvoices[0].referenceNumber).toBe("SECOND");
    });

    it("handles deleting from empty savedInvoices gracefully", () => {
      store.getState().deleteInvoice(0);
      expect(store.getState().savedInvoices.length).toBe(0);
    });

    it("does not affect currentInvoice", () => {
      store.getState().saveInvoice();
      const currentBefore = JSON.stringify(store.getState().currentInvoice);

      store.getState().deleteInvoice(0);

      expect(JSON.stringify(store.getState().currentInvoice)).toBe(currentBefore);
    });
  });

  describe("resetInvoice", () => {
    it("restores currentInvoice to default values", () => {
      store.getState().updateInvoice({
        referenceNumber: "MODIFIED",
        discountValue: 999,
      });

      store.getState().resetInvoice();

      const { currentInvoice } = store.getState();
      expect(currentInvoice.referenceNumber).toBe("FL-0425");
    });

    it("does not clear savedInvoices", () => {
      store.getState().saveInvoice();
      store.getState().resetInvoice();

      expect(store.getState().savedInvoices.length).toBe(1);
    });
  });
});
