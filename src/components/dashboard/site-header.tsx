import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useLocation, Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

export function SiteHeader() {
  const { pathname } = useLocation()
  const title = (() => {
    if (pathname.startsWith(ROUTES.DASHBOARD_EXPENSES_NEW)) return 'Nouvelle dépense'
    if (pathname.startsWith(ROUTES.DASHBOARD_EXPENSES)) return 'Dépenses'
    if (pathname.startsWith(ROUTES.DASHBOARD_BUDGETS)) return 'Budgets'
    if (pathname.startsWith(ROUTES.DASHBOARD_CATEGORIES)) return 'Catégories'
    if (pathname.startsWith(ROUTES.DASHBOARD_REPORTS)) return 'Rapports'
    if (pathname.startsWith(ROUTES.DASHBOARD_SETTINGS)) return 'Paramètres'
    return 'Dashboard'
  })()

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
        {pathname.startsWith(ROUTES.DASHBOARD_EXPENSES) && (
          <div className="ml-auto">
            <Button size="sm" asChild>
              <Link to={ROUTES.DASHBOARD_EXPENSES_NEW}>Ajouter</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
