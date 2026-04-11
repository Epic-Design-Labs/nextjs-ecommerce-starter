"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/page-header"
import { Package, MapPin, Settings, Heart, LogOut } from "lucide-react"
import { useAuthGuard } from "@/hooks/use-auth-guard"
import { useAuthStore } from "@/store/auth"

const accountLinks = [
  { name: "Orders", description: "View your order history and track shipments", href: "/account/orders", icon: Package },
  { name: "Addresses", description: "Manage your shipping and billing addresses", href: "/account/addresses", icon: MapPin },
  { name: "Wishlist", description: "Products you've saved for later", href: "/wishlist", icon: Heart },
  { name: "Settings", description: "Update your profile and preferences", href: "/account/settings", icon: Settings },
]

export default function AccountPage() {
  const { user, isReady } = useAuthGuard()
  const logout = useAuthStore((s) => s.logout)
  const router = useRouter()

  if (!isReady) return null

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <PageHeader title="My Account" description={`Welcome back, ${user?.firstName}!`}>
        <Button variant="outline" onClick={() => { logout(); router.push("/") }}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </PageHeader>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {accountLinks.map((item) => (
          <Link key={item.name} href={item.href}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                  {item.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
