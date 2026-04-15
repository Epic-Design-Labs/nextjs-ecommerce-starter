import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface AuthCardLayoutProps {
  title: string
  subtitle: string
  footerText: string
  footerLinkText: string
  footerLinkHref: string
  children: React.ReactNode
}

export function AuthCardLayout({
  title,
  subtitle,
  footerText,
  footerLinkText,
  footerLinkHref,
  children,
}: AuthCardLayoutProps) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md items-center px-4 py-16">
      <Card className="w-full">
        <CardHeader className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <Separator />
        <CardFooter className="justify-center pt-6">
          <p className="text-sm text-muted-foreground">
            {footerText}{" "}
            <Link
              href={footerLinkHref}
              className="font-medium text-foreground underline"
            >
              {footerLinkText}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
