import NotFound from "@/app/not-found"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import Link from "next/link"

export default async function UsersPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if(!session) return <NotFound />

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Users</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          Users Details : {session?.user?.name} | {session?.user?.email}
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl">
              Users Details : {session?.user?.name} | {session?.user?.email}
            </div>
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
          <div className="overflow-x-auto">
            <div className="mb-2 w-full text-right">
              <Link
                href="/dashboard/users/create"
                className="bg-blue-600 text-white py-2 px-5 rounded-lg hover:bg-blue-500">
                Create
              </Link>
            </div>
            {/* <Search /> */}
            {/* <Suspense key={query} fallback={<Spinner />}>
              <TableData query={query}/>
            </Suspense> */}
            <table className="table table-zebra">
              <thead className="text-sm text-gray-700 uppercase bg-gray-50">
                  <tr>
                  <th className="py-3 px-6">#</th>
                  <th className="py-3 px-6">Name</th>
                  <th className="py-3 px-6">Email</th>
                  <th className="py-3 px-6">Phone Number</th>
                  <th className="py-3 px-6">Created At</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {/* {employees.map((rs, index) => ( */}
                  <tr className="bg-white border-b">
                      <td className="py-3 px-6">234</td>
                      <td className="py-3 px-6">fsdfgsd</td>
                      <td className="py-3 px-6">asdafsd@sdggdf.com</td>
                      <td className="py-3 px-6">34645756786</td>
                      <td className="py-3 px-6">
                      {/* {formatDate(rs.createdAt.toString())} */}
                      27/11/2025
                      </td>
                      <td className="flex justify-center gap-1 py-3">
                          {/* <Link
                              href={`/employee/edit/${rs.id}`} 
                              className="btn btn-info"
                              >
                              Edit
                          </Link>
                          <DeleteButton id={rs.id} /> */}
                      </td>
                  </tr>
                  {/* ))} */}
              </tbody>
            </table>
          </div>
          
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
