"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/ui/page-header"
import { EmptyState } from "@/components/ui/empty-state"
import { MapPin, Plus, Trash2 } from "lucide-react"
import { useAuthGuard } from "@/hooks/use-auth-guard"
import { useAuthStore } from "@/store/auth"
import { toast } from "sonner"

export default function AddressesPage() {
  const { user, isReady } = useAuthGuard()
  const addAddress = useAuthStore((s) => s.addAddress)
  const removeAddress = useAuthStore((s) => s.removeAddress)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    firstName: "", lastName: "", line1: "", line2: "",
    city: "", state: "", postalCode: "", country: "US",
  })

  if (!isReady) return null

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    addAddress({
      type: "shipping",
      firstName: form.firstName,
      lastName: form.lastName,
      line1: form.line1,
      line2: form.line2 || undefined,
      city: form.city,
      state: form.state,
      postalCode: form.postalCode,
      country: form.country,
      isDefault: (user?.addresses.length ?? 0) === 0,
    })
    toast.success("Address added")
    setShowForm(false)
    setForm({ firstName: "", lastName: "", line1: "", line2: "", city: "", state: "", postalCode: "", country: "US" })
  }

  const addresses = user?.addresses ?? []

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <PageHeader title="Addresses">
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Address
        </Button>
      </PageHeader>

      {showForm && (
        <Card className="mt-6">
          <CardContent className="pt-6">
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First name</Label>
                  <Input name="firstName" value={form.firstName} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label>Last name</Label>
                  <Input name="lastName" value={form.lastName} onChange={handleChange} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input name="line1" value={form.line1} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label>Apt, suite (optional)</Label>
                <Input name="line2" value={form.line2} onChange={handleChange} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2"><Label>City</Label><Input name="city" value={form.city} onChange={handleChange} required /></div>
                <div className="space-y-2"><Label>State</Label><Input name="state" value={form.state} onChange={handleChange} required /></div>
                <div className="space-y-2"><Label>ZIP</Label><Input name="postalCode" value={form.postalCode} onChange={handleChange} required /></div>
              </div>
              <div className="flex gap-2">
                <Button type="submit">Save Address</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {addresses.length === 0 && !showForm && (
        <EmptyState
          icon={MapPin}
          title="No saved addresses"
          description="Add an address to speed up checkout."
        />
      )}

      {addresses.length > 0 && (
        <div className="mt-8 space-y-4">
          {addresses.map((addr) => (
            <Card key={addr.id}>
              <CardContent className="flex items-start justify-between pt-6">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{addr.firstName} {addr.lastName}</p>
                    {addr.isDefault && <Badge variant="secondary" className="text-xs">Default</Badge>}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}<br />
                    {addr.city}, {addr.state} {addr.postalCode}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => { removeAddress(addr.id); toast("Address removed") }}
                  aria-label="Remove address"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
