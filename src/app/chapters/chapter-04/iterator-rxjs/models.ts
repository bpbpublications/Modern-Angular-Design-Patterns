export interface Item {
  id: number;
  name: string;
}

export interface Page {
  items: Item[];
  hasNext: boolean;
  next: number;
}
