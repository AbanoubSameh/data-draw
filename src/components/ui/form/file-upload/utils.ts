import "server-only";
import { FileDefinition } from "./models";

const stripQuotes = (str: string) => str.replace(/^"|"$/g, "");

export const InputFileToFileDefinition = async (
  file: File
): Promise<FileDefinition | null> => {
  if (!file) {
    throw new Error("CSV file not found in form data.");
  }

  const fileName = file.name;
  const fileReader = file.stream().getReader();
  const filleDataU8: number[] = [];
  while (true) {
    const { done, value } = await fileReader.read();
    if (done) break;

    filleDataU8.push(...Array.from(value));
  }

  const csvUint8Array = new Uint8Array(filleDataU8);
  const csvBinary = Buffer.from(csvUint8Array);

  const csvString = csvBinary.toString("utf-8");
  if (csvString) {
    const [headers, ...rows]: string[][] = csvString
      .split("\n")
      .filter(Boolean)
      .map((row) => row.split(",").map(stripQuotes)); // Strip quotes from each value

    if (headers && rows.length > 0) {
      const data: Record<string, string | number>[] = rows.map((row) =>
        headers.reduce(
          (a, b: string, index) => ({
            ...a,
            [stripQuotes(b)]: isNaN(Number(row[index]))
              ? row[index]
              : Number(row[index]), // Convert to number if possible
          }),
          {}
        )
      );
      const def: FileDefinition = {
        data,
        headers: headers.map(stripQuotes),
        fileName,
      };
      return def;
    }
  }

  return null;
};

