const Q="modulepreload",Z=function(b){return"/"+b},B={},ee=function(h,E,_){let L=Promise.resolve();if(E&&E.length>0){let x=function(p){return Promise.all(p.map(v=>Promise.resolve(v).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};document.getElementsByTagName("link");const m=document.querySelector("meta[property=csp-nonce]"),k=m?.nonce||m?.getAttribute("nonce");L=x(E.map(p=>{if(p=Z(p),p in B)return;B[p]=!0;const v=p.endsWith(".css"),f=v?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${p}"]${f}`))return;const g=document.createElement("link");if(g.rel=v?"stylesheet":Q,v||(g.as="script"),g.crossOrigin="",g.href=p,k&&g.setAttribute("nonce",k),document.head.appendChild(g),v)return new Promise((w,P)=>{g.addEventListener("load",w),g.addEventListener("error",()=>P(new Error(`Unable to preload CSS for ${p}`)))})}))}function y(x){const m=new Event("vite:preloadError",{cancelable:!0});if(m.payload=x,window.dispatchEvent(m),!m.defaultPrevented)throw x}return L.then(x=>{for(const m of x||[])m.status==="rejected"&&y(m.reason);return h().catch(y)})};document.addEventListener("DOMContentLoaded",()=>{const b=document.getElementById("table-body"),h=document.getElementById("result-count"),E=document.getElementById("column-controls-btn"),_=document.getElementById("column-controls");let L=Array.from(document.querySelectorAll(".instance-row")).map(e=>JSON.parse(e.dataset.instance||"{}")),y="ipv4_ipv6",x="",m="asc",k={},p=localStorage.getItem("selectedCurrency")||"USD",v={USD:1},f="",g=!1,w=null;window.addEventListener("currencyChanged",e=>{const o=e,{currency:t,symbol:s,rates:n}=o.detail;p=t,v=n,document.querySelectorAll(".pricing-value[data-usd-price]").forEach(i=>{const r=parseFloat(i.getAttribute("data-usd-price")||"0");if(r>0){const c=n[t]||1,u=r*c;let a;if(["SEK","NOK","DKK"].includes(t))a=`${u.toFixed(2)} ${s}`;else if(t==="JPY")a=`${s}${Math.round(u)}`;else{const l=i.closest(".pricing-hourly")?4:2;a=`${s}${u.toFixed(l)}`}i.textContent=a}})});function P(e,o=!1){if(!e||e===0)return"-";const s={USD:"$",EUR:"€",GBP:"£",SEK:"kr",NOK:"kr",DKK:"kr",CHF:"Fr",CAD:"$",AUD:"$",JPY:"¥"}[p]||p,n=v[p]||1,i=e*n;if(["SEK","NOK","DKK"].includes(p)){const r=o?4:2;return`${i.toFixed(r)} ${s}`}else{if(p==="JPY")return`${s}${Math.round(i)}`;{const r=o?4:2;return`${s}${i.toFixed(r)}`}}}function C(e,o=!1){if(!e||e===0)return"-";const t=v.EUR||.92,s=e/t;return P(s,o)}const D=document.getElementById("search-input"),$=document.getElementById("clear-search");D&&(D.addEventListener("input",e=>{f=e.target.value.toLowerCase(),$&&(f?$.classList.remove("hidden"):$.classList.add("hidden")),q()}),$&&$.addEventListener("click",()=>{D.value="",f="",$.classList.add("hidden"),q()})),E&&_&&(E.addEventListener("click",()=>{_.classList.toggle("hidden")}),document.addEventListener("click",e=>{!E.contains(e.target)&&!_.contains(e.target)&&_.classList.add("hidden")})),document.querySelectorAll('#column-controls input[type="checkbox"]').forEach(e=>{e.addEventListener("change",o=>{const t=o.target,s=t.id.replace("col-","col-"),n=t.checked;document.querySelectorAll(`.${s}`).forEach(r=>{n?r.classList.remove("hidden"):r.classList.add("hidden")})})}),document.querySelectorAll("th[data-sort]").forEach(e=>{e.addEventListener("click",()=>{const o=e.getAttribute("data-sort");o&&(x===o?m=m==="asc"?"desc":"asc":m="asc",x=o,z(o,m),M())})});function A(){document.querySelectorAll(".regions-more-trigger").forEach(e=>{const o=e.querySelector(".all-regions-popup");if(!o)return;let t,s;e.addEventListener("mouseenter",()=>{clearTimeout(s),t=setTimeout(()=>{o.classList.remove("invisible")},200)}),e.addEventListener("mouseleave",()=>{clearTimeout(t),s=setTimeout(()=>{o.classList.add("invisible")},300)}),o.addEventListener("mouseenter",()=>{clearTimeout(s)}),o.addEventListener("mouseleave",()=>{s=setTimeout(()=>{o.classList.add("invisible")},300)})})}A(),document.addEventListener("filtersChanged",e=>{const t=e.detail;k=t,t.networkOptions?.length===1?y=t.networkOptions[0]:y="ipv4_ipv6",I(t),t.regions?.length&&R(t.regions)});function M(){if(document.querySelectorAll(".sort-icon").forEach(o=>{o.innerHTML='<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>',o.classList.remove("text-primary-600"),o.classList.add("text-gray-400")}),x){const o=document.querySelector(`th[data-sort="${x}"] .sort-icon`);o&&(o.classList.remove("text-gray-400"),o.classList.add("text-primary-600"),m==="asc"?o.innerHTML='<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4l6 6 6-6"></path>':o.innerHTML='<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 16l-6-6-6 6"></path>')}}function z(e,o){const s=Array.from(document.querySelectorAll(".instance-row:not(.hidden)")).map(n=>JSON.parse(n.dataset.instance||"{}"));s.sort((n,i)=>{let r=n[e],c=i[e];if(e.includes(".")){const a=e.split(".");r=a.reduce((d,l)=>d?.[l],n),c=a.reduce((d,l)=>d?.[l],i)}if(r=F(r,e),c=F(c,e),r===null&&c===null)return 0;if(r===null)return 1;if(c===null)return-1;if(U(e)){const a=parseFloat(String(r)),d=parseFloat(String(c));if(isNaN(a)&&isNaN(d))return 0;if(isNaN(a))return 1;if(isNaN(d))return-1;const l=a-d;return o==="asc"?l:-l}else{const a=String(r).toLowerCase(),d=String(c).toLowerCase(),l=a.localeCompare(d,void 0,{numeric:!0});return o==="asc"?l:-l}}),N(s)}function F(e,o){if(e==null||e===""||e==="-")return null;if(Array.isArray(e))return e.length>0?e[0]:null;if(typeof e=="object")return null;if(o&&U(o)){if(typeof e=="number")return e;if(typeof e=="string"){const t=e.match(/^([\d.,]+)/);if(t){const s=t[1].replace(",",""),n=parseFloat(s);if(!isNaN(n))return n}}return null}return e}function U(e){return["vCPU","memoryGiB","diskSizeGB","priceUSD_hourly","priceUSD_monthly","priceEUR_hourly_net","priceEUR_monthly_net","network_speed","cpu_benchmark","hetzner_metadata.cpu_benchmark"].includes(e)||e.toLowerCase().includes("price")||e.toLowerCase().includes("cost")||e.toLowerCase().includes("cpu")||e.toLowerCase().includes("memory")||e.toLowerCase().includes("disk")||e.toLowerCase().includes("benchmark")}function R(e){document.querySelectorAll(".regions-container").forEach(t=>{const s=JSON.parse(t.getAttribute("data-regions")||"[]");if(!s.length)return;const n=[...s].sort((i,r)=>{const c=e.some(a=>a===i.country||a===i.code||a===i.region),u=e.some(a=>a===r.country||a===r.code||a===r.region);return c&&!u?-1:!c&&u?1:0});H(t,n)}),A()}function H(e,o){e.innerHTML="";const s=o.slice(0,3),n=Math.max(0,o.length-3);if(s.forEach(i=>{const r=document.createElement("div");r.className="relative group",r.innerHTML=`
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
        `,e.appendChild(r)}),n>0){const i=document.createElement("div");i.className="relative group cursor-pointer";const r=o.map(c=>`
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
              ${r}
            </div>
            <div class="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-200"></div>
          </div>
        `,i.className="relative regions-more-trigger cursor-pointer",e.appendChild(i)}}function I(e){const o=L.filter(t=>{if(e.providers?.length&&!e.providers.includes(t.provider))return!1;if(e.regions?.length){let n=!1;if(t.regionalPricing&&Array.isArray(t.regionalPricing)){const i=[];t.locationDetails&&Array.isArray(t.locationDetails)&&i.push(...t.locationDetails.filter(r=>e.regions.some(c=>c===r.country||c===r.code||c===r.region||c===r.city||c.toLowerCase()===r.country.toLowerCase()||c.toLowerCase()===r.code.toLowerCase()))),n=i.length>0&&i.some(r=>t.regionalPricing.some(c=>c.location===r.code))}else t.locationDetails&&Array.isArray(t.locationDetails)?n=t.locationDetails.some(i=>e.regions.some(r=>r===i.country||r===i.code||r===i.region||r===i.city||r.toLowerCase()===i.country.toLowerCase()||r.toLowerCase()===i.code.toLowerCase())):t.regions&&Array.isArray(t.regions)&&(n=t.regions.some(i=>e.regions.some(r=>r===i||r.toLowerCase()===i.toLowerCase())));if(!n)return!1}if(e.instanceTypes?.length&&!e.instanceTypes.includes(t.type))return!1;if(e.ipTypes?.length){const n=t.networkType||t.ipType;if(n&&!e.ipTypes.includes(n))return!1}if(e.networkOptions?.length){const n=t.networkType||t.networkOptions;if(n&&typeof n=="object"){if(!e.networkOptions.some(r=>n[r]&&n[r].available))return!1}else if(n&&typeof n=="string"&&!e.networkOptions.includes(n))return!1}if(t.vCPU<e.minVCPU||t.vCPU>e.maxVCPU||t.memoryGiB<e.minMemory||t.memoryGiB>e.maxMemory)return!1;let s=0;if(e.regions?.length===1&&t.regionalPricing&&t.locationDetails){const n=e.regions[0],i=t.locationDetails.find(r=>n===r.country||n===r.code||n.toLowerCase()===r.country.toLowerCase()||n.toLowerCase()===r.code.toLowerCase());if(i){const r=t.regionalPricing.find(c=>c.location===i.code);r&&r.hourly_net&&(s=r.hourly_net)}}if(s===0){if(t.networkOptions&&typeof t.networkOptions=="object"){const n=t.networkOptions[y];n&&n.available&&n.hourly!==null&&(s=n.hourly)}s===0&&(s=t.priceUSD_hourly||t.priceEUR_hourly_net||0)}return t.type==="cloud-server"&&t.instanceType==="cx22"&&console.log("  Final price to check:",s,"vs max price:",e.maxPrice),s>e.maxPrice?(t.type==="cloud-server"&&t.instanceType==="cx22"&&console.log("  FAILED price filter. Price:",s,"Max:",e.maxPrice),!1):(t.type==="cloud-server"&&t.instanceType==="cx22"&&console.log("  PASSED ALL FILTERS! 🎉"),!0)});console.log(`Filtered result: ${o.length} instances`),console.log("Filtered examples:",o.slice(0,5).map(t=>({instanceType:t.instanceType,type:t.type}))),N(o),f!==""&&q(),e.regions?.length===1?V(e.regions[0]):J(),f===""&&h&&(h.textContent=`${o.length} instances`)}function V(e){document.querySelectorAll(".instance-row:not(.hidden)").forEach(o=>{const t=JSON.parse(o.dataset.instance||"{}");if(!t.locationDetails||!t.regionalPricing)return;const s=t.locationDetails.find(n=>e===n.country||e===n.code||e.toLowerCase()===n.country.toLowerCase()||e.toLowerCase()===n.code.toLowerCase());if(s){const n=t.regionalPricing.find(i=>i.location===s.code);if(n){const i=t.hetzner_metadata?.ipv4_primary_ip_cost||.5;let r=n.hourly_net,c=n.monthly_net;y==="ipv4_ipv6"&&(r+=i/730.44,c+=i);const u=o.querySelector(".pricing-hourly .pricing-value");u&&(u.textContent=C(r,!0));const a=o.querySelector(".pricing-monthly .pricing-value");a&&(a.textContent=C(c,!1));const d=o.querySelector('[data-network-info="true"]');if(d){const l=d.querySelector(".pricing-description");if(l){const S=y==="ipv4_ipv6"?"pricing (incl. IPv4)":"pricing";l.textContent=`${s.city} ${S}`,l.className="text-xs text-blue-600 pricing-description"}}if(n.included_traffic||n.traffic_price_per_tb){const l=document.createElement("div");l.className="text-xs text-gray-500 mt-1";let S="";if(n.included_traffic){const T=(n.included_traffic/1099511627776).toFixed(1);S+=`${T}TB included`}if(n.traffic_price_per_tb&&(S&&(S+=", "),S+=`€${n.traffic_price_per_tb}/TB overage`),S){l.textContent=S;const T=o.querySelector(".pricing-hourly");T&&!T.querySelector(".traffic-info")&&(l.classList.add("traffic-info"),T.appendChild(l))}}}}})}function J(){document.querySelectorAll(".instance-row:not(.hidden)").forEach(e=>{const o=JSON.parse(e.dataset.instance||"{}");e.querySelectorAll(".traffic-info").forEach(r=>r.remove());const s=e.querySelector(".pricing-hourly .pricing-value");if(s){const r=o.priceEUR_hourly_net,c=o.priceUSD_hourly;r?s.textContent=C(r,!0):c?s.textContent=P(c,!0):s.textContent="-"}const n=e.querySelector(".pricing-monthly .pricing-value");if(n){const r=o.priceEUR_monthly_net,c=o.priceUSD_monthly;r?n.textContent=C(r,!1):c?n.textContent=P(c,!1):n.textContent="-"}const i=e.querySelector('[data-network-info="true"]');if(i){const r=i.querySelector(".pricing-description");r&&(r.textContent="Standard pricing",r.className="text-xs text-gray-500 pricing-description")}})}function K(){document.querySelectorAll('.instance-row:not([style*="display: none"])').forEach(e=>{const o=JSON.parse(e.dataset.instance||"{}"),t=e.querySelector(".pricing-mode-indicator"),s=e.querySelector(".pricing-description"),n=e.querySelector(".pricing-hourly"),i=e.querySelector(".pricing-monthly");if(o.networkOptions&&typeof o.networkOptions=="object"){const r=o.networkOptions[y];if(r&&r.available){if(t&&(t.textContent=y==="ipv6_only"?"IPv6-only":"IPv4 + IPv6",t.className=`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium pricing-mode-indicator ${y==="ipv6_only"?"bg-green-100 text-green-800":"bg-cyan-100 text-cyan-800"}`),s&&(y==="ipv6_only"&&r.savings?(s.textContent=`Saves €${r.savings.toFixed(2)}/month`,s.className="text-xs text-green-600 pricing-description"):(s.textContent=r.description||"Standard pricing",s.className="text-xs text-gray-500 pricing-description")),n&&r.hourly!==null){const c=n.querySelector(".pricing-value"),u=n.querySelector(".text-xs.text-orange-600");if(c){const a=r.priceRange?.hourly;if(a&&a.hasVariation){const d=C(a.min,!0),l=C(a.max,!0);c.textContent=`${d} - ${l}`,u&&(u.style.display="")}else c.textContent=C(r.hourly,!0),u&&(u.style.display="none")}}if(i&&r.monthly!==null){const c=i.querySelector(".pricing-value"),u=i.querySelector(".text-xs.text-orange-600");if(c){const a=r.priceRange?.monthly;if(a&&a.hasVariation){const d=C(a.min,!1),l=C(a.max,!1);c.textContent=`${d} - ${l}`,u&&(u.style.display="")}else c.textContent=C(r.monthly,!1),u&&(u.style.display="none")}}e.style.display=""}else y!=="all"&&y!=="ipv4_ipv6"&&(e.style.display="none")}})}function N(e){b&&(j(e),K(),A())}function j(e){b&&(b.innerHTML="",e.forEach(o=>{const t=G(o);b.appendChild(t)}))}function G(e){const o=document.createElement("tr");return o.className="hover:bg-gray-50 instance-row",o.setAttribute("data-instance",JSON.stringify(e)),o.innerHTML=`
        <td class="col-provider px-3 py-3 whitespace-nowrap">
          <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-${O(e.provider)}-100 text-${O(e.provider)}-800">
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
            ${W(e.locationDetails||e.regions||[])}
          </div>
        </td>
        <td class="col-description px-3 py-3 whitespace-nowrap text-sm text-gray-500 hidden">
          <div class="max-w-48 truncate" title="${e.description||""}">${e.description||"-"}</div>
        </td>
      `,o}function O(e){return{aws:"orange",azure:"blue",gcp:"green",hetzner:"red",oci:"purple",ovh:"indigo"}[e]||"gray"}function W(e){if(!e||e.length===0)return"-";const o=e.slice(0,3),t=Math.max(0,e.length-3);let s="";return o.forEach(n=>{typeof n=="string"?s+=`<span class="text-xs">${n}</span>`:n.code&&(s+=`
            <div class="relative group">
              <span class="inline-flex items-center space-x-1 cursor-pointer hover:bg-gray-100 px-1 py-0.5 rounded">
                <img src="https://flagsapi.com/${n.countryCode}/flat/16.png" alt="${n.country}" class="w-4 h-3 rounded-sm" loading="lazy" />
                <span class="text-xs">${n.code}</span>
              </span>
            </div>
          `)}),t>0&&(s+=`<span class="text-xs text-gray-400">+${t}</span>`),s}function q(){const e=document.querySelectorAll(".instance-row");let o=0;f===""?e.forEach(t=>{const s=t;s.style.display="",o++}):e.forEach(t=>{const s=t,n=JSON.parse(s.dataset.instance||"{}");Y(n,f)?(s.style.display="",o++):s.style.display="none"}),h&&(h.textContent=`${o} instances`)}function Y(e,o){return[e.instanceType,e.provider,e.type,e.description,e.architecture,e.diskType,e.cpu_description,e.ram_description,e.storage_description,...e.regions||[],...(e.locationDetails||[]).map(s=>[s.city,s.country,s.code]).flat()].some(s=>s&&s.toString().toLowerCase().includes(o))}function X(){const e=document.getElementById("instances-table");if(!e)return;e.querySelectorAll("th").forEach(t=>{const s=document.createElement("div");s.className="resize-handle",s.style.cssText=`
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          cursor: col-resize;
          user-select: none;
          background: transparent;
        `,s.addEventListener("mousedown",n=>{n.preventDefault(),g=!0,w=t,document.body.style.cursor="col-resize",document.body.style.userSelect="none"}),t.style.position="relative",t.appendChild(s)}),document.addEventListener("mousemove",t=>{if(!g||!w)return;const s=w.getBoundingClientRect(),n=t.clientX-s.left;if(n>50){w.style.width=n+"px",w.style.minWidth=n+"px";const i=document.getElementById("instances-table");if(i){const r=Array.from(w.parentElement?.children||[]).indexOf(w);i.querySelectorAll("tbody tr").forEach(u=>{const a=u.children[r];if(a){const d=a.querySelector("div");d&&(d.style.maxWidth=n+"px",d.classList.remove("max-w-24","max-w-32","max-w-48"),n>200?d.classList.remove("truncate"):d.classList.add("truncate"))}})}}}),document.addEventListener("mouseup",()=>{g&&(g=!1,w=null,document.body.style.cursor="",document.body.style.userSelect="")})}window.addEventListener("providersSelectionChanged",async e=>{const o=e,{selectedProviders:t,action:s}=o.detail;if(s==="load"&&t.length>0)try{h&&(h.textContent="Loading providers...");const{loadSelectedProviders:n}=await ee(async()=>{const{loadSelectedProviders:r}=await import("./dynamic-loader.BHiLaTpp.js");return{loadSelectedProviders:r}},[]),i=await n(t);if(i.length>0){L=i,N(L),h&&(h.textContent=`${L.length} instances`);const r=k;Object.keys(r).length>0&&I(r),console.log(`🔄 Dynamically loaded ${i.length} instances from providers:`,t)}}catch(n){console.error("Error loading provider data:",n),h&&(h.textContent="Error loading data")}}),X(),setTimeout(()=>{const e=new CustomEvent("requestCurrencyData");window.dispatchEvent(e)},100)});
