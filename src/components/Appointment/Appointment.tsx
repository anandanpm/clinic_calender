
import type React from "react"
import { useState, useEffect } from "react"
import { X, Trash2 } from "lucide-react"
import type { Appointment, AppointmentFormData } from "../../types"
import { MOCK_PATIENTS, MOCK_DOCTORS } from "../../data/mockData"
import "./Appointment.scss"

interface AppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: AppointmentFormData) => void
  onDelete?: (appointmentId: string) => void
  selectedDate: string
  editingAppointment?: Appointment
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onDelete,
  selectedDate,
  editingAppointment,
}) => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    patientId: "",
    doctorId: "",
    date: selectedDate,
    time: "",
    notes: "",
  })
  const [errors, setErrors] = useState<Partial<AppointmentFormData>>({})
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    if (editingAppointment) {
      setFormData({
        patientId: editingAppointment.patientId,
        doctorId: editingAppointment.doctorId,
        date: editingAppointment.date,
        time: editingAppointment.time,
        notes: editingAppointment.notes || "",
      })
    } else {
      setFormData({
        patientId: "",
        doctorId: "",
        date: selectedDate,
        time: "",
        notes: "",
      })
    }
    setErrors({})
    setShowDeleteConfirm(false)
  }, [editingAppointment, selectedDate])

  const validateForm = (): boolean => {
    const newErrors: Partial<AppointmentFormData> = {}

    if (!formData.patientId) {
      newErrors.patientId = "Patient is required"
    }
    if (!formData.doctorId) {
      newErrors.doctorId = "Doctor is required"
    }
    if (!formData.date) {
      newErrors.date = "Date is required"
    }
    if (!formData.time) {
      newErrors.time = "Time is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleDelete = () => {
    if (editingAppointment && onDelete) {
      onDelete(editingAppointment.id)
    }
  }

  const handleInputChange = (field: keyof AppointmentFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editingAppointment ? "Edit Appointment" : "New Appointment"}</h2>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="patient">Patient *</label>
              <select
                id="patient"
                value={formData.patientId}
                onChange={(e) => handleInputChange("patientId", e.target.value)}
                className={errors.patientId ? "error" : ""}
              >
                <option value="">Select a patient</option>
                {MOCK_PATIENTS.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name} - {patient.phone}
                  </option>
                ))}
              </select>
              {errors.patientId && <div className="error">{errors.patientId}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="doctor">Doctor *</label>
              <select
                id="doctor"
                value={formData.doctorId}
                onChange={(e) => handleInputChange("doctorId", e.target.value)}
                className={errors.doctorId ? "error" : ""}
              >
                <option value="">Select a doctor</option>
                {MOCK_DOCTORS.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialty}
                  </option>
                ))}
              </select>
              {errors.doctorId && <div className="error">{errors.doctorId}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="date">Date *</label>
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className={errors.date ? "error" : ""}
              />
              {errors.date && <div className="error">{errors.date}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="time">Time *</label>
              <input
                type="time"
                id="time"
                value={formData.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
                className={errors.time ? "error" : ""}
              />
              {errors.time && <div className="error">{errors.time}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Additional notes (optional)"
                rows={3}
              />
            </div>
          </form>
        </div>

        <div className="modal-footer">
          {editingAppointment && onDelete && (
            <>
              {!showDeleteConfirm ? (
                <button type="button" onClick={() => setShowDeleteConfirm(true)} className="btn btn-danger">
                  <Trash2 size={16} />
                  Delete
                </button>
              ) : (
                <div className="delete-confirm">
                  <span>Are you sure?</span>
                  <button type="button" onClick={handleDelete} className="btn btn-danger btn-sm">
                    Yes, Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(false)}
                    className="btn btn-secondary btn-sm"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </>
          )}

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" onClick={handleSubmit} className="btn btn-primary">
              {editingAppointment ? "Update" : "Create"} Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentModal
