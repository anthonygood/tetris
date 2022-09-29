(()=>{var t={302:(t,e,o)=>{const{countNeighbourValues:r,map:i}=o(803),s=(t,e)=>Number(((t,e)=>3===e||t&&2===e)(t,e)),n=(t,e,o,i)=>s(t,r(e,i));t.exports={countNeighbourValues:r,liveOrDie:s,tick:t=>i(t,n)}},803:t=>{const e=(t,e,o=0)=>Array.from({length:e}).map((()=>new Array(t).fill(o))),o=t=>t.length,r=t=>t[0]?.length,i=(t,e)=>t.forEach(((o,r)=>o.forEach(((i,s)=>e(i,[r,s],o,t))))),s=(t,e)=>t.map(((o,r)=>o.map(((i,s)=>e(i,[r,s],o,t))))),n=t=>t.reduce(((t,e)=>Array.isArray(e)?t.concat(n(e)):t.concat(e)),[]),h=([t,e],o,r)=>{for(let i=t-1;i<=t+1;i++)for(let s=e-1;s<=e+1;s++){if(i===t&&s===e)continue;const n=o[i]&&o[i][s];void 0!==n&&r(n,i,s,o)}},a=(t,e,o)=>{const r=[];return h(t,e,(t=>r.push(o(t)))),r},c=(t,e)=>t.length>e.length?t:e,d=t=>s=>{const n=r(s),h=o(s),a=e(h,n);return i(s,((e,[o,r],i,s)=>{const[c,d]=t(o,r,n,h);a[c][d]=e})),a},l=d(((t,e,o,r)=>[e,r-1-t])),u=d(((t,e,o,r)=>[o-1-e,t])),m=t=>(o,r,i=0)=>{const{length:n}=c(o,r),{length:h}=c(o[0],r[0]);return s(e(h,n),((e,[s,n],h,a)=>t(o[s]?.[n],r[s]?.[n],i)))},g=m(((t,e,o)=>t||e||o)),f=m(((t=0,e=0)=>t+e)),p=m(((t=0,e=0)=>t&&e));t.exports={add:f,blank:e,countNeighbourValues:(t,e)=>((t,e)=>a(t,e,(t=>t)))(t,e).reduce(((t,e)=>t+e),0),debug:(t,e=!1)=>{t.map((t=>e?t.join(","):t)).forEach((t=>console.log(t)))},forEach:i,findIndex:(t,e)=>{for(let o=0;o<t.length;o++)for(let r=0;r<t[o].length;r++)if(e(t[o][r],[o,r],t[o],t))return[o,r]},flatten:n,forEveryNeighbour:h,height:o,intersection:p,map:s,mapNeighbours:a,superimpose:(t,s,n,h,{crop:a}={})=>{const c=r(t),d=o(t),l=e(c,d);return i(s,((t,[e,o],r,i)=>{const s=e+h,u=o+n;if(s>=d||u>=c||s<0||u<0){if(a)return;throw new Error("Superimposed grid would be out of bounds")}l[s][u]=t})),g(t,l)},reduce:(t,...e)=>n(t).reduce(...e),rotateAntiClockwise:u,rotateClockwise:l,union:g,width:r}},702:(t,e,o)=>{const{blank:r,countNeighbourValues:i,forEveryNeighbour:s,map:n}=o(803),h=t=>Math.floor(Math.random()*t.length),a=(t,e,o)=>t>=e&&t<=o,c=([t,e],o)=>{const[r,i]=o;return a(r,t-1,t+1)&&a(i,e-1,e+1)},d=(t,e,o=0,s=[])=>n(((t,e,o=0,i=[])=>{t=Math.max(t,3),e=Math.max(e,3);const s=r(t,e,0);let n=Math.min(o,t*e-9);for(;n;){const t=h(s),e=h(s[t]),o=s[t][e];c(i,[t,e])||1===o||(s[t][e]=1,n--)}return s})(t,e,o,s),((t,e,o,r)=>t?"x":i(e,r))),l=(t,e,o,r)=>{if(-1!==t[o][r])return;const i=e[o][r];return t[o][r]=i,i<1&&s([o,r],e,((e,o,r,i)=>{l(t,i,o,r)})),t},u=t=>{const e=n(t,(()=>-1));return(o,r)=>"x"===t[o][r]?null:(l(e,t,o,r),e)};t.exports={newBoard:d,nextState:u,Minesweeper:class{constructor(t,e,o){this.width=t,this.height=e,this.mineCount=o,this.board=null,this.state=null,this.moves=[]}move(t,e){const{width:o,height:r,mineCount:i}=this;return this.moves.push([t,e]),this.board||(this.board=d(o,r,i,[t,e]),this.next=u(this.board)),"x"!==this.board[t][e]&&(this.state=this.next(t,e),!0)}}}},419:(t,e,o)=>{const r=o(803);Events={},Events.TETROMINO_SPAWN="tetromino:spawn",Events.TETROMINO_LANDING="tetromino:landing",Events.TICK="tick",Events.LINE_CLEAR="lineclear",Events.GAME_OVER="gameover";const i=(t,e,o)=>Math.max(Math.min(o,e),t),s=(t,e=t.tetromino,o=t.tetrominoPosition,s=!1)=>{const[n,h]=o,a=r.width(e),c=r.height(e),d=n-t.centre(a),l=h-t.centre(c),u=s?1:0;return[i(0,t.width()-a,d),i(0,t.height()-c+u,l)]},n=(t,e)=>()=>{t.tetromino=e(t.tetromino)};class h{constructor(t=10,e=20){this.board=r.blank(t,e),this.tetromino=null,this.tetrominoPosition=null,this.ticks=0,this.eventListeners={[Events.TICK]:[],[Events.TETROMINO_SPAWN]:[],[Events.TETROMINO_LANDING]:[],[Events.LINE_CLEAR]:[],[Events.GAME_OVER]:[]},this.rotate=n(this,h.Tetromino.rotate),this.rotate.reverse=n(this,h.Tetromino.rotate.reverse)}getSubscribers(t){const e=this.eventListeners[t];if(!e)throw new Error(`Event '${t}' not supported`);return e}on(t,e){this.getSubscribers(t).push(e)}trigger(t,e){this.getSubscribers(t).forEach((t=>t(e)))}start(){this.spawn()}spawn(t=this.randomTetromino()){if(!t||!t.length||!t[0].length)throw new TypeError("Must provide two dimensional array representing tetromino to spawn");if(this.tetromino=t,this.trigger(Events.TETROMINO_SPAWN,{tetromino:t}),this.tetrominoPosition=[this.centre(),2],!this.detectCollisions(t,...this.tetrominoPosition))return;let e=0;for(;this.detectCollisions(t,...this.tetrominoPosition);)if(this.tetrominoPosition[1]--,e++,e>4)throw new Error(`Spawn failure: ${this.tetrominoPosition}`);this.board=this.compositeBoard(),this.trigger(Events.GAME_OVER,{board:this.board,ticks:this.ticks})}tick(){if(!this.clearLines()){if(this.tetrominoHasReachedBottom()||this.tetrominoHasLandedOnTerrain())return this.trigger(Events.TETROMINO_LANDING,{ticks:this.ticks,tetromino:this.tetromino,position:this.tetrominoPosition,projectedPosition:s(this)}),this.board=this.compositeBoard(),void(this.tetromino=null);this.tetromino?this.tetrominoPosition=this.gravity():this.spawn(),this.trigger(Events.TICK,{board:this.board,ticks:++this.ticks})}}_move(t,e,o=!1){return!this.detectCollisions(this.tetromino,t,e,o)&&(this.tetrominoPosition=[t,e],!0)}get move(){const t=this;return{left(){const[e,o]=t.tetrominoPosition;return t._move(e-1,o)},right(){const[e,o]=t.tetrominoPosition;return t._move(e+1,o)},down:()=>t._move(...t.gravity(),!0)}}drop(){let t=0;for(;this.move.down();)if(t++,t>20){const t=new Error("Drop failure");throw console.log("drop failure",this.tetromino,this.tetrominoPosition),t}this.tick()}gravity(){const[t,e]=this.tetrominoPosition;return[t,e+1]}detectCollisions(t,e,o,i=!1){const n=r.blank(this.width(),this.height());let h;try{const a=s(this,t,[e,o],i);h=r.superimpose(n,t,...a)}catch(t){return!0}return r.add(this.board,h).flat().some((t=>t>1))}randomTetromino(){const{Tetromino:t}=h,e=[t.L,t.T,t.skew,t.square,t.straight],o=Math.floor(Math.random()*e.length),r=!!Math.floor(2*Math.random()),i=e[o];return r?i.reverse():i()}tetrominoHasLandedOnTerrain(){const{tetromino:t}=this;if(!t)return!1;const e=this.gravity();return this.detectCollisions(t,...e,!0)}tetrominoHasReachedBottom(){const{tetromino:t,tetrominoPosition:e}=this;if(!t)return!1;const[,o]=e;return o+r.height(t)-1>=this.height()}clearLines(){const t=this.board.filter((t=>t.some((t=>0===t))));if(t.length===this.height())return!1;const e=this.board.reduce(((t,e,o)=>(e.filter(Boolean).length===this.width()&&(t.total+=1,t.indices.push(o)),t)),{ticks:this.ticks,total:0,indices:[],board:{before:[...this.board]}});e.board.completedLines=this.board.map(((t,o)=>{const r=e.indices.includes(o)?1:0;return new Array(this.width()).fill(r)}));const o=r.blank(this.width(),e.total);return this.board=e.board.after=o.concat(t),this.trigger(h.Events.LINE_CLEAR,e),!0}compositeBoard(){if(!this.tetromino)return this.board;const t=s(this);return r.superimpose(this.board,this.tetromino,...t)}height(){return r.height(this.board)}width(){return r.width(this.board)}centre(t=this.width()){return Math.floor(t/2)}}const a=t=>r.rotateClockwise(t);a.reverse=r.rotateAntiClockwise;const c=t=>{var e;return fn=()=>t,fn.reverse=(e=t,()=>e.map((t=>[...t].reverse()))),fn},d=c([[1,1,1],[0,1,0]]),l=c([[1,1,1],[1,0,0]]),u=c([[0,1,1],[1,1,0]]),m=c([[1,1],[1,1]]),g=c([[1,1,1,1]]);h.Tetromino={T:d,L:l,skew:u,square:m,straight:g,rotate:a},h.Events=Events,t.exports={Tetris:h}},978:(t,e,o)=>{const r=o(803),i=o(302),{Minesweeper:s}=o(702),{Tetris:n}=o(419);t.exports={Grid:r,GameOfLife:i,Minesweeper:s,Tetris:n}}},e={};function o(r){var i=e[r];if(void 0!==i)return i.exports;var s=e[r]={exports:{}};return t[r](s,s.exports,o),s.exports}o.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return o.d(e,{a:e}),e},o.d=(t,e)=>{for(var r in e)o.o(e,r)&&!o.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},o.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";var t=o(978);const e=(t,e)=>{new Array(t).fill(0).forEach(e)},r=(t,e)=>{const o=t.compositeBoard();for(let r=0;r<t.height();r++)for(let i=0;i<t.width();i++){const t=!!o[r][i],s=e[r][i];if(!s)return console.log("cell not found at index",r,i);t?s.classList.add("active"):s.classList.remove("active")}},i={left:"a",right:"d",down:"s",rotateRight:"w",rotateLeft:"e"};window.Tetris=t.Tetris,(()=>{const o=new t.Tetris,s=((t,o)=>{const r=document.querySelector("#app"),i=[];return e(t,(()=>{const t=document.createElement("div");t.classList.add("row");const s=[];e(o,(()=>{const e=document.createElement("div");e.classList.add("cell"),t.appendChild(e),s.push(e)})),r.appendChild(t),i.push(s)})),i})(o.height(),o.width());o.start(),r(o,s);const n=(t=>e=>{const{code:o}=e;"ArrowRight"!==o&&o!==i.right||t.move.right(),"ArrowLeft"!==o&&o!==i.left||t.move.left(),"ArrowDown"!==o&&o!==i.down||t.move.down(),"Space"!==o&&o!==i.rotateRight||t.rotate(),o===i.rotateLeft&&t.rotate.reverse(),"Enter"!==o&&o!==i.drop||t.drop()})(o);document.addEventListener("keydown",n);const h=setInterval((()=>{o.tick()}),250),a=setInterval((()=>{requestAnimationFrame((()=>r(o,s)))}),100);o.on(t.Tetris.Events.GAME_OVER,(()=>{clearInterval(h),clearInterval(a)}))})()})()})();