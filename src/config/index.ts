import * as dotenv from 'dotenv';
dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || 'development';

export const JWT_SECRET = process.env.JWT_SECRET || '';
export const PGHOST = process.env.PGHOST || '';
export const PGPORT = parseInt(process.env.PGPORT || '');
export const PGUSER = process.env.PGUSER || '';
export const PGPASSWORD = process.env.PGPASSWORD || '';
export const PGDATABASE = process.env.PGDATABASE || '';

export const COOKIE_SECRET = process.env.COOKIE_SECRET || undefined;
