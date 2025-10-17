"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Upload, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createTransactionFormSchema, type TransactionFormValues } from "../types/schema";
import { useCreateTransaction, useGetTransactionById, useUpdateTransaction } from "../services/transaction-service";
import { handleApiError } from "@/lib/error";
import { useRouter } from "next/navigation";
import { useGetCategories } from "@/features/category/service/category-service";



export default function TransactionForm({ id }: { id?: string }) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { data: transaction, isLoading: isDataLoading } = useGetTransactionById(id ?? "");


    const form = useForm<TransactionFormValues>({
        resolver: zodResolver(createTransactionFormSchema),
        defaultValues: {
            transaction_type: id ? transaction?.data.transaction_type || "expense" : "expense",
            amount: id ? String(transaction?.data.amount) || "" : "",
            category_id: id ? transaction?.data.category_id || "" : "",
            note: id ? transaction?.data.note || "" : "",
            period: id ? transaction?.data.period || "monthly" : "monthly",
            proof_file: undefined,
        },
    });

    useEffect(() => {
        if (transaction?.data) {
            form.reset({
                transaction_type: transaction.data.transaction_type || "expense",
                amount: String(transaction.data.amount) || "",
                category_id: transaction.data.category_id || "",
                note: transaction.data.note || "",
                period: transaction.data.period || "monthly",
                date: new Date(transaction.data.date), // pastikan ini ada
                proof_file: undefined,
            });
        }
    }, [transaction, form]);


    const transactionType = form.watch("transaction_type");

    const { mutateAsync: createTransaction } = useCreateTransaction();
    const { mutateAsync: updateTransaction } = useUpdateTransaction(id || "");

    const { data: categories, isLoading } = useGetCategories();
    const router = useRouter();
    const onSubmit = async (data: TransactionFormValues) => {

        try {

            const formData = new FormData();
            formData.append("transactionType", data.transaction_type);
            formData.append("amount", data.amount);
            formData.append("categoryId", data.category_id);
            formData.append("period", data.period);
            formData.append("date", format(data.date, "yyyy-MM-dd"));
            if (data.note) {
                formData.append("note", data.note);
            }
            if (data.proof_file) {
                formData.append("proofFile", data.proof_file);
                setSelectedFile(data.proof_file);
            }
            if (id) {
                await updateTransaction(formData);
                toast.success("Transaction updated successfully");
            } else {
                await createTransaction(formData);
                toast.success("Transaction created successfully");
            }
            form.reset();
            router.push("/dashboard/transaction");
            setSelectedFile(null);
        } catch (error) {
            toast.error(handleApiError(error) || "Something went wrong");
        }
    };

    console.log(categories)


    return (
        <div className="min-h-screen container py-8 px-4 sm:px-6 lg:px-8">
            <div className="">
                <Card className="shadow-medium border-border/50 overflow-hidden">
                    <CardHeader className={cn(
                        "pb-6 transition-all duration-300",
                        transactionType === "income" ? "bg-gradient-income" : "bg-gradient-expense"
                    )}>
                        <div className="flex items-center gap-3">
                            <div>
                                <CardTitle className="text-2xl font-bold text-black">
                                    Create Transaction
                                </CardTitle>
                                <CardDescription className="text-black/80">
                                    Record your {transactionType === "income" ? "income" : "expense"} transaction
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="pt-6">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="transaction_type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Transaction Type</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="h-11">
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="income">Income</SelectItem>
                                                    <SelectItem value="expense">Expense</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="amount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Amount</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                                        Rp.
                                                    </span>
                                                    <Input
                                                        type="number"
                                                        step="0.01"
                                                        placeholder="0.00"
                                                        className="pl-10 h-11"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="category_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category </FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger
                                                        value={field.value}
                                                        className="h-11"
                                                        disabled={isLoading}
                                                    >
                                                        <SelectValue placeholder={isLoading ? "Loading categories..." : "Select category"} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {!isLoading && categories?.data.map((category) => (
                                                            <SelectItem key={category.id} value={category.id}>
                                                                {category.name}
                                                            </SelectItem>
                                                        ))}
                                                        {!isLoading && categories?.data.length === 0 && (
                                                            <SelectItem value="" disabled>
                                                                No categories available
                                                            </SelectItem>
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="period"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Period</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="h-11">
                                                        <SelectValue placeholder="Select period" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="daily">Daily</SelectItem>
                                                    <SelectItem value="monthly">Monthly</SelectItem>
                                                    <SelectItem value="yearly">Yearly</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Transaction Date</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            className={cn(
                                                                "h-11 pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date > new Date() || date < new Date("1900-01-01")
                                                        }
                                                        initialFocus
                                                        className="pointer-events-auto"
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormDescription>
                                                Select the transaction date
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="note"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Note (Optional)</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Add any additional notes..."
                                                    className="resize-none min-h-[100px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="proof_file"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Proof File (Optional)</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        type="file"
                                                        id="proof-file"
                                                        className="hidden"
                                                        accept="image/*,.pdf"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            field.onChange(file);
                                                            setSelectedFile(file || null);
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="proof-file"
                                                        className="flex items-center justify-center h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors group"
                                                    >
                                                        <div className="text-center">
                                                            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground group-hover:text-primary transition-colors" />
                                                            {selectedFile ? (
                                                                <p className="text-sm font-medium text-foreground">{selectedFile.name}</p>
                                                            ) : (
                                                                <>
                                                                    <p className="text-sm font-medium text-foreground">Click to upload</p>
                                                                    <p className="text-xs text-muted-foreground mt-1">
                                                                        PNG, JPG or PDF (Max 10MB)
                                                                    </p>
                                                                </>
                                                            )}
                                                        </div>
                                                    </label>
                                                </div>
                                            </FormControl>
                                            <FormDescription>Upload a receipt or proof of transaction</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full"
                                >
                                    Create Transaction
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
