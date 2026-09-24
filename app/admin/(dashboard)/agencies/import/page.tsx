import { CsvImportForm } from "@/components/admin/csv-import-form";

export default function ImportAgenciesPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl">Import Agencies from CSV</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Columns: <code>name, website, description, services, founded_year,
        team_size, country, region, city, industries, data_source</code>.
        Use <code>;</code> to separate multiple services or industries in a
        single cell. Imported agencies are created as{" "}
        <strong>Unverified</strong> and won&apos;t appear publicly until
        reviewed and verified individually.
      </p>
      <a
        href="/agency-import-template.csv"
        download
        className="mt-3 inline-block text-sm underline underline-offset-4 hover:text-accent"
      >
        Download CSV template
      </a>

      <div className="mt-8">
        <CsvImportForm />
      </div>
    </div>
  );
}
