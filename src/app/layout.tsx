import React, { ReactNode } from 'react';
import TopToolbar from '../components/TopToolbar';
import Sidebar from '../components/SideBar';
import '../app/styles/Layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';

type LayoutProps = {
    children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="layout-container">
            <Sidebar />
                <div className="content-area">
                    {children}  
                </div>
        </div>
    );
};

export default Layout;
