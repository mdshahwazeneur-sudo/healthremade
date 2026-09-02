'use client'

import React, { useState } from 'react'
import {
  Receipt,
  DollarSign,
  Download,
  CheckCircle2,
  Clock,
  Building2,
  FileText,
} from 'lucide-react'
import { Button, Badge, Card, CardContent } from '@/components/ui/primitives'
import { formatINR } from '@/lib/utils'

interface InvoiceRecord {
  id: string;
  patientName: string;
  bookingId: string;
  hospitalName: string;
  treatmentAmountInr: number;
  coordinationFeeInr: number;
  invoiceDate: string;
  paymentStatus: 'paid' | 'pending' | 'hold_dispute';
}

const MOCK_INVOICES: InvoiceRecord[] = [
  {
    id: "INV-2026-089",
    patientName: "Tariq Al-Mansoor",
    bookingId: "BKG-7740",
    hospitalName: "Medanta — The Medicity",
    treatmentAmountInr: 360000,
    coordinationFeeInr: 0, // Direct hospital flat fee model
    invoiceDate: "2026-08-29",
    paymentStatus: "paid",
  },
  {
    id: "INV-2026-088",
    patientName: "Margaret Jenkins",
    bookingId: "BKG-7712",
    hospitalName: "Max Super Speciality Hospital, Saket",
    treatmentAmountInr: 240000,
    coordinationFeeInr: 0,
    invoiceDate: "2026-08-25",
    paymentStatus: "paid",
  },
  {
    id: "INV-2026-087",
    patientName: "Mohammed Al-Kaabi",
    bookingId: "BKG-7721",
    hospitalName: "Indraprastha Apollo Hospitals",
    treatmentAmountInr: 215000,
    coordinationFeeInr: 0,
    invoiceDate: "2026-08-28",
    paymentStatus: "hold_dispute",
  },
];

export default function AdminBillingPage() {
  const [invoices, setInvoices] = useState(MOCK_INVOICES)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Receipt className="h-6 w-6 text-brand-400" />
            Hospital Invoicing & Payment Reconciliation
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Reconcile hospital package bills, track patient payment completions, and manage dispute billing holds.
          </p>
        </div>

        <Button variant="accent" size="sm" className="font-bold">
          <Download className="h-3.5 w-3.5 mr-1" /> Export Financial Ledger
        </Button>
      </div>

      {/* Invoices Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
            <tr>
              <th className="p-3.5">Invoice # & Date</th>
              <th className="p-3.5">Patient & Booking ID</th>
              <th className="p-3.5">Hospital Partner</th>
              <th className="p-3.5">Hospital Package Total</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-800/50 transition-colors">
                <td className="p-3.5">
                  <div className="font-bold text-white font-mono">{inv.id}</div>
                  <div className="text-[10px] text-slate-500">{inv.invoiceDate}</div>
                </td>
                <td className="p-3.5">
                  <div className="font-semibold text-slate-200">{inv.patientName}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{inv.bookingId}</div>
                </td>
                <td className="p-3.5 font-medium text-slate-300">{inv.hospitalName}</td>
                <td className="p-3.5 font-bold text-white">{formatINR(inv.treatmentAmountInr)}</td>
                <td className="p-3.5">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      inv.paymentStatus === 'paid'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : inv.paymentStatus === 'hold_dispute'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {inv.paymentStatus === 'hold_dispute' ? 'HOLD (DISPUTE)' : inv.paymentStatus.toUpperCase()}
                  </span>
                </td>
                <td className="p-3.5 text-right">
                  <button className="text-brand-400 hover:text-brand-300 font-semibold text-[11px] bg-slate-800 px-2.5 py-1 rounded">
                    View Receipt
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
