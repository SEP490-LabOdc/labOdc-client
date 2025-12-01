import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/talent/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/talent/"!</div>
}
