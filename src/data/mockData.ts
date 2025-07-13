import type { Patient, Doctor } from "../types"

export const MOCK_PATIENTS: Patient[] = [
  { id: "1", name: "John Smith", phone: "(555) 123-4567" },
  { id: "2", name: "Sarah Johnson", phone: "(555) 234-5678" },
  { id: "3", name: "Michael Brown", phone: "(555) 345-6789" },
  { id: "4", name: "Emily Davis", phone: "(555) 456-7890" },
  { id: "5", name: "David Wilson", phone: "(555) 567-8901" },
  { id: "6", name: "Lisa Anderson", phone: "(555) 678-9012" },
  { id: "7", name: "Robert Taylor", phone: "(555) 789-0123" },
  { id: "8", name: "Jennifer Martinez", phone: "(555) 890-1234" },
]

export const MOCK_DOCTORS: Doctor[] = [
  { id: "1", name: "Dr. Amanda Chen", specialty: "Cardiology" },
  { id: "2", name: "Dr. James Rodriguez", specialty: "Pediatrics" },
  { id: "3", name: "Dr. Maria Gonzalez", specialty: "Dermatology" },
  { id: "4", name: "Dr. Thomas Lee", specialty: "Orthopedics" },
  { id: "5", name: "Dr. Rachel Kim", specialty: "Internal Medicine" },
  { id: "6", name: "Dr. Kevin O'Connor", specialty: "Neurology" },
]

export const MOCK_CREDENTIALS = {
  email: "staff@clinic.com",
  password: "123456",
}
