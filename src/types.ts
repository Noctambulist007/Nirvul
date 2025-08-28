
export interface DiffResult {
  value: string;
  added?: boolean;
  removed?: boolean;
}

export interface Correction {
  from: string;
  to: string;
  diffStartIndex: number;
  diffEndIndex: number;
}
