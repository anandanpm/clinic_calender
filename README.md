# 🏥 Clinic Appointment Calendar

A modern, responsive appointment management system designed for clinic staff to efficiently manage doctor appointments. Built with React, TypeScript, and SCSS using Vite for optimal performance.


## ✨ Features

### 🔐 Authentication
- **Mock Authentication System** with predefined credentials
- **Session Persistence** - Stay logged in across browser sessions
- **Protected Routes** - Secure access to calendar features

### 📅 Calendar Views
- **Desktop**: Full month grid view with appointment previews
- **Mobile**: Day-by-day view with intuitive date picker navigation
- **Responsive Design** - Seamlessly adapts to all screen sizes

### 👥 Appointment Management
- **Full CRUD Operations** - Create, Read, Update, Delete appointments
- **Patient & Doctor Selection** - Dropdown menus with predefined lists
- **Time Scheduling** - Easy time picker for appointment slots
- **Notes Support** - Add additional notes to appointments
- **Form Validation** - Comprehensive input validation

### 🎯 Advanced Features
- **Smart Filtering** - Filter by doctor or patient
- **Dark Mode Toggle** - Switch between light and dark themes
- **Local Storage** - All data persists locally
- **Real-time Updates** - Instant UI updates
- **Conflict Prevention** - Visual feedback for scheduling

### 🎨 Modern UI/UX
- **Glass Morphism Design** - Modern backdrop blur effects
- **Smooth Animations** - Micro-interactions and hover effects
- **Gradient Themes** - Beautiful color schemes
- **Accessibility** - WCAG compliant design
- **Custom Scrollbars** - Styled for better aesthetics

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/anandanpm/clinic-appointment-calendar.git
   cd clinic-appointment-calendar
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   Navigate to \`http://localhost:5173\`

### Demo Credentials
- **Email**: \`staff@clinic.com\`
- **Password**: \`123456\`

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **SCSS** - Enhanced CSS with variables and mixins

### Libraries & Tools
- **React Router DOM** - Client-side routing
- **date-fns** - Date manipulation and formatting
- **Lucide React** - Beautiful icon library
- **Inter Font** - Modern typography

### Development Tools
- **ESLint** - Code linting
- **TypeScript Compiler** - Type checking
- **Sass** - CSS preprocessing

## 📁 Project Structure

\`\`\`
clinic-appointment-calendar/
├── public/                     # Static assets
├── src/
│   ├── components/            # React components
│   │   ├── AppointmentModal/  # Appointment form modal
│   │   ├── Calendar/          # Calendar views
│   │   ├── FilterModal/       # Filter functionality
│   │   ├── Header/           # Navigation header
│   │   ├── Login/            # Authentication
│   │   └── ProtectedRoute/   # Route protection
│   ├── contexts/             # React contexts
│   │   ├── AuthContext.tsx   # Authentication state
│   │   └── ThemeContext.tsx  # Theme management
│   ├── data/                 # Mock data
│   │   └── mockData.ts       # Patients, doctors, credentials
│   ├── hooks/                # Custom React hooks
│   │   └── useAppointments.ts # Appointment management
│   ├── styles/               # Global styles
│   │   ├── globals.scss      # Global CSS
│   │   └── variables.scss    # SCSS variables
│   ├── types/                # TypeScript definitions
│   │   └── index.ts          # Type definitions
│   ├── utils/                # Utility functions
│   │   └── dateUtils.ts      # Date helpers
│   ├── App.tsx               # Main app component
│   └── main.tsx              # App entry point
├── index.html                # HTML template
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── vite.config.ts            # Vite configuration
└── README.md                 # This file
\`\`\`

## 🎯 Usage Guide

### 1. Login
- Use the demo credentials to access the system
- The app remembers your session across browser restarts

### 2. Calendar Navigation
- **Desktop**: Click on any day to add an appointment
- **Mobile**: Use the date picker to navigate between days
- Use arrow buttons to navigate months/days

### 3. Managing Appointments
- **Add**: Click "Add Appointment" or click on a calendar day
- **Edit**: Click on an existing appointment
- **Delete**: Use the delete button in the appointment modal
- **Filter**: Use the filter button to show specific appointments

### 4. Theme Switching
- Click the moon/sun icon in the header to toggle dark mode
- Your preference is saved automatically

### Customization

#### Adding More Patients/Doctors
Edit \`src/data/mockData.ts\`:

\`\`\`typescript
export const MOCK_PATIENTS: Patient[] = [
  { id: "9", name: "New Patient", phone: "(555) 999-0000" },
  // Add more patients...
]

export const MOCK_DOCTORS: Doctor[] = [
  { id: "7", name: "Dr. New Doctor", specialty: "Specialty" },
  // Add more doctors...
]
\`\`\`

#### Styling Customization
Modify \`src/styles/variables.scss\` to change colors, spacing, and other design tokens:

\`\`\`scss
$primary-color: #your-color;
$border-radius-md: 0.5rem;
// Customize other variables...
\`\`\`

## 📱 Responsive Design

### Desktop (≥1024px)
- Full month calendar grid
- Sidebar navigation
- Hover effects and animations

### Tablet (768px - 1023px)
- Adapted grid layout
- Touch-friendly interactions

### Mobile (<768px)
- Day-by-day view
- Swipe navigation
- Optimized touch targets

### Development Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Add comments for complex logic
- Ensure responsive design
- Test on multiple browsers

## 📊 Project Stats

- **Lines of Code**: ~2,500+
- **Components**: 15+
- **Type Definitions**: 100% TypeScript
- **Responsive Breakpoints**: 3
- **Browser Support**: Modern browsers (ES2020+)

---

