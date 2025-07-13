import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from "date-fns"

export const formatDate = (date: Date, formatStr = "yyyy-MM-dd"): string => {
  return format(date, formatStr)
}

export const getMonthDays = (date: Date) => {
  const start = startOfMonth(date)
  const end = endOfMonth(date)
  return eachDayOfInterval({ start, end })
}

export const getCalendarDays = (date: Date) => {
  const monthStart = startOfMonth(date)
  const monthEnd = endOfMonth(date)

  // Get the start of the week for the first day of the month
  const calendarStart = new Date(monthStart)
  calendarStart.setDate(monthStart.getDate() - monthStart.getDay())

  // Get the end of the week for the last day of the month
  const calendarEnd = new Date(monthEnd)
  calendarEnd.setDate(monthEnd.getDate() + (6 - monthEnd.getDay()))

  return eachDayOfInterval({ start: calendarStart, end: calendarEnd })
}

export const isCurrentMonth = (date: Date, currentDate: Date): boolean => {
  return isSameMonth(date, currentDate)
}

export const isTodayDate = (date: Date): boolean => {
  return isToday(date)
}

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(":")
  const hour = Number.parseInt(hours)
  const ampm = hour >= 12 ? "PM" : "AM"
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${ampm}`
}
