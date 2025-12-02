'use client'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { RequestCallFormSchema } from './schemas/request-call.schema'

export default function RequestCall() {
  const form = useForm<z.infer<typeof RequestCallFormSchema>>({
    resolver: zodResolver(RequestCallFormSchema),
    defaultValues: {
      phone: "",
    },
  })

  function onSubmit(data: z.infer<typeof RequestCallFormSchema>) {
    console.log(data)
  }

  return (
    <div className='max-w-[612px]'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="+(373) ___-___-___"
                    type="tel"
                    pattern="^\+?[0-9\s\-\(\)]{6,20}$"
                    className='max-w-[300px] w-full px-16 bg-transparent border hover:bg-transparent placeholder:text-gray-500 hover:placeholder:text-gray-500 text-foreground font-semibold focus-visible:border-ring focus-visible:ring-background'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>

  )
}
