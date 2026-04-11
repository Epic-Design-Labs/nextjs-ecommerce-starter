import { Package } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { EmptyState } from "@/components/ui/empty-state"

export default function AdminOrdersPage() {
  return (
    <div>
      <PageHeader title="Orders" description="Manage and track customer orders." />
      <EmptyState
        icon={Package}
        title="No orders yet"
        description="Orders will appear here once customers start purchasing."
      />
    </div>
  )
}
