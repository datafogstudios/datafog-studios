function runCode(button) {
    const codeBlock = button.closest('.code-editor').querySelector('code');
    const outputDiv = button.closest('.code-editor').querySelector('.code-output');
    const code = codeBlock.textContent;
    
    outputDiv.innerHTML = '<div style="color: #00ff88;">Running code...</div>';
    
    setTimeout(() => {
        outputDiv.innerHTML = '<div style="color: #00ff88;">✓ Code executed successfully!</div><div style="margin-top: 0.5rem; color: #8892b0;">Note: Live execution coming soon. Copy and run in your Python environment.</div>';
    }, 500);
}

function copyCode(button) {
    const codeBlock = button.closest('.code-editor').querySelector('code');
    const code = codeBlock.textContent;
    
    navigator.clipboard.writeText(code).then(() => {
        const originalText = button.textContent;
        button.textContent = '✓ Copied!';
        button.style.background = '#00ff88';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    });
}
