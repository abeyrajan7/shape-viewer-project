import React, { useState } from 'react';
import '../app/styles/TopToolbar.css';

type TopToolbarProps = {
  onFileContentUpdate: (content: string[]) => void;
};



const TopToolbar: React.FC<TopToolbarProps> = ({ onFileContentUpdate }) => {
  const [fileName, setFileName] = useState<string>('Open Shape File');
    const handleButtonClick = () => {
        document.getElementById('file-input')?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const file = event.target.files?.[0];
        if (file) {
          setFileName(file.name);
            const reader = new FileReader();
            reader.onload = function (e) {
                const content = e.target?.result as string;
                const lines = content.split('\n').map(line => line.trim()).filter(line => line);
                onFileContentUpdate(lines); 
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className='tool-bar-container'>
            <p className='tool-bar-title'>Shape Viewer</p>
            <button className='btn btn btn-primary btn-sm shape-file-btn' onClick={handleButtonClick}>
                {fileName}
            </button>
            <input
                id='file-input'
                type='file'
                accept='.txt'
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
        </div>
    );
}

export default TopToolbar;
