import { Button } from "@/components/ui/button";

export default function AdminNotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-2xl">Not found</h1>
      <p className="mt-2 text-sm text-muted">That record doesn&apos;t exist or may have been deleted.</p>
      <div className="mt-6">
        <Button href="/admin/agencies" variant="secondary">Back to Agencies</Button>
      </div>
    </div>
  );
}
