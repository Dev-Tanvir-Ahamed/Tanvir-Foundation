import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronUp,
  Download,
  Eye,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type Donation = {
  id: string;
  donor: {
    name: string;
    email: string;
    image: string;
  };
  amount: string;
  status: "completed" | "processing" | "failed";
  campaign: string;
  date: string;
};

const donations: Donation[] = [
  {
    id: "DON-1234",
    donor: {
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      image: "/placeholder.svg?height=32&width=32",
    },
    amount: "$100.00",
    status: "completed",
    campaign: "Clean Water Initiative",
    date: "Apr 23, 2023",
  },
  {
    id: "DON-2345",
    donor: {
      name: "Jackson Lee",
      email: "jackson.lee@email.com",
      image: "/placeholder.svg?height=32&width=32",
    },
    amount: "$250.00",
    status: "completed",
    campaign: "Education for All",
    date: "Apr 22, 2023",
  },
  {
    id: "DON-3456",
    donor: {
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      image: "/placeholder.svg?height=32&width=32",
    },
    amount: "$50.00",
    status: "processing",
    campaign: "Clean Water Initiative",
    date: "Apr 21, 2023",
  },
  {
    id: "DON-4567",
    donor: {
      name: "William Kim",
      email: "william.kim@email.com",
      image: "/placeholder.svg?height=32&width=32",
    },
    amount: "$75.00",
    status: "completed",
    campaign: "Hunger Relief",
    date: "Apr 20, 2023",
  },
  {
    id: "DON-5678",
    donor: {
      name: "Sofia Davis",
      email: "sofia.davis@email.com",
      image: "/placeholder.svg?height=32&width=32",
    },
    amount: "$500.00",
    status: "completed",
    campaign: "Medical Aid",
    date: "Apr 19, 2023",
  },
  {
    id: "DON-6789",
    donor: {
      name: "Ethan Johnson",
      email: "ethan.johnson@email.com",
      image: "/placeholder.svg?height=32&width=32",
    },
    amount: "$150.00",
    status: "failed",
    campaign: "Education for All",
    date: "Apr 18, 2023",
  },
  {
    id: "DON-7890",
    donor: {
      name: "Ava Williams",
      email: "ava.williams@email.com",
      image: "/placeholder.svg?height=32&width=32",
    },
    amount: "$200.00",
    status: "completed",
    campaign: "Hunger Relief",
    date: "Apr 17, 2023",
  },
  {
    id: "DON-8901",
    donor: {
      name: "Noah Brown",
      email: "noah.brown@email.com",
      image: "/placeholder.svg?height=32&width=32",
    },
    amount: "$125.00",
    status: "completed",
    campaign: "Medical Aid",
    date: "Apr 16, 2023",
  },
];

export function DonationsTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const columns: ColumnDef<Donation>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "donor",
      header: "Donor",
      cell: ({ row }) => {
        const donor = row.getValue("donor") as Donation["donor"];
        return (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={donor.image} alt={donor.name} />
              <AvatarFallback>{donor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{donor.name}</span>
              <span className="text-xs text-muted-foreground">
                {donor.email}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Amount
            {column.getIsSorted() === "asc" ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ChevronDown className="ml-2 h-4 w-4" />
            ) : null}
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("amount")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as Donation["status"];
        return (
          <Badge
            variant={
              status === "completed"
                ? "default"
                : status === "processing"
                ? "secondary"
                : "destructive"
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "campaign",
      header: "Campaign",
      cell: ({ row }) => <div>{row.getValue("campaign")}</div>,
    },
    {
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            {column.getIsSorted() === "asc" ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ChevronDown className="ml-2 h-4 w-4" />
            ) : null}
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("date")}</div>,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const donation = row.original;

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
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                <span>View details</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: donations,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <Button variant="outline" size="sm" className="ml-auto">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
