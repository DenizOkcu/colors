var Lib=function(){"use strict";function l(t){return function(t){if(Array.isArray(t)){for(var r=0,n=new Array(t.length);r<t.length;r++)n[r]=t[r];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function b(t,r,n){t/=255,r/=255,n/=255;var a=Math.min(t,r,n),e=Math.max(t,r,n),o=e-a,u=0,h=0;return u=0==o?0:e==t?(r-n)/o%6:e==r?(n-t)/o+2:(t-r)/o+4,(u=Math.round(60*u))<0&&(u+=360),h=(e+a)/2,[u,+(100*(0==o?0:o/(1-Math.abs(2*h-1)))).toFixed(1),h=+(100*h).toFixed(1)]}function t(t,r){var n=480,a=t.height/(t.width/n),e=r.getContext("2d"),o=[],u=[],h=[];r.width=960,r.height=a,e.drawImage(t,0,0,n,a);for(var i=e.getImageData(0,0,n,a),c=function(t){for(var r=[],n=0;n<t.length;){var a={r:t[n+0],g:t[n+1],b:t[n+2],a:t[n+3]},e=b(a.r,a.g,a.b);a.h=e[0],a.s=e[1],a.l=e[2],r.push(a),n+=4}return r}(i.data),g=0;g<c.length;g++){var f=c[g];300<f.h||f.h<=60?o.push(f):60<f.h&&f.h<=180?u.push(f):180<f.h&&f.h<=300&&h.push(f)}var s=function(t){for(var r=[],n=0;n<t.length;n++)r.push(t[n].r),r.push(t[n].g),r.push(t[n].b),r.push(t[n].a);return r}([].concat(l(o.sort(function(t,r){return r.r===t.r?r.l-t.l:r.r-t.r})),l(u.sort(function(t,r){return r.g===t.g?r.l-t.l:r.g-t.g})),l(h.sort(function(t,r){return r.b===t.b?r.l-t.l:r.b-t.b}))));i.data.set(s),e.putImageData(i,n,0)}return function(){return{draw:t}}}();
//# sourceMappingURL=main.js.map
