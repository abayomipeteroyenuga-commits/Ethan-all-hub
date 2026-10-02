(()=>{
 const install=document.getElementById('installApp'),update=document.getElementById('updateApp'),status=document.getElementById('pwaStatus'),help=document.getElementById('installHelp'),retry=document.getElementById('retryOffline');
 let prompt=null,registration=null,updateRequested=false,offlineReady=false,busy=false,attempt=0;
 const standalone=()=>matchMedia('(display-mode:standalone)').matches||navigator.standalone===true;
 function installLabel(){install.textContent=standalone()?'GAME INSTALLED':'INSTALL GAME';install.disabled=standalone();}
 function ready(){offlineReady=true;retry.hidden=true;status.textContent=navigator.onLine?'Offline ready · game downloaded':'Offline ready · playing from this device';}
 function failed(){busy=false;retry.hidden=false;status.textContent=offlineReady?'Offline game saved · update download needs retry.':'Offline download interrupted · tap Retry offline download.';}
 installLabel();
 addEventListener('beforeinstallprompt',event=>{event.preventDefault();prompt=event;install.disabled=false;install.textContent='INSTALL GAME';});
 addEventListener('appinstalled',()=>{prompt=null;installLabel();status.textContent=offlineReady?'Game installed · offline ready':'Game installed · downloading offline files';});
 install.addEventListener('click',async()=>{if(prompt){const current=prompt;prompt=null;try{await current.prompt();await current.userChoice;}catch{}installLabel();return;}const ios=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);document.getElementById('installInstructions').textContent=ios?'On iPhone or iPad: open this game in Safari, tap Share, then Add to Home Screen and Add.':'Open your browser menu and choose Install app or Add to Home Screen. On a computer, look for the install icon beside the address bar.';help.hidden=false;});
 document.getElementById('closeInstall').onclick=()=>help.hidden=true;
 update.onclick=()=>{const playing=!document.getElementById('hud').hidden&&document.getElementById('pauseMenu').hidden&&document.getElementById('result').hidden;if(playing){status.textContent='Pause or finish your match before updating.';return;}if(registration?.waiting){updateRequested=true;registration.waiting.postMessage({type:'ACTIVATE_UPDATE'});}};
 if(!('serviceWorker' in navigator)||!isSecureContext){status.textContent='To install and play offline, open the hosted game over HTTPS.';return;}
 navigator.serviceWorker.addEventListener('controllerchange',()=>{if(updateRequested)location.reload();else checkCache();});
 navigator.serviceWorker.addEventListener('message',event=>{const data=event.data||{};if(data.type==='OFFLINE_PROGRESS')status.textContent='Downloading offline game · '+Math.round(data.complete/data.total*100)+'%';if(data.type==='OFFLINE_FAILED')failed();if(data.type==='OFFLINE_READY')ready();if(data.type==='OFFLINE_DOWNLOADED')status.textContent='Offline files downloaded · finishing setup';});
 function showUpdate(){if(registration?.waiting){update.hidden=false;status.textContent='New game update ready · your upgrades are kept';}}
 function checkCache(){const worker=registration?.active||navigator.serviceWorker.controller;if(!worker)return;const channel=new MessageChannel(),timer=setTimeout(()=>{channel.port1.close();},5000);channel.port1.onmessage=event=>{clearTimeout(timer);channel.port1.close();if(event.data?.ready){ready();showUpdate();}else failed();};worker.postMessage({type:'CACHE_STATUS'},[channel.port2]);}
 function watch(worker){if(!worker)return;worker.addEventListener('statechange',()=>{if(worker.state==='installed'){busy=false;if(registration?.waiting)showUpdate();else checkCache();}if(worker.state==='activated'){busy=false;checkCache();}if(worker.state==='redundant')failed();});}
 async function setup(){if(busy)return;busy=true;attempt++;retry.hidden=true;status.textContent='Downloading game for offline play…';try{registration=await navigator.serviceWorker.register(new URL('./sw.js',location.href),{scope:'./',updateViaCache:'none'});registration.addEventListener('updatefound',()=>watch(registration.installing));watch(registration.installing);if(registration.active){busy=false;checkCache();}showUpdate();}catch{failed();if(navigator.onLine&&attempt<2)setTimeout(setup,3000);}}
 retry.onclick=()=>{busy=false;setup();};setup();
 addEventListener('offline',()=>{status.textContent=offlineReady?'Offline mode · coins and upgrades stay on this device':'Connection lost · reconnect to finish the offline download';});
 addEventListener('online',()=>{if(!offlineReady){busy=false;setup();}else{ready();registration?.update().catch(()=>{});}});
})();
