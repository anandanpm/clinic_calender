
import type React from "react"
import { useState } from "react"
import { format, addDays, subDays, isToday } from "date-fns"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"
import type { Appointment } from "../../types"
import { MOCK_PATIENTS, MOCK_DOCTORS } from "../../data/mockData"
import { formatTime } from "../../utils/dateUtils"
import "./MobileCalendar.scss"

interface MobileCalendarProps {
  currentDate: Date
  appointments: Appointment[]
  onDateClick: (date: string) => void
  onAppointmentClick: (appointmentId: string, date: string) => void
}

const MobileCalendar: React.FC<MobileCalendarProps> = ({
  appointments,
  onDateClick,
  onAppointmentClick,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)

  const handlePrevDay = () => {
    setSelectedDate(subDays(selectedDate, 1))
  }

  const handleNextDay = () => {
    setSelectedDate(addDays(selectedDate, 1))
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(new Date(e.target.value))
    setShowDatePicker(false)
  }

  const getAppointmentsForDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd")
    return appointments.filter((apt) => apt.date === dateStr)
  }

  const getPatientName = (patientId: string) => {
    return MOCK_PATIENTS.find((p) => p.id === patientId)?.name || "Unknown"
  }

  const getDoctorName = (doctorId: string) => {
    return MOCK_DOCTORS.find((d) => d.id === doctorId)?.name || "Unknown"
  }

  const dayAppointments = getAppointmentsForDate(selectedDate)
  const dateStr = format(selectedDate, "yyyy-MM-dd")

  return (
    <div className="mobile-calendar">
      <div className="mobile-calendar-header">
        <button onClick={handlePrevDay} className="btn btn-secondary nav-btn">
          <ChevronLeft size={16} />
        </button>

        <div className="date-selector">
          <button onClick={() => setShowDatePicker(!showDatePicker)} className="date-button">
            <CalendarIcon size={16} />
            <span className="date-text">
              {format(selectedDate, "MMM d, yyyy")}
              {isToday(selectedDate) && <span className="today-badge">Today</span>}
            </span>
          </button>

          {showDatePicker && (
            <div className="date-picker-overlay">
              <input
                type="date"
                value={format(selectedDate, "yyyy-MM-dd")}
                onChange={handleDateChange}
                className="date-input"
              />
            </div>
          )}
        </div>

        <button onClick={handleNextDay} className="btn btn-secondary nav-btn">
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="mobile-day-view">
        <div className="day-header">
          <h3>{format(selectedDate, "EEEE")}</h3>
          <button onClick={() => onDateClick(dateStr)} className="btn btn-primary btn-sm add-appointment-btn">
            Add Appointment
          </button>
        </div>

        <div className="appointments-list">
          {dayAppointments.length === 0 ? (
            <div className="no-appointments">
              <p>No appointments scheduled for this day</p>
            </div>
          ) : (
            dayAppointments
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((appointment) => (
                <div
                  key={appointment.id}
                  className="mobile-appointment-item"
                  onClick={() => onAppointmentClick(appointment.id, dateStr)}
                >
                  <div className="appointment-time-badge">{formatTime(appointment.time)}</div>

                  <div className="appointment-details">
                    <div className="appointment-patient">{getPatientName(appointment.patientId)}</div>
                    <div className="appointment-doctor">{getDoctorName(appointment.doctorId)}</div>
                    {appointment.notes && <div className="appointment-notes">{appointment.notes}</div>}
                  </div>

                  <div className="appointment-arrow">
                    <ChevronRight size={16} />
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  )
}

export default MobileCalendar
