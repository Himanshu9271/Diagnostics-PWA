
chrome.runtime.onInstalled.addListener(async ()=>{
    console.log("Installed !!");
    
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(sender.tab.url); 
    let foo;
    if (request.greeting == "hello"){
        chrome.system.cpu.getInfo( (response)=>{
            
            sendResponse(response.processors);
            console.log(response.processors)
        }); 
    }
    return true; 
});