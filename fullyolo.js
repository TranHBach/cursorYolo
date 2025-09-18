// Change this as you want.
const blacklisted_command_strings = ["rm"]

// This is for Cursor 1.6
function runCursorLatest() {
    
}

function runAllMCP(){
    const allDivAndSpans = document.querySelectorAll('div, span');
    let targetElement = Array.from(allDivAndSpans).find(element => 
        element.textContent === 'Run tool⌘⏎'
    );
    
    if (targetElement) {
        targetElement.click()
    }
}

function runCommand(){
    const commandElements = document.querySelectorAll("div.view-lines.monaco-mouse-cursor-text[role='presentation']");
    
    // greater than 1 because the main text editor also has this class.
    if (commandElements.length > 1) {
        // Get the last matching element
        let targetElement = commandElements[commandElements.length - 1];
        
        // Check if textContent contains any blacklisted strings
        const containsBlacklistedString = blacklisted_command_strings.some(blacklistedStr =>
            targetElement.textContent.includes(blacklistedStr)
        );
        
        if (!containsBlacklistedString) {
            const runDiv = document.querySelector('#run');
            if (runDiv) {
                runDiv.click();
            }
        }
    }    
}

function runCursorv1_5(){
    runAllMCP();
    runCommand();
}

function runCurrent(){
    const runButton = document.querySelector('div.composer-run-button');
    if (runButton) {
        runButton.click();
    }
}

function runCursorv1_6(){
    const toolCallDiv = document.querySelectorAll('div.composer-tool-call-header-content');
    if (toolCallDiv.length > 0) {
        const currentToolCall = toolCallDiv[toolCallDiv.length - 1];
        
        // MCP is run by default
        if (currentToolCall.textContent.startsWith("Call")) {
            runCurrent();
            return;
        }

        // Check if the command is blacklisted
        const containsBlacklistedString = blacklisted_command_strings.some(blacklistedStr =>
            currentToolCall.textContent.includes(blacklistedStr)
        );

        if (!containsBlacklistedString) {
            runCurrent();
            return;
        }
    }
}

setInterval(runCursorv1_5, 1000);
setInterval(runCursorv1_6, 1000);
