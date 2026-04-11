"use client"

import Link from "next/link"
import { Search, ShoppingBag, User, Menu, Heart, LogOut, ChevronDown } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SearchModal } from "@/components/search/search-modal"
import { cn } from "@/lib/utils"
import { shopLinks, mobileMenuSections } from "@/lib/navigation"
import { siteConfig } from "@/lib/config"
import { useTranslations } from "next-intl"
import { useState, useEffect, useCallback } from "react"
import data from "@/data/products.json"
import type { Category } from "@/types"

const allCategories = data.categories as Category[]
import { useCartStore } from "@/store/cart"
import { useAuthStore } from "@/store/auth"
import { useRouter } from "next/navigation"

export function Header() {
  const t = useTranslations("nav")
  const tCommon = useTranslations("common")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const openCart = useCartStore((s) => s.openCart)
  const getItemCount = useCartStore((s) => s.getItemCount)
  const user = useAuthStore((s) => s.user)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const logout = useAuthStore((s) => s.logout)
  const router = useRouter()

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const itemCount = mounted ? getItemCount() : 0

  // Cmd+K / Ctrl+K to open search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <>
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Mobile menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground/60 hover:bg-accent hover:text-foreground lg:hidden"
            aria-label={t("openMenu")}
            aria-expanded={mobileMenuOpen}
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="left" className="!w-full !gap-0 sm:!w-80" showCloseButton={false}>
            <div className="shrink-0 px-6 pt-5 pb-2">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                &larr; {tCommon("close")}
              </button>
            </div>

            <nav className="flex flex-1 flex-col overflow-y-auto px-6 pb-8">
              {mobileMenuSections.map((section, sectionIdx) => (
                <div key={section.label}>
                  {sectionIdx > 0 && <div className="my-4 border-t" />}
                  <p className="mb-2 mt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {section.label}
                  </p>
                  <div className="ml-3">
                  {section.items.map((item) => {
                    const slug = item.href.replace("/", "")
                    const parentCat = allCategories.find((c) => c.slug === slug)
                    const subcats = parentCat
                      ? allCategories.filter((c) => c.parentId === parentCat.id)
                      : []
                    const hasSubcats = subcats.length > 0
                    const isExpanded = expandedCategory === item.name

                    return (
                      <div key={item.name}>
                        <div className="flex items-center">
                          <Link
                            href={item.href}
                            className="flex-1 py-2.5 text-sm font-medium text-foreground transition-colors hover:text-foreground/70"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                          {hasSubcats && (
                            <button
                              onClick={() => setExpandedCategory(isExpanded ? null : item.name)}
                              className="p-2 text-muted-foreground hover:text-foreground"
                              aria-label={`${isExpanded ? "Collapse" : "Expand"} ${item.name}`}
                              aria-expanded={isExpanded}
                            >
                              <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")} />
                            </button>
                          )}
                        </div>
                        {hasSubcats && isExpanded && (
                          <div className="mb-2 ml-4 flex flex-col border-l pl-4">
                            {subcats.map((sub) => (
                              <Link
                                key={sub.id}
                                href={`/${sub.slug}`}
                                className="py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                  </div>
                </div>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="text-xl font-semibold tracking-tight">
          {siteConfig.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex lg:gap-6">
          {shopLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-foreground transition-colors hover:text-foreground/70"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center">
          <button
            onClick={() => setSearchOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent"
            aria-label={t("searchProducts")}
          >
            <Search className="h-5 w-5" />
          </button>

          <Link
            href="/wishlist"
            className="hidden h-10 w-10 items-center justify-center rounded-md hover:bg-accent lg:inline-flex"
            aria-label={t("wishlist")}
          >
            <Heart className="h-5 w-5" />
          </Link>

          {/* User menu — desktop only */}
          {mounted && isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                className="hidden h-10 w-10 items-center justify-center rounded-md hover:bg-accent lg:inline-flex"
                aria-label={t("accountMenu")}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-xs font-medium text-background">
                  {user?.firstName?.[0] ?? "U"}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/account")}>
                  {tCommon("signIn")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/account/orders")}>
                  {tCommon("orders")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/account/settings")}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => { logout(); router.push("/") }}>
                  <LogOut className="mr-2 h-4 w-4" />
                  {tCommon("signOut")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/auth/login"
              className="hidden h-10 w-10 items-center justify-center rounded-md hover:bg-accent lg:inline-flex"
              aria-label={tCommon("signIn")}
            >
              <User className="h-5 w-5" />
            </Link>
          )}

          {/* Cart */}
          <button
            onClick={openCart}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent"
            aria-label={t("openCart")}
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[10px] font-medium text-background"
                aria-live="polite"
                aria-atomic="true"
                aria-label={`${itemCount} ${itemCount === 1 ? "item" : "items"} in cart`}
              >
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
