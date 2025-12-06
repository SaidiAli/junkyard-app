'use client';

import { useEffect, useState } from 'react';
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
import { MoreHorizontal, Loader2 } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import { api } from '@/lib/api';
import { Payment, ApiResponse } from '@/lib/types';

export default function TransactionsPage() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await api.get<ApiResponse<Payment[]>>('/payments/my-payments');
                if (response.data.success && response.data.data) {
                    setPayments(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching payments:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPayments();
    }, []);

    const formatPrice = (price: string) => {
        return new Intl.NumberFormat('en-UG', {
            style: 'currency',
            currency: 'UGX',
            maximumFractionDigits: 0,
        }).format(Number(price));
    };

    return (
        <ProtectedRoute>
            <Card>
                <CardHeader>
                    <CardTitle>My Previous Transactions</CardTitle>
                    <CardDescription>
                        View your previous transactions and manage your vehicle listings.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex justify-center p-8">
                            <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Reference</TableHead>
                                    <TableHead>Method</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="hidden md:table-cell">Amount</TableHead>
                                    <TableHead className="hidden md:table-cell">Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {payments.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8">
                                            No transactions found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    payments.map((payment) => (
                                        <TableRow key={payment.id}>
                                            <TableCell className="font-medium">
                                                {payment.paymentReference}
                                            </TableCell>
                                            <TableCell className="capitalize">
                                                {payment.paymentMethod.replace('_', ' ')}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={
                                                    payment.status === 'completed' ? 'default' :
                                                        payment.status === 'failed' ? 'destructive' : 'outline'
                                                }>
                                                    {payment.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {formatPrice(payment.amount)}
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {new Date(payment.createdAt).toLocaleDateString()}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </ProtectedRoute>
    );
}
