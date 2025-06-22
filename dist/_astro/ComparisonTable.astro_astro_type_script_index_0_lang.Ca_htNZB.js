const le="modulepreload",de=function(_){return"/"+_},W={},ue=function(w,k,I){let L=Promise.resolve();if(k&&k.length>0){let v=function(d){return Promise.all(d.map(C=>Promise.resolve(C).then(x=>({status:"fulfilled",value:x}),x=>({status:"rejected",reason:x}))))};document.getElementsByTagName("link");const p=document.querySelector("meta[property=csp-nonce]"),D=p?.nonce||p?.getAttribute("nonce");L=v(k.map(d=>{if(d=de(d),d in W)return;W[d]=!0;const C=d.endsWith(".css"),x=C?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${x}`))return;const g=document.createElement("link");if(g.rel=C?"stylesheet":le,C||(g.as="script"),g.crossOrigin="",g.href=d,D&&g.setAttribute("nonce",D),document.head.appendChild(g),C)return new Promise((b,m)=>{g.addEventListener("load",b),g.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${d}`)))})}))}function y(v){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=v,window.dispatchEvent(p),!p.defaultPrevented)throw v}return L.then(v=>{for(const p of v||[])p.status==="rejected"&&y(p.reason);return w().catch(y)})};document.addEventListener("DOMContentLoaded",()=>{const _=document.getElementById("table-body"),w=document.getElementById("result-count"),k=document.getElementById("column-controls-btn"),I=document.getElementById("column-controls");let L=window.fullInstanceData||Array.from(document.querySelectorAll(".instance-row")).map(e=>JSON.parse(e.dataset.instance||"{}")),y="ipv4_ipv6",v="",p="asc",D={},d=localStorage.getItem("selectedCurrency")||"USD",C={USD:1},x="",g=!1,b=null,m=1,E=100,u=[];const R=document.getElementById("page-size"),A=document.getElementById("prev-page"),F=document.getElementById("next-page"),H=document.getElementById("page-info"),V=document.getElementById("pagination-info");window.addEventListener("currencyChanged",e=>{const r=e,{currency:t,symbol:s,rates:n}=r.detail;d=t,C=n,document.querySelectorAll(".pricing-value[data-usd-price]").forEach(i=>{const o=parseFloat(i.getAttribute("data-usd-price")||"0");if(o>0){const c=n[t]||1,l=o*c;let a;if(["SEK","NOK","DKK"].includes(t))a=`${l.toFixed(2)} ${s}`;else if(t==="JPY")a=`${s}${Math.round(l)}`;else{const f=i.closest(".pricing-hourly")?4:2;a=`${s}${l.toFixed(f)}`}i.textContent=a}})});function q(e,r=!1){if(!e||e===0)return"-";const s={USD:"$",EUR:"€",GBP:"£",SEK:"kr",NOK:"kr",DKK:"kr",CHF:"Fr",CAD:"$",AUD:"$",JPY:"¥"}[d]||d,n=C[d]||1,i=e*n;if(["SEK","NOK","DKK"].includes(d)){const o=r?4:2;return`${i.toFixed(o)} ${s}`}else{if(d==="JPY")return`${s}${Math.round(i)}`;{const o=r?4:2;return`${s}${i.toFixed(o)}`}}}function S(e,r=!1){if(!e||e===0)return"-";const t=C.EUR||.92,s=e/t;return q(s,r)}const B=document.getElementById("search-input"),T=document.getElementById("clear-search");if(B){let e;B.addEventListener("input",r=>{x=r.target.value.toLowerCase(),T&&(x?T.classList.remove("hidden"):T.classList.add("hidden")),clearTimeout(e),e=setTimeout(()=>{J()},300)}),T&&T.addEventListener("click",()=>{B.value="",x="",T.classList.add("hidden"),J()})}k&&I&&(k.addEventListener("click",()=>{I.classList.toggle("hidden")}),document.addEventListener("click",e=>{!k.contains(e.target)&&!I.contains(e.target)&&I.classList.add("hidden")})),document.querySelectorAll('#column-controls input[type="checkbox"]').forEach(e=>{e.addEventListener("change",r=>{const t=r.target,s=t.id.replace("col-","col-"),n=t.checked;document.querySelectorAll(`.${s}`).forEach(o=>{n?o.classList.remove("hidden"):o.classList.add("hidden")})})}),document.querySelectorAll("th[data-sort]").forEach(e=>{e.addEventListener("click",()=>{const r=e.getAttribute("data-sort");r&&(v===r?p=p==="asc"?"desc":"asc":p="asc",v=r,X(r,p),Y())})});function M(){document.querySelectorAll(".regions-more-trigger").forEach(e=>{const r=e.querySelector(".all-regions-popup");if(!r)return;let t,s;e.addEventListener("mouseenter",()=>{clearTimeout(s),t=setTimeout(()=>{r.classList.remove("invisible")},200)}),e.addEventListener("mouseleave",()=>{clearTimeout(t),s=setTimeout(()=>{r.classList.add("invisible")},300)}),r.addEventListener("mouseenter",()=>{clearTimeout(s)}),r.addEventListener("mouseleave",()=>{s=setTimeout(()=>{r.classList.add("invisible")},300)})})}M(),document.addEventListener("filtersChanged",e=>{const t=e.detail;D=t,t.networkOptions?.length===1?y=t.networkOptions[0]:y="ipv4_ipv6",G(t),t.regions?.length&&Q(t.regions)});function Y(){if(document.querySelectorAll(".sort-icon").forEach(r=>{r.innerHTML='<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>',r.classList.remove("text-primary-600"),r.classList.add("text-gray-400")}),v){const r=document.querySelector(`th[data-sort="${v}"] .sort-icon`);r&&(r.classList.remove("text-gray-400"),r.classList.add("text-primary-600"),p==="asc"?r.innerHTML='<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4l6 6 6-6"></path>':r.innerHTML='<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 16l-6-6-6 6"></path>')}}function X(e,r){u.sort((t,s)=>{let n=t[e],i=s[e];if(e.includes(".")){const c=e.split(".");n=c.reduce((l,a)=>l?.[a],t),i=c.reduce((l,a)=>l?.[a],s)}if(n=z(n,e),i=z(i,e),n===null&&i===null)return 0;if(n===null)return 1;if(i===null)return-1;if(U(e)){const c=parseFloat(String(n)),l=parseFloat(String(i));if(isNaN(c)&&isNaN(l))return 0;if(isNaN(c))return 1;if(isNaN(l))return-1;const a=c-l;return r==="asc"?a:-a}else{const c=String(n).toLowerCase(),l=String(i).toLowerCase(),a=c.localeCompare(l,void 0,{numeric:!0});return r==="asc"?a:-a}}),P()}function z(e,r){if(e==null||e===""||e==="-")return null;if(Array.isArray(e))return e.length>0?e[0]:null;if(typeof e=="object")return null;if(r&&U(r)){if(typeof e=="number")return e;if(typeof e=="string"){const t=e.match(/^([\d.,]+)/);if(t){const s=t[1].replace(",",""),n=parseFloat(s);if(!isNaN(n))return n}}return null}return e}function U(e){return["vCPU","memoryGiB","diskSizeGB","priceUSD_hourly","priceUSD_monthly","priceEUR_hourly_net","priceEUR_monthly_net","network_speed","cpu_benchmark","hetzner_metadata.cpu_benchmark"].includes(e)||e.toLowerCase().includes("price")||e.toLowerCase().includes("cost")||e.toLowerCase().includes("cpu")||e.toLowerCase().includes("memory")||e.toLowerCase().includes("disk")||e.toLowerCase().includes("benchmark")}function Q(e){document.querySelectorAll(".regions-container").forEach(t=>{const s=JSON.parse(t.getAttribute("data-regions")||"[]");if(!s.length)return;const n=[...s].sort((i,o)=>{const c=e.some(a=>a===i.country||a===i.code||a===i.region),l=e.some(a=>a===o.country||a===o.code||a===o.region);return c&&!l?-1:!c&&l?1:0});Z(t,n)}),M()}function Z(e,r){e.innerHTML="";const s=r.slice(0,3),n=Math.max(0,r.length-3);if(s.forEach(i=>{const o=document.createElement("div");o.className="relative group",o.innerHTML=`
          <span class="inline-flex items-center space-x-1 cursor-pointer hover:bg-gray-100 px-1 py-0.5 rounded">
            <img 
              src="https://flagsapi.com/${i.countryCode}/flat/16.png"
              alt="${i.country}"
              class="w-4 h-3 rounded-sm"
              loading="lazy"
            />
            <span class="text-xs">${i.code}</span>
          </span>
          <div class="absolute z-20 invisible group-hover:visible bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg bottom-full left-1/2 transform -translate-x-1/2 mb-1 whitespace-nowrap">
            <div class="font-medium">${i.city}, ${i.country}</div>
            <div class="text-gray-300">${i.region}</div>
            <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        `,e.appendChild(o)}),n>0){const i=document.createElement("div");i.className="relative group cursor-pointer";const o=r.map(c=>`
          <div class="flex items-center space-x-2 py-1">
            <img 
              src="https://flagsapi.com/${c.countryCode}/flat/16.png"
              alt="${c.country}"
              class="w-4 h-3 rounded-sm flex-shrink-0"
              loading="lazy"
            />
            <div class="flex-1 min-w-0">
              <div class="text-xs font-medium text-gray-900 truncate">${c.city}, ${c.country}</div>
              <div class="text-xs text-gray-500 truncate">${c.code} • ${c.region}</div>
            </div>
          </div>
        `).join("");i.innerHTML=`
          <span class="text-xs text-gray-400 hover:text-gray-600">+${n}</span>
          <div class="all-regions-popup absolute z-30 invisible bg-white border border-gray-200 rounded-lg shadow-lg p-3 bottom-full right-0 mb-2 w-64">
            <div class="text-xs font-medium text-gray-900 mb-2">All Available Regions:</div>
            <div class="grid grid-cols-1 gap-1 max-h-40 overflow-y-auto">
              ${o}
            </div>
            <div class="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-200"></div>
          </div>
        `,i.className="relative regions-more-trigger cursor-pointer",e.appendChild(i)}}function G(e){const r=L.filter(t=>{if(e.providers?.length&&!e.providers.includes(t.provider))return!1;if(e.regions?.length){let n=!1;if(t.regionalPricing&&Array.isArray(t.regionalPricing)){const i=[];t.locationDetails&&Array.isArray(t.locationDetails)&&i.push(...t.locationDetails.filter(o=>e.regions.some(c=>c===o.country||c===o.code||c===o.region||c===o.city||c.toLowerCase()===o.country.toLowerCase()||c.toLowerCase()===o.code.toLowerCase()))),n=i.length>0&&i.some(o=>t.regionalPricing.some(c=>c.location===o.code))}else t.locationDetails&&Array.isArray(t.locationDetails)?n=t.locationDetails.some(i=>e.regions.some(o=>o===i.country||o===i.code||o===i.region||o===i.city||o.toLowerCase()===i.country.toLowerCase()||o.toLowerCase()===i.code.toLowerCase())):t.regions&&Array.isArray(t.regions)&&(n=t.regions.some(i=>e.regions.some(o=>o===i||o.toLowerCase()===i.toLowerCase())));if(!n)return!1}if(e.instanceTypes?.length&&!e.instanceTypes.includes(t.type))return!1;if(e.ipTypes?.length){const n=t.networkType||t.ipType;if(n&&!e.ipTypes.includes(n))return!1}if(e.networkOptions?.length){const n=t.networkType||t.networkOptions;if(n&&typeof n=="object"){if(!e.networkOptions.some(o=>n[o]&&n[o].available))return!1}else if(n&&typeof n=="string"&&!e.networkOptions.includes(n))return!1}if(t.vCPU<e.minVCPU||t.vCPU>e.maxVCPU||t.memoryGiB<e.minMemory||t.memoryGiB>e.maxMemory)return!1;let s=0;if(e.regions?.length===1&&t.regionalPricing&&t.locationDetails){const n=e.regions[0],i=t.locationDetails.find(o=>n===o.country||n===o.code||n.toLowerCase()===o.country.toLowerCase()||n.toLowerCase()===o.code.toLowerCase());if(i){const o=t.regionalPricing.find(c=>c.location===i.code);o&&o.hourly_net&&(s=o.hourly_net)}}if(s===0){if(t.networkOptions&&typeof t.networkOptions=="object"){const n=t.networkOptions[y];n&&n.available&&n.hourly!==null&&(s=n.hourly)}s===0&&(s=t.priceUSD_hourly||t.priceEUR_hourly_net||0)}return t.type==="cloud-server"&&t.instanceType==="cx22"&&console.log("  Final price to check:",s,"vs max price:",e.maxPrice),s>e.maxPrice?(t.type==="cloud-server"&&t.instanceType==="cx22"&&console.log("  FAILED price filter. Price:",s,"Max:",e.maxPrice),!1):(t.type==="cloud-server"&&t.instanceType==="cx22"&&console.log("  PASSED ALL FILTERS! 🎉"),!0)});console.log(`Filtered result: ${r.length} instances`),console.log("Filtered examples:",r.slice(0,5).map(t=>({instanceType:t.instanceType,type:t.type}))),u=r,m=1,x!==""?K():P(),e.regions?.length===1?ee(e.regions[0]):te()}function ee(e){document.querySelectorAll(".instance-row:not(.hidden)").forEach(r=>{const t=JSON.parse(r.dataset.instance||"{}");if(!t.locationDetails||!t.regionalPricing)return;const s=t.locationDetails.find(n=>e===n.country||e===n.code||e.toLowerCase()===n.country.toLowerCase()||e.toLowerCase()===n.code.toLowerCase());if(s){const n=t.regionalPricing.find(i=>i.location===s.code);if(n){const i=t.hetzner_metadata?.ipv4_primary_ip_cost||.5;let o=n.hourly_net,c=n.monthly_net;y==="ipv4_ipv6"&&(o+=i/730.44,c+=i);const l=r.querySelector(".pricing-hourly .pricing-value");l&&(l.textContent=S(o,!0));const a=r.querySelector(".pricing-monthly .pricing-value");a&&(a.textContent=S(c,!1));const h=r.querySelector('[data-network-info="true"]');if(h){const f=h.querySelector(".pricing-description");if(f){const $=y==="ipv4_ipv6"?"pricing (incl. IPv4)":"pricing";f.textContent=`${s.city} ${$}`,f.className="text-xs text-blue-600 pricing-description"}}if(n.included_traffic||n.traffic_price_per_tb){const f=document.createElement("div");f.className="text-xs text-gray-500 mt-1";let $="";if(n.included_traffic){const N=(n.included_traffic/1099511627776).toFixed(1);$+=`${N}TB included`}if(n.traffic_price_per_tb&&($&&($+=", "),$+=`€${n.traffic_price_per_tb}/TB overage`),$){f.textContent=$;const N=r.querySelector(".pricing-hourly");N&&!N.querySelector(".traffic-info")&&(f.classList.add("traffic-info"),N.appendChild(f))}}}}})}function te(){document.querySelectorAll(".instance-row:not(.hidden)").forEach(e=>{const r=JSON.parse(e.dataset.instance||"{}");e.querySelectorAll(".traffic-info").forEach(o=>o.remove());const s=e.querySelector(".pricing-hourly .pricing-value");if(s){const o=r.priceEUR_hourly_net,c=r.priceUSD_hourly;o?s.textContent=S(o,!0):c?s.textContent=q(c,!0):s.textContent="-"}const n=e.querySelector(".pricing-monthly .pricing-value");if(n){const o=r.priceEUR_monthly_net,c=r.priceUSD_monthly;o?n.textContent=S(o,!1):c?n.textContent=q(c,!1):n.textContent="-"}const i=e.querySelector('[data-network-info="true"]');if(i){const o=i.querySelector(".pricing-description");o&&(o.textContent="Standard pricing",o.className="text-xs text-gray-500 pricing-description")}})}function ne(){document.querySelectorAll('.instance-row:not([style*="display: none"])').forEach(e=>{const r=JSON.parse(e.dataset.instance||"{}"),t=e.querySelector(".pricing-mode-indicator"),s=e.querySelector(".pricing-description"),n=e.querySelector(".pricing-hourly"),i=e.querySelector(".pricing-monthly");if(r.networkOptions&&typeof r.networkOptions=="object"){const o=r.networkOptions[y];if(o&&o.available){if(t&&(t.textContent=y==="ipv6_only"?"IPv6-only":"IPv4 + IPv6",t.className=`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium pricing-mode-indicator ${y==="ipv6_only"?"bg-green-100 text-green-800":"bg-cyan-100 text-cyan-800"}`),s&&(y==="ipv6_only"&&o.savings?(s.textContent=`Saves €${o.savings.toFixed(2)}/month`,s.className="text-xs text-green-600 pricing-description"):(s.textContent=o.description||"Standard pricing",s.className="text-xs text-gray-500 pricing-description")),n&&o.hourly!==null){const c=n.querySelector(".pricing-value"),l=n.querySelector(".text-xs.text-orange-600");if(c){const a=o.priceRange?.hourly;if(a&&a.hasVariation){const h=S(a.min,!0),f=S(a.max,!0);c.textContent=`${h} - ${f}`,l&&(l.style.display="")}else c.textContent=S(o.hourly,!0),l&&(l.style.display="none")}}if(i&&o.monthly!==null){const c=i.querySelector(".pricing-value"),l=i.querySelector(".text-xs.text-orange-600");if(c){const a=o.priceRange?.monthly;if(a&&a.hasVariation){const h=S(a.min,!1),f=S(a.max,!1);c.textContent=`${h} - ${f}`,l&&(l.style.display="")}else c.textContent=S(o.monthly,!1),l&&(l.style.display="none")}}e.style.display=""}else y!=="all"&&y!=="ipv4_ipv6"&&(e.style.display="none")}})}function O(e){_&&(re(e),ne(),M())}function re(e){if(!_)return;const r=document.createDocumentFragment();e.forEach(t=>{const s=oe(t);r.appendChild(s)}),_.innerHTML="",_.appendChild(r)}function oe(e){const r=document.createElement("tr");return r.className="hover:bg-gray-50 instance-row",r.setAttribute("data-instance",JSON.stringify(e)),r.innerHTML=`
        <td class="col-provider px-3 py-3 whitespace-nowrap">
          <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-${j(e.provider)}-100 text-${j(e.provider)}-800">
            ${e.provider.toUpperCase()}
          </span>
        </td>
        <td class="col-instanceType px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
          <div class="max-w-48 truncate">${e.instanceType}</div>
        </td>
        <td class="col-type px-3 py-3 whitespace-nowrap">
          <div class="flex flex-col space-y-1">
            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              ${e.type.replace("cloud-","").replace("dedicated-","").replace("-"," ")}
            </span>
            ${e.platform?`<span class="text-xs text-gray-500 capitalize">${e.platform}</span>`:""}
          </div>
        </td>
        <td class="col-vCPU px-3 py-3 whitespace-nowrap text-sm text-gray-900">${e.vCPU||"-"}</td>
        <td class="col-memory px-3 py-3 whitespace-nowrap text-sm text-gray-900">${e.memoryGiB?`${e.memoryGiB} GiB`:"-"}</td>
        <td class="col-architecture px-3 py-3 whitespace-nowrap text-sm text-gray-900">
          <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            ${e.architecture||"x86"}
          </span>
        </td>
        <td class="col-disk px-3 py-3 whitespace-nowrap text-sm text-gray-900">
          <div class="flex flex-col">
            <span>${e.diskSizeGB?`${e.diskSizeGB} GB`:"-"}</span>
            ${e.diskType?`<span class="text-xs text-gray-500">${e.diskType}</span>`:""}
          </div>
        </td>
        <td class="col-networkSpeed px-3 py-3 whitespace-nowrap text-sm text-gray-900">
          <div class="flex flex-col">
            <span>${e.network_speed||"-"}</span>
            ${e.network_speed?'<span class="text-xs text-gray-500">Connection</span>':""}
          </div>
        </td>
        <td class="col-network px-3 py-3 whitespace-nowrap">
          <div class="flex flex-col space-y-1" data-network-info="true">
            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800 pricing-mode-indicator">
              IPv4 + IPv6
            </span>
            <span class="text-xs text-gray-500 pricing-description">Standard pricing</span>
          </div>
        </td>
        <td class="col-priceHour px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-900 pricing-hourly">
          <div class="flex flex-col">
            <span class="pricing-value" data-usd-price="${e.priceUSD_hourly||0}" data-eur-price="${e.priceEUR_hourly_net||0}">
              $${(e.priceUSD_hourly||e.priceEUR_hourly_net||0).toFixed(4)}
            </span>
          </div>
        </td>
        <td class="col-priceMonth px-3 py-3 whitespace-nowrap text-sm text-gray-900 pricing-monthly">
          <div class="flex flex-col">
            <span class="pricing-value" data-usd-price="${e.priceUSD_monthly||0}" data-eur-price="${e.priceEUR_monthly_net||0}">
              $${(e.priceUSD_monthly||e.priceEUR_monthly_net||0).toFixed(2)}
            </span>
          </div>
        </td>
        <td class="col-regions px-3 py-3 whitespace-nowrap text-sm text-gray-500">
          <div class="flex flex-wrap gap-1 max-w-32 relative regions-container" data-regions='${JSON.stringify(e.locationDetails||[])}'>
            ${se(e.locationDetails||e.regions||[])}
          </div>
        </td>
        <td class="col-description px-3 py-3 whitespace-nowrap text-sm text-gray-500 hidden">
          <div class="max-w-48 truncate" title="${e.description||""}">${e.description||"-"}</div>
        </td>
      `,r}function j(e){return{aws:"orange",azure:"blue",gcp:"green",hetzner:"red",oci:"purple",ovh:"indigo"}[e]||"gray"}function se(e){if(!e||e.length===0)return"-";const r=e.slice(0,3),t=Math.max(0,e.length-3);let s="";return r.forEach(n=>{typeof n=="string"?s+=`<span class="text-xs">${n}</span>`:n.code&&(s+=`
            <div class="relative group">
              <span class="inline-flex items-center space-x-1 cursor-pointer hover:bg-gray-100 px-1 py-0.5 rounded">
                <img src="https://flagsapi.com/${n.countryCode}/flat/16.png" alt="${n.country}" class="w-4 h-3 rounded-sm" loading="lazy" />
                <span class="text-xs">${n.code}</span>
              </span>
            </div>
          `)}),t>0&&(s+=`<span class="text-xs text-gray-400">+${t}</span>`),s}function ie(){if(!H||!V)return;const e=Math.ceil(u.length/E),r=(m-1)*E+1,t=Math.min(m*E,u.length);H.textContent=`Page ${m} of ${e}`,V.textContent=E===u.length?`Showing all ${u.length} instances`:`Showing ${r}-${t} of ${u.length} instances`,A&&(A.disabled=m===1),F&&(F.disabled=m===e||e===0),w&&(w.textContent=`${u.length} instances`)}function P(){if(E===u.length)O(u);else{const e=(m-1)*E,r=e+E,t=u.slice(e,r);O(t)}ie()}function K(){let e=u;x!==""&&(e=u.filter(r=>ce(r,x))),u=e,m=1,P()}function J(){K()}function ce(e,r){return[e.instanceType,e.provider,e.type,e.description,e.architecture,e.diskType,e.cpu_description,e.ram_description,e.storage_description,...e.regions||[],...(e.locationDetails||[]).map(s=>[s.city,s.country,s.code]).flat()].some(s=>s&&s.toString().toLowerCase().includes(r))}function ae(){const e=document.getElementById("instances-table");if(!e)return;e.querySelectorAll("th").forEach(t=>{const s=document.createElement("div");s.className="resize-handle",s.style.cssText=`
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          cursor: col-resize;
          user-select: none;
          background: transparent;
        `,s.addEventListener("mousedown",n=>{n.preventDefault(),g=!0,b=t,document.body.style.cursor="col-resize",document.body.style.userSelect="none"}),t.style.position="relative",t.appendChild(s)}),document.addEventListener("mousemove",t=>{if(!g||!b)return;const s=b.getBoundingClientRect(),n=t.clientX-s.left;if(n>50){b.style.width=n+"px",b.style.minWidth=n+"px";const i=document.getElementById("instances-table");if(i){const o=Array.from(b.parentElement?.children||[]).indexOf(b);i.querySelectorAll("tbody tr").forEach(l=>{const a=l.children[o];if(a){const h=a.querySelector("div");h&&(h.style.maxWidth=n+"px",h.classList.remove("max-w-24","max-w-32","max-w-48"),n>200?h.classList.remove("truncate"):h.classList.add("truncate"))}})}}}),document.addEventListener("mouseup",()=>{g&&(g=!1,b=null,document.body.style.cursor="",document.body.style.userSelect="")})}window.addEventListener("providersSelectionChanged",async e=>{const r=e,{selectedProviders:t,action:s}=r.detail;if(s==="load"&&t.length>0)try{w&&(w.textContent="Loading providers...");const{loadSelectedProviders:n}=await ue(async()=>{const{loadSelectedProviders:o}=await import("./dynamic-loader.BHiLaTpp.js");return{loadSelectedProviders:o}},[]),i=await n(t);if(i.length>0){L=i,O(L),w&&(w.textContent=`${L.length} instances`);const o=D;Object.keys(o).length>0&&G(o),console.log(`🔄 Dynamically loaded ${i.length} instances from providers:`,t)}}catch(n){console.error("Error loading provider data:",n),w&&(w.textContent="Error loading data")}}),R&&R.addEventListener("change",e=>{const r=e.target;E=r.value==="all"?u.length:parseInt(r.value),m=1,P()}),A&&A.addEventListener("click",()=>{m>1&&(m--,P())}),F&&F.addEventListener("click",()=>{const e=Math.ceil(u.length/E);m<e&&(m++,P())}),u=L,P(),ae(),setTimeout(()=>{const e=new CustomEvent("requestCurrencyData");window.dispatchEvent(e)},100)});
