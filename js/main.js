// Menu rendering, filters, scroll animations
// ---------- Menu data ----------
var D=[
{n:'Espresso',t:'hot',tag:'Pure · 30 ml',p:'3.0',d:'Syrupy, dark chocolate and orange peel. The beginning of everything.',c:['#2a1208','#6b3a1c'],cup:'s'},
{n:'Flat White',t:'hot',tag:'Silky · 160 ml',p:'4.2',d:'Double ristretto under glossy microfoam. Smooth, strong, quietly perfect.',c:['#f0dcc0','#8a5a34'],cup:'m'},
{n:'Cappuccino',t:'hot',tag:'Classic · 180 ml',p:'4.0',d:'Equal thirds espresso, steamed milk and a cloud of dense foam.',c:['#fbeedd','#a8703f'],cup:'m'},
{n:'Caramel Macchiato',t:'hot',tag:'Sweet · 300 ml',p:'5.2',d:'Vanilla milk, espresso poured on top, house salted caramel lattice.',c:['#d79a55','#f3dcb8'],cup:'l'},
{n:'Oat Latte',t:'hot',tag:'Vegan · 300 ml',p:'4.8',d:'Toasted oat milk, honeyed notes, finished with cinnamon dust.',c:['#e8c99a','#7a4a26'],cup:'l'},
{n:'Cold Brew',t:'iced',tag:'18 hrs · 350 ml',p:'4.6',d:'Steeped overnight, served over hand-cut ice. Bold, clean, zero bitterness.',c:['#1b0c06','#4a2512'],cup:'g'},
{n:'Spiced Iced Mocha',t:'iced',tag:'Indulgent · 400 ml',p:'5.5',d:'Dark chocolate, cardamom and cinnamon, topped with cold cream.',c:['#f6e8d4','#5b2e17'],cup:'g'},
{n:'Affogato',t:'iced',tag:'Dessert · 150 ml',p:'5.8',d:'Vanilla bean gelato drowned in a fresh, scalding espresso shot.',c:['#fff3de','#3a1a0b'],cup:'s'}];
function cup(x,i){var a=x.c[0],b=x.c[1],g=x.cup=='g',id='g'+i;
 var body=g?'<path d="M30 14h60l-6 92H36z" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.4)"/><path d="M33 52h54l-3 54H36z" fill="url(#'+id+')"/><path d="M37 28h46l-1 22H38z" fill="'+a+'" opacity=".95"/><rect x="48" y="6" width="5" height="50" rx="2" fill="#e0a867" transform="rotate(8 50 30)"/><rect x="42" y="62" width="14" height="14" rx="3" fill="rgba(255,255,255,.35)"/><rect x="62" y="78" width="14" height="14" rx="3" fill="rgba(255,255,255,.28)"/>'
 :'<path d="M24 40h72v28c0 24-14 38-36 38s-36-14-36-38z" fill="#f6ede1"/><ellipse cx="60" cy="40" rx="36" ry="9" fill="'+b+'"/><ellipse cx="60" cy="40" rx="28" ry="6" fill="'+a+'"/><path d="M52 39q8-5 16 0q-8 4-16 0z" fill="'+b+'" opacity=".7"/><path d="M96 48h8c10 0 10 20 0 20h-9" fill="none" stroke="#f6ede1" stroke-width="6"/><path d="M42 18q-6 8 0 14M60 12q-6 8 0 16M78 18q-6 8 0 14" stroke="rgba(255,255,255,.35)" stroke-width="3" fill="none" stroke-linecap="round" class="st"/>';
 return '<svg class="cup" viewBox="0 0 120 120"><defs><linearGradient id="'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+b+'"/><stop offset="1" stop-color="'+a+'"/></linearGradient></defs>'+body+'</svg>'}
var grid=document.getElementById('grid');
D.forEach(function(x,i){var e=document.createElement('article');e.className='glass card rv';e.dataset.t=x.t;e.style.transitionDelay=(i%4)*90+'ms';
 e.innerHTML=cup(x,i)+'<div class="row"><h3>'+x.n+'</h3><span class="price">€'+x.p+'</span></div><div class="tag">'+x.tag+'</div><p>'+x.d+'</p>';
 e.addEventListener('pointermove',function(ev){var r=e.getBoundingClientRect(),px=(ev.clientX-r.left)/r.width,py=(ev.clientY-r.top)/r.height;
  e.style.setProperty('--mx',px*100+'%');e.style.setProperty('--my',py*100+'%');e.style.transform='perspective(800px) rotateY('+(px-.5)*12+'deg) rotateX('+(.5-py)*12+'deg) translateY(-4px)'});
 e.addEventListener('pointerleave',function(){e.style.transform=''});grid.appendChild(e)});
document.querySelectorAll('.chip').forEach(function(c){c.onclick=function(){document.querySelectorAll('.chip').forEach(function(k){k.classList.remove('on')});c.classList.add('on');
 document.querySelectorAll('.card').forEach(function(k){var h=c.dataset.f!='all'&&k.dataset.t!=c.dataset.f;k.classList.toggle('hide',h);if(!h){k.classList.remove('in');void k.offsetWidth;k.classList.add('in')}})}});
var words=['Single origin','Oak-roasted','Small batch','Slow bar','Fresh daily','Fair paid'],m='';
for(var k=0;k<2;k++)words.forEach(function(w){m+=w+'<b>✦</b>'});document.getElementById('mq').innerHTML=m+m;

// ---------- Scroll animation ----------
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');
 var c=e.target.querySelectorAll('[data-c]');c.forEach(function(n){var to=+n.dataset.c,s=performance.now();(function f(t){var p=Math.min(1,(t-s)/1600);n.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(s)});
 io.unobserve(e.target)}})},{threshold:.15});
document.querySelectorAll('.rv').forEach(function(e){io.observe(e)});
var nav=document.getElementById('nav'),bar=document.getElementById('bar'),hero=document.getElementById('heroin'),steps=document.getElementById('steps'),sy=0;
function onS(){var y=scrollY,h=document.documentElement.scrollHeight-innerHeight;sy=y/Math.max(1,h);
 nav.classList.toggle('s',y>40);bar.style.transform='scaleX('+sy+')';
 hero.style.transform='translateY('+y*.25+'px)';hero.style.opacity=Math.max(0,1-y/(innerHeight*.8));
 var r=steps.getBoundingClientRect();steps.style.setProperty('--p',Math.min(100,Math.max(0,(innerHeight*.6-r.top)/r.height*100))+'%')}
addEventListener('scroll',onS,{passive:true});onS();
