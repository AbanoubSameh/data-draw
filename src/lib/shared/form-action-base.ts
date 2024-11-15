export interface FormActionState<T, E = unknown> {
  formErrors?: Partial<Record<keyof T, string[]>>;
  result?: T;
  error?: string;
}
