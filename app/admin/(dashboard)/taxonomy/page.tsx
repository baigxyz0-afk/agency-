import { listIndustriesWithCounts, listLocationsSummary } from "@/lib/directory/admin-queries";
import {
  createIndustryAction,
  deleteIndustryAction,
  deleteCountryAction,
  deleteRegionAction,
  deleteCityAction,
} from "@/app/admin/actions/taxonomy";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import { Button } from "@/components/ui/button";

export default async function TaxonomyPage() {
  const [industries, locations] = await Promise.all([listIndustriesWithCounts(), listLocationsSummary()]);

  return (
    <div className="max-w-3xl space-y-14">
      <div>
        <h1 className="text-2xl">Industries &amp; Locations</h1>
        <p className="mt-1 text-sm text-muted">
          Created automatically from the agency form or CSV import. Manage or clean up entries here.
        </p>
      </div>

      <section>
        <h2 className="font-display text-xl">Industries</h2>
        <form action={createIndustryAction} className="mt-4 flex gap-3">
          <input
            type="text"
            name="name"
            placeholder="New industry name"
            required
            className="flex-1 border border-border-strong bg-surface px-3.5 py-2 text-sm"
          />
          <Button type="submit" variant="secondary">Add</Button>
        </form>

        <div className="mt-6 divide-y divide-border border-y border-border">
          {industries.length === 0 && <p className="py-4 text-sm text-muted">No industries yet.</p>}
          {industries.map((industry) => {
            const boundDelete = deleteIndustryAction.bind(null, industry.id);
            return (
              <div key={industry.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium">{industry.name}</p>
                  <p className="text-xs text-muted">{industry.agencyCount} agencies</p>
                </div>
                <form action={boundDelete}>
                  <ConfirmSubmitButton
                    confirmMessage={`Delete industry "${industry.name}"? Agencies keep their other industries.`}
                    className="text-sm text-error underline underline-offset-4 hover:opacity-80"
                  >
                    Delete
                  </ConfirmSubmitButton>
                </form>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl">Locations</h2>
        <div className="mt-6 space-y-6">
          {locations.length === 0 && <p className="text-sm text-muted">No locations yet.</p>}
          {locations.map((country) => {
            const boundDeleteCountry = deleteCountryAction.bind(null, country.id);
            return (
              <div key={country.id} className="border border-border bg-surface p-5">
                <div className="flex items-center justify-between">
                  <p className="font-medium">
                    {country.name} <span className="text-xs text-muted">({country.agencyCount} agencies)</span>
                  </p>
                  <form action={boundDeleteCountry}>
                    <ConfirmSubmitButton
                      confirmMessage={`Delete ${country.name} and all its regions/cities? Agencies there will keep no location until edited.`}
                      className="text-sm text-error underline underline-offset-4 hover:opacity-80"
                    >
                      Delete
                    </ConfirmSubmitButton>
                  </form>
                </div>
                {country.regions.length > 0 && (
                  <div className="mt-3 space-y-2 border-t border-border pt-3">
                    {country.regions.map((region) => {
                      const boundDeleteRegion = deleteRegionAction.bind(null, region.id);
                      return (
                        <div key={region.id} className="pl-4">
                          <div className="flex items-center justify-between">
                            <p className="text-sm">
                              {region.name} <span className="text-xs text-muted">({region.agencyCount})</span>
                            </p>
                            <form action={boundDeleteRegion}>
                              <ConfirmSubmitButton
                                confirmMessage={`Delete ${region.name}?`}
                                className="text-xs text-error underline underline-offset-4 hover:opacity-80"
                              >
                                Delete
                              </ConfirmSubmitButton>
                            </form>
                          </div>
                          {region.cities.length > 0 && (
                            <ul className="mt-1 space-y-1 pl-4">
                              {region.cities.map((city) => {
                                const boundDeleteCity = deleteCityAction.bind(null, city.id);
                                return (
                                  <li key={city.id} className="flex items-center justify-between text-xs text-muted">
                                    <span>{city.name} ({city.agencyCount})</span>
                                    <form action={boundDeleteCity}>
                                      <ConfirmSubmitButton
                                        confirmMessage={`Delete ${city.name}?`}
                                        className="text-error underline underline-offset-4 hover:opacity-80"
                                      >
                                        Delete
                                      </ConfirmSubmitButton>
                                    </form>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
