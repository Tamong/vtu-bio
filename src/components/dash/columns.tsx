"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { api } from "~/utils/api";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type userLink = {
  id: string;
  date: string;
  title: string;
  description: string | null;
  url: string;
  slug: string;
};

export const columns: ColumnDef<userLink>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    cell: ({ row }) => {
      const userLink = row.original;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="w- flex">
              <div className="truncate">{userLink.description}</div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{userLink.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "Redirect URL",
    cell: ({ row }) => {
      const userLink = row.original;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              className="flex w-48"
              onClick={async () => {
                await navigator.clipboard.writeText(
                  `https://vtu.bio/${userLink.slug}`
                );

                toast({
                  title: "Short Link copied!",
                  description: `https://vtu.bio/${userLink.slug}`,
                });
              }}
            >
              <div className="truncate">{userLink.url}</div>
            </TooltipTrigger>

            <TooltipContent>
              <p>{userLink.url}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const userLink = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={async () => {
                await navigator.clipboard.writeText(
                  `https://vtu.bio/${userLink.slug}`
                );

                toast({
                  title: "Link to your clipboard!",
                  description: `https://vtu.bio/${userLink.slug}`,
                });
              }}
            >
              Copy short link
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                const mutation = api.dashboard.deleteLink.useMutation();

                mutation.mutate(
                  { id: userLink.id },
                  {
                    onSuccess: (data) => {
                      toast({
                        title: "Deleted link",
                        description: "Yeah yeah yeah.",
                      });
                    },
                    onError: () => {
                      toast({
                        title: "Error deleting link",
                        description: "Please try again in a few minutes.",
                      });
                    },
                  }
                );
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
