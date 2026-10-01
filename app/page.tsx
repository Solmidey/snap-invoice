"use client";

import { useState, useRef } from "react";
import { Plus, Trash2, Download, FileText, Building2, User } from "lucide-react";

type LineItem = {
  id: string;
  description: string;
  quantity: number;
  rate: number;
};

export default function Home() {
  const [from, setFrom] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [to, setTo] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [invoiceNumber, setInvoiceNumber] = useState("INV-001");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [dueDate, setDueDate] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [taxRate, setTaxRate] = useState(0);
  const [notes, setNotes] = useState("Payment is due within 14 days. Thank you for your business!");
  const [items, setItems] = useState<LineItem[]>([
    { id: "1", description: "", quantity: 1, rate: 0 },
  ]);

  const previewRef = useRef<HTMLDivElement>(null);

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now().toString(), description: "", quantity: 1, rate: 0 },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof LineItem, value: string | number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.rate,
    0
  );
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(amount);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="no-print border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <FileText className="h-7 w-7 text-sky-600" />
            <span className="text-xl font-bold text-slate-900">SnapInvoice</span>
          </div>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 transition"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <div className="no-print space-y-6">
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
                <Building2 className="h-5 w-5 text-sky-600" />
                From (Your Business)
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  placeholder="Business / Your Name"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  value={from.name}
                  onChange={(e) => setFrom({ ...from, name: e.target.value })}
                />
                <input
                  placeholder="Email"
                  type="email"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  value={from.email}
                  onChange={(e) => setFrom({ ...from, email: e.target.value })}
                />
                <input
                  placeholder="Phone"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  value={from.phone}
                  onChange={(e) => setFrom({ ...from, phone: e.target.value })}
                />
                <input
                  placeholder="Address"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:col-span-2"
                  value={from.address}
                  onChange={(e) => setFrom({ ...from, address: e.target.value })}
                />
              </div>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
                <User className="h-5 w-5 text-sky-600" />
                Bill To (Client)
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  placeholder="Client Name"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  value={to.name}
                  onChange={(e) => setTo({ ...to, name: e.target.value })}
                />
                <input
                  placeholder="Client Email"
                  type="email"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  value={to.email}
                  onChange={(e) => setTo({ ...to, email: e.target.value })}
                />
                <input
                  placeholder="Client Address"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:col-span-2"
                  value={to.address}
                  onChange={(e) => setTo({ ...to, address: e.target.value })}
                />
              </div>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-slate-900">Invoice Details</h2>
                <div className="flex flex-wrap gap-3">
                  <input
                    placeholder="Invoice #"
                    className="w-28 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                  />
                  <input
                    type="date"
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <input
                    type="date"
                    placeholder="Due date"
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                  <select
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="NGN">NGN</option>
                    <option value="CAD">CAD</option>
                    <option value="AUD">AUD</option>
                    <option value="INR">INR</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                {items.map((item, index) => (
                  <div key={item.id} className="flex flex-wrap items-center gap-2">
                    <input
                      placeholder="Description"
                      className="min-w-[180px] flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
                      value={item.description}
                      onChange={(e) =>
                        updateItem(item.id, "description", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      min="0"
                      step="1"
                      placeholder="Qty"
                      className="w-20 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(item.id, "quantity", Number(e.target.value))
                      }
                    />
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="Rate"
                      className="w-28 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
                      value={item.rate}
                      onChange={(e) =>
                        updateItem(item.id, "rate", Number(e.target.value))
                      }
                    />
                    <span className="w-24 text-right text-sm font-medium text-slate-700">
                      {formatMoney(item.quantity * item.rate)}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="rounded p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"
                      title="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={addItem}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-sky-600 hover:text-sky-700"
              >
                <Plus className="h-4 w-4" />
                Add line item
              </button>

              <div className="mt-6 flex flex-wrap items-center gap-4 border-t pt-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-slate-600">Tax %</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    className="w-20 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
                    value={taxRate}
                    onChange={(e) => setTaxRate(Number(e.target.value))}
                  />
                </div>
                <div className="ml-auto space-y-1 text-right">
                  <div className="text-sm text-slate-600">
                    Subtotal: <span className="font-medium text-slate-900">{formatMoney(subtotal)}</span>
                  </div>
                  <div className="text-sm text-slate-600">
                    Tax: <span className="font-medium text-slate-900">{formatMoney(tax)}</span>
                  </div>
                  <div className="text-lg font-bold text-slate-900">
                    Total: {formatMoney(total)}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <label className="mb-2 block text-sm font-medium text-slate-700">Notes / Payment Terms</label>
              <textarea
                rows={3}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          {/* Live Preview */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div
              id="invoice-preview"
              ref={previewRef}
              className="rounded-xl border bg-white p-8 shadow-lg"
            >
              <div className="mb-8 flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">INVOICE</h1>
                  <p className="mt-1 text-sm text-slate-500">{invoiceNumber}</p>
                </div>
                <div className="text-right text-sm text-slate-600">
                  <p>Date: {date || "—"}</p>
                  {dueDate && <p>Due: {dueDate}</p>}
                </div>
              </div>

              <div className="mb-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">From</p>
                  <p className="mt-1 font-medium text-slate-900">{from.name || "Your Name"}</p>
                  {from.email && <p className="text-sm text-slate-600">{from.email}</p>}
                  {from.phone && <p className="text-sm text-slate-600">{from.phone}</p>}
                  {from.address && <p className="text-sm text-slate-600 whitespace-pre-line">{from.address}</p>}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Bill To</p>
                  <p className="mt-1 font-medium text-slate-900">{to.name || "Client Name"}</p>
                  {to.email && <p className="text-sm text-slate-600">{to.email}</p>}
                  {to.address && <p className="text-sm text-slate-600 whitespace-pre-line">{to.address}</p>}
                </div>
              </div>

              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="pb-3 font-semibold text-slate-700">Description</th>
                    <th className="pb-3 text-right font-semibold text-slate-700">Qty</th>
                    <th className="pb-3 text-right font-semibold text-slate-700">Rate</th>
                    <th className="pb-3 text-right font-semibold text-slate-700">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b border-slate-100">
                      <td className="py-3 text-slate-800">{item.description || "—"}</td>
                      <td className="py-3 text-right text-slate-600">{item.quantity}</td>
                      <td className="py-3 text-right text-slate-600">{formatMoney(item.rate)}</td>
                      <td className="py-3 text-right font-medium text-slate-900">
                        {formatMoney(item.quantity * item.rate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-6 flex justify-end">
                <div className="w-56 space-y-1 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>{formatMoney(subtotal)}</span>
                  </div>
                  {taxRate > 0 && (
                    <div className="flex justify-between text-slate-600">
                      <span>Tax ({taxRate}%)</span>
                      <span>{formatMoney(tax)}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-bold text-slate-900">
                    <span>Total</span>
                    <span>{formatMoney(total)}</span>
                  </div>
                </div>
              </div>

              {notes && (
                <div className="mt-8 border-t border-slate-100 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Notes</p>
                  <p className="mt-1 whitespace-pre-line text-sm text-slate-600">{notes}</p>
                </div>
              )}

              <div className="mt-10 text-center text-xs text-slate-400">
                Created with SnapInvoice — free invoice generator
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="no-print border-t bg-white py-6 text-center text-sm text-slate-500">
        <p>SnapInvoice — Free professional invoices in seconds. No signup required.</p>
      </footer>
    </div>
  );
}