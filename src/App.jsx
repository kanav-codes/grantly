
import { useState, useEffect, useMemo } from "react";
const S=[
{id:1,n:"Horizon STEM Excellence Award",o:"Horizon Foundation",a:250000,d:9,lv:["UG","PG"],f:["Engineering","Science"],g:8,need:false,t:"Merit",desc:"Rewards high-performing STEM students with a yearly grant covering tuition and research costs.",docs:["Marksheet","Statement of purpose","Recommendation letter","ID proof"]},
{id:2,n:"First Gen Scholars Fund",o:"Uplift Trust",a:180000,d:21,lv:["UG"],f:["Any"],g:6.5,need:true,t:"Need-based",desc:"For first-generation college students from families under the income threshold.",docs:["Income certificate","Marksheet","Essay (500 words)","Bank details"]},
{id:3,n:"Future Healers Grant",o:"MedBridge India",a:320000,d:34,lv:["UG","PG"],f:["Medicine"],g:7.5,need:false,t:"Merit",desc:"Supports MBBS and allied health students with fees and clinical placement stipends.",docs:["Admission letter","Marksheet","Recommendation letter","ID proof"]},
{id:4,n:"Creative Minds Fellowship",o:"Studio Arts Council",a:120000,d:15,lv:["UG","PG"],f:["Arts"],g:6,need:false,t:"Portfolio",desc:"A fellowship for designers, writers and performers building a standout portfolio.",docs:["Portfolio link","Statement of purpose","Marksheet"]},
{id:5,n:"Women in Business Award",o:"Ascend Capital",a:200000,d:5,lv:["PG"],f:["Business"],g:7,need:false,t:"Merit",desc:"Funds women pursuing MBA or business masters with mentorship from industry leaders.",docs:["Resume","Essay (800 words)","Marksheet","Recommendation letter"]},
{id:6,n:"Doctoral Research Stipend",o:"National Research Board",a:480000,d:48,lv:["PhD"],f:["Science","Engineering"],g:7.5,need:false,t:"Research",desc:"Annual stipend for full-time doctoral researchers, with a contingency grant for conferences.",docs:["Research proposal","Supervisor letter","Marksheet","Publications list"]},
{id:7,n:"Bright Futures Need Grant",o:"Rotary Learning Circle",a:90000,d:27,lv:["UG","PG"],f:["Any"],g:5.5,need:true,t:"Need-based",desc:"Quick-turnaround grant to bridge fee gaps. Decisions in two weeks.",docs:["Income certificate","Fee receipt","ID proof"]},
{id:8,n:"Code for Change Scholarship",o:"OpenStack Alliance",a:150000,d:12,lv:["UG","PG"],f:["Engineering"],g:6.5,need:false,t:"Merit",desc:"For students who ship open-source projects. Show us your GitHub, not just your grades.",docs:["GitHub profile","Statement of purpose","Marksheet"]},
{id:10,n:"Rural Rising Scholarship",o:"Gramin Vikas Trust",a:110000,d:18,lv:["UG"],f:["Any"],g:6,need:true,t:"Need-based",desc:"Supports students from rural districts who are moving to a city for college.",docs:["Domicile certificate","Income certificate","Marksheet","Bank details"]},
{id:11,n:"AI & Data Fellows",o:"DataForGood Labs",a:300000,d:30,lv:["PG","PhD"],f:["Engineering","Science"],g:7.5,need:false,t:"Research",desc:"Fellowship for students building AI projects with social impact, plus mentorship.",docs:["Project write-up","Resume","Recommendation letter","Marksheet"]},
{id:12,n:"Sports & Studies Award",o:"Champions Academy",a:130000,d:42,lv:["UG","PG"],f:["Any"],g:6,need:false,t:"Merit",desc:"For state-level athletes balancing training with academics.",docs:["Sports certificate","Marksheet","ID proof"]},
{id:9,n:"Global Leaders Merit Prize",o:"Meridian Education",a:400000,d:60,lv:["UG","PG","PhD"],f:["Any"],g:8.5,need:false,t:"Merit",desc:"Prestige prize for exceptional all-rounders with leadership and community impact.",docs:["Resume","Essay (1000 words)","Two recommendation letters","Marksheet"]}];
const LV={UG:"Undergrad",PG:"Postgrad",PhD:"PhD"},FL=["Engineering","Science","Medicine","Business","Arts"];
const inr=n=>"₹"+n.toLocaleString("en-IN");
const load=(k,d)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}};
let L="en";
const H={"Discover":"खोजें","My tracker":"मेरा ट्रैकर","Find money for college,":"कॉलेज की पढ़ाई के लिए मदद पाएँ,","not more paperwork.":"काग़ज़ी झंझट के बिना।","Tell us about you once. Grantly ranks every scholarship by how likely you are to qualify, then walks you through each application.":"एक बार अपने बारे में बताइए। Grantly हर स्कॉलरशिप को इस आधार पर रैंक करता है कि आप उसके लिए कितने पात्र हैं, फिर हर आवेदन में आपका साथ देता है।","in strong matches for you":"आपके लिए बेहतरीन मैच में","scholarships you fit":"स्कॉलरशिप के लिए आप पात्र हैं","closing within 2 weeks":"2 हफ़्ते में बंद हो रही हैं","Study level":"पढ़ाई का स्तर","Field":"विषय","Financial need":"आर्थिक ज़रूरत","CGPA":"सीजीपीए","Undergrad":"स्नातक","Postgrad":"स्नातकोत्तर","PhD":"पीएचडी","Engineering":"इंजीनियरिंग","Science":"विज्ञान","Medicine":"चिकित्सा","Business":"व्यवसाय","Arts":"कला","Your matches":"आपके मैच","Search scholarships…":"स्कॉलरशिप खोजें…","Best match":"सबसे अच्छा मैच","Highest amount":"सबसे ज़्यादा राशि","Deadline":"अंतिम तिथि","All":"सभी","Merit":"मेरिट","Need-based":"ज़रूरत-आधारित","Research":"शोध","Portfolio":"पोर्टफ़ोलियो","✓ Eligible only":"✓ सिर्फ़ पात्र","days left":"दिन बाकी","✓ Saved":"✓ सेव किया","+ Save":"+ सेव करें","Closing soon":"जल्द बंद हो रही","Why you matched":"आप क्यों मैच हुए","Application checklist":"आवेदन चेकलिस्ट","Start applying":"आवेदन शुरू करें","Mark as submitted":"जमा किया, चिह्नित करें","Remove from tracker":"ट्रैकर से हटाएँ","Saved":"सेव किए","Applying":"आवेदन जारी","Submitted":"जमा किए","Awarded 🏆":"चयनित 🏆"};
const H2={"★ Saved":"★ सेव किए","Saved to your tracker":"ट्रैकर में सेव हो गया","Congratulations! 🎉":"बधाई हो! 🎉","Plan copied":"प्लान कॉपी हो गया","Copy is not available here":"यहाँ कॉपी उपलब्ध नहीं है","All local data erased":"सारा लोकल डेटा मिटा दिया गया","Checklist complete. Ready to submit! 🚀":"चेकलिस्ट पूरी! जमा करने के लिए तैयार 🚀","Everything you’ve saved, started and submitted, in one place. Click a card to update its checklist.":"जो भी आपने सेव किया, शुरू किया और जमा किया, सब एक जगह। चेकलिस्ट अपडेट करने के लिए कार्ड पर क्लिक करें।","scholarships tracked":"स्कॉलरशिप ट्रैक की जा रही हैं","potential funding":"संभावित फ़ंडिंग","average readiness":"औसत तैयारी","Copy my plan":"मेरा प्लान कॉपी करें","Deadline timeline · longer bar = sooner":"समय-सीमा टाइमलाइन · लंबी बार = जल्दी","Nothing here yet":"यहाँ अभी कुछ नहीं","Save a scholarship from Discover to start tracking.":"ट्रैक करने के लिए खोजें से कोई स्कॉलरशिप सेव करें।","No scholarships match that search.":"इस खोज से कोई स्कॉलरशिप नहीं मिली।","Your profile and progress stay on this device. Nothing is sent to any server.":"आपकी प्रोफ़ाइल और प्रगति इसी डिवाइस पर रहती है। कुछ भी किसी सर्वर को नहीं भेजा जाता।","Clear my data":"मेरा डेटा मिटाएँ","Essay & notes":"निबंध और नोट्स","words":"शब्द","Draft your essay or jot down ideas… (saved on this device)":"अपना निबंध लिखें या विचार नोट करें… (इसी डिवाइस पर सेव)","Thinking…":"सोच रहा है…","✨ Get AI feedback":"✨ AI फ़ीडबैक पाएँ","Add deadline to Google Calendar":"अंतिम तिथि Google Calendar में जोड़ें","I got it!":"मुझे मिल गई!","Closes in":"बंद होने में","days":"दिन","year":"वर्ष","closes in":"बंद होने में","Finish your checklist!":"अपनी चेकलिस्ट पूरी करें!"};
const tx=s=>(L==="hi"&&(H[s]||H2[s]))||s;
const ST=["saved","applying","submitted","won"];
const cleanP=p=>({level:p&&LV[p.level]?p.level:"UG",field:p&&FL.includes(p.field)?p.field:"Engineering",gpa:Math.min(10,Math.max(5,Number(p&&p.gpa)||7.5)),need:!!(p&&p.need)});
const cleanT=t=>{const o={};if(t&&typeof t==="object")S.forEach(s=>{if(ST.includes(t[s.id]))o[s.id]=t[s.id]});return o};
const cleanC=c=>{const o={};if(c&&typeof c==="object")S.forEach(s=>{if(Array.isArray(c[s.id]))o[s.id]=c[s.id].filter(d=>s.docs.includes(d))});return o};
const save=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
function score(s,p){let x=35;
 if(s.lv.includes(p.level))x+=25;else x-=25;
 if(s.f.includes("Any")||s.f.includes(p.field))x+=20;else x-=20;
 x+=p.gpa>=s.g?15:-Math.min(30,(s.g-p.gpa)*12);
 if(s.need)x+=p.need?5:-10;
 x+=s.d<=14?4:0;return Math.max(5,Math.min(99,Math.round(x)))}
const whyEn=(s,p)=>{const l=s.lv.includes(p.level),f=s.f.includes("Any")||s.f.includes(p.field);return[[l,l?"Open to "+LV[p.level]+" students":"Not open to "+LV[p.level]+" students"],[f,f?"Your field is eligible":"Meant for "+s.f.join("/")+" students"],[p.gpa>=s.g,"Your CGPA "+p.gpa.toFixed(1)+" vs "+s.g+" required"],[!s.need||p.need,s.need?(p.need?"Need-based and you indicated need":"Need-based: income proof required"):"No income test"]]};
const why=(s,p)=>{if(L!=="hi")return whyEn(s,p);const l=s.lv.includes(p.level),f=s.f.includes("Any")||s.f.includes(p.field),lv=tx(LV[p.level]);return[[l,l?lv+" छात्रों के लिए खुली है":lv+" छात्रों के लिए नहीं है"],[f,f?"आपका विषय पात्र है":s.f.map(tx).join("/")+" के छात्रों के लिए"],[p.gpa>=s.g,"आपका CGPA "+p.gpa.toFixed(1)+", ज़रूरत "+s.g],[!s.need||p.need,s.need?(p.need?"ज़रूरत-आधारित और आपने ज़रूरत बताई है":"ज़रूरत-आधारित: आय प्रमाण चाहिए"):"कोई आय परीक्षण नहीं"]]};
function Ring({v}){const r=24,c=2*Math.PI*r;const [o,setO]=useState(c);
 useEffect(()=>{const t=setTimeout(()=>setO(c*(1-v/100)),80);return()=>clearTimeout(t)},[v]);
 const col=v>=75?"var(--ok)":v>=50?"var(--warn)":"var(--acc)";
 return <div className="ring"><svg width="58" height="58"><circle className="t" cx="29" cy="29" r={r}/><circle className="p" cx="29" cy="29" r={r} stroke={col} strokeDasharray={c} strokeDashoffset={o}/></svg><b>{v}%</b></div>}
function Chip({on,children,...p}){return <button className={"chip"+(on?" on":"")} {...p}>{children}</button>}
function Card({s,m,i,saved,onOpen,onSave}){
 return <div className="card" role="button" tabIndex={0} onKeyDown={e=>{if(e.key==="Enter")onOpen()}} style={{animationDelay:i*60+"ms"}} onClick={onOpen}>
  <div className="top"><div><div className="org">{s.o}</div><h3>{s.n}</h3></div><Ring v={m}/></div>
  <div className="amt">{inr(s.a)}<small style={{fontSize:13,color:"var(--mute)",fontFamily:"Manrope"}}>{" /"+tx("year")}</small></div>
  <div className="tags"><span className="tag">{tx(s.t)}</span>{s.lv.map(l=><span className="tag" key={l}>{l}</span>)}{s.d<=10&&<span className="tag u">{tx("Closing soon")}</span>}</div>
  <div className="foot"><span>⏳ {s.d} {tx("days left")}</span><button className={"save"+(saved?" on":"")} onClick={e=>{e.stopPropagation();onSave()}}>{tx(saved?"✓ Saved":"+ Save")}</button></div>
 </div>}
function Detail({s,m,p,st,ck,setSt,toggle,close,note,setNote}){
 const done=ck.length,pct=Math.round(done/s.docs.length*100);
 const dt=new Date(Date.now()+s.d*864e5),nx=new Date(dt.getTime()+864e5),f=x=>x.toISOString().slice(0,10).replace(/-/g,"");
 const cal="https://calendar.google.com/calendar/render?action=TEMPLATE&text="+encodeURIComponent("Deadline: "+s.n)+"&dates="+f(dt)+"/"+f(nx);
 const [fb,setFb]=useState(""),[ld,setLd]=useState(false);
 const ask=async()=>{setLd(true);setFb("");try{const r=await fetch("/api/ai",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:s.n,text:note})});const j=await r.json();setFb(r.ok?String(j.reply||""):String(j.error||"Something went wrong."))}catch(e){setFb("AI feedback works on the deployed version once the Groq function is set up.")}setLd(false)};
 return <div className="modal" onClick={close}><div className="sheet" onClick={e=>e.stopPropagation()}>
  <button className="ic" onClick={close} aria-label="Close">✕</button>
  <div className="org" style={{marginTop:18}}>{s.o}</div><h2>{s.n}</h2>
  <div style={{display:"flex",gap:16,alignItems:"center"}}><Ring v={m}/><div><div className="amt">{inr(s.a)}</div><small style={{color:"var(--mute)"}}>{tx("Closes in")} {s.d} {tx("days")}</small></div></div>
  <p>{s.desc}</p>
  <label className="l" style={{marginTop:16}}>{tx("Why you matched")}</label>
  {why(s,p).map(([ok,t])=><div key={t} className={"why "+(ok?"y":"n")}>{ok?"✓":"✕"} {t}</div>)}
  <label className="l" style={{marginTop:20}}>{tx("Application checklist")} · {pct}%</label>
  <div className="prog"><i style={{width:pct+"%"}}/></div>
  {s.docs.map(d=>{const on=ck.includes(d);return <div key={d} className={"ck"+(on?" on":"")} onClick={()=>toggle(d)}><div className="bx">{on&&"✓"}</div><span>{d}</span></div>})}
  <label className="l" style={{marginTop:22}}>{tx("Essay & notes")} · {note.trim()?note.trim().split(/\s+/).length:0} {tx("words")}</label>
  <textarea className="search" style={{width:"100%",borderRadius:16,minHeight:110,resize:"vertical"}} maxLength={2000} placeholder={tx("Draft your essay or jot down ideas… (saved on this device)")} value={note} onChange={e=>setNote(e.target.value)}/>
  <button className="btn" disabled={ld||note.trim().length<20} style={{opacity:ld||note.trim().length<20?.55:1}} onClick={ask}>{tx(ld?"Thinking…":"✨ Get AI feedback")}</button>
  {fb&&<div style={{whiteSpace:"pre-wrap",background:"var(--bg)",border:"1px solid var(--line)",borderRadius:14,padding:14,marginTop:10,fontSize:14}}>{fb}</div>}
  <a className="btn g" style={{display:"block",textAlign:"center",textDecoration:"none"}} href={cal} target="_blank" rel="noopener noreferrer">📅 {tx("Add deadline to Google Calendar")}</a>
  {st!=="applying"&&st!=="submitted"&&st!=="won"&&<button className="btn" onClick={()=>setSt("applying")}>{tx("Start applying")}</button>}
  {st==="applying"&&<button className="btn" onClick={()=>setSt("submitted")}>{tx("Mark as submitted")}</button>}
  {st==="submitted"&&<button className="btn" onClick={()=>setSt("won")}>🎉 {tx("I got it!")}</button>}
  {st&&<button className="btn g" onClick={()=>setSt(null)}>{tx("Remove from tracker")}</button>}
 </div></div>}
function boom(){const cs=["#5b3df5","#ff7a45","#12a26b","#e0a100","#8b6cff"];
 for(let i=0;i<40;i++){const e=document.createElement("div");e.className="confetti";e.style.left=Math.random()*100+"vw";e.style.background=cs[i%5];e.style.animationDelay=Math.random()*.4+"s";document.body.appendChild(e);setTimeout(()=>e.remove(),2400)}}
function App(){
 const [view,setView]=useState("find");
 const [lang,setLang]=useState(()=>load("g_l","en")==="hi"?"hi":"en");
 L=lang;
 const [p,setP]=useState(()=>cleanP(load("g_p",null)));
 const [track,setTrack]=useState(()=>cleanT(load("g_t",{})));
 const [ck,setCk]=useState(()=>cleanC(load("g_c",{})));
 const [q,setQ]=useState("");const [sort,setSort]=useState("match");const [tf,setTf]=useState("All");const [elig,setElig]=useState(false);const [so,setSo]=useState(false);
 const [nt,setNt]=useState(()=>{const o={},n=load("g_n",{});if(n&&typeof n==="object")S.forEach(s=>{if(typeof n[s.id]==="string")o[s.id]=n[s.id].slice(0,2000)});return o});
 const [open,setOpen]=useState(null);const [toast,setToast]=useState("");
 const [theme,setTheme]=useState(()=>{const t=load("g_th",null);return t==="dark"||t==="light"?t:null});
 useEffect(()=>save("g_p",p),[p]);useEffect(()=>save("g_t",track),[track]);useEffect(()=>save("g_c",ck),[ck]);useEffect(()=>save("g_n",nt),[nt]);useEffect(()=>{save("g_l",lang);document.documentElement.lang=lang},[lang]);
 useEffect(()=>{if(theme){document.documentElement.dataset.theme=theme;save("g_th",theme)}},[theme]);
 useEffect(()=>{if(toast){const t=setTimeout(()=>setToast(""),2200);return()=>clearTimeout(t)}},[toast]);
 useEffect(()=>{const k=e=>{if(e.key==="Escape")setOpen(null);if(e.key==="/"&&!/INPUT|TEXTAREA/.test(document.activeElement.tagName)){e.preventDefault();const i=document.querySelector(".search");if(i)i.focus()}};addEventListener("keydown",k);return()=>removeEventListener("keydown",k)},[]);
 const list=useMemo(()=>S.map(s=>({s,m:score(s,p)})).filter(x=>(x.s.n+x.s.o+x.s.t).toLowerCase().includes(q.toLowerCase())&&(tf==="All"||x.s.t===tf)&&(!elig||x.m>=60)&&(!so||track[x.s.id]))
  .sort((a,b)=>sort==="match"?b.m-a.m:sort==="amount"?b.s.a-a.s.a:a.s.d-b.s.d),[p,q,sort,tf,elig,so,track]);
 const total=useMemo(()=>list.filter(x=>x.m>=60).reduce((t,x)=>t+x.s.a,0),[list]);
 const setSt=(id,v)=>{setTrack(t=>{const n={...t};if(v)n[id]=v;else delete n[id];return n});
  if(v==="won"){boom();setToast("Congratulations! 🎉")}else if(v)setToast(v==="saved"?"Saved to your tracker":"Moved to "+v)};
 const toggleSave=id=>setSt(id,track[id]?null:"saved");
 const toggleCk=(id,d)=>{const a=ck[id]||[],n=a.includes(d)?a.filter(x=>x!==d):[...a,d];setCk({...ck,[id]:n});const s=S.find(x=>x.id===id);if(s&&n.length===s.docs.length&&a.length<n.length){boom();setToast("Checklist complete. Ready to submit! 🚀")}};
 const os=open&&S.find(s=>s.id===open);
 const urgent=S.filter(s=>["saved","applying"].includes(track[s.id])&&s.d<=14).sort((a,b)=>a.d-b.d);
 const tr=S.filter(s=>track[s.id]);
 const avg=tr.length?Math.round(tr.reduce((t,s)=>t+(ck[s.id]||[]).length/s.docs.length,0)/tr.length*100):0;
 const copy=async()=>{const t="My Grantly plan\n"+tr.map(s=>"• "+s.n+" — "+inr(s.a)+" — "+s.d+"d left ("+track[s.id]+")").join("\n");try{await navigator.clipboard.writeText(t);setToast("Plan copied")}catch(e){setToast("Copy is not available here")}};
 const cols=[["saved","Saved"],["applying","Applying"],["submitted","Submitted"],["won","Awarded 🏆"]];
 const dark=document.documentElement.dataset.theme==="dark"||(!theme&&matchMedia("(prefers-color-scheme: dark)").matches);
 return <div className="wrap">
  <nav><div className="logo"><i/>Grantly</div>
   <div className="tabs"><button className={"tab"+(view==="find"?" on":"")} onClick={()=>setView("find")}>{tx("Discover")}</button>
   <button className={"tab"+(view==="track"?" on":"")} onClick={()=>setView("track")}>{tx("My tracker")}{Object.keys(track).length>0&&` (${Object.keys(track).length})`}</button></div>
   <span style={{display:"flex",gap:8}}><button className="ic" aria-label="Language" style={{fontWeight:800,fontSize:13}} onClick={()=>setLang(lang==="en"?"hi":"en")}>{lang==="en"?"हि":"EN"}</button><button className="ic" aria-label="Toggle theme" onClick={()=>setTheme(dark?"light":"dark")}>{dark?"☀️":"🌙"}</button></span></nav>
  {view==="find"&&<>
   <section className="hero"><h1>{tx("Find money for college,")}<br/><em>{tx("not more paperwork.")}</em></h1>
    <p>{tx("Tell us about you once. Grantly ranks every scholarship by how likely you are to qualify, then walks you through each application.")}</p>
    <div className="stats"><div><b>{inr(total)}</b><span>{tx("in strong matches for you")}</span></div><div><b>{list.filter(x=>x.m>=60).length}</b><span>{tx("scholarships you fit")}</span></div><div><b>{list.filter(x=>x.s.d<=14).length}</b><span>{tx("closing within 2 weeks")}</span></div></div></section>
   <div className="panel"><div className="grid2">
    <div><label className="l">{tx("Study level")}</label><div className="chips">{Object.entries(LV).map(([k,v])=><Chip key={k} on={p.level===k} onClick={()=>setP({...p,level:k})}>{tx(v)}</Chip>)}</div></div>
    <div><label className="l">{tx("Field")}</label><div className="chips">{FL.map(f=><Chip key={f} on={p.field===f} onClick={()=>setP({...p,field:f})}>{tx(f)}</Chip>)}</div></div>
    <div><label className="l">{tx("CGPA")} · {p.gpa.toFixed(1)}</label><input type="range" min="5" max="10" step="0.1" value={p.gpa} onChange={e=>setP({...p,gpa:+e.target.value})}/></div>
    <div><label className="l">{tx("Financial need")}</label><button className={"sw"+(p.need?" on":"")} aria-label="Financial need" onClick={()=>setP({...p,need:!p.need})}/></div>
   </div></div>
   {urgent.length>0&&<div className="urgent">⚠️ <b>{urgent[0].n}</b>{" "+tx("closes in")} {urgent[0].d} {tx("days")}{urgent.length>1?` (+${urgent.length-1} more due soon)`:""}. {tx("Finish your checklist!")}</div>}
   <div className="bar"><h2>{tx("Your matches")}</h2>
    <input className="search" placeholder={tx("Search scholarships…")} value={q} maxLength={60} onChange={e=>setQ(e.target.value.slice(0,60))}/>
    <div className="chips">{[["match","Best match"],["amount","Highest amount"],["deadline","Deadline"]].map(([k,v])=><Chip key={k} on={sort===k} onClick={()=>setSort(k)}>{tx(v)}</Chip>)}</div></div>
   <div className="chips" style={{marginBottom:16}}>{["All","Merit","Need-based","Research","Portfolio"].map(t=><Chip key={t} on={tf===t} onClick={()=>setTf(t)}>{tx(t)}</Chip>)}<Chip on={elig} onClick={()=>setElig(!elig)}>{tx("✓ Eligible only")}</Chip><Chip on={so} onClick={()=>setSo(!so)}>{tx("★ Saved")}</Chip></div>
   {list.length?<div className="cards">{list.map(({s,m},i)=><Card key={s.id+sort+q} s={s} m={m} i={i} saved={!!track[s.id]} onOpen={()=>setOpen(s.id)} onSave={()=>toggleSave(s.id)}/>)}</div>:<div className="empty">{tx("No scholarships match that search.")}</div>}
  </>}
  {view==="track"&&<>
   <section className="hero" style={{paddingBottom:10}}><h1>{lang==="hi"?<>आपकी <em>आवेदन</em> यात्रा</>:<>Your <em>application</em> journey</>}</h1><p>{tx("Everything you’ve saved, started and submitted, in one place. Click a card to update its checklist.")}</p></section>
   <div className="stats" style={{margin:"0 0 20px"}}><div><b>{tr.length}</b><span>{tx("scholarships tracked")}</span></div><div><b>{inr(tr.reduce((t,s)=>t+s.a,0))}</b><span>{tx("potential funding")}</span></div><div><b>{avg}%</b><span>{tx("average readiness")}</span></div></div>
   {tr.length>0&&<><button className="save" style={{marginBottom:14}} onClick={copy}>📋 {tx("Copy my plan")}</button>
   <div className="panel" style={{margin:"0 0 20px",padding:18}}><label className="l">{tx("Deadline timeline · longer bar = sooner")}</label>{[...tr].sort((a,b)=>a.d-b.d).map(s=><div key={s.id} style={{display:"flex",alignItems:"center",gap:10,margin:"8px 0",fontSize:13}}><span style={{width:150,fontWeight:700,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{s.n}</span><div className="prog" style={{flex:1,margin:0}}><i style={{width:Math.max(6,100-s.d*1.6)+"%",background:s.d<=10?"var(--acc)":"linear-gradient(90deg,var(--pri),var(--ok))"}}/></div><span style={{width:44,textAlign:"right"}}>{s.d}d</span></div>)}</div></>}
   <div className="cols">{cols.map(([k,t])=>{const items=S.filter(s=>track[s.id]===k);return <div className="col" key={k}><h3>{tx(t)} · {items.length}</h3>
    {items.map(s=>{const pc=Math.round((ck[s.id]||[]).length/s.docs.length*100);return <div className="mini" key={s.id} onClick={()=>setOpen(s.id)}><b>{s.n}</b><small>{inr(s.a)} · {s.d} {tx("days left")}</small><div className="prog"><i style={{width:pc+"%"}}/></div></div>})}
    {!items.length&&<small style={{color:"var(--mute)"}}>{tx("Nothing here yet")}</small>}</div>})}</div>
   {!Object.keys(track).length&&<div className="empty">{tx("Save a scholarship from Discover to start tracking.")}</div>}
  </>}
  <div className="priv">🔒 {tx("Your profile and progress stay on this device. Nothing is sent to any server.")}<br/><button className="save" style={{marginTop:8}} onClick={()=>{try{localStorage.clear()}catch(e){}setP(cleanP(null));setTrack({});setCk({});setNt({});setToast("All local data erased")}}>{tx("Clear my data")}</button></div>
  {os&&<Detail s={os} p={p} note={nt[os.id]||""} setNote={v=>setNt(n=>({...n,[os.id]:v}))} m={score(os,p)} st={track[os.id]} ck={ck[os.id]||[]} setSt={v=>setSt(os.id,v)} toggle={d=>toggleCk(os.id,d)} close={()=>setOpen(null)}/>}
  {toast&&<div className="toast">{tx(toast)}</div>}
 </div>}

export default App;
