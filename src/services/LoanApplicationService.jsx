import Api from "../Api/Api";

export const fetchAllLoanApplicationByBranch = async (officeId) => {
    try {
        const response = await Api.get(`LoanApplication/GetAll/ByBranch/${officeId}`)
        return response.data;
    } catch (error) {
        throw error.response.data || new Error("Error at Fetching Loan Application");
    }
}
