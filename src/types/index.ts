export interface Patient {
  id: string
  name: string
  phone: string
}

export interface Doctor {
  id: string
  name: string
  specialty: string
}

export interface Appointment {
  id: string
  patientId: string
  doctorId: string
  date: string
  time: string
  notes?: string
}

export interface User {
  email: string
  name: string
}

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => boolean
  logout: () => void
  isAuthenticated: boolean
}

export interface AppointmentFormData {
  patientId: string
  doctorId: string
  date: string
  time: string
  notes?: string
}
