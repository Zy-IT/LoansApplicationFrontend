import { useQuery } from "@tanstack/react-query";
import { fetchAllLoanApplicationByBranch } from "../services/LoanApplicationService";

export const useGetAllLoanApplicationsByBranch = ({ officeId }) => {
    return useQuery({
        queryKey: ['LoanApplications', officeId],
        queryFn: () => fetchAllLoanApplicationByBranch(officeId),
        enabled: !!officeId,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        retry: 2
    });
}