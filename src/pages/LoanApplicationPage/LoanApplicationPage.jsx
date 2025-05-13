import { useState, useEffect } from 'react';
import './LoanApplicationPage.css';
import { useGetAllLoanApplicationsByBranch } from '../../hooks/loanApplicationHook';
import LoanApplicationList from '../../components/LoanApplicationComponent/LoanApplicationList';
import ApplicationDetailOverlay from '../../components/LoanApplicationComponent/ApplicationDetailOverlay';
import { useNavigate } from 'react-router-dom';

const LoanApplicationPage = () => {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const officeId = user?.officeId || '';

    console.log("Current User:", user);
    console.log("Current OfficeId:", officeId);

    const [applications, setApplications] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('newest');
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [showOverlay, setShowOverlay] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const { data: fetchedData, isLoading, error } = useGetAllLoanApplicationsByBranch({ officeId });

    console.log("Fetched Data:", fetchedData);
    console.log("Adjusted Feched Data:", applications);

    useEffect(() => {
        if (fetchedData) {
            setApplications(fetchedData);
            console.log("Fetched Data Inside Use Effect:", fetchedData);
        }
    }, [fetchedData]);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (e) => {
        setSortOrder(e.target.value);
    };

    const handleViewDetails = (application) => {
        setSelectedApplication(application);
        setShowOverlay(true);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseOverlay = () => {
        setShowOverlay(false);
        document.body.style.overflow = '';
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate("/");
    };

    const filteredApplications = applications
        .filter(app =>
            app.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.product?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOrder === 'newest') {
                return new Date(b.createdAt) - new Date(a.createdAt);
            } else if (sortOrder === 'oldest') {
                return new Date(a.createdAt) - new Date(b.createdAt);
            } else if (sortOrder === 'name') {
                return a.fullName.localeCompare(b.fullName);
            }
            return 0;
        });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (windowWidth < 480) {
            return date.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            });
        }

        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    };

    if (isLoading) {
        return <div className='Loading'>Data is Loading...</div>
    }

    if (error) {
        return <div className='Error'>Error: {error.message}</div>
    }

    return (
        <div className='Loan-Application'>
            <div className='Loan-Application-Container'>
                <div className="dashboard-header">
                    <div className="dashboard-title-section">
                        <h1 className="dashboard-title">Loan Applications Dashboard</h1>
                        {user && (
                            <div className="user-info">
                                <span>Branch: {user.branch}</span>
                            </div>
                        )}
                    </div>
                    <div className="dashboard-controls">
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Search applications..."
                                className="search-input"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <select
                            className="sort-select"
                            value={sortOrder}
                            onChange={handleSort}
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="name">Name A-Z</option>
                        </select>
                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                        >
                            <svg className="logout-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>

                <LoanApplicationList
                    applications={filteredApplications}
                    handleViewDetails={handleViewDetails}
                    formatDate={formatDate}
                />

                {showOverlay && selectedApplication && (
                    <ApplicationDetailOverlay
                        application={selectedApplication}
                        onClose={handleCloseOverlay}
                        formatDate={formatDate}
                    />
                )}
            </div>
        </div>
    );
};

export default LoanApplicationPage;