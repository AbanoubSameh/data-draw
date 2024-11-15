export interface FileDefinition {
  fileName: string;
  headers: string[];
  data: Record<string, string | number>[];
}
