class UserBuilder {
  private u: { id: string; role: 'user' | 'admin' } = { id: '1', role: 'user' };
  withRole(role: 'user' | 'admin') { this.u.role = role; return this; }
  build() { return structuredClone(this.u); }
}

it('builds an admin user', () => {
  const user = new UserBuilder().withRole('admin').build();
  expect(user.role).toBe('admin');
});
