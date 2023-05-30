"use client";

import { useState } from "react";
import { type NextPage } from "next";
import { useForm } from "react-hook-form";
import Head from "next/head";
import Link from "next/link";
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

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(100),
  url: z.string().url(),
});

const Create: NextPage = () => {
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

  const { mutate, isLoading } = api.create.createSimpleLink.useMutation({
    onSuccess: (data) => {
      setSlug(data.slug);
    },
    onError: (error) => {
      alert("Error creating link: Try again.");
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
    alert(`Copied link to clipboard: ${link}`);
  };

  return (
    <>
      <Head>
        <title>Create - vtu.bio</title>
        <meta name="description" content="Link Collection for Vtubers!" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[hsl(200,100%,70%)] to-[#333333]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create Short Link
          </h1>
          <div>
            {slug ? (
              <div>
                <h1>
                  Short Link Generated!
                  <br /> https://vtu.bio/{slug}
                </h1>
                <Button onClick={copyToClipboard}>Copy to clipboard</Button>
              </div>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Title" {...field} />
                        </FormControl>
                        <FormDescription>This is your title.</FormDescription>
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
                        <FormDescription>
                          This is your description.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL</FormLabel>
                        <FormControl>
                          <Input placeholder="URL" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Create;
