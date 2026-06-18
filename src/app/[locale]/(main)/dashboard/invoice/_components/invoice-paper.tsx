import { formatCurrency } from "@/lib/utils";

import {
  getInvoiceDiscount,
  getInvoiceItems,
  getInvoiceSubtotal,
  getInvoiceTax,
  getInvoiceTaxOption,
  getInvoiceTotal,
  getLineAmount,
  INVOICE_PAPER_HEIGHT,
  INVOICE_PAPER_WIDTH,
  type InvoiceFormValues,
} from "./data";

export function InvoicePaper({ invoice }: { invoice: InvoiceFormValues }) {
  const taxOption = getInvoiceTaxOption(invoice);
  const discountValue = Number.isFinite(invoice.discountValue) ? invoice.discountValue : 0;
  const discountLabel = invoice.discountType === "percent" ? `Discount (${discountValue}%)` : "Discount";

  return (
    <article
      style={{ width: INVOICE_PAPER_WIDTH, height: INVOICE_PAPER_HEIGHT }}
      data-print-paper
      className="relative flex select-none flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/50 bg-white p-12 font-sans text-zinc-900 shadow-xl"
    >
      {/* Decorative Branding Top Banner */}
      <div className="absolute top-0 right-0 left-0 h-1.5 bg-zinc-950" />

      {/* Watermark/Status Badge */}
      <div className="pointer-events-none absolute top-12 right-12 z-0 rotate-12 select-none opacity-15">
        <div className="rounded-xl border-4 border-emerald-600 px-4 py-1.5 font-extrabold text-2xl text-emerald-600 uppercase tracking-widest">
          Approved
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-8">
        <header className="flex flex-col gap-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-xl bg-zinc-950 p-1.5 text-white shadow-md">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-5.5">
                  <path
                    d="M24 4L38.3 12.3V28.8L24 37.1L9.7 28.8V12.3L24 4Z"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M24 20L31.2 16.2V23.7L24 27.5L16.8 23.7V16.2L24 20Z" fill="currentColor" />
                </svg>
              </div>
              <span className="font-bold text-lg text-zinc-950 tracking-tight">Dashdeck</span>
            </div>
            <div className="text-right">
              <h2 className="font-black text-3xl text-zinc-950 uppercase tracking-wider">Invoice</h2>
              <p className="mt-1 font-mono text-xs text-zinc-400">Ref: {invoice.referenceNumber}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 border-zinc-100 border-y py-5 text-xs">
            <div className="space-y-1">
              <p className="font-bold text-[9px] text-zinc-400 uppercase tracking-wider">Invoice Details</p>
              <div className="grid grid-cols-[80px_1fr] gap-y-1.5 text-zinc-600">
                <span>Issued:</span>
                <span className="font-semibold text-zinc-900">{invoice.issuedDate}</span>
                <span>Due Date:</span>
                <span className="font-semibold text-zinc-900">{invoice.paymentDueDate}</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="font-bold text-[9px] text-zinc-400 uppercase tracking-wider">Payment Method</p>
              <div className="space-y-1 text-zinc-600">
                <p className="font-semibold text-zinc-900">{invoice.from.paymentAccountName}</p>
                <p className="mt-0.5 font-mono text-zinc-500">Routing No: {invoice.from.routingNumber}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 text-xs">
            <div className="space-y-1.5 rounded-xl border border-zinc-100 bg-zinc-50 p-4">
              <p className="font-bold text-[9px] text-zinc-400 uppercase tracking-wider">From</p>
              <div className="space-y-1 text-zinc-600">
                <p className="font-bold text-zinc-900">{invoice.from.name}</p>
                {invoice.from.addressLines.map((line) => (
                  <p key={line} className="text-zinc-500">
                    {line}
                  </p>
                ))}
                <p className="pt-1 font-mono text-[9px] text-zinc-400">Tax ID: {invoice.from.taxId}</p>
              </div>
            </div>
            <div className="space-y-1.5 rounded-xl border border-zinc-100 bg-zinc-50 p-4">
              <p className="font-bold text-[9px] text-zinc-400 uppercase tracking-wider">Bill To</p>
              <div className="space-y-1 text-zinc-600">
                <p className="font-bold text-zinc-900">{invoice.to.name}</p>
                {invoice.to.addressLines.map((line) => (
                  <p key={line} className="text-zinc-500">
                    {line}
                  </p>
                ))}
                <p className="pt-1 font-mono text-[9px] text-zinc-400">Tax ID: {invoice.to.taxId}</p>
              </div>
            </div>
          </div>
        </header>

        <section className="mt-3 text-xs">
          <div className="grid grid-cols-[1fr_80px_100px_100px] border-zinc-900 border-b bg-zinc-50 px-4 py-2.5 font-bold text-[9px] text-zinc-500 uppercase tracking-wider">
            <span>Description</span>
            <span className="text-right">Units</span>
            <span className="text-right">Unit Cost</span>
            <span className="text-right">Line Total</span>
          </div>
          {getInvoiceItems(invoice).map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[1fr_80px_100px_100px] items-center border-zinc-100 border-b px-4 py-3.5 text-zinc-700 transition-colors hover:bg-zinc-50/50"
            >
              <span className="font-semibold text-zinc-900">{item.description}</span>
              <span className="text-right font-mono text-zinc-500">{item.quantity}</span>
              <span className="text-right font-mono text-zinc-500">{formatInvoiceCurrency(item.unitPrice)}</span>
              <span className="text-right font-bold font-mono text-zinc-900">
                {formatInvoiceCurrency(getLineAmount(item))}
              </span>
            </div>
          ))}
        </section>
      </div>

      <div className="relative z-10 flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-8 border-zinc-100 border-t pt-6 text-xs">
          <div className="max-w-[280px] text-zinc-400 leading-relaxed">
            <p className="mb-1.5 font-bold text-[9px] text-zinc-500 uppercase tracking-wider">Terms & Notes</p>
            <p className="text-[10px] text-zinc-400">
              Please make checks payable to the account detailed above. Payments are subject to standard net-30 credit
              terms. Thank you for your business!
            </p>
          </div>
          <section className="space-y-2 text-zinc-600">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between gap-8">
                <span className="text-zinc-500">Net Amount</span>
                <span className="font-mono text-zinc-800">{formatInvoiceCurrency(getInvoiceSubtotal(invoice))}</span>
              </div>
              <div className="flex justify-between gap-8">
                <span className="text-zinc-500">{discountLabel}</span>
                <span className="font-mono text-rose-600">-{formatInvoiceCurrency(getInvoiceDiscount(invoice))}</span>
              </div>
              <div className="flex justify-between gap-8">
                <span className="text-zinc-500">
                  {taxOption.name} ({taxOption.rate}%)
                </span>
                <span className="font-mono text-zinc-800">{formatInvoiceCurrency(getInvoiceTax(invoice))}</span>
              </div>
            </div>
            <div className="border-zinc-200 border-t pt-3">
              <div className="flex items-baseline justify-between gap-8">
                <span className="font-black text-xs text-zinc-950 uppercase tracking-wider">Total Due</span>
                <span className="font-extrabold font-mono text-xl text-zinc-950">
                  {formatInvoiceCurrency(getInvoiceTotal(invoice))}
                </span>
              </div>
            </div>
          </section>
        </div>

        <footer className="grid grid-cols-2 gap-8 border-zinc-100 border-t pt-5 text-[9px] text-zinc-400 leading-relaxed">
          <div>
            <p className="font-medium text-zinc-500">
              {invoice.from.email} · {invoice.from.phone}
            </p>
            <p className="text-zinc-400">{invoice.from.website}</p>
          </div>
          <div className="text-right">
            <p className="text-zinc-400">Prepared for prompt processing.</p>
            <p className="font-medium text-zinc-500">
              Issued by <span className="font-bold text-zinc-700">{invoice.from.issuerName}</span>
            </p>
          </div>
        </footer>
      </div>
    </article>
  );
}

function formatInvoiceCurrency(value: number) {
  return formatCurrency(Number.isFinite(value) ? value : 0, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
