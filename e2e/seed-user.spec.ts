// A test-only helper that creates the required state before each test (or test suite).
async function seedUser(request: any) {
  const res = await request.post('/test/seed/user', { data: { role: 'admin' } });
  return res.json(); // e.g., { token: '...' }
}
