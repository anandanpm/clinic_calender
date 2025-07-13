
import { useState, useEffect } from "react"
import type { Appointment, AppointmentFormData } from "../types"

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    const savedAppointments = localStorage.getItem("clinic_appointments")
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments))
    }
  }, [])

  const saveAppointments = (newAppointments: Appointment[]) => {
    setAppointments(newAppointments)
    localStorage.setItem("clinic_appointments", JSON.stringify(newAppointments))
  }

  const addAppointment = (appointmentData: AppointmentFormData) => {
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      ...appointmentData,
    }
    const updatedAppointments = [...appointments, newAppointment]
    saveAppointments(updatedAppointments)
  }

  const updateAppointment = (id: string, appointmentData: AppointmentFormData) => {
    const updatedAppointments = appointments.map((apt) => (apt.id === id ? { ...apt, ...appointmentData } : apt))
    saveAppointments(updatedAppointments)
  }

  const deleteAppointment = (id: string) => {
    const updatedAppointments = appointments.filter((apt) => apt.id !== id)
    saveAppointments(updatedAppointments)
  }

  const getAppointmentsByDate = (date: string) => {
    return appointments.filter((apt) => apt.date === date)
  }

  const getAppointmentsByMonth = (year: number, month: number) => {
    return appointments.filter((apt) => {
      const aptDate = new Date(apt.date)
      return aptDate.getFullYear() === year && aptDate.getMonth() === month
    })
  }

  return {
    appointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentsByDate,
    getAppointmentsByMonth,
  }
}

