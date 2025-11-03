import { index, layout, rootRoute, route, type VirtualRouteNode } from '@tanstack/virtual-file-routes';

const middleware = (fileName: string, virtualRoutes: VirtualRouteNode[]) =>
  layout(`middleware/${fileName}`, virtualRoutes);

const adminRoute = route("/admin", [
  layout("admin-layout", "admin/route.tsx", [
    index("admin/index.tsx"),
    route("/companies",[
      index("admin/companies/index.tsx"),
      route("/approve", "admin/companies/approve/index.tsx"),
      route("/create", "admin/companies/create/index.tsx"),
      route("/edit", "admin/companies/edit/index.tsx"),
    ]),
    route("/settings",[
        layout("admin/settings/route.tsx", [
          index("admin/settings/index.tsx"),
          route("/account", "admin/settings/account.tsx"),
          route("/appearance", "admin/settings/appearance.tsx"),
        ]),
    ]),
    route("/users", [
      index("admin/users/index.tsx"),
      route("/create", "admin/users/create/index.tsx"),
      route("/info", "admin/users/info/index.tsx"),
    ]),
  ]),
])

export const routes = rootRoute("root.tsx", [
  index("index.tsx"),
  route('/companies', '(public)/companies/index.tsx'),
  route('/companies/$companyId', '(public)/companies/$companyId.tsx'),
  //Error routes
  route('/401', '(errors)/401.tsx'),
  route('/403', '(errors)/403.tsx'),
  route('/404', '(errors)/404.tsx'),
  route('/500', '(errors)/500.tsx'),
  middleware("restrict-login-signup.tsx", [
    route("/sign-in", "sign-in/index.tsx"),
    route("/sign-up", "sign-up/index.tsx"),
    route("/forgot-password", "forgot-password/index.tsx"),
  ]),
  middleware("authenticate.tsx", [
    adminRoute,
  ]),

])