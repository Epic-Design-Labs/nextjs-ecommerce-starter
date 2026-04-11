import { Users } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { EmptyState } from "@/components/ui/empty-state"

export default function AdminCustomersPage() {
  return (
    <div>
      <PageHeader title="Customers" description="View and manage your customer base." />
      <EmptyState
        icon={Users}
        title="No customers yet"
        description="Customer data will populate as users create accounts."
      />
    </div>
  )
}
