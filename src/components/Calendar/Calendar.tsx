
import type React from "react"
import { useState, useEffect } from "react"
import { format, addMonths, subMonths } from "date-fns"
import { ChevronLeft, ChevronRight, Plus, Filter } from "lucide-react"
import { useAppointments } from "../../hooks/useAppointments"
import { MOCK_PATIENTS, MOCK_DOCTORS } from "../../data/mockData"
import CalendarGrid from "./CalendarGrid"
import MobileCalendar from "./MobileCalendar"
import AppointmentModal from "../Appointment/Appointment"
import FilterModal from "../Filter/Filter"
import "./Calendar.scss"

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [editingAppointment, setEditingAppointment] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [filters, setFilters] = useState({
    doctorId: "",
    patientId: "",
  })

  const {
    appointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
  } = useAppointments()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  const handleDateClick = (date: string) => {
    setSelectedDate(date)
    setEditingAppointment(null)
    setIsAppointmentModalOpen(true)
  }

  const handleAppointmentClick = (appointmentId: string, date: string) => {
    setSelectedDate(date)
    setEditingAppointment(appointmentId)
    setIsAppointmentModalOpen(true)
  }

  const handleAppointmentSubmit = (appointmentData: any) => {
    if (editingAppointment) {
      updateAppointment(editingAppointment, appointmentData)
    } else {
      addAppointment(appointmentData)
    }
    setIsAppointmentModalOpen(false)
    setEditingAppointment(null)
    setSelectedDate("")
  }

  const handleAppointmentDelete = (appointmentId: string) => {
    deleteAppointment(appointmentId)
    setIsAppointmentModalOpen(false)
    setEditingAppointment(null)
    setSelectedDate("")
  }

  const handleFilterApply = (newFilters: typeof filters) => {
    setFilters(newFilters)
    setIsFilterModalOpen(false)
  }

  const getFilteredAppointments = () => {
    let filtered = appointments

    if (filters.doctorId) {
      filtered = filtered.filter((apt) => apt.doctorId === filters.doctorId)
    }

    if (filters.patientId) {
      filtered = filtered.filter((apt) => apt.patientId === filters.patientId)
    }

    return filtered
  }

  const filteredAppointments = getFilteredAppointments()
  const hasActiveFilters = filters.doctorId || filters.patientId

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="calendar-nav">
          <button onClick={handlePrevMonth} className="btn btn-secondary nav-btn">
            <ChevronLeft size={16} />
          </button>

          <h2 className="calendar-title">{format(currentDate, "MMMM yyyy")}</h2>

          <button onClick={handleNextMonth} className="btn btn-secondary nav-btn">
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="calendar-actions">
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className={`btn btn-secondary filter-btn ${hasActiveFilters ? "active" : ""}`}
          >
            <Filter size={16} />
            Filter
            {hasActiveFilters && <span className="filter-badge" />}
          </button>

          <button
            onClick={() => {
              setSelectedDate(format(new Date(), "yyyy-MM-dd"))
              setEditingAppointment(null)
              setIsAppointmentModalOpen(true)
            }}
            className="btn btn-primary add-btn"
          >
            <Plus size={16} />
            Add Appointment
          </button>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="active-filters">
          <span>Active filters:</span>
          {filters.doctorId && (
            <span className="filter-tag">Dr: {MOCK_DOCTORS.find((d) => d.id === filters.doctorId)?.name}</span>
          )}
          {filters.patientId && (
            <span className="filter-tag">Patient: {MOCK_PATIENTS.find((p) => p.id === filters.patientId)?.name}</span>
          )}
          <button onClick={() => setFilters({ doctorId: "", patientId: "" })} className="clear-filters">
            Clear all
          </button>
        </div>
      )}

      <div className="calendar-content">
        {isMobile ? (
          <MobileCalendar
            currentDate={currentDate}
            appointments={filteredAppointments}
            onDateClick={handleDateClick}
            onAppointmentClick={handleAppointmentClick}
          />
        ) : (
          <CalendarGrid
            currentDate={currentDate}
            appointments={filteredAppointments}
            onDateClick={handleDateClick}
            onAppointmentClick={handleAppointmentClick}
          />
        )}
      </div>

      {isAppointmentModalOpen && (
        <AppointmentModal
          isOpen={isAppointmentModalOpen}
          onClose={() => {
            setIsAppointmentModalOpen(false)
            setEditingAppointment(null)
            setSelectedDate("")
          }}
          onSubmit={handleAppointmentSubmit}
          onDelete={editingAppointment ? handleAppointmentDelete : undefined}
          selectedDate={selectedDate}
          editingAppointment={
            editingAppointment ? appointments.find((apt) => apt.id === editingAppointment) : undefined
          }
        />
      )}

      {isFilterModalOpen && (
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          onApply={handleFilterApply}
          currentFilters={filters}
        />
      )}
    </div>
  )
}

export default Calendar
