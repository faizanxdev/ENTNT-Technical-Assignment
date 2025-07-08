export function authenticate(email, password) {
  const users = [
    { id: '1', role: 'Admin', email: 'admin@entnt.in', password: 'admin123' },
    { id: '2', role: 'Patient', email: 'john@entnt.in', password: 'patient123', patientId: 'p1' }
  ];

  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem('loginUser', JSON.stringify(user));  
    return { success: true, user };
  }
  return { success: false, message: 'Invalid credentials' };
}
