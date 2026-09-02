'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import * as Dialog from '@radix-ui/react-dialog'
import {
  Stethoscope,
  Plus,
  Search,
  CheckCircle2,
  Video,
  Award,
  Edit,
  Trash2,
  ExternalLink,
  X,
  Save,
} from 'lucide-react'
import { useAdminData } from '@/context/AdminDataContext'
import type { Doctor } from '@/data/doctors'
import { Button, Badge, Card, CardContent } from '@/components/ui/primitives'

export default function AdminDoctorsPage() {
  const { doctors, addDoctor, updateDoctor, deleteDoctor } = useAdminData()
  const [searchQuery, setSearchQuery] = useState('')

  // Modal State
  const [modalOpen, setModalOpen] = useState(false)
  const [editingDoc, setEditingDoc] = useState<Doctor | null>(null)

  // Form Fields
  const [name, setName] = useState('')
  const [designation, setDesignation] = useState('')
  const [department, setDepartment] = useState('')
  const [specialtySlug, setSpecialtySlug] = useState('cardiac')
  const [hospitalName, setHospitalName] = useState('Medanta — The Medicity')
  const [city, setCity] = useState('delhi')
  const [cityLabel, setCityLabel] = useState('Gurugram (Delhi NCR)')
  const [experienceYears, setExperienceYears] = useState(25)
  const [surgeriesCount, setSurgeriesCount] = useState('10,000+')
  const [qualificationsText, setQualificationsText] = useState('')
  const [awardsText, setAwardsText] = useState('')
  const [languagesText, setLanguagesText] = useState('English, Hindi')
  const [photoUrl, setPhotoUrl] = useState('/images/doctors/dr-naresh-trehan.jpg')
  const [bio, setBio] = useState('')
  const [expertiseText, setExpertiseText] = useState('')
  const [videoTitle, setVideoTitle] = useState('')
  const [videoDuration, setVideoDuration] = useState('4:00 min')
  const [videoDescription, setVideoDescription] = useState('')

  const openCreateModal = () => {
    setEditingDoc(null)
    setName('')
    setDesignation('')
    setDepartment('Cardiovascular Surgery')
    setSpecialtySlug('cardiac')
    setHospitalName('Medanta — The Medicity')
    setCity('delhi')
    setCityLabel('Gurugram (Delhi NCR)')
    setExperienceYears(25)
    setSurgeriesCount('10,000+')
    setQualificationsText('MBBS, MS, MCh, FRCS')
    setAwardsText('Best Surgeon Award')
    setLanguagesText('English, Hindi')
    setPhotoUrl('/images/doctors/dr-naresh-trehan.jpg')
    setBio('')
    setExpertiseText('Minimally Invasive Surgery, Robotic Surgery')
    setVideoTitle('Doctor Surgical Overview & Recovery Protocols')
    setVideoDuration('4:00 min')
    setVideoDescription('Explaining procedure safety and recovery roadmap.')
    setModalOpen(true)
  }

  const openEditModal = (doc: Doctor) => {
    setEditingDoc(doc)
    setName(doc.name)
    setDesignation(doc.designation)
    setDepartment(doc.department)
    setSpecialtySlug(doc.specialtySlug)
    setHospitalName(doc.hospitalName)
    setCity(doc.city)
    setCityLabel(doc.cityLabel)
    setExperienceYears(doc.experienceYears)
    setSurgeriesCount(doc.surgeriesCount)
    setQualificationsText(doc.qualifications.join('\n'))
    setAwardsText(doc.awards.join('\n'))
    setLanguagesText(doc.languages.join(', '))
    setPhotoUrl(doc.photoUrl)
    setBio(doc.bio)
    setExpertiseText(doc.keyExpertise.join(', '))
    setVideoTitle(doc.videoTitle)
    setVideoDuration(doc.videoDuration)
    setVideoDescription(doc.videoDescription)
    setModalOpen(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()

    const docData: Omit<Doctor, 'id'> = {
      slug:
        editingDoc?.slug ||
        name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, ''),
      name,
      designation,
      department,
      specialtySlug,
      hospitalName,
      hospitalSlug: editingDoc?.hospitalSlug || 'medanta-the-medicity',
      city,
      cityLabel,
      experienceYears: Number(experienceYears),
      surgeriesCount,
      qualifications: qualificationsText
        .split('\n')
        .map((q) => q.trim())
        .filter(Boolean),
      awards: awardsText
        .split('\n')
        .map((a) => a.trim())
        .filter(Boolean),
      languages: languagesText
        .split(',')
        .map((l) => l.trim())
        .filter(Boolean),
      photoUrl: photoUrl || '/images/doctors/dr-naresh-trehan.jpg',
      bio,
      keyExpertise: expertiseText
        .split(',')
        .map((e) => e.trim())
        .filter(Boolean),
      videoTitle,
      videoYoutubeId: 'dQw4w9WgXcQ',
      videoDuration,
      videoDescription,
    }

    if (editingDoc) {
      updateDoctor(editingDoc.id, docData)
    } else {
      addDoctor(docData)
    }

    setModalOpen(false)
  }

  const handleDelete = (id: string, docName: string) => {
    if (confirm(`Are you sure you want to remove doctor profile: "${docName}"?`)) {
      deleteDoctor(id)
    }
  }

  const filtered = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.hospitalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.department.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Stethoscope className="h-6 w-6 text-brand-400" />
            Doctor Roster & Credential Verification
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Add and manage chief surgeons, qualifications, surgery counts, and video explanations with live website updates.
          </p>
        </div>

        <Button
          variant="accent"
          size="sm"
          onClick={openCreateModal}
          className="font-bold shadow-md bg-emerald-600 hover:bg-emerald-500 text-white"
        >
          <Plus className="h-3.5 w-3.5 mr-1" /> Add Doctor Profile
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search doctor, hospital, specialty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-950 pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>
        <span className="text-xs text-slate-400 font-semibold">{filtered.length} Doctors</span>
      </div>

      {/* Doctors Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
            <tr>
              <th className="p-3.5">Doctor & Title</th>
              <th className="p-3.5">Hospital & City</th>
              <th className="p-3.5">Experience & Surgeries</th>
              <th className="p-3.5">Video Explanation</th>
              <th className="p-3.5">Credentials Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filtered.map((doc) => (
              <tr key={doc.id} className="hover:bg-slate-800/50 transition-colors">
                <td className="p-3.5">
                  <div className="flex items-center gap-3">
                    <img
                      src={doc.photoUrl}
                      alt={doc.name}
                      className="h-10 w-10 rounded-full object-cover border border-slate-700 shrink-0"
                    />
                    <div>
                      <div className="font-bold text-white text-xs sm:text-sm">{doc.name}</div>
                      <div className="text-[11px] text-brand-400 font-medium">{doc.designation}</div>
                    </div>
                  </div>
                </td>
                <td className="p-3.5">
                  <div className="font-semibold text-slate-200">{doc.hospitalName}</div>
                  <div className="text-[10px] text-slate-400">{doc.cityLabel}</div>
                </td>
                <td className="p-3.5">
                  <span className="font-bold text-white">{doc.experienceYears}+ Yrs</span>
                  <div className="text-[10px] text-slate-400 font-semibold">{doc.surgeriesCount} Surgeries</div>
                </td>
                <td className="p-3.5">
                  <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-semibold">
                    <Video className="h-3.5 w-3.5" />
                    <span>{doc.videoDuration} Video</span>
                  </div>
                </td>
                <td className="p-3.5">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="h-3 w-3" /> Board Verified
                  </span>
                </td>
                <td className="p-3.5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href="/doctors"
                      target="_blank"
                      className="text-slate-400 hover:text-white p-1"
                      title="View on Public Site"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                    <button
                      onClick={() => openEditModal(doc)}
                      className="inline-flex items-center gap-1 text-white bg-brand-600 hover:bg-brand-500 text-xs font-bold px-2.5 py-1 rounded transition-colors shadow-2xs"
                    >
                      <Edit className="h-3 w-3" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(doc.id, doc.name)}
                      className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                      title="Delete Doctor"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ─── ADD / EDIT DOCTOR MODAL ────────────────────────────────── */}
      <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-in fade-in" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-800 p-5 sm:p-6 outline-none">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div>
                <Dialog.Title className="text-lg font-bold text-white">
                  {editingDoc ? `Edit Doctor: ${editingDoc.name}` : 'Add New Senior Doctor / Surgeon'}
                </Dialog.Title>
                <p className="text-xs text-slate-400">
                  Update surgeon profile, surgical statistics, credentials, and video overview.
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
                  <label className="block text-slate-300 font-semibold mb-1">Doctor Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Naresh Trehan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Designation / Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chairman & Chief Cardiac Surgeon"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Hospital Partner *</label>
                  <input
                    type="text"
                    required
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
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

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Department *</label>
                  <input
                    type="text"
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Experience (Years) *</label>
                  <input
                    type="number"
                    required
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Surgeries Count *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 48,000+"
                    value={surgeriesCount}
                    onChange={(e) => setSurgeriesCount(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Photo Image Path *</label>
                  <input
                    type="text"
                    required
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-white font-mono focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Key Surgical Procedures (Comma separated) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Off-Pump CABG, Robotic Bypass, Valve Repair"
                  value={expertiseText}
                  onChange={(e) => setExpertiseText(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Doctor Bio & Background Summary *</label>
                <textarea
                  rows={3}
                  required
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              {/* Video Media Info */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                  <Video className="h-3.5 w-3.5" /> Video Explanation Details
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1">Video Title</label>
                    <input
                      type="text"
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 p-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1">Duration Tag</label>
                    <input
                      type="text"
                      value={videoDuration}
                      onChange={(e) => setVideoDuration(e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 p-2 text-white"
                    />
                  </div>
                </div>
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
                  {editingDoc ? 'Save Doctor Profile' : 'Add Doctor'}
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
