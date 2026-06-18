import { redirect } from "next/navigation";

// Catch-all for routes that don't match the [locale] segment — redirect to default locale
export default function RootNotFound() {
  redirect("/en");
}
