import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClearForm } from "@/components/clear-form"
//import { Cli } from "@/components/cli"
import { CodeBlock } from "@/components/code-block"
import { EditFormField } from "@/components/edit-form-field"
import { FormEditor } from "@/components/form-editor"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"
import { SidebarLeft } from "@/components/sidebar-left"

export default function Home() {
  const formData = {
    name: "Form Example",
    version: "1.0",
    fields: [
      { label: "First Name", type: "text", value: "" },
      { label: "Last Name", type: "text", value: "" },
      { label: "Email", type: "email", value: "" },
    ]
  }

  // Function to generate HTML code for form
  const generateCode = (data: typeof formData) => {
    return ` 
      <form>
        ${data.fields.map((field) => `
          <div>
            <label for="${field.label}">${field.label}</label>
            <input type="${field.type}" id="${field.label}" name="${field.label}" />
          </div>
        `).join('')}
      </form>
    `;
  }

  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset className="overflow-x-hidden px-4">
        <Tabs defaultValue="preview" className="flex-1">
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 rounded-md border shadow-sm">
            <div className="flex items-center gap-1.5 border-b p-4">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
              <ClearForm />
            </div>
            <TabsList className="relative w-full justify-start rounded-none border-b bg-transparent p-1">
              <TabsTrigger
                value="preview"
                className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Preview
              </TabsTrigger>
              
              <TabsTrigger
                value="code"
                className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Code
              </TabsTrigger>

              
            </TabsList>
            <TabsContent value="preview">
              <FormEditor formData={formData} />
            </TabsContent>
            <TabsContent value="code">
              <CodeBlock code={generateCode(formData)} />
            </TabsContent>

            {/* JSON Content */}
            <TabsContent value="json">
              <div className="p-4">
                <pre className="bg-gray-900 text-white p-4 rounded-md">
                  {/* Showing the fields array as JSON */}
                  {JSON.stringify(formData.fields, null, 2)}  
                </pre>
              </div>
            </TabsContent>
          </div>
        </Tabs>
        <EditFormField />
      </SidebarInset>
    </SidebarProvider>
  )
}
