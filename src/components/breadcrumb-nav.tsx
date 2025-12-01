import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';
import { isMatch, Link, useLocation, useMatches } from '@tanstack/react-router';
import { Fragment } from 'react';

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
      {items.length > 1 ? (
        <Breadcrumb className='mx-auto max-w-7xl p-4'>
          <BreadcrumbList>
            {items.map((item, index) => (
              <Fragment key={index}>
                <BreadcrumbItem>
                  {item.href !== pathname ? (
                    <Link to={item.href} className='breadcrumb-link'>
                      {item.label}
                    </Link>
                  ) : (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {index < items.length - 1 && <BreadcrumbSeparator />}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      ) : null}
    </>
  )
}
