export interface NavItem {
  name: string
  href: string
}

export interface NavSection {
  label: string
  items: NavItem[]
}

// Single source of truth for all navigation across desktop header,
// mobile menu, and anywhere else. Edit this one file to update all menus.

export const shopLinks: NavItem[] = [
  { name: "Electronics", href: "/electronics" },
  { name: "Clothing", href: "/clothing" },
  { name: "Home & Kitchen", href: "/home-kitchen" },
  { name: "Accessories", href: "/accessories" },
  { name: "Food & Drink", href: "/food-drink" },
]

export const accountLinks: NavItem[] = [
  { name: "My Account", href: "/account" },
  { name: "Wishlist", href: "/wishlist" },
  { name: "Orders", href: "/account/orders" },
]

export const infoLinks: NavItem[] = [
  { name: "All Brands", href: "/brands" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
]

export const mobileMenuSections: NavSection[] = [
  { label: "Shop", items: shopLinks },
  { label: "Account", items: accountLinks },
  { label: "Info", items: infoLinks },
]
