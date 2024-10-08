import React, { useState } from 'react';
import Layout from '@/app/layout';
import ShapeViewport from '@/components/ShapeViewport';
import TopToolbar from '../components/TopToolbar';
import '../app/styles/ShapeViewerPage.css';

export default function ShapeViewerPage() {
    const [fileContent, setFileContent] = useState<string[]>([]);

    // Callback function to update file content
    const handleFileContentUpdate = (content: string[]) => {
        setFileContent(content);
    };

    return (
        <Layout>
            <TopToolbar onFileContentUpdate={handleFileContentUpdate} />
            <ShapeViewport content={fileContent} />
        </Layout>
    );
}
