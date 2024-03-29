"use client";

import { Icons } from "@/components/icons";

import { Drawer } from "vaul";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";

const formSchema = z.object({
  filter: z.string(),
});

type Props = {
  setFilter: (filter: string) => void;
};

const FilterBy: React.FC<Props> = ({ setFilter }) => {
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
      <Drawer.Root>
        <Drawer.Trigger asChild>
          <div className="hover:font-current hover:font-current mx-auto flex w-44 items-center justify-between rounded-md border bg-light p-1 text-sm font-medium ring-offset-light transition-colors hover:bg-foreground/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            <span className=" flex items-center">
              <Icons.filter className="h-8 w-8 p-2" />
              Filter By
            </span>
            <span>
              <Icons.down className="h-8 w-8 p-2" />
            </span>
          </div>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-light/40" />
          <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex min-h-[60dvh] flex-col rounded-t-[10px] border bg-light px-2">
            <div className="mx-auto mt-4 h-1.5 w-20 flex-shrink-0 rounded-full bg-zinc-300" />
            <div className="pb-16 pt-4">
              <h1 className="pb-2.5 font-medium">Filter</h1>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="filter"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div
                            className="flex h-10 items-center  rounded-md 
                    border border-input bg-light px-3 py-2 
                    text-sm ring-offset-light file:border-0
                    file:bg-transparent file:text-sm file:font-medium 
                    placeholder:text-muted-foreground focus-visible:outline-none 
                    focus-visible:ring-2 focus-visible:ring-ring 
                    focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <Icons.search className="h-4 w-4" />
                            <input
                              className="ml-2 max-w-2xl border-none bg-light outline-none"
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
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
};

export default FilterBy;
