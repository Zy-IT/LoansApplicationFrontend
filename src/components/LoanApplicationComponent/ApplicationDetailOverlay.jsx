import React from 'react';
import { getInitials } from './Helper';

const ApplicationDetailOverlay = ({ application, onClose, formatDate }) => {
    return (
        <div className="application-overlay" onClick={onClose}>
            <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
                <div className="overlay-header">
                    <h2>Loan Application Details</h2>
                    <button
                        className="close-overlay-btn"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <div className="overlay-body">
                    <div className="applicant-header">
                        <div className="large-avatar">
                            <span>{getInitials(application.fullName)}</span>
                        </div>
                        <div className="applicant-main-info">
                            <h3>{application.fullName}</h3>
                            <div className="applicant-tags">
                                <span className="tag product-tag">{application.product}</span>
                                <span className="tag branch-tag">{application.branch}</span>
                                <span className="tag status-tag">Pending Review</span>
                            </div>
                        </div>
                    </div>

                    <div className="detail-section">
                        <h4>Application Information</h4>
                        <div className="detail-grid">
                            <div className="detail-item">
                                <span className="detail-label">Application ID:</span>
                                <span className="detail-value">{application.loanApplicationId}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Submitted On:</span>
                                <span className="detail-value">{formatDate(application.createdAt)}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Email:</span>
                                <span className="detail-value">{application.email || 'N/A'}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Phone:</span>
                                <span className="detail-value">{application.contactNo || 'N/A'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="detail-section">
                        <h4>Subject</h4>
                        <p className="subject-full">{application.subject}</p>
                    </div>

                    <div className="detail-section">
                        <h4>Message</h4>
                        <p className="message-full">{application.message}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationDetailOverlay;