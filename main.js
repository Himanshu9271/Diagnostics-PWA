if('serviceWorker' in navigator){
    window.addEventListener('load',()=>{
        navigator.serviceWorker.register('service-worker.js').then((registration)=>{
            console.log("code exexcuted",registration.scope);
        },(err)=>{
            console.log("error occured",err);
        });
    });
}