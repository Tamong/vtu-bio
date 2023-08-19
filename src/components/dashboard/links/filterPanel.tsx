"use client";

import { Icons } from "@/components/icons";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import React from "react";

const formSchema = z.object({
  filter: z.string(),
});

type Props = {
  setFilter: (filter: string) => void;
};

const FilterPanel: React.FC<Props> = ({ setFilter }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      filter: "",
    },
  });

  const ctx = api.useContext();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setFilter(values.filter);
    void ctx.dashboard.getLinks.invalidate();
  }

  return (
    <>
      <div className="h-80 rounded-lg border bg-background p-4">
        <h1 className="pb-2.5 font-medium">Filter</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="filter"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div
                      className="flex h-10 items-center  rounded-md 
                    border border-input bg-background px-3 py-2 
                    text-sm ring-offset-background file:border-0
                    file:bg-transparent file:text-sm file:font-medium 
                    placeholder:text-muted-foreground focus-visible:outline-none 
                    focus-visible:ring-2 focus-visible:ring-ring 
                    focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Icons.search className="h-4 w-4" />
                      <input
                        className="ml-2 max-w-2xl border-none bg-background outline-none"
                        placeholder="Search..."
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </>
  );
};

export default FilterPanel;
