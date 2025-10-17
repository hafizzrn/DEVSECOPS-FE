import z from "zod";

export const createTransactionFormSchema = z.object({
    transaction_type: z.string().min(1, "Transaction type is required"),
    amount: z
        .string()
        .min(1, "Amount is required")
        .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format"),
    category_id: z.string().min(1, "Category ID is required"),
    note: z.string().optional(),
    period: z.string().min(1, "Period is required"),
    date: z.date().min(1, "Date is required"),
    proof_file: z
        .any()
        .refine((file) => file instanceof File || file?.length > 0, {
            message: 'Proof file is required',
        })
        .optional(),
});


export type TransactionFormValues = z.infer<typeof createTransactionFormSchema>;