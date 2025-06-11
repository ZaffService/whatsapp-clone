(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function c(e,t="info"){document.querySelectorAll(".toast").forEach(i=>i.remove());const r=document.createElement("div"),s={success:"#25D366",error:"#ef4444",info:"#8696a0",warning:"#f59e0b"};r.className="toast fixed right-4 top-4 p-4 rounded-lg text-white shadow-lg transform translate-x-full transition-all duration-300 z-50",r.style.backgroundColor=s[t],r.innerHTML=`
    <div class="flex items-center">
      <i class="fas ${t==="success"?"fa-check-circle":t==="error"?"fa-exclamation-circle":t==="warning"?"fa-exclamation-triangle":"fa-info-circle"} mr-2"></i>
      <span>${e}</span>
    </div>
  `,document.body.appendChild(r),setTimeout(()=>{r.style.transform="translateX(0)"},100),setTimeout(()=>{r.style.transform="translateX(100%)",setTimeout(()=>r.remove(),300)},3e3)}function q(e,t,n=null){if(!("Notification"in window)){console.log("Ce navigateur ne supporte pas les notifications");return}if(Notification.permission==="granted"){const r=new Notification(e,{body:t,icon:n||"/placeholder.svg?height=64&width=64",badge:"/placeholder.svg?height=32&width=32",tag:"whatsapp-message",requireInteraction:!1,silent:!1});setTimeout(()=>{r.close()},5e3),r.onclick=()=>{window.focus(),r.close()}}else Notification.permission!=="denied"&&Notification.requestPermission().then(r=>{r==="granted"&&q(e,t,n)});X(e,t,n)}function X(e,t,n){const r=document.getElementById("notificationContainer");if(!r)return;const s=document.createElement("div");s.className="bg-[#202c33] border border-gray-600 rounded-lg p-4 shadow-lg max-w-sm transform translate-x-full transition-all duration-300",s.innerHTML=`
    <div class="flex items-start space-x-3">
      ${n?`<img src="${n}" alt="Avatar" class="w-10 h-10 rounded-full object-cover flex-shrink-0">`:'<div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0"><i class="fas fa-comment text-white"></i></div>'}
      <div class="flex-1 min-w-0">
        <h4 class="text-white font-medium text-sm truncate">${e}</h4>
        <p class="text-gray-400 text-sm mt-1 line-clamp-2">${t}</p>
      </div>
      <button class="text-gray-400 hover:text-white flex-shrink-0" onclick="this.parentElement.parentElement.remove()">
        <i class="fas fa-times text-sm"></i>
      </button>
    </div>
  `,r.appendChild(s),setTimeout(()=>{s.style.transform="translateX(0)"},100),setTimeout(()=>{s.style.transform="translateX(100%)",setTimeout(()=>{s.parentElement&&s.remove()},300)},5e3),K()}function K(){try{const e=new(window.AudioContext||window.webkitAudioContext),t=e.createOscillator(),n=e.createGain();t.connect(n),n.connect(e.destination),t.frequency.setValueAtTime(800,e.currentTime),t.frequency.setValueAtTime(600,e.currentTime+.1),n.gain.setValueAtTime(.1,e.currentTime),n.gain.exponentialRampToValueAtTime(.01,e.currentTime+.2),t.start(e.currentTime),t.stop(e.currentTime+.2)}catch(e){console.log("Impossible de jouer le son de notification:",e)}}async function Z(){try{return await Notification.requestPermission()==="granted"}catch(e){return console.error("Erreur permissions notifications:",e),!1}}const _=`${window.location.origin}/api`;class E{static async request(t,n={}){try{const r=await fetch(`${_}${t}`,{headers:{"Content-Type":"application/json"},...n});if(!r.ok)throw new Error(`HTTP ${r.status}: ${r.statusText}`);return await r.json()}catch(r){throw console.error(`API Error [${n.method||"GET"}] ${t}:`,r),r}}static get(t){return this.request(t)}static post(t,n){return this.request(t,{method:"POST",body:JSON.stringify(n)})}static put(t,n){return this.request(t,{method:"PUT",body:JSON.stringify(n)})}static patch(t,n){return this.request(t,{method:"PATCH",body:JSON.stringify(n)})}static delete(t){return this.request(t,{method:"DELETE"})}}const k=()=>E.get("/chats"),C=(e,t)=>E.patch(`/chats/${e}`,t),Q=(e,t)=>E.patch(`/users/${e}`,{status:t,lastSeen:new Date().toISOString()}),D=e=>E.get(`/messages?chatId=${e}`),S=e=>E.post("/messages",e);let O=null;function Y(){const e=localStorage.getItem("currentUser");if(e)try{const t=JSON.parse(e);return H(t),t}catch(t){console.error("Erreur parsing user:",t),localStorage.removeItem("currentUser")}return null}function g(){return O||Y()}function H(e){O=e,e?(localStorage.setItem("currentUser",JSON.stringify(e)),Q(e.id,"en ligne").catch(console.error)):localStorage.removeItem("currentUser")}function ee(){window.refreshInterval&&clearInterval(window.refreshInterval),localStorage.removeItem("currentUser"),window.location.reload()}async function te(e,t){try{if(!e||!t)return c("Veuillez remplir tous les champs","error"),null;if(t.length!==9||!/^\d+$/.test(t))return c("Le numéro doit contenir exactement 9 chiffres","error"),null;const r=(await k()).find(s=>s.name.toLowerCase().trim()===e.toLowerCase().trim()&&s.phone.trim()===t.trim());return r?(H(r),c(`Bienvenue ${r.name}!`,"success"),r):(c("Nom ou téléphone incorrect","error"),null)}catch(n){return console.error("Erreur de connexion:",n),c("Erreur de connexion au serveur","error"),null}}function ne(e){const t=document.createElement("div");t.className="min-h-screen flex items-center justify-center bg-[#111b21] px-4",t.innerHTML=`
    <div class="max-w-md w-full bg-[#222e35] rounded-lg shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="w-20 h-20 bg-[#25D366] rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fab fa-whatsapp text-3xl text-white"></i>
        </div>
        <h1 class="text-2xl font-bold text-white mb-2">WhatsApp Web</h1>
        <p class="text-gray-400">Connectez-vous pour continuer</p>
      </div>
      
      <form id="loginForm" class="space-y-4">
        <div>
          <input 
            type="text" 
            id="nameInput"
            placeholder="Votre nom" 
            class="w-full px-4 py-3 bg-[#2a3942] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25D366] transition-all"
            required
          >
        </div>
        
        <div>
          <input 
            type="tel" 
            id="phoneInput"
            placeholder="Numéro de téléphone (9 chiffres)" 
            class="w-full px-4 py-3 bg-[#2a3942] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25D366] transition-all"
            maxlength="9"
            required
          >
        </div>
        
        <button 
          type="submit"
          id="loginButton"
          class="w-full py-3 bg-[#25D366] hover:bg-[#1ea952] text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Se connecter
        </button>
      </form>
      
      <div class="mt-6 p-4 bg-[#2a3942] rounded-lg">
        <p class="text-sm text-gray-400 mb-2">Comptes de test :</p>
        <div class="space-y-1 text-xs text-gray-500">
          <div>Zafe - 777867740</div>
          <div>Abdallah - 778123456</div>
          <div>Ousmane Marra - 776543210</div>
          <div>Maman Dié ODC - 775555555</div>
          <div>Zeynabe Ba - 774444444</div>
        </div>
      </div>
    </div>
  `;const n=t.querySelector("#loginForm"),r=t.querySelector("#nameInput"),s=t.querySelector("#phoneInput"),i=t.querySelector("#loginButton");return s.addEventListener("input",o=>{o.target.value=o.target.value.replace(/[^0-9]/g,"")}),n.addEventListener("submit",async o=>{o.preventDefault();const u=r.value.trim(),w=s.value.trim();if(!u||!w){c("Veuillez remplir tous les champs","error");return}i.disabled=!0,i.innerHTML=`
      <div class="flex items-center justify-center">
        <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
        Connexion...
      </div>
    `;try{const b=await te(u,w);b&&e&&e(b)}finally{i.disabled=!1,i.textContent="Se connecter"}}),t}let l=null,B=null,m=null;function re(e){if(l){c("Un appel est déjà en cours","error");return}console.log("Initialisation appel audio avec:",e.name),F(e,"audio")}function se(e){if(l){c("Un appel est déjà en cours","error");return}console.log("Initialisation appel vidéo avec:",e.name),F(e,"video")}async function F(e,t){if(l={contact:e,type:t,startTime:Date.now(),status:"calling"},t==="video")try{console.log("Demande d'accès à la caméra..."),m=await navigator.mediaDevices.getUserMedia({video:!0,audio:!0}),console.log("✅ Accès caméra accordé")}catch(r){console.error("❌ Erreur accès caméra:",r),c("Veuillez autoriser l'accès à la caméra","error");return}ae(e,t),t==="video"&&m&&ie(),de();const n=Math.random()*3e3+2e3;B=setTimeout(()=>{l&&l.status==="calling"&&ce()},n)}function ae(e,t){const n=document.getElementById("callInterface");n&&n.remove();const r=document.createElement("div");r.id="callInterface",r.className="fixed inset-0 bg-gray-900 z-50",t==="video"?r.innerHTML=`
      <div class="w-full h-full relative">
        <!-- Vidéo principale (contact) -->






        <div class="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
          <!-- Placeholder du contact -->
          <div class="text-center">
            <img src="${e.avatar}" alt="${e.name}" 


                 class="w-32 h-32 rounded-full mb-4 object-cover shadow-2xl mx-auto">
            <h2 class="text-3xl font-light mb-2 text-white">${e.name}</h2>
            <p id="callStatus" class="text-lg text-gray-300">Appel vidéo en cours...</p>
          </div>
        </div>
        



        <!-- VOTRE VIDÉO (caméra locale) -->
        <div class="absolute top-4 right-4 w-48 h-36 bg-black rounded-lg overflow-hidden border-2 border-white shadow-xl">
          <video id="localVideo" 
                 class="w-full h-full object-cover" 
                 autoplay 
                 muted 
                 playsinline>
          </video>



        </div>
        

        <!-- Contrôles -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-6">


          <button id="muteBtn" class="w-16 h-16 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors">
            <i class="fas fa-microphone text-xl text-white"></i>
          </button>
          


          <button id="cameraBtn" class="w-16 h-16 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors">
            <i class="fas fa-video text-xl text-white"></i>
          </button>
          


          <button id="hangupBtn" class="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors">
            <i class="fas fa-phone text-xl text-white transform rotate-135"></i>
          </button>
        </div>
        


        <!-- Durée -->
        <div id="callDuration" class="absolute top-4 left-4 bg-black bg-opacity-70 px-4 py-2 rounded-full text-white font-mono">
          00:00
        </div>
      </div>
    `:r.innerHTML=`


      <div class="w-full h-full flex items-center justify-center">
        <div class="text-center">
          <img src="${e.avatar}" alt="${e.name}" 










               class="w-40 h-40 rounded-full mb-6 object-cover shadow-2xl mx-auto">
          <h2 class="text-4xl font-light mb-4 text-white">${e.name}</h2>
          <p id="callStatus" class="text-xl text-gray-300 mb-8">Appel en cours...</p>
          



          <div class="flex space-x-8 justify-center">
            <button id="muteBtn" class="w-16 h-16 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors">
              <i class="fas fa-microphone text-xl text-white"></i>
            </button>
            
            <button id="speakerBtn" class="w-16 h-16 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors">
              <i class="fas fa-volume-up text-xl text-white"></i>
            </button>
            
            <button id="hangupBtn" class="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors">
              <i class="fas fa-phone text-xl text-white transform rotate-135"></i>
            </button>
          </div>
          



          <div id="callDuration" class="mt-8 text-2xl text-gray-400 font-mono">00:00</div>
        </div>


      </div>
    `,document.body.appendChild(r),oe()}function ie(){const e=document.getElementById("localVideo");e&&m?(console.log("🎥 Configuration de votre caméra..."),e.srcObject=m,e.play().then(()=>{console.log("✅ Votre caméra est active")}).catch(t=>{console.error("❌ Erreur démarrage caméra:",t)})):console.error("❌ Vidéo ou stream manquant")}function oe(){const e=document.getElementById("muteBtn"),t=document.getElementById("cameraBtn"),n=document.getElementById("speakerBtn"),r=document.getElementById("hangupBtn");let s=!1,i=!1;e&&e.addEventListener("click",()=>{s=!s,m&&m.getAudioTracks().forEach(o=>{o.enabled=!s}),e.innerHTML=`<i class="fas fa-microphone${s?"-slash":""} text-xl text-white"></i>`,e.classList.toggle("bg-red-500",s),c(s?"🔇 Micro coupé":"🎤 Micro activé","info")}),t&&t.addEventListener("click",()=>{i=!i,m&&m.getVideoTracks().forEach(o=>{o.enabled=!i}),t.innerHTML=`<i class="fas fa-video${i?"-slash":""} text-xl text-white"></i>`,t.classList.toggle("bg-red-500",i),c(i?"📹 Caméra désactivée":"🎥 Caméra activée","info")}),n&&n.addEventListener("click",()=>{c("🔊 Haut-parleur","info")}),r&&r.addEventListener("click",fe)}function ce(){if(!l)return;l.status="connected",l.connectedTime=Date.now(),ue();const e=document.getElementById("callStatus");e&&(e.textContent=l.type==="video"?"📹 Appel vidéo connecté":"📞 Appel connecté"),le(),c("✅ Appel connecté","success")}function le(){const e=document.getElementById("callDuration");if(!e||!l)return;const t=()=>{if(!l||l.status!=="connected")return;const n=Math.floor((Date.now()-l.connectedTime)/1e3),r=Math.floor(n/60),s=n%60;e.textContent=`${r.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`};t(),l.timerInterval=setInterval(t,1e3)}function de(){console.log("🔔 Sonnerie...")}function ue(){console.log("🔕 Arrêt sonnerie")}async function fe(){if(!l)return;const e=l.status==="connected",t=e&&l.connectedTime?Math.floor((Date.now()-l.connectedTime)/1e3):0;B&&(clearTimeout(B),B=null),l.timerInterval&&clearInterval(l.timerInterval),m&&(m.getTracks().forEach(r=>{r.stop()}),m=null),e&&await me(l.contact,l.type,t);const n=document.getElementById("callInterface");if(n&&n.remove(),t>0){const r=Math.floor(t/60),s=t%60;c(`📞 Appel terminé - ${r}:${s.toString().padStart(2,"0")}`,"info")}else c("📞 Appel annulé","info");l=null}async function me(e,t,n){try{const r=g();if(!r||!window.currentChat)return;const s=Math.floor(n/60),i=n%60,o=`${s}:${i.toString().padStart(2,"0")}`,u={id:Date.now(),senderId:r.id,receiverId:e.id,text:`${t==="video"?"📹 Appel vidéo":"📞 Appel vocal"} - ${o}`,sent:!0,time:new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}),timestamp:new Date().toISOString(),type:"call",callType:t,duration:n,status:"sent"};window.sendMessage&&await window.sendMessage(u)}catch(r){console.error("Erreur envoi message d'appel:",r)}}const j=new Map;let T=null,$=null,A=null;function ge(e,t){$=e,A=t,T&&clearInterval(T),T=setInterval(pe,2e3),console.log("Synchronisation temps réel initialisée")}async function pe(){try{const e=he();if(!e)return;const n=await(await fetch("http://localhost:5001/chats")).json();for(const r of n){if(r.id===e.id)continue;const s=r.messages||[],i=j.get(r.id)||0;if(s.length>i){const o=s.slice(i);for(const u of o)u.receiverId===e.id&&u.senderId===r.id&&$&&$(u);j.set(r.id,s.length)}}if(A)for(const r of n)r.id!==e.id&&A(r.id,r.isOnline||!1)}catch(e){console.error("Erreur synchronisation temps réel:",e)}}function he(){const e=localStorage.getItem("currentUser");return e?JSON.parse(e):null}async function P(e,t,n){try{await S(e,n);const r={...n,sent:!1,senderId:e,receiverId:t};await S(t,r);const s={lastMessage:n.type==="text"?n.text:ve(n),time:n.time,lastMessageTime:n.timestamp};return await C(e,s),await C(t,s),console.log("Message envoyé avec succès"),!0}catch(r){throw console.error("Erreur envoi message:",r),r}}function ve(e){switch(e.type){case"image":return"📷 Photo";case"video":return"🎥 Vidéo";case"audio":return"🎵 Audio";case"voice":return"🎤 Message vocal";case"document":return`📎 ${e.fileName}`;default:return e.text}}function ye(){console.log("Audio recorder configuré")}let h=[],a=null;window.currentChat=null;document.addEventListener("DOMContentLoaded",()=>{console.log("Application démarrée"),xe()});async function xe(){const e=document.getElementById("mainContainer"),t=document.getElementById("loginContainer"),n=g();n?(console.log("Utilisateur connecté:",n.name),s()):(console.log("Aucun utilisateur connecté"),r());function r(){e.style.display="none",t.style.display="block",t.innerHTML="";const i=ne(o=>{console.log("Connexion réussie pour:",o.name),s()});t.appendChild(i)}function s(){t.style.display="none",e.style.display="flex",we()}}async function we(){try{await be(),Ee(),Ue(),R(),ge(Xe,Ke),Ze(),ye(),console.log("Interface principale initialisée")}catch(e){console.error("Erreur initialisation:",e),c("Erreur de chargement","error")}}async function be(){try{if(h=await k(),v(),a){const e=await D(a.id);x(e)}}catch(e){console.error("Erreur chargement chats:",e),c("Impossible de charger les conversations","error")}}function Ee(){const e=document.getElementById("userAvatarButton");e&&e.addEventListener("click",De);const t=document.getElementById("backToChats");t&&t.addEventListener("click",V);const n=document.getElementById("logoutButton");n&&n.addEventListener("click",ee);const r=document.getElementById("backButton");r&&r.addEventListener("click",Ve),Pe(),Re(),Ie(),Be(),Ce(),Me(),window.addEventListener("resize",ze),Z(),Ge()}function Ie(){const e=document.getElementById("searchInput");e&&e.addEventListener("input",t=>{const n=t.target.value.toLowerCase().trim();$e(n)})}function Be(){const e=document.querySelectorAll(".filter-tab");e.forEach(t=>{t.addEventListener("click",()=>{e.forEach(r=>{r.classList.remove("active","bg-green-600","text-white"),r.classList.add("text-gray-400")}),t.classList.add("active","bg-green-600","text-white"),t.classList.remove("text-gray-400");const n=t.dataset.filter;Ae(n)})})}function Ce(){const e=document.getElementById("voiceCallBtn"),t=document.getElementById("videoCallBtn");e&&e.addEventListener("click",()=>{a&&re(a)}),t&&t.addEventListener("click",()=>{a&&se(a)})}function Me(){const e=document.getElementById("attachBtn"),t=document.getElementById("fileInput");e&&t&&(e.addEventListener("click",()=>{t.click()}),t.addEventListener("change",Te))}async function Te(e){const t=e.target.files[0];if(!(!t||!a))try{const n=await Le(t),r={id:Date.now(),text:t.name,sent:!0,time:new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}),timestamp:new Date().toISOString(),type:Se(t.type),fileData:n,fileName:t.name,fileSize:t.size,status:"sent"};await J(r),e.target.value=""}catch(n){console.error("Erreur upload fichier:",n),c("Erreur lors de l'envoi du fichier","error")}}function Le(e){return new Promise((t,n)=>{const r=new FileReader;r.readAsDataURL(e),r.onload=()=>t(r.result),r.onerror=s=>n(s)})}function Se(e){return e.startsWith("image/")?"image":e.startsWith("video/")?"video":e.startsWith("audio/")?"audio":"document"}function $e(e){document.querySelectorAll(".chat-item").forEach(n=>{var i,o;const r=((i=n.querySelector(".chat-name"))==null?void 0:i.textContent.toLowerCase())||"",s=((o=n.querySelector(".chat-message"))==null?void 0:o.textContent.toLowerCase())||"";r.includes(e)||s.includes(e)?n.style.display="block":n.style.display="none"})}function Ae(e){const t=g();if(!t)return;let n=h.filter(r=>r.id!==t.id);switch(e){case"unread":n=n.filter(r=>r.unread>0);break;case"favorites":n=n.filter(r=>r.isFavorite);break;case"groups":n=n.filter(r=>r.isGroup);break}ke(n)}function ke(e){const t=document.getElementById("chatList");t&&(t.innerHTML="",e.forEach(n=>{const r=z(n);t.appendChild(r)}))}function De(){const e=document.getElementById("sidebar"),t=document.getElementById("profilePanel"),n=document.getElementById("chatArea");e.style.display="none",n.style.display="none",t.style.display="flex",Ne()}function V(){const e=document.getElementById("sidebar"),t=document.getElementById("profilePanel"),n=document.getElementById("chatArea");t.style.display="none",e.style.display="flex",a&&(n.style.display="flex")}function Ne(){const e=g();if(e){const t=document.getElementById("profileImage"),n=document.getElementById("profileName");t&&(t.src=e.avatar,t.alt=e.name),n&&(n.textContent=e.name)}}function Ue(){const e=g(),t=document.querySelectorAll(".user-avatar img");e&&t.length>0&&t.forEach(n=>{n.src=e.avatar,n.alt=e.name})}function R(){const e=document.getElementById("messagesArea");e&&(e.innerHTML=`
      <div class="flex items-center justify-center h-full text-gray-500">
        <div class="text-center">
          <div class="text-8xl mb-4 opacity-30">
            <i class="fab fa-whatsapp text-green-500"></i>
          </div>
          <h2 class="text-3xl mb-4 font-light">WhatsApp Web</h2>
          <p class="text-gray-400 mb-2">Sélectionnez une conversation pour commencer</p>
          <div class="mt-8 flex justify-center">
            <div class="flex items-center text-gray-500 text-sm">
              <i class="fas fa-lock mr-2"></i>
              <span>Vos messages sont chiffrés de bout en bout</span>
            </div>
          </div>
        </div>
      </div>
    `)}function v(){const e=document.getElementById("chatList");if(!e)return;const t=g();if(!t)return;e.innerHTML="";const n=h.filter(r=>r.id!==t.id);n.sort((r,s)=>{const i=new Date(r.lastMessageTime||r.time);return new Date(s.lastMessageTime||s.time)-i}),n.forEach(r=>{const s=z(r);e.appendChild(s)})}function z(e){const t=document.createElement("div");t.className="chat-item px-4 py-3 cursor-pointer hover:bg-[#202c33] transition-colors border-b border-gray-700",t.dataset.chatId=e.id;const n=e.unread>0,r=e.isOnline;return t.innerHTML=`
    <div class="flex items-center space-x-3">
      <div class="relative">
        <img src="${e.avatar}" alt="${e.name}" class="w-12 h-12 rounded-full object-cover">
        ${r?'<div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#222e35]"></div>':""}
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex justify-between items-start">
          <h3 class="chat-name font-medium text-white truncate ${n?"font-semibold":""}">${e.name}</h3>
          <div class="flex flex-col items-end space-y-1">
            <span class="text-xs ${n?"text-green-400":"text-gray-400"}">${e.time}</span>
            ${n?`<span class="bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">${e.unread}</span>`:""}
          </div>
        </div>
        <div class="mt-1">
          <p class="chat-message text-sm ${n?"text-white font-medium":"text-gray-400"} truncate">${e.lastMessage}</p>
        </div>
      </div>
    </div>
  `,t.addEventListener("click",()=>je(e.id)),t}async function je(e){var t;V(),a=h.find(n=>n.id===e),window.currentChat=a,a&&(a.unread>0&&(a.unread=0,await C(a)),document.querySelectorAll(".chat-item").forEach(n=>{n.classList.remove("bg-[#202c33]")}),(t=document.querySelector(`[data-chat-id="${e}"]`))==null||t.classList.add("bg-[#202c33]"),N()&&(document.getElementById("sidebar").style.display="none"),document.getElementById("chatArea").style.display="flex",qe(),await x(),Fe(),v())}function qe(){const e=document.getElementById("chatHeader"),t=document.getElementById("chatAvatar"),n=document.getElementById("chatName"),r=document.getElementById("chatStatus");e&&a&&(e.style.display="flex",t.innerHTML=`<img src="${a.avatar}" alt="${a.name}" class="w-10 h-10 rounded-full object-cover">`,n.textContent=a.name,r.textContent=a.isOnline?"en ligne":a.status)}async function x(){const e=document.getElementById("messagesArea");if(!(!e||!a))try{const t=await D(a.id);a.messages=t,e.innerHTML="",t.forEach(n=>{const r=Oe(n);e.appendChild(r)}),e.scrollTop=e.scrollHeight}catch(t){console.error("Erreur lors du rendu des messages:",t),c("Erreur lors du chargement des messages","error")}}function Oe(e){const t=g(),n=e.senderId===t.id||e.sent===!0,r=document.createElement("div");r.className=`flex mb-4 ${n?"justify-end":"justify-start"}`,r.dataset.messageId=e.id;let s="";switch(e.type){case"image":s=`
        <img src="${e.fileData}" alt="${e.fileName}" class="max-w-xs rounded-lg mb-2 cursor-pointer" onclick="openImageModal('${e.fileData}')">
        <p class="text-sm">${e.text}</p>
      `;break;case"video":s=`
        <video src="${e.fileData}" controls class="max-w-xs rounded-lg mb-2">
          Votre navigateur ne supporte pas la lecture vidéo.
        </video>
        <p class="text-sm">${e.text}</p>
      `;break;case"audio":s=`
        <audio src="${e.fileData}" controls class="mb-2">
          Votre navigateur ne supporte pas la lecture audio.
        </audio>
        <p class="text-sm">${e.text}</p>
      `;break;case"document":s=`
        <div class="flex items-center space-x-2 mb-2 p-2 bg-gray-700 rounded">
          <i class="fas fa-file text-blue-400"></i>
          <div>
            <p class="text-sm font-medium">${e.fileName}</p>
            <p class="text-xs text-gray-400">${He(e.fileSize)}</p>
          </div>
        </div>
      `;break;case"voice":s=`
        <div class="voice-message flex items-center gap-3 p-3 min-w-[200px]">
          <button class="play-button w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white transition-colors">
            <i class="fas fa-play text-sm"></i>
          </button>
          <div class="voice-content flex-1">
            <div class="voice-waveform flex items-center gap-1 h-6 mb-1">
              ${Array(25).fill().map((i,o)=>`
                <div class="waveform-bar bg-gray-400 rounded-full transition-all duration-200" 
                     style="width: 2px; height: ${Math.random()*16+4}px;"></div>
              `).join("")}
            </div>
            <div class="flex justify-between items-center">
              <span class="duration text-xs text-gray-300">0:05</span>
            </div>
          </div>
        </div>
      `,setTimeout(()=>{const i=document.querySelector(`[data-message-id="${e.id}"]`);if(i){let M=function(){if(!e.fileData)return console.error("Pas de données audio disponibles"),null;try{return d=new Audio,d.src=e.fileData,d.preload="metadata",d.onerror=f=>{console.error("Erreur chargement audio:",f),b.textContent="Erreur"},d.onloadedmetadata=()=>{d.duration&&!isNaN(d.duration)&&isFinite(d.duration)?b.textContent=Je(d.duration):b.textContent="0:05"},d.onended=()=>{y=!1,u.innerHTML='<i class="fas fa-play text-sm"></i>',clearInterval(I),w.forEach(f=>{f.style.backgroundColor="#9ca3af"})},d.onpause=()=>{y=!1,u.innerHTML='<i class="fas fa-play text-sm"></i>',clearInterval(I)},d}catch(f){return console.error("Erreur création audio:",f),null}};var o=M;const u=i.querySelector(".play-button"),w=i.querySelectorAll(".waveform-bar"),b=i.querySelector(".duration");let y=!1,I=null,d=null;u.onclick=async()=>{try{if(!d&&(d=M(),!d)){c("Impossible de lire le message vocal","error");return}if(y)d.pause(),u.innerHTML='<i class="fas fa-play text-sm"></i>',clearInterval(I),w.forEach(f=>{f.style.backgroundColor="#9ca3af"}),y=!1;else try{await d.play(),u.innerHTML='<i class="fas fa-pause text-sm"></i>',y=!0,I=setInterval(()=>{w.forEach(f=>{const G=Math.random()*16+4;f.style.height=`${G}px`,f.style.backgroundColor="#10b981"})},100)}catch(f){console.error("Erreur lecture:",f),c("Erreur de lecture audio","error"),u.innerHTML='<i class="fas fa-play text-sm"></i>',y=!1}}catch(f){console.error("Erreur gestion lecture:",f),c("Erreur de lecture audio","error"),u.innerHTML='<i class="fas fa-play text-sm"></i>',y=!1}},M()}},100);break;default:s=`<p class="text-sm">${e.text}</p>`}return r.innerHTML=`
  <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${n?"bg-[#005c4b] text-white":"bg-[#202c33] text-white"} shadow-md">
    ${s}
    <div class="flex justify-end items-center mt-1 space-x-1">
      <span class="text-xs text-gray-300">${e.time}</span>
      ${n?`<i class="fas fa-check-double text-xs ${e.status==="read"?"text-blue-400":"text-gray-400"}"></i>`:""}
    </div>
  </div>
`,r}function He(e){if(e===0)return"0 Bytes";const t=1024,n=["Bytes","KB","MB","GB"],r=Math.floor(Math.log(e)/Math.log(t));return Number.parseFloat((e/Math.pow(t,r)).toFixed(2))+" "+n[r]}function Fe(){const e=document.getElementById("messageInput");e&&(e.style.display="flex")}function Pe(){const e=document.getElementById("messageText"),t=document.getElementById("sendButton"),n=document.getElementById("voiceBtn");if(!e||!t)return;async function r(){const s=e.value.trim();if(!(!s||!a))try{const i=g();if(!i)return;const o={id:Date.now(),senderId:i.id,receiverId:a.id,text:s,sent:!0,time:new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}),timestamp:new Date().toISOString(),type:"text",status:"sent"};e.value="",a.messages=a.messages||[],a.messages.push(o),a.lastMessage=s,a.time=o.time,a.lastMessageTime=o.timestamp,await P(i.id,a.id,o)}catch(i){console.error("Erreur envoi message:",i),c("Erreur lors de l'envoi","error")}}t.addEventListener("click",r),e.addEventListener("keypress",s=>{s.key==="Enter"&&!s.shiftKey&&(s.preventDefault(),r())}),n&&n.addEventListener("click",U)}async function J(e){if(a)try{a.messages.push(e),a.lastMessage=e.type==="text"?e.text:`📎 ${e.fileName||"Fichier"}`,a.time=e.time,a.lastMessageTime=e.timestamp,await S(a.id,e),await C(a),x(),v()}catch(t){console.error("Erreur envoi message:",t),c("Erreur lors de l'envoi","error")}}function Ve(){N()&&(document.getElementById("sidebar").style.display="flex",document.getElementById("chatArea").style.display="none"),a=null,window.currentChat=null,document.getElementById("chatHeader").style.display="none",document.getElementById("messageInput").style.display="none",R()}function Re(){const e=document.querySelectorAll(".nav-item");e.forEach(t=>{t.addEventListener("click",()=>{const n=t.dataset.view;switch(console.log("Navigation vers:",n),e.forEach(r=>r.classList.remove("active")),t.classList.add("active"),n){case"chats":break;case"status":c("Fonctionnalité Statuts bientôt disponible","info");break;case"communities":c("Fonctionnalité Communautés bientôt disponible","info");break;case"settings":c("Fonctionnalité Paramètres bientôt disponible","info");break}})})}function ze(){!N()&&a&&(document.getElementById("sidebar").style.display="flex",document.getElementById("chatArea").style.display="flex")}function N(){return window.innerWidth<768}let p=null,L=[];async function U(){try{if(!a){c("Sélectionnez une conversation d'abord","error");return}const e=await navigator.mediaDevices.getUserMedia({audio:!0});p=new MediaRecorder(e),L=[],p.ondataavailable=n=>{L.push(n.data)},p.onstop=async()=>{const n=new Blob(L,{type:"audio/mp3"});await We(n,a),e.getTracks().forEach(r=>r.stop())},p.start(),c("Enregistrement en cours... Cliquez à nouveau pour arrêter","info");const t=document.getElementById("voiceBtn");t.innerHTML='<i class="fas fa-stop text-xl text-red-500"></i>',t.onclick=W}catch(e){console.error("Erreur enregistrement vocal:",e),c("Impossible d'accéder au microphone","error")}}function W(){if(p&&p.state==="recording"){p.stop();const e=document.getElementById("voiceBtn");e.innerHTML='<i class="fas fa-microphone text-xl"></i>',e.onclick=U,c("Message vocal envoyé","success")}}function Je(e){if(!e||!isFinite(e)||isNaN(e))return"0:05";const t=Math.floor(e/60),n=Math.floor(e%60);return`${t}:${n.toString().padStart(2,"0")}`}async function We(e,t){try{const n=g();if(!n||!t)return;const r=await new Promise(i=>{const o=new FileReader;o.onloadend=()=>i(o.result),o.readAsDataURL(e)}),s={id:Date.now(),senderId:n.id,receiverId:t.id,text:"Message vocal",sent:!0,time:new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}),timestamp:new Date().toISOString(),type:"voice",fileData:r,status:"sent"};await J(s)}catch(n){console.error("Erreur envoi message vocal:",n),c("Erreur lors de l'envoi du message vocal","error")}}function Ge(){const e=document.getElementById("voiceBtn");e&&e.addEventListener("click",()=>{p&&p.state==="recording"?W():U()})}function Xe(e){const t=g();if(t)try{const n=h.find(r=>r.id===e.senderId||r.id===e.receiverId);if(!n)return;n.messages=n.messages||[],n.messages.push(e),n.lastMessage=e.text,n.time=e.time,n.lastMessageTime=e.timestamp,e.senderId!==t.id&&(!a||a.id!==n.id)&&(n.unread=(n.unread||0)+1,q(n.name,e.text)),a&&(a.id===n.id||a.id===e.senderId)&&x(),v()}catch(n){console.error("Erreur lors du traitement du nouveau message:",n)}}function Ke(e,t){try{const n=h.find(r=>r.id===e);if(n&&(n.isOnline=t,n.status=t?"en ligne":"hors ligne",v(),a&&a.id===e)){const r=document.getElementById("chatStatus");r&&(r.textContent=n.status)}}catch(n){console.error("Erreur mise à jour statut:",n)}}function Ze(){window.refreshInterval&&clearInterval(window.refreshInterval),window.refreshInterval=setInterval(async()=>{try{if(a){const t=await D(a.id);JSON.stringify(a.messages)!==JSON.stringify(t)&&(a.messages=t,x())}const e=await k();JSON.stringify(h)!==JSON.stringify(e)&&(h=e,v())}catch(e){console.error("Erreur rafraîchissement:",e)}},2e3)}window.renderMessages=x;window.renderChatList=v;window.sendVoiceMessage=async function(e){if(a)try{const t=g();if(!t)return;a.messages=a.messages||[],a.messages.push(e),a.lastMessage="🎤 Message vocal",a.time=e.time,a.lastMessageTime=e.timestamp,x(),v(),await P(t.id,a.id,e)}catch(t){console.error("Erreur envoi message vocal:",t),c("Erreur lors de l'envoi du message vocal","error")}};
