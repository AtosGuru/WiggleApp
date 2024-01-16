import { v4 as uuidv4 } from 'uuid'
import { 
  analiticsPath, 
  dashboardPath, 
  eventsPath, 
  loyaltyPath, 
  messagesPath, 
  notificationsPath 
} from '@/constants/imagePaths'
import { RoutesType } from '@/types/routesTypes'

export const PAGE_ROUTES: RoutesType = {
  dashboard: {
    id: uuidv4(),
    route: '/',
    name: 'Dashboard',
    icon: dashboardPath,
    isProtected: true
  },
  events: {
    id: uuidv4(),
    route: '/events',
    name: 'Events',
    icon: eventsPath,
    isProtected: true
  },
  analytics: {
    id: uuidv4(),
    route: '/analytics',
    name: 'Analytics',
    icon: analiticsPath,
    isProtected: true
  },
  loyalty: {
    id: uuidv4(),
    route: '/loyalty',
    name: 'Loyalty',
    icon: loyaltyPath,
    isProtected: true
  },
  notifications: {
    id: uuidv4(),
    route: '/notifications',
    name: 'Notifications',
    icon: notificationsPath,
    isProtected: true
  },
  messages: {
    id: uuidv4(),
    route: '/messages',
    name: 'Messages',
    icon: messagesPath,
    isProtected: true
  },
  profile: {
    id: uuidv4(),
    route: '/profile',
    name: 'Profile',
    isProtected: true
  },
  login: {
    id: uuidv4(),
    route: '/auth/login',
    name: 'Login',
    isProtected: false
  },
}

export const PROTECTED_ROUTES = Object.values(PAGE_ROUTES)
  .filter(page => page.isProtected)
  .map(page => page.route)