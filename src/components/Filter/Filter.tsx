
import type React from "react"
import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { MOCK_PATIENTS, MOCK_DOCTORS } from "../../data/mockData"
import "./FilterModal.scss"

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  onApply: (filters: { doctorId: string; patientId: string }) => void
  currentFilters: { doctorId: string; patientId: string }
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, onApply, currentFilters }) => {
  const [filters, setFilters] = useState(currentFilters)

  useEffect(() => {
    setFilters(currentFilters)
  }, [currentFilters])

  const handleApply = () => {
    onApply(filters)
  }

  const handleClear = () => {
    const clearedFilters = { doctorId: "", patientId: "" }
    setFilters(clearedFilters)
    onApply(clearedFilters)
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal filter-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Filter Appointments</h2>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="doctor-filter">Filter by Doctor</label>
            <select
              id="doctor-filter"
              value={filters.doctorId}
              onChange={(e) => setFilters((prev) => ({ ...prev, doctorId: e.target.value }))}
            >
              <option value="">All Doctors</option>
              {MOCK_DOCTORS.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialty}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="patient-filter">Filter by Patient</label>
            <select
              id="patient-filter"
              value={filters.patientId}
              onChange={(e) => setFilters((prev) => ({ ...prev, patientId: e.target.value }))}
            >
              <option value="">All Patients</option>
              {MOCK_PATIENTS.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name} - {patient.phone}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={handleClear} className="btn btn-secondary">
            Clear All
          </button>
          <div className="modal-actions">
            <button onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button onClick={handleApply} className="btn btn-primary">
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterModal
