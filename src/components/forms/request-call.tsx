'use client'

import { sendCallRequest } from '@/app/actions/request-call'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { z } from "zod"
import { RequestCallFormSchema } from './schemas/request-call.schema'

const ExtendedSchema = RequestCallFormSchema.extend({
  phone: z.string().refine(isValidPhoneNumber, { message: "Număr de telefon invalid" }),
})

export default function RequestCall({
  submit,
  reqCall
}: {
  submit: string
  reqCall: string
}) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof ExtendedSchema>>({
    resolver: zodResolver(ExtendedSchema),
    defaultValues: {
      phone: "",
    },
  })

  async function onSubmit(data: z.infer<typeof ExtendedSchema>) {
    setIsLoading(true)

    try {
      const result = await sendCallRequest(data.phone)

      if (result.success) {
        alert('Cerere trimisă cu succes!')
        form.reset()
      } else {
        alert('Eroare: ' + result.error)
      }

    } catch (error) {
      console.error(error)
      alert('A apărut o eroare neașteptată.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='max-w-[612px]'>
      {/* Stilurile pentru PhoneInput rămân la fel */}
      <style jsx global>{`
        .PhoneInput { display: flex; align-items: center; }
        .PhoneInputInput { flex: 1; min-width: 0; background-color: transparent; border: none; outline: none; color: inherit; font-weight: 600; }
        .PhoneInputInput::placeholder { color: #6b7280; }
      `}</style>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                    <PhoneInput
                      placeholder={reqCall}
                      value={field.value}
                      onChange={field.onChange}
                      international
                      withCountryCallingCode
                      className='h-10 w-full'
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Se trimite..." : submit}
          </Button>
        </form>
      </Form>
    </div>
  )
}