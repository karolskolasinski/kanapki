const users = [
  { id: "1", email: "karolskolasinski@gmail.com", password: "123", name: "Test User" },
];

export async function getUserByCredentials(email: string, password: string) {
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return null;
  return { id: user.id, name: user.name, email: user.email };
}
