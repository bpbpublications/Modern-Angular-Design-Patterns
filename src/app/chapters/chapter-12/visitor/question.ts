// question.ts (discriminated union)
export type Question =
  | { kind: 'textbox'; key: string; label: string; value?: string }
  | { kind: 'dropdown'; key: string; label: string; options: string[]; value?: string };
