import { notFound } from "next/navigation";
import Link from "next/link";
import { getAgencyByIdAdmin } from "@/lib/directory/admin-queries";
import { updateAgencyAction, deleteAgencyAction } from "@/app/admin/actions/agencies";
import { AgencyForm } from "@/components/admin/agency-form";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";

type Props = { params: Promise<{ id: string }> };

export default async function EditAgencyPage({ params }: Props) {
  const { id } = await params;
  const agency = await getAgencyByIdAdmin(id);
  if (!agency) notFound();

  const boundUpdate = updateAgencyAction.bind(null, id);
  const boundDelete = deleteAgencyAction.bind(null, id);

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl">{agency.name}</h1>
          {agency.verification_status === "verified" && (
            <Link
              href={`/directory/agency/${agency.slug}`}
              className="mt-1 inline-block text-sm text-muted underline underline-offset-4 hover:text-accent"
            >
              View live listing →
            </Link>
          )}
        </div>
        <form action={boundDelete}>
          <ConfirmSubmitButton
            confirmMessage={`Delete ${agency.name}? This cannot be undone.`}
            className="text-sm text-error underline underline-offset-4 hover:opacity-80"
          >
            Delete Agency
          </ConfirmSubmitButton>
        </form>
      </div>

      <div className="mt-8">
        <AgencyForm agency={agency} action={boundUpdate} />
      </div>
    </div>
  );
}
