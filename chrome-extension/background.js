
let getCpuInfo=()=>{
    return new Promise(resolve=>{
        chrome.system.cpu.getInfo((response)=>{
            resolve(response);
        });
    });
};
chrome.runtime.onInstalled.addListener(()=>{
    let foo;
    chrome.system.cpu.getInfo((response)=>{
        console.log(response);
    })
});

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    console.log(sender.tab.url); 
    if (request.greeting == "hello"){
        const foo= new Promise((resolve)=>{
            chrome.system.cpu.getInfo((response)=>{
                resolve(response);
            });
        }).then((resolve)=>{
            return resolve.processors;
        });
        
        //setTimeout(()=>{sendResponse(foo);}, 5000);
        sendResponse(foo);
        console.log("Response Sent",foo);
    }
    return true; 
});