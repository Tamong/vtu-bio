"use client";

import { useState } from "react";
import { type NextPage } from "next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "~/utils/api";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { Clipboard } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(100),
  url: z.string().url(),
});

const CreateForm = () => {
  const { toast } = useToast();
  const [slug, setSlug] = useState("");

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      url: "",
    },
  });

  const ctx = api.useContext();

  const { mutate } = api.create.createSimpleLink.useMutation({
    onSuccess: (data) => {
      setSlug(data.slug);
      void ctx.dashboard.getLinks.invalidate();
    },
    onError: () => {
      toast({
        title: "Error creating link",
        description: "Please try again in a few minutes.",
      });
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    mutate(values);
  }

  const copyToClipboard = async () => {
    const link = `https://vtu.bio/${slug}`;
    await navigator.clipboard.writeText(link);
    toast({
      title: "Link to your clipboard!",
      description: `${link}`,
    });
  };
  return (
    <div>
      {slug ? (
        <div className="flex flex-col items-center justify-center">
          <h1 className="pb-4 text-xl">Short Link Generated!</h1>
          <Button className=" text-lg" onClick={copyToClipboard}>
            <Clipboard />
            <span>{`https://vtu.bio/${slug}`}</span>
          </Button>
        </div>
      ) : (
        <div className="mt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://vtu.bio/" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" type="submit">
                Create Link
              </Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default CreateForm;
