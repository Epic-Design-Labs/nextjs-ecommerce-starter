import { chromium } from "playwright"

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3100"

// Pages to test, grouped by recent changes
const PAGES = [
  { name: "home", path: "/" },
  { name: "shop", path: "/shop" },
  { name: "shop-page-2", path: "/shop?page=2" },
  { name: "category-electronics", path: "/electronics" },
  { name: "subcategory-headphones", path: "/headphones" },
  { name: "subcategory-speakers", path: "/speakers" },
  { name: "category-clothing", path: "/clothing" },
  { name: "category-home-kitchen", path: "/home-kitchen" },
  { name: "category-accessories", path: "/accessories" },
  { name: "category-food-drink", path: "/food-drink" },
  { name: "product-with-body", path: "/wireless-over-ear-headphones" },
  { name: "product-with-body-2", path: "/minimalist-desk-lamp" },
  { name: "product-with-body-3", path: "/organic-cotton-tshirt" },
  { name: "product-no-body", path: "/single-origin-coffee-beans" },
  { name: "brands-index", path: "/brands" },
  { name: "brand-detail", path: "/volt-audio" },
  { name: "blog-index", path: "/blog" },
  { name: "blog-post-1", path: "/blog/choose-right-headphones" },
  { name: "blog-post-2", path: "/blog/why-organic-cotton" },
  { name: "pages-index", path: "/pages" },
  { name: "page-our-story", path: "/pages/our-story" },
  { name: "page-sustainability", path: "/pages/sustainability" },
  { name: "cart", path: "/cart" },
  { name: "wishlist", path: "/wishlist" },
  { name: "search", path: "/search" },
  { name: "search-with-query", path: "/search?q=coffee" },
  { name: "about", path: "/about" },
  { name: "contact", path: "/contact" },
  { name: "faq", path: "/faq" },
  { name: "login", path: "/auth/login" },
  { name: "register", path: "/auth/register" },
  { name: "checkout", path: "/checkout" },
  { name: "404", path: "/this-page-does-not-exist" },
  { name: "sitemap", path: "/sitemap.xml" },
  { name: "robots", path: "/robots.txt" },
]

const VIEWPORTS = [
  { name: "desktop", width: 1280, height: 900 },
  { name: "mobile", width: 375, height: 812 },
]

const results = {
  passed: [],
  warnings: [],
  errors: [],
}

async function main() {
  const browser = await chromium.launch()

  for (const viewport of VIEWPORTS) {
    console.log(`\n🖥  Testing ${viewport.name} (${viewport.width}x${viewport.height})`)
    console.log("─".repeat(60))

    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
    })

    for (const page of PAGES) {
      const pageObj = await context.newPage()
      const consoleErrors = []
      const pageErrors = []
      const failedRequests = []

      pageObj.on("console", (msg) => {
        if (msg.type() === "error") {
          const text = msg.text()
          // Ignore known Next.js dev noise
          if (
            text.includes("Download the React DevTools") ||
            text.includes("Fast Refresh") ||
            text.includes("Next.js") && text.includes("dev tools")
          ) return
          consoleErrors.push(text)
        }
      })

      pageObj.on("pageerror", (err) => {
        pageErrors.push(err.message)
      })

      pageObj.on("requestfailed", (req) => {
        const url = req.url()
        const errText = req.failure()?.errorText ?? ""
        // Ignore hot-reload websocket failures
        if (url.includes("_next/webpack-hmr") || url.includes("__nextjs")) return
        // Ignore aborted prefetches — Next.js prefetches links that the test
        // moves away from before they finish
        if (errText === "net::ERR_ABORTED") return
        if (url.includes("_rsc=")) return
        failedRequests.push(`${req.method()} ${url}: ${errText}`)
      })

      const url = `${BASE_URL}${page.path}`
      const label = `${viewport.name} · ${page.name}`

      try {
        const response = await pageObj.goto(url, {
          waitUntil: "domcontentloaded",
          timeout: 15000,
        })
        await pageObj.waitForLoadState("networkidle", { timeout: 5000 }).catch(() => {})

        const status = response?.status() ?? 0
        const title = await pageObj.title().catch(() => "")

        // Check horizontal scroll (indicator of overflow)
        const hasHScroll = await pageObj.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
        }).catch(() => false)

        // Check for H1
        const h1Count = await pageObj.locator("h1").count().catch(() => 0)

        // Check main landmark
        const hasMain = await pageObj.locator("main, [role='main']").count().catch(() => 0)

        // Status code check — 404 page is expected to return 404
        const expected404 = page.name === "404"
        const statusOk = expected404 ? status === 404 : status < 400

        const issues = []
        if (!statusOk) issues.push(`HTTP ${status}`)
        if (consoleErrors.length > 0) issues.push(`${consoleErrors.length} console errors`)
        if (pageErrors.length > 0) issues.push(`${pageErrors.length} runtime errors`)
        if (failedRequests.length > 0) issues.push(`${failedRequests.length} failed requests`)
        if (hasHScroll && !page.path.endsWith(".xml") && !page.path.endsWith(".txt")) {
          issues.push("horizontal scroll")
        }
        // XML/txt pages won't have H1 or main — skip those checks
        const isHtmlPage = !page.path.endsWith(".xml") && !page.path.endsWith(".txt")
        if (isHtmlPage && h1Count === 0) issues.push("no H1")
        if (isHtmlPage && h1Count > 1) issues.push(`${h1Count} H1s`)
        if (isHtmlPage && hasMain === 0) issues.push("no <main>")

        if (issues.length === 0) {
          console.log(`  ✓ ${label}`)
          results.passed.push({ label, status, title })
        } else {
          const hasHardError =
            !statusOk || pageErrors.length > 0 || failedRequests.length > 0
          const record = {
            label,
            path: page.path,
            status,
            issues,
            consoleErrors,
            pageErrors,
            failedRequests,
            hasHScroll,
            h1Count,
          }
          if (hasHardError) {
            console.log(`  ✗ ${label} — ${issues.join(", ")}`)
            results.errors.push(record)
          } else {
            console.log(`  ⚠ ${label} — ${issues.join(", ")}`)
            results.warnings.push(record)
          }
        }
      } catch (err) {
        console.log(`  ✗ ${label} — ${err.message}`)
        results.errors.push({
          label,
          path: page.path,
          issues: [`navigation failed: ${err.message}`],
        })
      }

      await pageObj.close()
    }

    await context.close()
  }

  await browser.close()

  // Summary
  console.log("\n" + "═".repeat(60))
  console.log(`SUMMARY`)
  console.log("═".repeat(60))
  console.log(`✓ Passed:   ${results.passed.length}`)
  console.log(`⚠ Warnings: ${results.warnings.length}`)
  console.log(`✗ Errors:   ${results.errors.length}`)

  if (results.errors.length > 0) {
    console.log("\n✗ ERRORS:")
    for (const r of results.errors) {
      console.log(`\n  ${r.label}  [${r.path}]`)
      for (const issue of r.issues) console.log(`    • ${issue}`)
      if (r.consoleErrors?.length) {
        console.log(`    Console:`)
        r.consoleErrors.slice(0, 3).forEach((e) => console.log(`      ${e}`))
      }
      if (r.pageErrors?.length) {
        console.log(`    Runtime:`)
        r.pageErrors.slice(0, 3).forEach((e) => console.log(`      ${e}`))
      }
      if (r.failedRequests?.length) {
        console.log(`    Failed requests:`)
        r.failedRequests.slice(0, 3).forEach((e) => console.log(`      ${e}`))
      }
    }
  }

  if (results.warnings.length > 0) {
    console.log("\n⚠ WARNINGS:")
    for (const r of results.warnings) {
      console.log(`  ${r.label}  [${r.path}] — ${r.issues.join(", ")}`)
    }
  }

  process.exit(results.errors.length > 0 ? 1 : 0)
}

main().catch((err) => {
  console.error("Test run failed:", err)
  process.exit(1)
})
