'use client'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Textarea } from '../ui/textarea'
import { ContactFormSchema } from './schemas/contact-form.schema'

type WorkTypeOptionType = {
  value: string
  label: string
}

export const WORK_TYPE_OPTIONS: WorkTypeOptionType[] = [
  { value: 'appartment', label: 'Appartment' },
  { value: 'house', label: 'House' },
  { value: 'office', label: 'Office' },
  { value: 'residence', label: 'Residence' },
]

export default function ContactForm() {
  const form = useForm<z.infer<typeof ContactFormSchema>>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      fullname: "",
      phone: "",
      workType: "",
      comment: "",
    },
  })

  function onSubmit(data: z.infer<typeof ContactFormSchema>) {
    console.log(data)
  }

  return (
    <div className='max-w-[439px]'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem className='mb-6'>
                <FormLabel>Your name <span className='text-destructive'>*</span></FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your name"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className='mb-6'>
                <FormLabel>Phone <span className='text-destructive'>*</span></FormLabel>
                <FormControl>
                  <Input
                    placeholder="+(373) ___-___-___"
                    type="tel"
                    pattern="^\+?[0-9\s\-\(\)]{6,20}$"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="workType"
            render={({ field }) => (
              <FormItem className='mb-6'>
                <FormLabel>Type of work <span className='text-destructive'>*</span></FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {WORK_TYPE_OPTIONS.map((options) => (
                          <SelectItem key={options.value} value={options.value}>{options.label}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className='mb-6'>
                <FormLabel>Leave your comment</FormLabel>
                <FormControl>
                  <Textarea placeholder="Preferences, budget, etc..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant='white' type="submit" className='xl:max-w-full'>Send message</Button>
        </form>
      </Form>
    </div>
  )
}
