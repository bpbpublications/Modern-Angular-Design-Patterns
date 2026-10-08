import type { User } from './mapped-types';

export type UserPreview = Pick<User, 'id' | 'name'>; // Select only 'id' and 'name'
export type UserWithoutEmail = Omit<User, 'email'>; // Remove 'email' field
