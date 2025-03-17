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

type Donor = {
  id: string;
  name: string;
  email: string;
  image: string;
  totalDonated: string;
  donationsCount: number;
  lastDonation: string;
  status: "active" | "inactive" | "new";
};

const donors: Donor[] = [
  {
    id: "DONOR-1234",
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    image: "/placeholder.svg?height=32&width=32",
    totalDonated: "$1,250.00",
    donationsCount: 12,
    lastDonation: "Apr 23, 2023",
    status: "active",
  },
  {
    id: "DONOR-2345",
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    image: "/placeholder.svg?height=32&width=32",
    totalDonated: "$975.00",
    donationsCount: 8,
    lastDonation: "Apr 22, 2023",
    status: "active",
  },
  {
    id: "DONOR-3456",
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    image: "/placeholder.svg?height=32&width=32",
    totalDonated: "$820.00",
    donationsCount: 6,
    lastDonation: "Apr 21, 2023",
    status: "active",
  },
  {
    id: "DONOR-4567",
    name: "William Kim",
    email: "william.kim@email.com",
    image: "/placeholder.svg?height=32&width=32",
    totalDonated: "$675.00",
    donationsCount: 5,
    lastDonation: "Apr 20, 2023",
    status: "active",
  },
  {
    id: "DONOR-5678",
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    image: "/placeholder.svg?height=32&width=32",
    totalDonated: "$500.00",
    donationsCount: 3,
    lastDonation: "Apr 19, 2023",
    status: "active",
  },
  {
    id: "DONOR-6789",
    name: "Ethan Johnson",
    email: "ethan.johnson@email.com",
    image: "/placeholder.svg?height=32&width=32",
    totalDonated: "$150.00",
    donationsCount: 1,
    lastDonation: "Apr 18, 2023",
    status: "new",
  },
  {
    id: "DONOR-7890",
    name: "Ava Williams",
    email: "ava.williams@email.com",
    image: "/placeholder.svg?height=32&width=32",
    totalDonated: "$200.00",
    donationsCount: 2,
    lastDonation: "Apr 17, 2023",
    status: "inactive",
  },
  {
    id: "DONOR-8901",
    name: "Noah Brown",
    email: "noah.brown@email.com",
    image: "/placeholder.svg?height=32&width=32",
    totalDonated: "$125.00",
    donationsCount: 1,
    lastDonation: "Apr 16, 2023",
    status: "new",
  },
];

export function DonorsTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const columns: ColumnDef<Donor>[] = [
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
      accessorKey: "name",
      header: "Donor",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={row.original.image} alt={row.original.name} />
              <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{row.original.name}</span>
              <span className="text-xs text-muted-foreground">
                {row.original.email}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "totalDonated",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total Donated
            {column.getIsSorted() === "asc" ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ChevronDown className="ml-2 h-4 w-4" />
            ) : null}
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("totalDonated")}</div>,
    },
    {
      accessorKey: "donationsCount",
      header: "Donations",
      cell: ({ row }) => <div>{row.getValue("donationsCount")}</div>,
    },
    {
      accessorKey: "lastDonation",
      header: "Last Donation",
      cell: ({ row }) => <div>{row.getValue("lastDonation")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as Donor["status"];
        return (
          <Badge
            variant={
              status === "active"
                ? "default"
                : status === "new"
                ? "secondary"
                : "outline"
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const donor = row.original;

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
                <span>View profile</span>
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
    data: donors,
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
