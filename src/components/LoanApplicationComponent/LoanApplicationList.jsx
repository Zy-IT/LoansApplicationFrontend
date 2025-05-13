import React from 'react';
import LoanCard from './LoanCard';

const LoanApplicationList = ({ applications, handleViewDetails, formatDate }) => {
    return (
        <>
            <div className="loan-cards-grid">
                {applications.map(application => (
                    <LoanCard
                        key={application.loanApplicationId}
                        application={application}
                        onViewDetails={handleViewDetails}
                        formatDate={formatDate}
                    />
                ))}
            </div>

            {applications.length === 0 && (
                <div className="no-results">
                    <p>No applications found matching your search.</p>
                </div>
            )}
        </>
    );
};

export default LoanApplicationList;