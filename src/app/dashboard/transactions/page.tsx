'use client';

import { Button } from '@/app/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/app/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/app/components/ui/table';
import { Badge } from '@/app/components/ui/badge';
import { Edit, MoreHorizontal, PlusCircle, Trash } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import Link from 'next/link';

export default function TransactionsPage() {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>My Previous Transactions</CardTitle>
                    <CardDescription>
                        View your previous transactions and manage your vehicle listings.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden w-[100px] sm:table-cell">
                                    Image
                                </TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="hidden md:table-cell">Price</TableHead>
                                <TableHead className="hidden md:table-cell">Views</TableHead>
                                <TableHead className="hidden md:table-cell">Created at</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* Mock Data */}
                            <TableRow>
                                <TableCell className="hidden sm:table-cell">
                                    <div className="h-16 w-16 rounded-md bg-muted" />
                                </TableCell>
                                <TableCell className="font-medium">
                                    Toyota Corolla 2018
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary">Active</Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    UGX 35,000,000
                                </TableCell>
                                <TableCell className="hidden md:table-cell">234</TableCell>
                                <TableCell className="hidden md:table-cell">
                                    2023-07-12
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">Toggle menu</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem>
                                                <Edit className="mr-2 h-4 w-4" /> Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">
                                                <Trash className="mr-2 h-4 w-4" /> Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="hidden sm:table-cell">
                                    <div className="h-16 w-16 rounded-md bg-muted" />
                                </TableCell>
                                <TableCell className="font-medium">
                                    Subaru Forester 2015
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">Pending</Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    UGX 45,000,000
                                </TableCell>
                                <TableCell className="hidden md:table-cell">12</TableCell>
                                <TableCell className="hidden md:table-cell">
                                    2023-10-18
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">Toggle menu</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem>
                                                <Edit className="mr-2 h-4 w-4" /> Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">
                                                <Trash className="mr-2 h-4 w-4" /> Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
}
