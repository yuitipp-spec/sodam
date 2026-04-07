import { residentialProjects } from "@/lib/portfolio-data"

export async function generateStaticParams() {
  return residentialProjects.map((p) => ({ id: p.id }))
}