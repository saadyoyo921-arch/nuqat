import{initializeApp}from"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import{getAuth,GoogleAuthProvider,signInWithPopup,onAuthStateChanged,signOut}from"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import{getFirestore,doc,getDoc,setDoc,deleteDoc,collection,onSnapshot,query,orderBy,limit,getDocs,updateDoc,increment,runTransaction}from"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
const cfg0={apiKey:"AIzaSyAGoz-7q-iAwalJNCMTAPx6SM2bHhyzG5w",authDomain:"nuqate.firebaseapp.com",projectId:"nuqate",storageBucket:"nuqate.firebasestorage.app",messagingSenderId:"115027824312",appId:"1:115027824312:web:06a60a4ce002aed150ae4d"};
const OWNER="saadyoyo921@gmail.com"; // ولي الأمر الأساسي، والباقي يتضاف من الإعدادات
const app=initializeApp(cfg0),auth=getAuth(app),db=getFirestore(app),MODE=document.body.dataset.mode;
const VERSES=[["﴿ إِنَّ مَعَ الْعُسْرِ يُسْرًا ﴾","الشرح: ٦"],["﴿ وَقُل رَّبِّ زِدْنِي عِلْمًا ﴾","طه: ١١٤"],["﴿ فَاذْكُرُونِي أَذْكُرْكُمْ ﴾","البقرة: ١٥٢"],["﴿ وَأَقِيمُوا الصَّلَاةَ ﴾","البقرة: ٤٣"],["﴿ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ ﴾","البقرة: ١٥٣"],["«طلب العلم فريضة على كل مسلم»","حديث شريف"],["«أحب الأعمال إلى الله أدومها وإن قل»","متفق عليه"],["نصيحة: صلاتك في وقتها أول خطوة للنجاح","✦"]];
const GR=["#0f8b6d,#064e3b,#1b0a3c","#6d28d9,#1e1b4b,#0f8b6d","#b45309,#7c2d12,#3b0764","#0369a1,#082f49,#0f8b6d","#be185d,#4c0519,#1e1b4b","#15803d,#14532d,#d4a017"];
const HELLO=["تم صنع هذا البرنامج من خلال هذا الجميل الفشيخ الخطير 😎","المبرمج الأسطورة اللي الأرض ما جابت زيه 👑","صاحب الفكرة والذوق الرفيع، الفشيخ الخطير ✨","بطل البرنامج وسيد الموقف، الفشيخ الخطير 🔥","من غيره كنا هنعد النقاط بالأصابع 😂","الجميل اللي سهّر الليل عشان نقاطك 🌙"];
const L={ar:{look:"المظهر",go:"ابدأ",login:"الدخول بحساب Gmail",full:"اكتب اسمك الثلاثي",save:"حفظ ودخول",pr:"الصلاة",az:"الأذكار",st:"المذاكرة",lb:"المتصدرون",ts:"التحديات",gf:"الجوائز",tm:"أولياء الأمور",sets:"الإعدادات",my:"نقاطي",wh:"العجلة",pts:"نقطة",done:"تم",none:"لا يوجد",next:"التالي",studied:"ذاكرت ٣٠ دقيقة",add:"إضافة",wait:"ليس وقتها بعد",fin:"أحسنت! أنهيت الأذكار 🌟",nt:"هذا الحساب ليس ولي أمر",out:"خروج",pn:["الفجر","الظهر","العصر","المغرب","العشاء"],ln:"English",amt:"عدد النقاط",why:"السبب",adjb:"± نقاط",stu:"الطلاب",newch:"تحدي جديد",grp:"👥 جماعي",ind:"👤 فردي",one:"لطالب واحد",first:"للجميع (الأول فقط)",ctitle:"عنوان التحدي",late:"سبقك غيرك أو التحدي غير متاح لك",gname:"اسم الجائزة",gcost:"النقاط المطلوبة",tadd:"إيميل ولي الأمر الجديد",sure:"متأكد من الحذف؟",pset:"نقاط الأنشطة",pray:"الصلاة",adhkar:"الذكر",study:"المذاكرة",kahf:"سورة الكهف",spin:"🎡 لفّ العجلة",spun:"عد غداً للّف مرة جديدة",kmsg:"هيا لنقرأ سورة الكهف 📖",kdone:"قرأتها ✓",kiss:"😘 بوس هذا الرجل",ok:"أنجزتها ✓",pic:"📷 أنجزتها بصورة",who:"المنجزون",taken:"تم إنجازه",can:"🎉 تقدر تاخدها! كلّم ولي أمرك",left:"ناقصك",hist:"من أين جاءت نقاطك",lbl:"لا توجد نقاط بعد"},
en:{look:"Look",go:"Start",login:"Sign in with Gmail",full:"Enter your full three-part name",save:"Save & enter",pr:"Prayer",az:"Adhkar",st:"Study",lb:"Leaders",ts:"Challenges",gf:"Prizes",tm:"Guardians",sets:"Settings",my:"My points",wh:"Wheel",pts:"pts",done:"Done",none:"Nothing yet",next:"Next",studied:"I studied 30 min",add:"Add",wait:"Not time yet",fin:"Well done! Adhkar finished 🌟",nt:"This account is not a guardian",out:"Sign out",pn:["Fajr","Dhuhr","Asr","Maghrib","Isha"],ln:"عربي",amt:"Points",why:"Reason",grp:"👥 Group",ind:"👤 Individual",kiss:"😘 Kiss this man",spin:"🎡 Spin"}};
const AZ=["سُبْحَانَ اللَّهِ وَبِحَمْدِهِ (٣٣)","أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ (١٠٠)","لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ","اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ","لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ","حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ (٧)"];
const QZ=[["عاصمة السعودية؟",["جدة","الرياض","مكة"],1],["كم يوماً في الأسبوع؟",["٦","٧","٨"],1],["أكبر كوكب في المجموعة الشمسية؟",["المشتري","الأرض","المريخ"],0],["٧ × ٨ = ؟",["٥٤","٥٦","٦٤"],1],["كم عدد أركان الإسلام؟",["٤","٥","٦"],1],["عاصمة مصر؟",["الإسكندرية","القاهرة","أسوان"],1],["كم ركعة في صلاة الفجر؟",["٢","٣","٤"],0],["أول سورة في المصحف؟",["البقرة","الفاتحة","الإخلاص"],1]];
const WH=["+1","+2","+3","+4","+5","-1","-2","❓"],WC=["#0f8b6d","#d4a017","#6d28d9","#0369a1","#15803d","#c0392b","#be185d","#7c2d12"];
// مواعيد تقريبية للرياض (دقائق من منتصف الليل) — عدّلها حسب الفصل
const PW=[[295,375],[700,885],[885,1030],[1030,1120],[1120,1439]];
const S={lang:"ar",tab:MODE=="teacher"?"ts":"ts",az:0,u:null,prof:null,ready:0,isT:false,hello:0,ch:[],gifts:[],lead:[],hist:[],studs:[],tchs:[],cfg:{pray:5,adhkar:2,study:10,kahf:10},cf:{}};
const t=k=>L[S.lang][k]??L.ar[k]??k,$=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const today=()=>{const d=new Date();return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()};
const kk=k=>k.replace(/\W/g,"_"),has=k=>S.prof?.log?.[kk(k)];
const n=x=>{const r=parseInt(String(x).replace(/[٠-٩]/g,c=>c.charCodeAt(0)-1632));return isNaN(r)?0:r};
const rt=()=>{const p=new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Riyadh",weekday:"long",hour:"numeric",minute:"numeric",hour12:false}).formatToParts(new Date()),g=y=>p.find(x=>x.type==y).value;return{day:g("weekday"),m:(+g("hour")%24)*60+ +g("minute")}};
const shrink=f=>new Promise(r=>{const i=new Image();i.onload=()=>{const s=Math.min(1,800/Math.max(i.width,i.height)),c=document.createElement("canvas");c.width=i.width*s;c.height=i.height*s;c.getContext("2d").drawImage(i,0,0,c.width,c.height);r(c.toDataURL("image/jpeg",.6))};i.src=URL.createObjectURL(f)});
function splash(){const v=VERSES[Math.floor(Math.random()*VERSES.length)],s=$("#splash"),g=GR[Math.floor(Math.random()*GR.length)].split(",");
 s.style.background=`radial-gradient(circle at 20% 15%,${g[0]},transparent 55%),radial-gradient(circle at 85% 85%,${g[2]},transparent 55%),${g[1]}`;
 s.innerHTML=`<div class="orn">✦ ❖ ✦</div><h1>نقاطي</h1><div class="v">${v[0]}<br><small>${v[1]}</small></div><button class="btn g" data-a="go">${t("go")}</button>`}
async function addPts(id,d,why){await updateDoc(doc(db,"students",id),{points:increment(d)});await updateDoc(doc(db,"leaders",id),{points:increment(d)});await setDoc(doc(db,"hist",id,"items",Date.now()+""+Math.floor(Math.random()*99)),{d,why,ts:Date.now()})}
async function award(key,d,why){if(has(key))return;const k=kk(key);S.prof.log[k]=1;await updateDoc(doc(db,"students",S.u.uid),{["log."+k]:1});await addPts(S.u.uid,d,why)}
async function doChallenge(c,img){const cr=doc(db,"challenges",c.id),dr=doc(db,"challenges",c.id,"done",S.u.uid);
 return runTransaction(db,async tx=>{const cs=await tx.get(cr),ds=await tx.get(dr);if(!cs.exists()||ds.exists())return null;const d=cs.data(),r=d.taken||0;
  if(d.mode=="one"&&d.target!=S.u.uid)return null;if(d.mode=="first"&&r>=1)return null;
  const p=d.mode=="group"?d.p[Math.min(r,2)]:d.pts;tx.update(cr,{taken:r+1});tx.set(dr,{name:S.prof.name,rank:r+1,pts:p,img:img||"",ts:Date.now()});return p})}
onAuthStateChanged(auth,async u=>{S.u=u;S.ready=0;if(!u){S.prof=null;return render()}
 const em=(u.email||"").toLowerCase();S.isT=em===OWNER||(await getDoc(doc(db,"teachers",em))).exists();
 const E=()=>{};
 onSnapshot(doc(db,"config","points"),d=>{if(d.exists())S.cfg={...S.cfg,...d.data()};render()},E);
 onSnapshot(query(collection(db,"challenges"),orderBy("ts","desc")),q=>{S.ch=q.docs.map(x=>({id:x.id,...x.data()}));render()},E);
 onSnapshot(query(collection(db,"gifts"),orderBy("cost")),q=>{S.gifts=q.docs.map(x=>({id:x.id,...x.data()}));render()},E);
 onSnapshot(query(collection(db,"leaders"),orderBy("points","desc"),limit(10)),q=>{S.lead=q.docs.map(x=>x.data());render()},E);
 if(S.isT){S.ready=1;onSnapshot(collection(db,"teachers"),q=>{S.tchs=q.docs.map(x=>x.id);render()},E);onSnapshot(collection(db,"students"),q=>{S.studs=q.docs.map(x=>({id:x.id,...x.data()})).sort((a,b)=>(b.points||0)-(a.points||0));render()},E)}
 else{onSnapshot(doc(db,"students",u.uid),d=>{S.prof=d.exists()?d.data():null;S.ready=1;render()},E);onSnapshot(query(collection(db,"hist",u.uid,"items"),orderBy("ts","desc"),limit(30)),q=>{S.hist=q.docs.map(x=>x.data());render()},E)}
 render()});
function render(){document.documentElement.lang=S.lang;document.documentElement.dir=S.lang=="ar"?"rtl":"ltr";const A=$("#app");
 if(document.activeElement?.tagName=="INPUT"&&document.activeElement.type=="text"&&A.contains(document.activeElement))return;
 const msg=(h,b)=>{A.innerHTML=`<main><div class="card" style="text-align:center">${h}${b?`<button class="btn o" data-a="out">${t("out")}</button>`:""}</div></main>`};
 if(!S.u)return msg(`<h2>✦ نقاطي ✦</h2><button class="btn" data-a="si">${t("login")}</button>`);
 if(MODE=="teacher"&&!S.isT)return msg(t("nt")+"<br>",1);
 if(MODE=="student"&&S.isT)return msg('أنت ولي أمر — افتح <a href="teacher.html">teacher.html</a><br>',1);
 if(!S.isT&&!S.ready)return msg("…");
 if(!S.isT&&!S.prof)return A.innerHTML=`<main><div class="card"><div>${esc(S.u.email)}</div><input type="text" id="nm" placeholder="${t("full")}"><button class="btn" data-a="reg">${t("save")}</button></div></main>`;
 if(!S.hello){A.innerHTML=`<main style="text-align:center;padding-top:30px"><img class="man" src="man.jpg"><div class="card"><h3 id="hl">${HELLO[Math.floor(Math.random()*HELLO.length)]}</h3><button class="btn g" data-a="hello" style="font-size:20px">${t("kiss")}</button></div></main>`;return}
 const T=S.isT?[["ts","🎯"],["gf","🎁"],["sets","⚙️"],["look","🎨"],["lb","🏆"]]:[["ts","🎯"],["pr","🕌"],["az","📿"],["st","✏️"],["wh","🎡"],["gf","🎁"],["my","⭐"],["look","🎨"],["lb","🏆"]];
 if(!T.some(x=>x[0]==S.tab))S.tab="ts";
 const TI={ts:"🎯",pr:"🕌",az:"📿",st:"✏️",wh:"🎡",gf:"🎁",my:"⭐",lb:"🏆",sets:"⚙️",look:"🎨"};
 A.innerHTML=`<div class="bar"><b class="brand">✦ نقاطي</b><span class="sp"></span>${S.prof?`<span class="chip">⭐ ${S.prof.points||0}</span>`:""}<button class="ib" data-a="lang">${S.lang=="ar"?"EN":"ع"}</button><button class="ib" data-a="theme">◐</button><button class="ib" data-a="out">⎋</button><button class="ib menu-btn" data-a="menu"><i></i><i></i><i></i></button></div>${S.menu?`<div class="bdp" data-a="menu"></div><div class="menu">${T.map(x=>`<button class="tile ${S.tab==x[0]?"on":""}" data-a="tab" data-t="${x[0]}"><i>${x[1]}</i><span>${t(x[0])}</span></button>`).join("")}</div>`:""}
<div id="hero" class="hero"><div class="stars" data-s="0.05" style="box-shadow:${STARS}"></div><div class="moon" data-s="0.28"></div>
<svg class="ly" data-s="0.4" viewBox="0 0 800 300" preserveAspectRatio="none"><path d="M0,200 L120,120 L220,180 L340,90 L470,190 L600,110 L720,170 L800,130 L800,300 L0,300Z" style="fill:var(--m1,#b765c4)"/></svg>
<svg class="boat" data-s="0.5" data-x="0.15" viewBox="0 0 120 100"><path d="M58 6 L58 70 L16 62 Q40 40 58 6Z" fill="#2b2b33"/><path d="M62 18 L62 68 L100 62 Q84 40 62 18Z" fill="#2b2b33"/><path d="M8 72 H110 Q100 90 82 90 H34 Q16 90 8 72Z" fill="#23232b"/><path d="M58 6 L74 12 L58 16Z" fill="#2b2b33"/></svg>
<svg class="ly" data-s="0.62" viewBox="0 0 800 300" preserveAspectRatio="none"><path d="M0,230 L100,170 L210,215 L330,160 L450,225 L580,165 L700,215 L800,180 L800,300 L0,300Z" style="fill:var(--m2,#7e2d8f)"/></svg>
<svg class="ly" data-s="0.85" viewBox="0 0 800 300" preserveAspectRatio="none"><path d="M0,262 Q200,205 400,250 T800,232 L800,300 L0,300Z" style="fill:var(--m3,#3a0b4a)"/><path d="M60,262 L80,205 L100,262Z M130,266 L145,225 L160,266Z M690,250 L712,190 L734,250Z M745,254 L760,215 L775,254Z" style="fill:var(--m4,#240733)"/></svg>
<div class="ht"><h1>${TI[S.tab]} ${t(S.tab)}</h1><p>${esc(S.prof?S.prof.name:(S.lang=="ar"?"ولي الأمر":"Guardian"))}</p></div></div>
<div class="sheet"><main class="${S.an?"an":""}">${{ts:vCh,pr:vPr,az:vAz,st:vSt,wh:vWh,gf:vGf,my:vMy,lb:vLb,sets:vSet,look:vLook}[S.tab]()}</main></div>`;S.an=0;px()}
const sign=d=>(d>0?"+":"")+d;
function cForm(){const c=S.cf;let h=`<div class="card"><b>🎯 ${t("newch")}</b><div class="row"><button class="btn ${c.m=="g"?"":"o"}" data-a="cm" data-v="g">${t("grp")}</button><button class="btn ${c.m=="i"?"":"o"}" data-a="cm" data-v="i">${t("ind")}</button></div>`;
 if(c.m=="i")h+=`<div class="row"><button class="btn ${c.s=="one"?"":"o"}" data-a="cs" data-v="one">${t("one")}</button><button class="btn ${c.s=="first"?"":"o"}" data-a="cs" data-v="first">${t("first")}</button></div>`;
 if(c.m=="g"||(c.m=="i"&&c.s)){h+=`<input type="text" id="ct" placeholder="${t("ctitle")}">`;
  if(c.s=="one")h+=`<select id="ctg">${S.studs.map(s=>`<option value="${s.id}">${esc(s.name)}</option>`).join("")}</select>`;
  h+=c.m=="g"?`<div class="row"><input type="text" id="p1" inputmode="numeric" placeholder="🥇"><input type="text" id="p2" inputmode="numeric" placeholder="🥈"><input type="text" id="p3" inputmode="numeric" placeholder="🥉"></div>`:`<input type="text" id="pp" inputmode="numeric" placeholder="${t("amt")}">`;
  h+=`<button class="btn g" data-a="cadd">${t("add")}</button>`}
 return h+"</div>"}
function vCh(){const d=today();let h="";
 if(!S.isT&&rt().day=="Friday"&&rt().m>=840)h+=`<div class="card ad">${t("kmsg")}<br>${has("k:"+d)?`<span class="done">✓</span>`:`<button class="btn g" data-a="kahf">${t("kdone")} (+${S.cfg.kahf})</button>`}</div>`;
 if(S.isT)h+=cForm();
 const list=S.ch.filter(c=>S.isT||c.mode!="one"||c.target==S.u.uid);
 return h+(list.length?list.map(c=>{const tag=c.mode=="group"?"👥":c.mode=="first"?"⚡":"👤 "+esc(c.tname||""),pt=c.mode=="group"?`🥇${c.p[0]} 🥈${c.p[1]} 🥉${c.p[2]}`:`⭐ ${c.pts}`;
  let a="";
  if(S.isT)a=`<button class="btn o" data-a="cdn" data-id="${c.id}">${t("who")} (${c.taken||0})</button><button class="btn o" data-a="cdel" data-id="${c.id}">✕</button><div id="d${c.id}"></div>`;
  else if(has("c:"+c.id))a=`<span class="done">✓ ${t("done")}</span>`;
  else if(c.mode=="first"&&(c.taken||0)>=1)a=`<span>${t("taken")}</span>`;
  else a=`<label class="btn g">${t("pic")}<input type="file" accept="image/*" hidden data-a="cpic" data-id="${c.id}"></label><button class="btn" data-a="cdone" data-id="${c.id}">${t("ok")}</button>`;
  return`<div class="card"><div class="row"><b>${esc(c.title)}</b><small>${tag}</small></div><div>${pt}</div>${a}</div>`}).join(""):`<div class="card">${t("none")}</div>`)}
function vPr(){const d=today(),r=rt().m;return t("pn").map((nm,i)=>{const k="p:"+d+":"+i,ok=has(k),w=r>=PW[i][0]&&r<=PW[i][1];return`<div class="card row"><b>🕌 ${nm}</b>${ok?`<span class="done">✓ ${t("done")}</span>`:`<button class="btn" ${w?"":"disabled"} data-a="pr" data-k="${k}" data-i="${i}">${w?t("done")+" (+"+S.cfg.pray+")":t("wait")}</button>`}</div>`}).join("")}
function vAz(){const i=S.az;if(i>=AZ.length)return`<div class="card ad">${t("fin")}</div>`;return`<div class="card"><div class="ad">${AZ[i]}</div><div class="row"><span>${i+1}/${AZ.length}</span><button class="btn g" data-a="az" data-k="a:${today()}:${i}">${t("done")} · ${t("next")} (+${S.cfg.adhkar})</button></div></div>`}
function vSt(){const d=today();let c=0;for(let i=0;i<4;i++)if(has("s:"+d+":"+i))c++;return`<div class="card"><div class="pts">${c}/4</div><button class="btn" ${c>=4?"disabled":""} data-a="st" data-k="s:${d}:${c}">${t("studied")} (+${S.cfg.study})</button></div>`}
function vWh(){const used=has("w:"+today());return`<div class="card" style="text-align:center"><div style="position:relative;width:260px;height:260px;margin:18px auto"><div style="position:absolute;top:-16px;left:50%;transform:translateX(-50%);font-size:30px;z-index:2">🔻</div><div id="wheel" style="position:relative;width:100%;height:100%;border-radius:50%;border:6px solid var(--ac2);box-shadow:0 8px 24px #0004;background:conic-gradient(${WC.map((c,i)=>`${c} ${i*45}deg ${(i+1)*45}deg`).join(",")});transition:transform 4s cubic-bezier(.17,.67,.2,1)">${WH.map((w,i)=>`<b style="position:absolute;left:50%;top:50%;width:30px;margin:-12px 0 0 -15px;text-align:center;color:#fff;font-size:18px;transform:rotate(${i*45+22.5}deg) translateY(-92px)">${w}</b>`).join("")}</div></div><button class="btn g" data-a="spin" ${used||S.spinning?"disabled":""}>${used?t("spun"):t("spin")}</button><div id="wr" class="ad">${S.wq||""}</div></div>`}
function vMy(){return`<div class="card" style="text-align:center"><div class="pts">${S.prof.points||0}</div>${t("pts")}</div><div class="card"><b>${t("hist")}</b>${S.hist.length?S.hist.map(h=>`<div class="row"><span>${esc(h.why)}<br><small>${new Date(h.ts).toLocaleDateString(S.lang=="ar"?"ar-EG":"en-GB")}</small></span><b style="color:${h.d<0?"#c33":"var(--ac)"}">${sign(h.d)}</b></div>`).join(""):t("lbl")}</div>`}
const vLb=()=>S.lead.length?S.lead.map((x,i)=>`<div class="card row"><span class="rank">${["🥇","🥈","🥉"][i]||i+1}</span><b style="flex:1">${esc(x.name)}</b><span class="pts" style="font-size:20px">${x.points||0}</span></div>`).join(""):`<div class="card">${t("none")}</div>`;
function vGf(){const f=S.isT?`<div class="card"><b>${t("add")} ${t("gf")}</b><input type="text" id="gt" placeholder="${t("gname")}"><input type="text" id="gc" inputmode="numeric" placeholder="${t("gcost")}"><label class="btn o">📷<input type="file" accept="image/*" hidden data-a="gimg"></label> <span id="gn"></span> <button class="btn g" data-a="gadd">${t("add")}</button></div>`:"";
 return f+(S.gifts.length?S.gifts.map(g=>{const p=S.prof?.points||0,pc=Math.max(0,Math.min(100,p/(g.cost||1)*100));return`<div class="card"><div class="row"><b>🎁 ${esc(g.title)}</b><span class="pts" style="font-size:20px">${g.cost}</span></div>${g.img?`<img class="sub" src="${g.img}">`:""}${S.isT?`<button class="btn o" data-a="gdel" data-id="${g.id}">✕</button>`:`<div class="bar"><i style="width:${pc}%"></i></div><small>${p>=g.cost?t("can"):t("left")+" "+(g.cost-p)+" "+t("pts")}</small>`}</div>`}).join(""):`<div class="card">${t("none")}</div>`)}
function vSet(){const c=S.cfg,inp=(id,k)=>`<div class="row"><span>${t(k)}</span><input type="text" id="${id}" inputmode="numeric" value="${c[k]}"></div>`;
 return`<div class="card"><b>${t("pset")}</b>${inp("c1","pray")}${inp("c2","adhkar")}${inp("c3","study")}${inp("c4","kahf")}<button class="btn g" data-a="csave">${t("save")}</button></div>
<h3>${t("stu")} (${S.studs.length})</h3>${S.studs.map(s=>`<div class="card"><div class="row"><b>${esc(s.name)}</b><span class="pts" style="font-size:20px">${s.points||0}</span></div><small>${esc(s.email)}</small><div><button class="btn g" data-a="adjf" data-id="${s.id}">${t("adjb")}</button><button class="btn o" data-a="sdel" data-id="${s.id}">🗑</button></div>${S.adjOpen==s.id?`<input type="text" id="an" inputmode="numeric" placeholder="${t("amt")}"><input type="text" id="ar" placeholder="${t("why")}"><button class="btn" data-a="adj" data-id="${s.id}" data-s="1">＋</button><button class="btn o" data-a="adj" data-id="${s.id}" data-s="-1">－</button>`:""}</div>`).join("")}
<div class="card"><b>${t("tm")}</b><input type="text" id="te" placeholder="${t("tadd")}"><button class="btn g" data-a="tadd">${t("add")}</button><div>👑 ${OWNER}</div>${S.tchs.map(e=>`<div class="row"><span>${esc(e)}</span><button class="btn o" data-a="tdel" data-id="${esc(e)}">✕</button></div>`).join("")}</div>`}
async function spin(){S.spinning=1;S.wq="";const r=Math.floor(Math.random()*8),R=360*6-(r*45+22.5),w=$("#wheel");
 await updateDoc(doc(db,"students",S.u.uid),{["log."+kk("w:"+today())]:1});S.prof.log[kk("w:"+today())]=1;
 w.style.transform=`rotate(${R}deg)`;
 setTimeout(async()=>{S.spinning=0;const v=WH[r];
  if(v=="❓"){const q=QZ[Math.floor(Math.random()*QZ.length)];S.wq=`<b>❓ ${q[0]}</b><br>${q[1].map((o,i)=>`<button class="btn" data-a="qa" data-ok="${i==q[2]?1:0}">${o}</button>`).join("")}`;render()}
  else{const d=n(v);await addPts(S.u.uid,d,"🎡 عجلة الحظ");S.wq=`<b>${v}</b> 🎉`;render()}},4200)}
async function act(b){const a=b.dataset.a,id=b.dataset.id;
 if(a=="go"){const s=$("#splash");s.style.opacity=0;setTimeout(()=>s.remove(),500)}
 if(a=="si")signInWithPopup(auth,new GoogleAuthProvider());
 if(a=="out")signOut(auth);
 if(a=="lang"){S.lang=S.lang=="ar"?"en":"ar";render()}
 if(a=="theme"){const r=document.documentElement,d=r.dataset.theme=="dark"||(!r.dataset.theme&&matchMedia("(prefers-color-scheme:dark)").matches);TH.mode=d?"light":"dark";applyTheme()}
 if(a=="tab"){S.tab=b.dataset.t;S.menu=0;S.an=1;scrollTo(0,0);render()}
 if(a=="menu"){S.menu=!S.menu;render()}
 if(a=="mode"){TH.mode=b.dataset.v;applyTheme();render()}
 if(a=="preset"){Object.assign(TH,PRE[b.dataset.v][1]);applyTheme();render()}
 if(a=="reset"){TH={...TH0};applyTheme();render()}
 if(a=="hello"){S.hello=1;try{Notification.requestPermission()}catch(e){}render()}
 if(a=="reg"){const nm=$("#nm").value.trim();if(nm.split(/\s+/).length<3){$("#nm").style.borderColor="#c00";return}
  await setDoc(doc(db,"students",S.u.uid),{name:nm,email:S.u.email,points:0,log:{}});await setDoc(doc(db,"leaders",S.u.uid),{name:nm,points:0})}
 if(a=="pr")award(b.dataset.k,S.cfg.pray,"🕌 "+t("pn")[b.dataset.i]);
 if(a=="st")award(b.dataset.k,S.cfg.study,"✏️ "+t("st"));
 if(a=="az"){await award(b.dataset.k,S.cfg.adhkar,"📿 "+t("az"));S.az++;render()}
 if(a=="kahf")award("k:"+today(),S.cfg.kahf,"📖 "+t("kahf"));
 if(a=="spin")spin();
 if(a=="qa"){S.wq=b.dataset.ok=="1"?"<b>✅ +3</b>":"<b>❌</b>";if(b.dataset.ok=="1")await addPts(S.u.uid,3,"🎓 تحدي المعلمات");render()}
 if(a=="cm"){S.cf={m:b.dataset.v};render()}
 if(a=="cs"){S.cf.s=b.dataset.v;render()}
 if(a=="cadd"){const ti=$("#ct").value.trim();if(!ti)return;const d={title:ti,taken:0,ts:Date.now()};
  if(S.cf.m=="g"){d.mode="group";d.p=[n($("#p1").value)||10,n($("#p2").value)||7,n($("#p3").value)||5]}
  else{d.mode=S.cf.s;d.pts=n($("#pp").value)||10;if(d.mode=="one"){d.target=$("#ctg").value;d.tname=(S.studs.find(s=>s.id==d.target)||{}).name||""}}
  await setDoc(doc(db,"challenges",String(Date.now())),d);S.cf={};render()}
 if(a=="cdel")await deleteDoc(doc(db,"challenges",id));
 if(a=="cdn"){const q=await getDocs(collection(db,"challenges",id,"done"));$("#d"+id).innerHTML=q.docs.map(x=>x.data()).sort((p,r)=>p.rank-r.rank).map(x=>`<div>#${x.rank} ${esc(x.name)} (+${x.pts})${x.img?`<img class="sub" src="${x.img}">`:""}</div>`).join("")||t("none")}
 if(a=="cdone"||a=="cpic"){const c=S.ch.find(x=>x.id==id);if(!c||has("c:"+id))return;const img=a=="cpic"&&b.files[0]?await shrink(b.files[0]):"";const p=await doChallenge(c,img);if(p==null)alert(t("late"));else await award("c:"+id,p,"🎯 "+c.title)}
 if(a=="gimg"){S.gfile=b.files[0];$("#gn").textContent=S.gfile?S.gfile.name:""}
 if(a=="gadd"){const v=$("#gt").value.trim();if(!v)return;const img=S.gfile?await shrink(S.gfile):"";S.gfile=null;await setDoc(doc(db,"gifts",String(Date.now())),{title:v,cost:n($("#gc").value)||10,img,ts:Date.now()})}
 if(a=="gdel")await deleteDoc(doc(db,"gifts",id));
 if(a=="csave")await setDoc(doc(db,"config","points"),{pray:n($("#c1").value),adhkar:n($("#c2").value),study:n($("#c3").value),kahf:n($("#c4").value)});
 if(a=="adjf"){S.adjOpen=id;render()}
 if(a=="adj"){const v=Math.abs(n($("#an").value));if(!v)return;await addPts(id,v*+b.dataset.s,$("#ar").value.trim()||"ولي الأمر");S.adjOpen=null;render()}
 if(a=="sdel"&&confirm(t("sure"))){await deleteDoc(doc(db,"students",id));await deleteDoc(doc(db,"leaders",id))}
 if(a=="tadd"){const e=$("#te").value.trim().toLowerCase();if(e.includes("@"))await setDoc(doc(db,"teachers",e),{ts:Date.now()})}
 if(a=="tdel")await deleteDoc(doc(db,"teachers",id))}
document.addEventListener("click",e=>{const b=e.target.closest("[data-a]");if(b&&b.tagName!="INPUT")act(b)});
document.addEventListener("change",e=>{const b=e.target;if(b.dataset?.a&&b.type=="file")act(b)});
setInterval(()=>{const r=rt();if(!S.isT&&S.hello&&r.day=="Friday"&&r.m>=840&&!sessionStorage.kn&&window.Notification&&Notification.permission=="granted"){sessionStorage.kn=1;new Notification("نقاطي 📖",{body:"هيا لنقرأ سورة الكهف"})}render()},60000);
const STARS=Array.from({length:80},()=>`${(Math.random()*100).toFixed(1)}vw ${Math.floor(Math.random()*240)}px 0 0 rgba(255,255,255,${(.35+Math.random()*.65).toFixed(2)})`).join(",");
function px(){const h=$("#hero");if(!h)return;const y=scrollY;h.querySelectorAll("[data-s]").forEach(e=>e.style.transform=`translate3d(${y*(e.dataset.x||0)}px,${y*e.dataset.s}px,0)`);const q=h.querySelector(".ht");if(q){q.style.opacity=Math.max(0,1-y/230);q.style.transform=`translateY(${y*.45}px)`}}
addEventListener("scroll",()=>requestAnimationFrame(px),{passive:true});
const TH0={mode:"auto",ac:"#0f8b6d",ac2:"#d4a017",sc:"#7e2d8f"};
let TH={...TH0};try{TH={...TH0,...JSON.parse(localStorage.getItem("nq_theme")||"{}")}}catch(e){}
const PRE=[["أخضر ملكي",{ac:"#0f8b6d",ac2:"#d4a017",sc:"#7e2d8f"}],["أزرق المحيط",{ac:"#0369a1",ac2:"#f59e0b",sc:"#1d6fa5"}],["وردي",{ac:"#be185d",ac2:"#d4a017",sc:"#c0407a"}],["غروب برتقالي",{ac:"#c2410c",ac2:"#eab308",sc:"#d9622b"}],["بنفسجي",{ac:"#6d28d9",ac2:"#d4a017",sc:"#7e2d8f"}],["ذهبي",{ac:"#b8860b",ac2:"#0f8b6d",sc:"#a8741a"}]];
const hsl=h=>{const r=parseInt(h.slice(1,3),16)/255,g=parseInt(h.slice(3,5),16)/255,b=parseInt(h.slice(5,7),16)/255,mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2,d=mx-mn;let H=0,Sx=0;if(d){Sx=d/(1-Math.abs(2*l-1));H=(mx==r?(g-b)/d+(g<b?6:0):mx==g?(b-r)/d+2:(r-g)/d+4)*60}return[Math.round(H),Math.round(Sx*100)]};
function applyTheme(){const r=document.documentElement,st=r.style,[H,Sx]=hsl(TH.sc),sa=Math.max(35,Sx);
 if(TH.mode=="auto")delete r.dataset.theme;else r.dataset.theme=TH.mode;
 st.setProperty("--ac",TH.ac);st.setProperty("--ac2",TH.ac2);
 [["sky1",8],["sky2",17],["sky3",34],["m1",62],["m2",38],["m3",18],["m4",11]].forEach(([k,l])=>st.setProperty("--"+k,`hsl(${H} ${sa}% ${l}%)`));
 try{localStorage.setItem("nq_theme",JSON.stringify(TH))}catch(e){}}
function vLook(){const m=TH.mode,b=(v,l)=>`<button class="btn ${m==v?"":"o"}" data-a="mode" data-v="${v}">${l}</button>`,c=(k,l)=>`<div class="row"><span>${l}</span><input type="color" class="cp" data-k="${k}" value="${TH[k]}"></div>`;
 return`<div class="card"><b>🌗 الوضع</b><div>${b("light","☀️ فاتح")}${b("dark","🌙 داكن")}${b("auto","🔄 تلقائي")}</div></div><div class="card"><b>🎨 ألوان جاهزة</b><div class="row">${PRE.map((p,i)=>`<button class="sw" title="${p[0]}" data-a="preset" data-v="${i}" style="background:linear-gradient(135deg,${p[1].ac} 50%,${p[1].ac2} 50%)"></button>`).join("")}</div></div><div class="card"><b>🖌️ اختر أي لون تحبه</b>${c("ac","لون الأزرار")}${c("ac2","اللون الذهبي")}${c("sc","لون المشهد (السما والجبال)")}<button class="btn o" data-a="reset">↺ إعادة الافتراضي</button></div>`}
document.addEventListener("input",e=>{const b=e.target;if(b.type=="color"&&b.dataset.k){TH[b.dataset.k]=b.value;applyTheme()}});
applyTheme();splash();render();
