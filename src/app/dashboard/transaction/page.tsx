import AllTransaction from "@/features/transaction/containers/all-transaction";
import { Suspense } from "react";

export default function TransactionDashboardPage() {
    return (
        <Suspense>
            <AllTransaction />

        </Suspense>
    )
}
