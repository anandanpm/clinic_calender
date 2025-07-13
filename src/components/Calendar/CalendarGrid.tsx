
import type React from "react"
import { format, isSameMonth, isToday } from "date-fns"
import { getCalendarDays, formatTime } from "../../utils/dateUtils"
import type { Appointment } from "../../types"
import { MOCK_PATIENTS, MOCK_DOCTORS } from "../../data/mockData"
import "./CalendarGrid.scss"

interface CalendarGridProps {
  currentDate: Date
  appointments: Appointment[]
  onDateClick: (date: string) => void
  onAppointmentClick: (appointmentId: string, date: string) => void
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ currentDate, appointments, onDateClick, onAppointmentClick }) => {
  const calendarDays = getCalendarDays(currentDate)
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

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

  return (
    <div className="calendar-grid">
      <div className="calendar-weekdays">
        {weekDays.map((day) => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-days">
        {calendarDays.map((date, index) => {
          const dateStr = format(date, "yyyy-MM-dd")
          const dayAppointments = getAppointmentsForDate(date)
          const isCurrentMonth = isSameMonth(date, currentDate)
          const isTodayDate = isToday(date)

          return (
            <div
              key={index}
              className={`calendar-day ${!isCurrentMonth ? "other-month" : ""} ${isTodayDate ? "today" : ""}`}
              onClick={() => onDateClick(dateStr)}
            >
              <div className="day-number">{format(date, "d")}</div>

              <div className="day-appointments">
                {dayAppointments.slice(0, 3).map((appointment) => (
                  <div
                    key={appointment.id}
                    className="appointment-item"
                    onClick={(e) => {
                      e.stopPropagation()
                      onAppointmentClick(appointment.id, dateStr)
                    }}
                  >
                    <div className="appointment-time">{formatTime(appointment.time)}</div>
                    <div className="appointment-patient">{getPatientName(appointment.patientId)}</div>
                    <div className="appointment-doctor">{getDoctorName(appointment.doctorId)}</div>
                  </div>
                ))}

                {dayAppointments.length > 3 && (
                  <div className="more-appointments">+{dayAppointments.length - 3} more</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarGrid
