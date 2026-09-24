export type CsvImportResult = {
  status: "idle" | "success" | "error";
  message: string;
  created: number;
  failed: { row: number; reason: string }[];
};

export const initialCsvImportState: CsvImportResult = { status: "idle", message: "", created: 0, failed: [] };
