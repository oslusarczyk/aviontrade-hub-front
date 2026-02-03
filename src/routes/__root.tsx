import { ClerkProvider } from '@clerk/tanstack-react-start'
import { QueryClient } from "@tanstack/react-query";
import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'


import appCss from '../styles.css?url'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient,
}>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'AvionTrade Hub',
      },

    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
    ],
  }),
  component: RootComponent,
})


function RootComponent() {
  return (
    <RootDocument>
      <div className="bg-neutral-900 text-white ">
        <div className="fixed inset-0 
        bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] 
        bg-size-[24px_24px] pointer-events-none opacity-15" />
        <Outlet />
      </div>
    </RootDocument>
  );
}


function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <HeadContent />
        </head>
        <body className="bg-neutral-900 text-white min-h-screen">
          {children}
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
          <Scripts />
        </body>
      </html>
    </ClerkProvider>
  )
}