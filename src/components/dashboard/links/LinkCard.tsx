import { Card, CardContent, CardDescription } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";

import { api } from "@/utils/api";

import Link from "next/link";

type link = {
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string | null;
  image: string;
  url: string;
  slug: string;
  id: string;
  userId: string | null;
  vtuberId: string | null;
};

type Props = {
  data: link;
};

const LinkCard: React.FC<Props> = ({ data }) => {
  // Move the hook call inside the component
  const mutation = api.dashboard.deleteLink.useMutation();

  const ctx = api.useContext();

  const onSubmitDelete = async (id: string) => {
    mutation.mutate(
      { id: id },
      {
        onSuccess: () => {
          toast({
            title: "Deleted link",
            description: "Link successfully deleted.",
          });
          void ctx.dashboard.getLinks.invalidate();
        },
        onError: () => {
          toast({
            title: "Error deleting link",
            description: "Please try again in a few minutes.",
          });
        },
      }
    );
  };

  return (
    <>
      <Card className="h-[4.5rem] w-full border-none bg-background drop-shadow-lg">
        <CardContent>
          <div className="mx-auto flex items-center justify-between">
            <div>
              <div className="flex w-52 flex-row items-center justify-between gap-2">
                <Link
                  target="_blank"
                  key={data.id}
                  href={`https://vtu.bio/${data.slug}`}
                >{`https://vtu.bio/${data.slug}`}</Link>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={async () => {
                    await navigator.clipboard.writeText(
                      `https://vtu.bio/${data.slug}`
                    );

                    toast({
                      title: "Link to your clipboard!",
                      description: `https://vtu.bio/${data.slug}`,
                    });
                  }}
                >
                  <Icons.clipboard className="h-4 w-4" />
                </Button>
              </div>
              <div className="">
                <div className="flex flex-row items-center ">
                  <CardDescription>
                    {data.createdAt.toLocaleDateString()}
                  </CardDescription>
                  <CardDescription>
                    <Icons.dot className="h-4 w-4" />
                  </CardDescription>
                  <CardDescription className="w-48 truncate sm:w-64">
                    {data.url}
                  </CardDescription>
                </div>
              </div>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <Icons.more className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={async () => {
                      await navigator.clipboard.writeText(
                        `https://vtu.bio/${data.slug}`
                      );

                      toast({
                        title: "Link to your clipboard!",
                        description: `https://vtu.bio/${data.slug}`,
                      });
                    }}
                  >
                    Copy link
                  </DropdownMenuItem>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem
                    className="focus:bg-destructive focus:text-destructive-foreground"
                    onClick={async () => {
                      onSubmitDelete(data.id);
                    }}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default LinkCard;
