export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEvent {
  level: LogLevel;
  event: string;
  correlationId?: string;
  route?: string;
  feature?: string;
  version?: string;
  meta?: Record<string, unknown>;
}

const REDACT_KEYS = new Set(['authorization', 'token', 'password', 'refreshToken']);

export function redact(meta: Record<string, unknown> = {}): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(meta).map(([k, v]) => [k, REDACT_KEYS.has(k) ? '[REDACTED]' : v])
  );
}
