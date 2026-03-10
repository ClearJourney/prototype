import { redirect } from "next/navigation";

/**
 * Edit client profile: redirect to the manual form with pre-fill.
 * The manual form page handles ?edit=id by loading client data and showing the same form pre-filled.
 */
export default async function EditClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/dashboard/clients/new/manual?edit=${encodeURIComponent(id)}`);
}
