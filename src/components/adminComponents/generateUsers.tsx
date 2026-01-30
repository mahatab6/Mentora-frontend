export type User = {
  id: string;
  name: string;
  email: string;
  role: "Student" | "Tutor" | "Admin";
  status: "Active" | "Inactive" | "Banned";
  joinedDate: string;
};

export function generateUsers(count: number): User[] {
  const roles = ["Student", "Tutor", "Admin"] as const;
  const statuses = ["Active", "Inactive", "Banned"] as const;

  return Array.from({ length: count }).map((_, i) => ({
    id: `U-${1000 + i}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: roles[i % roles.length],
    status: statuses[i % statuses.length],
    joinedDate: new Date(
      Date.now() - i * 86400000
    ).toLocaleDateString(),
  }));
}
