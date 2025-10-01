import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';
import { isMatch, Link, useLocation, useMatches } from '@tanstack/react-router';

export function BreadcrumbNav() {
    const matches = useMatches();
    const pathname = useLocation({
        select: (location) => location.pathname
    });
    const matchesWithCrumbs = matches.filter((match) => isMatch(match, 'loaderData.crumb'))
    const items = matchesWithCrumbs.map(({ pathname, loaderData }) => {
        return {
            href: pathname,
            label: loaderData?.crumb,
        }
    })
    return (
        <>
            {items.length > 1 ? <Breadcrumb>
                <BreadcrumbList>
                    {items.map((item, index) => {
                        return (
                            <BreadcrumbItem key={index}>
                                {item.href !== pathname ?
                                    <Link to={item.href} className='breadcrumb-link'>
                                        {item.label}
                                    </Link>
                                    :
                                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                }
                                {index < items.length - 1 && <BreadcrumbSeparator />}
                            </BreadcrumbItem>
                        )
                    }
                    )}
                </BreadcrumbList>
            </Breadcrumb> : null}
        </>
    )
}
