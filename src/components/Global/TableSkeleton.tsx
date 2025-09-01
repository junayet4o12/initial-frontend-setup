import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface TableSkeletonProps {
    headers: string[];
    showHeader?: boolean;
    title?: string;
    showViewAll?: boolean;
    className?: string;
}

const TableSkeleton = ({
    headers,
    showHeader = true,
    title,
    showViewAll = false,
    className = ""
}: TableSkeletonProps) => {

    // Function to generate appropriate skeleton based on column content
    const getColumnSkeleton = (header: string, index: number) => {
        const lowerHeader = header.toLowerCase();

        // Product/Name column (usually first column)
        if (lowerHeader.includes('product') || lowerHeader.includes('name') || index === 0) {
            return (
                <div className="flex items-center gap-3">
                    <Skeleton className="h-12 w-12 rounded" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                </div>
            );
        }

        // Image column
        if (lowerHeader.includes('image') || lowerHeader.includes('photo')) {
            return <Skeleton className="h-12 w-12 rounded" />;
        }

        // Status column
        if (lowerHeader.includes('status')) {
            return <Skeleton className="h-6 w-20 rounded-full" />;
        }

        // Action column
        if (lowerHeader.includes('action')) {
            return (
                <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded" />
                    <Skeleton className="h-8 w-8 rounded" />
                    <Skeleton className="h-8 w-8 rounded" />
                </div>
            );
        }

        // Price/Amount column
        if (lowerHeader.includes('price') || lowerHeader.includes('amount') || lowerHeader.includes('cost')) {
            return <Skeleton className="h-4 w-16" />;
        }

        // Date/Time column
        if (lowerHeader.includes('date') || lowerHeader.includes('time') || lowerHeader.includes('created') || lowerHeader.includes('updated')) {
            return <Skeleton className="h-4 w-20" />;
        }

        // Email column
        if (lowerHeader.includes('email')) {
            return <Skeleton className="h-4 w-36" />;
        }

        // ID column
        if (lowerHeader.includes('id') || lowerHeader.includes('#')) {
            return <Skeleton className="h-4 w-12" />;
        }

        // Category/Type column
        if (lowerHeader.includes('category') || lowerHeader.includes('type')) {
            return <Skeleton className="h-4 w-24" />;
        }

        // Default column
        return <Skeleton className="h-4 w-20" />;
    };

    return (
        <div className={`pb-10 ${className}`}>
            <div className="bg-white rounded-lg border border-gray-200">
                {/* Header Skeleton */}
                {showHeader && (
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        {title ? (
                            <Skeleton className="h-7 w-32" />
                        ) : (
                            <Skeleton className="h-7 w-40" />
                        )}
                        {showViewAll && <Skeleton className="h-4 w-16" />}
                    </div>
                )}

                {/* Table Skeleton */}
                <Table>
                    <TableHeader>
                        <TableRow>
                            {headers.map((header, index) => (
                                <TableHead key={index}>{header}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: headers.length }).map((_, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {headers.map((header, colIndex) => (
                                    <TableCell key={colIndex}>
                                        {getColumnSkeleton(header, colIndex)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default TableSkeleton;