// Change this as you want.
const blacklisted_command_strings = ["rm"]


function runAllMCP(){
    const allDivAndSpans = document.querySelectorAll('div, span');
    let targetElement = Array.from(allDivAndSpans).find(element => 
        element.textContent === 'Run tool⌘⏎'
    );
    
    if (targetElement) {
        targetElement.click()
        return true;
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
            targetElement.click();
            return true;
        }
    }    
    return false;
}

function runBoth(){
    runAllMCP();
    runCommand();
}

setInterval(runBoth, 1000);
