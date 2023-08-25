"use client";

import Link from "next/link"
import { useParams, usePathname } from "next/navigation";

//cn used for merging different classnames given by shadcn
import { cn } from "@/lib/utils"

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    // Get the current pathname and route parameters using next/navigation.
    const pathname = usePathname();
    const params = useParams();

    // Define an array of routes with href, label, and active properties.
    const routes = [
        {
            href: `/${params.storeId}/settings`,
            label: 'Settings',
            active: pathname === `/${params.storeId}/settings`,
        },

    ]
    // cn is used to merge multiple classes
    return (
        <nav
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
            {...props}
        >
            {/* Map through the routes and render navigation links. */}
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        'text-sm font-medium transition-colors hover:text-primary',
                        route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
                    )}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    )
}
