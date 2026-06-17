"use client";

import { Save, Send, Download, RotateCcw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useInvoiceStore } from "@/stores/invoice-store";

import { Invoice } from "./_components/invoice";

export default function Page() {
  const saveInvoice = useInvoiceStore((state) => state.saveInvoice);
  const resetInvoice = useInvoiceStore((state) => state.resetInvoice);
  const currentInvoice = useInvoiceStore((state) => state.currentInvoice);

  const handleSave = () => {
    saveInvoice();
    toast.success("Invoice saved to drafts");
  };

  const handleExportPDF = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const invoiceContent = document.querySelector("[data-slot='invoice-paper']");
    if (!invoiceContent) {
      toast.error("Could not find invoice content");
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice ${currentInvoice.referenceNumber}</title>
          <style>
            body { font-family: system-ui, sans-serif; padding: 40px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { padding: 8px; border-bottom: 1px solid #eee; text-align: left; }
            th { font-weight: 600; }
            .total { font-size: 1.25rem; font-weight: 700; margin-top: 20px; }
          </style>
        </head>
        <body>
          <h1>Invoice ${currentInvoice.referenceNumber}</h1>
          <p><strong>From:</strong> ${currentInvoice.from.name}</p>
          <p><strong>To:</strong> ${currentInvoice.to.name}</p>
          <p><strong>Issued:</strong> ${currentInvoice.issuedDate}</p>
          <p><strong>Due:</strong> ${currentInvoice.paymentDueDate}</p>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${currentInvoice.items.map(item => `
                <tr>
                  <td>${item.description}</td>
                  <td>${item.quantity}</td>
                  <td>$${item.unitPrice.toFixed(2)}</td>
                  <td>$${(item.quantity * item.unitPrice).toFixed(2)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
          <p class="total">Total: $${currentInvoice.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0).toFixed(2)}</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    toast.success("PDF export opened");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-medium text-3xl leading-none tracking-tight">Create New Invoice</h1>
          <p className="text-muted-foreground text-sm">
            Add invoice details, review the preview, and send it to your client.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button type="button" variant="outline" onClick={resetInvoice}>
            <RotateCcw data-icon="inline-start" />
            Reset
          </Button>
          <Button type="button" variant="outline" onClick={handleSave}>
            <Save data-icon="inline-start" />
            Save Draft
          </Button>
          <Button type="button" variant="outline" onClick={handleExportPDF}>
            <Download data-icon="inline-start" />
            Export PDF
          </Button>
          <Button type="button">
            <Send data-icon="inline-start" />
            Send Invoice
          </Button>
        </div>
      </div>

      <Invoice />
    </div>
  );
}
