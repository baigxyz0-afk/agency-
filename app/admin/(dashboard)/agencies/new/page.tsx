import { AgencyForm } from "@/components/admin/agency-form";
import { createAgencyAction } from "@/app/admin/actions/agencies";

export default function NewAgencyPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl">Add Agency</h1>
      <p className="mt-1 text-sm text-muted">Countries, regions, cities, and industries are created automatically if they don&apos;t already exist.</p>
      <div className="mt-8">
        <AgencyForm action={createAgencyAction} />
      </div>
    </div>
  );
}
