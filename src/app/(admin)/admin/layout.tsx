"use client"

import Link from "next/link"
import { LayoutDashboard, Package, Users } from "lucide-react"
import { useAuthGuard } from "@/hooks/use-auth-guard"

const adminNav = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Orders", href: "/admin/orders", icon: Package },
  { name: "Customers", href: "/admin/customers", icon: Users },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isReady } = useAuthGuard()

  if (!isReady) return null

  if (user?.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="mt-2 text-muted-foreground">
            You need admin privileges to access this page.
          </p>
          <Link href="/" className="mt-4 inline-block text-sm underline">
            Go Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden w-64 border-r bg-neutral-50 lg:block">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/admin" className="text-lg font-semibold">
            Admin
          </Link>
        </div>
        <nav className="space-y-1 p-4">
          {adminNav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white hover:text-foreground"
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="mt-auto border-t p-4">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            &larr; Back to Store
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 lg:p-8">{children}</main>
    </div>
  )
}
