// Comprehensive mock data for dashboards





export const mockActivityLog = [
  { id: 1, action: 'Session confirmed with Alex', time: '2 hours ago', type: 'success' },
  { id: 2, action: 'New review received from Emily', time: '1 day ago', type: 'info' },
  { id: 3, action: 'Payment processed: $45.00', time: '2 days ago', type: 'success' },
  { id: 4, action: 'Availability updated', time: '3 days ago', type: 'info' }
];

export const mockAdminStats = {
  totalUsers: 1247,
  activeTutors: 342,
  totalBookings: 5680,
  totalRevenue: 125450,
  uptime: '99.8%',
  activeSessions: 23,
  pendingPayouts: 15
};

export const mockPlatformRevenue = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  amount: Math.floor(Math.random() * (5200 - 3500 + 1)) + 3500
}));

export const mockUserGrowth = Array.from({ length: 12 }, (_, i) => ({
  week: `Week ${i + 1}`,
  users: Math.floor(Math.random() * (150 - 50 + 1)) + 50
}));



// Generator for users
export const generateUsers = (count) => {
  const roles = ['Student', 'Tutor', 'Admin'];
  const statuses = ['Active', 'Inactive', 'Suspended'];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: roles[Math.floor(Math.random() * roles.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    joinedDate: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString()
  }));
};

// Generator for bookings
export const generateBookings = (count) => {
  const statuses = ['Confirmed', 'Pending', 'Completed', 'Cancelled'];
  const subjects = ['Math', 'Physics', 'English', 'Chemistry', 'Programming'];
  return Array.from({ length: count }, (_, i) => ({
    id: `BK-${1000 + i}`,
    studentName: `Student ${i + 1}`,
    tutorName: `Tutor ${i + 1}`,
    subject: subjects[Math.floor(Math.random() * subjects.length)],
    date: new Date(Date.now() + Math.random() * 1000000000).toLocaleString(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    price: Math.floor(Math.random() * 60) + 20
  }));
};

export const mockCategories = [
  { id: 1, name: 'Mathematics', description: 'Algebra, Calculus, Geometry', tutors: 45, bookings: 1200 },
  { id: 2, name: 'Physics', description: 'Mechanics, Thermodynamics', tutors: 32, bookings: 850 },
  { id: 3, name: 'Computer Science', description: 'Programming, Algorithms', tutors: 58, bookings: 1500 },
  { id: 4, name: 'English', description: 'Literature, Writing, ESL', tutors: 28, bookings: 600 },
  { id: 5, name: 'Chemistry', description: 'Organic, Inorganic', tutors: 25, bookings: 540 },
  { id: 6, name: 'Biology', description: 'Genetics, Anatomy', tutors: 30, bookings: 700 }
];