export interface ChapterInfo {
  number: number;
  slug: string;
  title: string;
  description: string;
}

export const CHAPTERS: ChapterInfo[] = [
  {
    number: 1,
    slug: 'chapter-01',
    title: 'Angular Fundamentals and Design Patterns',
    description:
      'Core building blocks, Signals, SOLID principles, design pattern categories, and MVVM in Angular.',
  },
  {
    number: 2,
    slug: 'chapter-02',
    title: 'TypeScript Patterns for Angular',
    description:
      'Strong typing, OOP constructs, and advanced TypeScript features for maintainable Angular apps.',
  },
  {
    number: 3,
    slug: 'chapter-03',
    title: 'Component-Driven Development',
    description:
      'Designing, implementing, and composing components as the fundamental unit of the UI.',
  },
  {
    number: 4,
    slug: 'chapter-04',
    title: 'Reusable Services',
    description:
      'Centralizing business logic and sharing behavior across the application with services.',
  },
  {
    number: 5,
    slug: 'chapter-05',
    title: 'Building with Standalone Components and Providers',
    description:
      'Standalone APIs as the default: components, provider functions, and app composition.',
  },
  {
    number: 6,
    slug: 'chapter-06',
    title: 'Reactive Programming with RxJS',
    description:
      'Handling asynchronous events with Observables, operators, and reactive patterns.',
  },
  {
    number: 7,
    slug: 'chapter-07',
    title: 'State Management with NgRx',
    description:
      'Managing shared state, async data fetching, and UI synchronization with NgRx.',
  },
  {
    number: 8,
    slug: 'chapter-08',
    title: 'Routing with Angular Standalone APIs',
    description:
      'Mapping URLs to components: deep links, feature-based navigation, and route composition.',
  },
  {
    number: 9,
    slug: 'chapter-09',
    title: 'Lazy Loading and Performance Optimization',
    description:
      'Reducing bundle size and improving startup time with lazy loading and optimization techniques.',
  },
  {
    number: 10,
    slug: 'chapter-10',
    title: 'Forms and User Input',
    description:
      'Template-driven and reactive forms, from simple inputs to complex dynamic structures.',
  },
  {
    number: 11,
    slug: 'chapter-11',
    title: 'Data Transformation and APIs',
    description:
      'Integrating with backend APIs and transforming data between backend and UI models.',
  },
  {
    number: 12,
    slug: 'chapter-12',
    title: 'Advanced Behavioral Patterns',
    description:
      'Behavioral design patterns for clean communication between components and logic flow.',
  },
  {
    number: 13,
    slug: 'chapter-13',
    title: 'Micro-Frontends with Angular Elements',
    description:
      'Scaling enterprise frontends with Angular Elements and micro frontend architecture.',
  },
  {
    number: 14,
    slug: 'chapter-14',
    title: 'Real-World Case Studies',
    description:
      'Applying the book’s patterns and architectural strategies in practice.',
  },
];
