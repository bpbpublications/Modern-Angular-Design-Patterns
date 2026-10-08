// Define a shared interface for notification services
export abstract class Notifier {
  abstract notify(userId: number, message: string): void;
}
