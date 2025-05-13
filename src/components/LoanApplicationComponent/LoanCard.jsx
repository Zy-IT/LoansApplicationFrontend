import React from 'react';
import { getInitials } from './Helper';

const LoanCard = ({ application, onViewDetails, formatDate }) => {
    return (
        <div className="loan-card">
            <div className="loan-card-content">
                <div className="applicant-info">
                    <div className="applicant-avatar">
                        <span>{getInitials(application.fullName)}</span>
                    </div>
                    <div>
                        <h3 className="applicant-name">{application.fullName}</h3>
                        <p className="product-type">{application.product}</p>
                    </div>
                </div>

                <div className="loan-subject">
                    <h4 className="subject-text">{application.subject}</h4>
                    <p className="message-preview">{application.message}</p>
                </div>

                <div className="card-footer-info">
                    <span className="branch-name">{application.branch}</span>
                    <span className="created-date">{formatDate(application.createdAt)}</span>
                </div>

                <div className="card-actions">
                    <button
                        className="view-details-btn"
                        onClick={() => onViewDetails(application)}
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoanCard;