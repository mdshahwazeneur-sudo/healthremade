'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import * as Dialog from '@radix-ui/react-dialog'
import {
  Building2,
  Plus,
  Search,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Edit,
  Trash2,
  X,
  Save,
} from 'lucide-react'
import { useAdminData } from '@/context/AdminDataContext'
import type { Hospital } from '@/data/hospitals'
import { Button, Badge, Card, CardContent } from '@/components/ui/primitives'

export default function AdminHospitalsPage() {
  const { hospitals, addHospital, updateHospital, deleteHospital } = useAdminData()
  const [searchQuery, setSearchQuery] = useState('')

  // Modal State
  const [modalOpen, setModalOpen] = useState(false)
  const [editingHosp, setEditingHosp] = useState<Hospital | null>(null)

  // Form Fields
  const [name, setName] = useState('')
  const [city, setCity] = useState('delhi')
  const [cityLabel, setCityLabel] = useState('Gurugram (Delhi NCR)')
  const [address, setAddress] = useState('')
  const [bedCount, setBedCount] = useState(800)
  const [nabhRegNumber, setNabhRegNumber] = useState('NABH-HOSP-2026-088')
  const [jciAccredId, setJciAccredId] = useState('JCI-GOLD-4412')
  const [establishedYear, setEstablishedYear] = useState(2009)
  const [photoUrl, setPhotoUrl] = useState('/images/hospitals/medanta-the-medicity.jpg')
  const [specialtiesText, setSpecialtiesText] = useState('Cardiac Sciences, Liver Transplant, Orthopaedics')

  const openCreateModal = () => {
    setEditingHosp(null)
    setName('')
    setCity('delhi')
    setCityLabel('Gurugram (Delhi NCR)')
    setAddress('Sector 38, Gurugram, Delhi NCR, India')
    setBedCount(800)
    setNabhRegNumber('NABH-HOSP-2026-088')
    setJciAccredId('JCI-GOLD-4412')
    setEstablishedYear(2009)
    setPhotoUrl('/images/hospitals/medanta-the-medicity.jpg')
    setSpecialtiesText('Cardiac Sciences, Liver Transplant, Orthopaedics')
    setModalOpen(true)
  }

  const openEditModal = (hosp: Hospital) => {
    setEditingHosp(hosp)
    setName(hosp.name)
    setCity(hosp.city)
    setCityLabel(hosp.cityLabel)
    setAddress(hosp.address)
    setBedCount(hosp.bedCount)
    setNabhRegNumber(hosp.nabhRegNumber || '')
    setJciAccredId(hosp.jciAccredId || '')
    setEstablishedYear(hosp.founded)
    setPhotoUrl(hosp.photos[0] || '/images/hospitals/medanta-the-medicity.jpg')
    setSpecialtiesText(hosp.specialties.join(', '))
    setModalOpen(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()

    const hospData: Omit<Hospital, 'id'> = {
      slug:
        editingHosp?.slug ||
        name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, ''),
      name,
      city: city as Hospital['city'],
      cityLabel,
      address,
      tagline: editingHosp?.tagline || 'Leading accredited multi-speciality institute in India',
      description: editingHosp?.description || 'Internationally accredited hospital offering advanced clinical care.',
      founded: Number(establishedYear),
      bedCount: Number(bedCount),
      nabhRegNumber,
      jciAccredId,
      specialties: specialtiesText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      packages: editingHosp?.packages || [],
      npsScore: editingHosp?.npsScore ?? 92,
      npsResponseCount: editingHosp?.npsResponseCount ?? 320,
      mapsUrl: editingHosp?.mapsUrl || null,
      photos: [photoUrl],
      website: editingHosp?.website || null,
    }

    if (editingHosp) {
      updateHospital(editingHosp.id, hospData)
    } else {
      addHospital(hospData)
    }

    setModalOpen(false)
  }

  const handleDelete = (id: string, hospName: string) => {
    if (confirm(`Are you sure you want to remove hospital partner: "${hospName}"?`)) {
      deleteHospital(id)
    }
  }

  const filtered = hospitals.filter(
    (h) =>
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.cityLabel.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Building2 className="h-6 w-6 text-brand-400" />
            Hospital Partner & Accreditation Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Maintain JCI/NABH certificate audit trails, bed capacity, clinical infrastructure details, and coordinator desks.
          </p>
        </div>

        <Button
          variant="accent"
          size="sm"
          onClick={openCreateModal}
          className="font-bold shadow-md bg-emerald-600 hover:bg-emerald-500 text-white"
        >
          <Plus className="h-3.5 w-3.5 mr-1" /> Add Hospital Partner
        </Button>
      </div>

      {/* Search & Audit Filter */}
      <div className="flex items-center justify-between gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search hospital by name, city, NABH..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-950 pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>

        <div className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
          <ShieldCheck className="h-4 w-4" /> {hospitals.length} Active Partner Hospitals
        </div>
      </div>

      {/* Hospitals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((hospital) => (
          <Card
            key={hospital.id}
            className="bg-slate-900 border-slate-800 text-white hover:border-slate-700 transition-colors flex flex-col justify-between"
          >
            <CardContent className="p-5 space-y-3">
              <div>
                <div className="relative h-32 w-full rounded-xl overflow-hidden bg-slate-950 mb-3 border border-slate-800">
                  <img
                    src={hospital.photos[0]}
                    alt={hospital.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-slate-950/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {hospital.bedCount}+ Beds
                  </div>
                </div>

                <h3 className="font-bold text-sm text-white">{hospital.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{hospital.cityLabel}</p>
              </div>

              {/* Accreditations & Audit Status */}
              <div className="space-y-1 text-xs bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">NABH Cert:</span>
                  <span className="font-mono text-emerald-400 font-semibold">{hospital.nabhRegNumber || 'Active'}</span>
                </div>
                {hospital.jciAccredId && (
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">JCI Gold Seal:</span>
                    <span className="font-mono text-brand-400 font-semibold">{hospital.jciAccredId}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-900">
                  <span className="text-slate-400">Active Packages:</span>
                  <span className="font-bold text-white">{hospital.packages.length} Packages</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                <Link
                  href={`/hospitals/${hospital.city}/${hospital.slug}`}
                  target="_blank"
                  className="text-xs text-brand-400 hover:text-brand-300 font-semibold flex items-center gap-1"
                >
                  Public Listing <ExternalLink className="h-3 w-3" />
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(hospital)}
                    className="inline-flex items-center gap-1 text-white bg-brand-600 hover:bg-brand-500 text-xs font-bold px-2 py-1 rounded transition-colors"
                  >
                    <Edit className="h-3 w-3" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(hospital.id, hospital.name)}
                    className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                    title="Archive Hospital"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ─── ADD / EDIT HOSPITAL MODAL ──────────────────────────────── */}
      <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-in fade-in" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-800 p-5 sm:p-6 outline-none">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div>
                <Dialog.Title className="text-lg font-bold text-white">
                  {editingHosp ? `Edit Hospital: ${editingHosp.name}` : 'Add Hospital Partner'}
                </Dialog.Title>
                <p className="text-xs text-slate-400">
                  Update hospital facility specifications, accreditation numbers, and contact details.
                </p>
              </div>

              <Dialog.Close asChild>
                <button
                  type="button"
                  className="rounded-full p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </Dialog.Close>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Hospital Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Medanta — The Medicity"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">City Label *</label>
                  <input
                    type="text"
                    required
                    value={cityLabel}
                    onChange={(e) => setCityLabel(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Bed Capacity *</label>
                  <input
                    type="number"
                    required
                    value={bedCount}
                    onChange={(e) => setBedCount(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">NABH Reg Number</label>
                  <input
                    type="text"
                    value={nabhRegNumber}
                    onChange={(e) => setNabhRegNumber(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">JCI Accredit ID</label>
                  <input
                    type="text"
                    value={jciAccredId}
                    onChange={(e) => setJciAccredId(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Campus Address *</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Campus Image Path *</label>
                <input
                  type="text"
                  required
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Key Specialties (Comma separated) *</label>
                <input
                  type="text"
                  required
                  value={specialtiesText}
                  onChange={(e) => setSpecialtiesText(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 shadow-md"
                >
                  <Save className="h-4 w-4" />
                  {editingHosp ? 'Save Hospital Partner' : 'Add Hospital'}
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
