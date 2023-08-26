"use client";

type Props = {
  title: string;
  description: string;
  url: string;
  image: string;
};

const Twitter: React.FC<Props> = ({ title, description, url, image }) => {
  return (
    <div className="overflow-hidden rounded-md border border-gray-300">
      <img
        src={image}
        alt="Preview"
        className="h-[250px] w-full border-b border-gray-300 object-cover"
      />
      <div className="grid gap-1 p-3">
        <p className="text-sm text-muted-foreground">
          {(url.split("//")[1] || "").split("/")[0] || ""}
        </p>
        <h3 className="truncate text-sm text-foreground">{title}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Twitter;

/*
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
        */
