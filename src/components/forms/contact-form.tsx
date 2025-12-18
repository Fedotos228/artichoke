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
import { IDictionary, WorkTypeOptionType } from '@/lib/utils/get-dictionary'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Textarea } from '../ui/textarea'
import { ContactFormSchema } from './schemas/contact-form.schema'

export default function ContactForm({ dictionary }: { dictionary: IDictionary['contactForm'] }) {
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
    <div className='max-w-full md:max-w-[439px] w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem className='mb-6'>
                <FormLabel>{dictionary.name} <span className='text-destructive'>*</span></FormLabel>
                <FormControl>
                  <Input
                    placeholder={dictionary.name}
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
                <FormLabel>{dictionary.phone} <span className='text-destructive'>*</span></FormLabel>
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
                <FormLabel>{dictionary.type} <span className='text-destructive'>*</span></FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {/* @ts-ignore */}
                        {dictionary.workType.map((options: WorkTypeOptionType) => (
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
                <FormLabel>{dictionary.message}</FormLabel>
                <FormControl>
                  <Textarea placeholder="Preferences, budget, etc..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant='white' type="submit" className='mx-auto md:max-w-full'>{dictionary.submit}</Button>
        </form>
      </Form>
    </div>
  )
}
