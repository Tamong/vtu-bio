"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import { api } from "~/utils/api";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { nanoid } from "@/lib/utils";
import Twitter from "./previews/twitter";

const formSchema = z.object({
  title: z.string().max(512),
  description: z.string().max(512),
  url: z.string().url().max(512),
  image: z.string().url().max(512),
  slug: z.string().min(7).max(7),
});

type Props = {
  formTitle: string;
};

const LinkForm: React.FC<Props> = ({ formTitle }) => {
  const { toast } = useToast();
  const [slug, setSlug] = useState("");
  const debounced = useDebouncedCallback(
    // function
    (url) => {
      try {
        z.string(url).url().max(512).parse(url);
        form.setValue("url", url);
        getMetatags({ url: url });
      } catch {
        return;
      }
    },
    // delay in ms
    1000
  );

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      url: "",
      image: "",
      slug: "0000000",
    },
  });

  const ctx = api.useContext();

  const { mutate } = api.create.createSimpleLink.useMutation({
    onSuccess: (data) => {
      void ctx.dashboard.getLinks.invalidate();
      copyToClipboard();
      toast({
        title: "Copied shortlink to clipboard!",
      });
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

  const { mutate: getMetatags } = api.tags.getMetatags.useMutation({
    onSuccess: (data) => {
      form.setValue("title", data.title);
      form.setValue("description", data.description);
      form.setValue("image", data.image || "");

      if (slug === "") {
        const _slug = nanoid();
        form.setValue("slug", _slug);
        setSlug(_slug);
      }
    },
    onError: () => {
      form.setValue("title", "");
      form.setValue("description", "");
      form.setValue("image", "");
    },
  });

  const copyToClipboard = async () => {
    const link = `https://vtu.bio/${slug}`;
    await navigator.clipboard.writeText(link);
    toast({
      title: "Link to your clipboard!",
      description: link,
    });
  };
  return (
    <div className="scrollbar-hide relative grid gap-5 overflow-auto p-2  md:grid-cols-2 md:overflow-hidden">
      <div>
        <div className="flex justify-center text-xl font-medium">
          {formTitle}
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination URL</FormLabel>
                    <FormControl>
                      <Input
                        autoFocus={false}
                        onChange={(e) => debounced(e.target.value)}
                      />
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
      </div>
      <div className="flex w-full flex-col gap-2">
        <div className="flex justify-center text-xl font-medium">Preview</div>
        <Twitter
          title={form.getValues("title")}
          description={form.getValues("description")}
          url={form.getValues("url")}
          image={form.getValues("image")}
        />
      </div>
    </div>
  );
};

export default LinkForm;
