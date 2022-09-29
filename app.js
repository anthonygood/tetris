(()=>{var t={302:(t,e,r)=>{const{countNeighbourValues:o,map:i}=r(803),n=(t,e)=>Number(((t,e)=>3===e||t&&2===e)(t,e)),s=(t,e,r,i)=>n(t,o(e,i));t.exports={countNeighbourValues:o,liveOrDie:n,tick:t=>i(t,s)}},803:t=>{const e=(t,e,r=0)=>Array.from({length:e}).map((()=>new Array(t).fill(r))),r=t=>t.length,o=t=>t[0]?.length,i=(t,e)=>t.forEach(((r,o)=>r.forEach(((i,n)=>e(i,[o,n],r,t))))),n=(t,e)=>t.map(((r,o)=>r.map(((i,n)=>e(i,[o,n],r,t))))),s=t=>t.reduce(((t,e)=>Array.isArray(e)?t.concat(s(e)):t.concat(e)),[]),a=([t,e],r,o)=>{for(let i=t-1;i<=t+1;i++)for(let n=e-1;n<=e+1;n++){if(i===t&&n===e)continue;const s=r[i]&&r[i][n];void 0!==s&&o(s,i,n,r)}},h=(t,e,r)=>{const o=[];return a(t,e,(t=>o.push(r(t)))),o},c=(t,e)=>t.length>e.length?t:e,d=t=>n=>{const s=o(n),a=r(n),h=e(a,s);return i(n,((e,[r,o],i,n)=>{const[c,d]=t(r,o,s,a);h[c][d]=e})),h},l=d(((t,e,r,o)=>[e,o-1-t])),u=d(((t,e,r,o)=>[r-1-e,t])),m=t=>(r,o,i=0)=>{const{length:s}=c(r,o),{length:a}=c(r[0],o[0]);return n(e(a,s),((e,[n,s],a,h)=>t(r[n]?.[s],o[n]?.[s],i)))},v=m(((t,e,r)=>t||e||r)),p=m(((t=0,e=0)=>t+e)),g=m(((t=0,e=0)=>t&&e));t.exports={add:p,blank:e,countNeighbourValues:(t,e)=>((t,e)=>h(t,e,(t=>t)))(t,e).reduce(((t,e)=>t+e),0),debug:(t,e=!1)=>{t.map((t=>e?t.join(","):t)).forEach((t=>console.log(t)))},forEach:i,findIndex:(t,e)=>{for(let r=0;r<t.length;r++)for(let o=0;o<t[r].length;o++)if(e(t[r][o],[r,o],t[r],t))return[r,o]},flatten:s,forEveryNeighbour:a,height:r,intersection:g,map:n,mapNeighbours:h,superimpose:(t,n,s,a,{crop:h}={})=>{const c=o(t),d=r(t),l=e(c,d);return i(n,((t,[e,r],o,i)=>{const n=e+a,u=r+s;if(n>=d||u>=c||n<0||u<0){if(h)return;throw new Error("Superimposed grid would be out of bounds")}l[n][u]=t})),v(t,l)},reduce:(t,...e)=>s(t).reduce(...e),rotateAntiClockwise:u,rotateClockwise:l,union:v,width:o}},702:(t,e,r)=>{const{blank:o,countNeighbourValues:i,forEveryNeighbour:n,map:s}=r(803),a=t=>Math.floor(Math.random()*t.length),h=(t,e,r)=>t>=e&&t<=r,c=([t,e],r)=>{const[o,i]=r;return h(o,t-1,t+1)&&h(i,e-1,e+1)},d=(t,e,r=0,n=[])=>s(((t,e,r=0,i=[])=>{t=Math.max(t,3),e=Math.max(e,3);const n=o(t,e,0);let s=Math.min(r,t*e-9);for(;s;){const t=a(n),e=a(n[t]),r=n[t][e];c(i,[t,e])||1===r||(n[t][e]=1,s--)}return n})(t,e,r,n),((t,e,r,o)=>t?"x":i(e,o))),l=(t,e,r,o)=>{if(-1!==t[r][o])return;const i=e[r][o];return t[r][o]=i,i<1&&n([r,o],e,((e,r,o,i)=>{l(t,i,r,o)})),t},u=t=>{const e=s(t,(()=>-1));return(r,o)=>"x"===t[r][o]?null:(l(e,t,r,o),e)};t.exports={newBoard:d,nextState:u,Minesweeper:class{constructor(t,e,r){this.width=t,this.height=e,this.mineCount=r,this.board=null,this.state=null,this.moves=[]}move(t,e){const{width:r,height:o,mineCount:i}=this;return this.moves.push([t,e]),this.board||(this.board=d(r,o,i,[t,e]),this.next=u(this.board)),"x"!==this.board[t][e]&&(this.state=this.next(t,e),!0)}}}},419:(t,e,r)=>{const o=r(803);Events={},Events.TETROMINO_SPAWN="tetromino:spawn",Events.TETROMINO_LANDING="tetromino:landing",Events.TICK="tick",Events.LINE_CLEAR="lineclear",Events.GAME_OVER="gameover";const i=(t,e,r)=>Math.max(Math.min(r,e),t),n=(t,e=t.tetromino,r=t.tetrominoPosition,n=!1)=>{const[s,a]=r,h=o.width(e),c=o.height(e),d=s-t.centre(h),l=a-t.centre(c),u=n?1:0;return[i(0,t.width()-h,d),i(0,t.height()-c+u,l)]},s=(t,e)=>()=>{t.tetromino=e(t.tetromino)};class a{constructor(t=10,e=20){this.board=o.blank(t,e),this.tetromino=null,this.tetrominoPosition=null,this.ticks=0,this.eventListeners={[Events.TICK]:[],[Events.TETROMINO_SPAWN]:[],[Events.TETROMINO_LANDING]:[],[Events.LINE_CLEAR]:[],[Events.GAME_OVER]:[]},this.rotate=s(this,a.Tetromino.rotate),this.rotate.reverse=s(this,a.Tetromino.rotate.reverse)}getSubscribers(t){const e=this.eventListeners[t];if(!e)throw new Error(`Event '${t}' not supported`);return e}on(t,e){this.getSubscribers(t).push(e)}trigger(t,e){this.getSubscribers(t).forEach((t=>t(e)))}start(){this.spawn()}spawn(t=this.randomTetromino()){if(!t||!t.length||!t[0].length)throw new TypeError("Must provide two dimensional array representing tetromino to spawn");if(this.tetromino=t,this.trigger(Events.TETROMINO_SPAWN,{tetromino:t}),this.tetrominoPosition=[this.centre(),2],!this.detectCollisions(t,...this.tetrominoPosition))return;let e=0;for(;this.detectCollisions(t,...this.tetrominoPosition);)if(this.tetrominoPosition[1]--,e++,e>4)throw new Error(`Spawn failure: ${this.tetrominoPosition}`);this.board=this.compositeBoard(),this.trigger(Events.GAME_OVER,{board:this.board,ticks:this.ticks})}tick(){if(!this.clearLines()){if(this.tetrominoHasReachedBottom()||this.tetrominoHasLandedOnTerrain())return this.trigger(Events.TETROMINO_LANDING,{ticks:this.ticks,tetromino:this.tetromino,position:this.tetrominoPosition,projectedPosition:n(this)}),this.board=this.compositeBoard(),void(this.tetromino=null);this.tetromino?this.tetrominoPosition=this.gravity():this.spawn(),this.trigger(Events.TICK,{board:this.board,ticks:++this.ticks})}}_move(t,e,r=!1){return!this.detectCollisions(this.tetromino,t,e,r)&&(this.tetrominoPosition=[t,e],!0)}get move(){const t=this;return{left(){const[e,r]=t.tetrominoPosition;return t._move(e-1,r)},right(){const[e,r]=t.tetrominoPosition;return t._move(e+1,r)},down:()=>t._move(...t.gravity(),!0)}}drop(){let t=0;for(;this.move.down();)if(t++,t>20){const t=new Error("Drop failure");throw console.log("drop failure",this.tetromino,this.tetrominoPosition),t}this.tick()}gravity(){const[t,e]=this.tetrominoPosition;return[t,e+1]}detectCollisions(t,e,r,i=!1){const s=o.blank(this.width(),this.height());let a;try{const h=n(this,t,[e,r],i);a=o.superimpose(s,t,...h)}catch(t){return!0}return o.add(this.board,a).flat().some((t=>t>1))}randomTetromino(){const{Tetromino:t}=a,e=[t.L,t.T,t.skew,t.square,t.straight],r=Math.floor(Math.random()*e.length),o=!!Math.floor(2*Math.random()),i=e[r];return o?i.reverse():i()}tetrominoHasLandedOnTerrain(){const{tetromino:t}=this;if(!t)return!1;const e=this.gravity();return this.detectCollisions(t,...e,!0)}tetrominoHasReachedBottom(){const{tetromino:t,tetrominoPosition:e}=this;if(!t)return!1;const[,r]=e;return r+o.height(t)-1>=this.height()}clearLines(){const t=this.board.filter((t=>t.some((t=>0===t))));if(t.length===this.height())return!1;const e=this.board.reduce(((t,e,r)=>(e.filter(Boolean).length===this.width()&&(t.total+=1,t.indices.push(r)),t)),{ticks:this.ticks,total:0,indices:[],board:{before:[...this.board]}});e.board.completedLines=this.board.map(((t,r)=>{const o=e.indices.includes(r)?1:0;return new Array(this.width()).fill(o)}));const r=o.blank(this.width(),e.total);return this.board=e.board.after=r.concat(t),this.trigger(a.Events.LINE_CLEAR,e),!0}compositeBoard(){if(!this.tetromino)return this.board;const t=n(this);return o.superimpose(this.board,this.tetromino,...t)}height(){return o.height(this.board)}width(){return o.width(this.board)}centre(t=this.width()){return Math.floor(t/2)}}const h=t=>o.rotateClockwise(t);h.reverse=o.rotateAntiClockwise;const c=t=>{var e;return fn=()=>t,fn.reverse=(e=t,()=>e.map((t=>[...t].reverse()))),fn},d=c([[1,1,1],[0,1,0]]),l=c([[1,1,1],[1,0,0]]),u=c([[0,1,1],[1,1,0]]),m=c([[1,1],[1,1]]),v=c([[1,1,1,1]]);a.Tetromino={T:d,L:l,skew:u,square:m,straight:v,rotate:h},a.Events=Events,t.exports={Tetris:a}},978:(t,e,r)=>{const o=r(803),i=r(302),{Minesweeper:n}=r(702),{Tetris:s}=r(419);t.exports={Grid:o,GameOfLife:i,Minesweeper:n,Tetris:s}}},e={};function r(o){var i=e[o];if(void 0!==i)return i.exports;var n=e[o]={exports:{}};return t[o](n,n.exports,r),n.exports}(()=>{"use strict";var t=r(978);const e={},o=(t,e)=>{new Array(t).fill(0).forEach(e)},i=(t,e)=>{const r=t.compositeBoard();for(let o=0;o<t.height();o++)for(let i=0;i<t.width();i++){const t=!!r[o][i],n=e[o][i];if(!n)return console.error("cell not found at index",o,i);t?n.classList.add("active"):n.classList.remove("active")}},n={left:"KeyA",right:"KeyD",down:"KeyS",rotateRight:"KeyW",rotateLeft:"KeyE",pause:"KeyP"};(()=>{const r=new t.Tetris,{appContainer:s,virtualDom:a}=((t,e)=>{const r=document.querySelector("#app"),i=[];return o(t,(()=>{const t=document.createElement("div");t.classList.add("row");const n=[];o(e,(()=>{const e=document.createElement("div");e.classList.add("cell"),t.appendChild(e),n.push(e)})),r.appendChild(t),i.push(n)})),{appContainer:r,virtualDom:i}})(r.height(),r.width());r.start(),i(r,a);const{start:h,stop:c}=(({tickFn:t,renderFn:r,tickInterval:o,frameInterval:i})=>({start:()=>{e.tickInterval=setInterval(t,o),e.renderInterval=setInterval((()=>requestAnimationFrame(r)),i)},stop:()=>{clearInterval(e.tickInterval),clearInterval(e.renderInterval)}}))({tickFn:()=>r.tick(),renderFn:()=>i(r,a),tickInterval:250,frameInterval:50});r.on(t.Tetris.Events.GAME_OVER,(()=>{s.classList.add("gameover"),c()}));const d=((t,e,r)=>o=>{"Escape"===o.code&&(t.paused?e():r(),t.paused=!t.paused)})(r,h,c);document.addEventListener("keydown",(t=>e=>{if(t.paused)return;const{code:r}=e;"ArrowRight"!==r&&r!==n.right||t.move.right(),"ArrowLeft"!==r&&r!==n.left||t.move.left(),"ArrowDown"!==r&&r!==n.down||t.move.down(),"Space"!==r&&r!==n.rotateRight||t.rotate(),r===n.rotateLeft&&t.rotate.reverse(),"Enter"!==r&&r!==n.drop||t.drop()})(r)),document.addEventListener("keydown",d),h()})()})()})();