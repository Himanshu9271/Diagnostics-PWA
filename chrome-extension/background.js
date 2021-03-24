
chrome.runtime.onInstalled.addListener(()=>{
    chrome.system.cpu.getInfo(function(info){       
        console.log(info);   
    });
    chrome.system.storage.getInfo((info)=>{
        console.log(info);
    });
    
});