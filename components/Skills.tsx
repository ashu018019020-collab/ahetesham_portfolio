'use client'

import { useState, useRef, useEffect } from 'react'
import Section from './Section'
import { useScrollReveal } from '@/lib/hooks'
import { ChevronDown, ArrowRight } from 'lucide-react'

import {
  PythonOriginal, CplusplusOriginal, Html5Original, Css3Original,
  FlaskOriginal, NumpyOriginal, PandasOriginal, TensorflowOriginal, PytorchOriginal,
  MysqlOriginal, SqliteOriginal, ScikitlearnOriginal,
  DockerOriginal, GitOriginal, GithubOriginal,
  GooglecolabOriginal, GoogleOriginal,
} from 'devicons-react'

type CatKey = 'all'|'ai-ml'|'data'|'auto'|'prog'|'cloud'|'core';
const cats = [
  {k:'all' as CatKey, l:'All', emoji:'🔍'},
  {k:'ai-ml' as CatKey, l:'AI/ML', emoji:'🧠'},
  {k:'data' as CatKey, l:'Data Science', emoji:'📊'},
  {k:'auto' as CatKey, l:'Automation', emoji:'⚡'},
  {k:'prog' as CatKey, l:'Programming', emoji:'💻'},
  {k:'cloud' as CatKey, l:'Cloud', emoji:'☁️'},
  {k:'core' as CatKey, l:'Core CS', emoji:'📐'},
];

interface Sk {
  n: string; c: CatKey; d: string; u: string; t: string[]; w: string[]; p: string; co: string;
  Icon?: any; fb?: string; fbBg?: string;
}

const sk: Sk[] = [
{n:'Machine Learning',c:'ai-ml',Icon:ScikitlearnOriginal,d:'Build predictive models by transforming raw data into trained, evaluated and deployable ML solutions.',u:'Stock prediction, pattern recognition, classification',t:['Python','Pandas','NumPy','Scikit-learn','SQL'],w:['Raw Data','Cleaning','EDA','Feature Eng.','Training','Evaluation','Deploy'],p:'Stock Prediction & Market Analysis',co:'#FF4500'},
{n:'Deep Learning',c:'ai-ml',Icon:TensorflowOriginal,d:'Design and train neural networks for complex pattern recognition tasks using TensorFlow and PyTorch.',u:'Time-series forecasting, sequence modeling',t:['TensorFlow','PyTorch','Python','NumPy'],w:['Dataset','Preprocessing','Features','Neural Net','Training','Eval','Predict'],p:'Stock Prediction & Market Analysis',co:'#8b5cf6'},
{n:'NLP',c:'ai-ml',fb:'NLP',fbBg:'#FF8C00',d:'Process human language using transformers, embeddings and intent classification models.',u:'Chatbots, text analysis, sentiment detection',t:['SpaCy','Transformers','Python','Flask'],w:['User Text','Preprocessing','Embeddings','Intent','Model','Response'],p:'AI-Powered Professional Chatbot',co:'#FF8C00'},
{n:'LLMs & GenAI',c:'ai-ml',fb:'LLM',fbBg:'#10b981',d:'Leverage large language models for content generation, summarization and conversational AI.',u:'Content creation, Q&A systems',t:['OpenAI API','Gemini','LangChain','Hugging Face'],w:['Prompt','LLM','Context','Generation','Response'],p:'AI-Powered Professional Chatbot',co:'#10b981'},
{n:'Agentic AI',c:'ai-ml',fb:'AI',fbBg:'#f59e0b',d:'Build autonomous AI agents that reason, plan, use tools and execute multi-step workflows.',u:'Workflow automation, autonomous tasks',t:['n8n','LLM Agents','APIs','Webhooks'],w:['Goal','Reasoning','Planning','Tool Select','API/DB','Loop','Action','Result'],p:'Agentic AI Workflow with n8n',co:'#f59e0b'},
{n:'MLOps',c:'ai-ml',Icon:DockerOriginal,d:'Manage full ML lifecycle from experiment tracking to deployment and monitoring.',u:'Model versioning, CI/CD for ML',t:['Docker','AWS','Git','Python'],w:['Experiment','Training','Validation','Package','Deploy','Monitor'],p:'Stock Prediction System',co:'#ef4444'},
{n:'Python',c:'prog',Icon:PythonOriginal,d:'Primary language for AI/ML development, data manipulation, APIs and automation.',u:'ML pipelines, web APIs, data processing',t:['Python','Google Colab','Flask'],w:['Script','Process','Analyze','Output'],p:'All Projects',co:'#FF4500'},
{n:'SQL & Databases',c:'prog',Icon:MysqlOriginal,d:'Query, manipulate and manage structured data across MySQL and SQLite.',u:'Data extraction, reporting, storage',t:['MySQL','SQLite','SQL'],w:['DB','Query','Extract','Analyze'],p:'AI Chatbot',co:'#f59e0b'},
{n:'C / C++',c:'prog',Icon:CplusplusOriginal,d:'Systems programming and algorithm implementation with performance-critical code.',u:'Competitive programming, DSA',t:['C','C++'],w:['Problem','Algorithm','Implement','Test'],p:'Academic Projects',co:'#6366f1'},
{n:'Web Basics',c:'prog',Icon:Html5Original,d:'Frontend fundamentals for building web interfaces and dashboards.',u:'Portfolio sites, UI prototyping',t:['HTML','CSS'],w:['Design','HTML','CSS','Deploy'],p:'Portfolio Website',co:'#ec4899'},
{n:'Power BI & Analytics',c:'data',fb:'BI',fbBg:'#f2c811',d:'Transform raw data into interactive dashboards and BI reports with DAX.',u:'KPI tracking, business reporting',t:['Power BI','DAX','Excel','Tableau'],w:['SQL','Python','Clean','EDA','Analyze','Power BI','Insights','Decision'],p:'Data Analytics & Dashboards',co:'#f59e0b'},
{n:'Data Analysis',c:'data',Icon:PandasOriginal,d:'Perform EDA, statistical testing and data cleaning using Pandas and NumPy.',u:'EDA, data wrangling, statistics',t:['Pandas','NumPy','Python','Colab'],w:['Raw Data','Clean','EDA','Analyze','Visualize','Insights'],p:'Data Analytics & Dashboards',co:'#10b981'},
{n:'n8n Automation',c:'auto',fb:'n8n',fbBg:'#ea4b71',d:'Build visual automation workflows connecting LLM agents, APIs and business tools.',u:'Process automation, AI workflows',t:['n8n','Webhooks','APIs','Zapier'],w:['Trigger','Process','AI Agent','Logic','API/DB','Tool','Monitor','Result'],p:'Agentic AI Workflow',co:'#FF4500'},
{n:'API Integration',c:'auto',Icon:FlaskOriginal,d:'Connect systems through REST APIs, webhooks and service integrations.',u:'Service integration, data sync',t:['REST APIs','Webhooks','Flask','Python'],w:['Request','Auth','Transfer','Process','Response'],p:'AI Chatbot',co:'#8b5cf6'},
{n:'AWS Cloud',c:'cloud',fb:'AWS',fbBg:'#FF9900',d:'Deploy and manage applications on AWS for scalable cloud infrastructure.',u:'Cloud hosting, scalable deploys',t:['AWS','Docker','Git'],w:['Build','Docker','Deploy','Monitor'],p:'Cloud Deployments',co:'#f59e0b'},
{n:'Git & GitHub',c:'cloud',Icon:GithubOriginal,d:'Version control and collaborative development with branching strategies.',u:'Code versioning, CI/CD',t:['Git','GitHub'],w:['Code','Commit','Branch','Push','Merge','Deploy'],p:'All Projects',co:'#6366f1'},
{n:'DSA & Core CS',c:'core',fb:'DSA',fbBg:'#FF8C00',d:'Strong foundation in algorithms, data structures, DBMS, probability and OS.',u:'Problem solving, system design',t:['C','C++','Python'],w:['Problem','Design','Implement','Optimize'],p:'Academic Foundation',co:'#FF8C00'},
];

const mw = [
  { n: 'Data Sources', icon: '🗄️', desc: 'Raw data' },
  { n: 'SQL/DB', icon: '🗃️', desc: 'Database' },
  { n: 'Python', icon: '🐍', desc: 'Core lang' },
  { n: 'Cleaning', icon: '🧹', desc: 'Preprocess' },
  { n: 'EDA', icon: '📊', desc: 'Explore' },
  { n: 'Analytics', icon: '📈', desc: 'Insights' },
  { n: 'ML/DL', icon: '🧠', desc: 'Modeling' },
  { n: 'NLP/LLM', icon: '💬', desc: 'Language' },
  { n: 'GenAI', icon: '✨', desc: 'Generate' },
  { n: 'Agentic AI', icon: '🤖', desc: 'Agents' },
  { n: 'APIs', icon: '🔗', desc: 'Connect' },
  { n: 'n8n', icon: '⚡', desc: 'Automate' },
  { n: 'Docker', icon: '🐳', desc: 'Container' },
  { n: 'AWS', icon: '☁️', desc: 'Cloud' },
  { n: 'Deploy', icon: '🚀', desc: 'Ship it' },
  { n: 'Monitor', icon: '📡', desc: 'Observe' },
];
export default function Skills() {
  const [cat, setCat] = useState<CatKey>('all');
  const [exp, setExp] = useState<string | null>(null);
  const [pp, setPp] = useState(0);
  const filt = cat === 'all' ? sk : sk.filter(s => s.c === cat);
  useEffect(() => { const iv = setInterval(() => setPp(p => (p+1) % mw.length), 1200); return () => clearInterval(iv); }, []);
  return (
    <Section id='skills' title='Skills & Expertise' subtitle='I don’t just know technologies — I understand how to connect them to build complete AI, Data Science and Automation solutions.' revealVariant='3d-right'>
      <div className='mb-10 flex flex-wrap gap-3'>
        {cats.map(c => { const on = cat === c.k; return (
          <button key={c.k} onClick={()=>setCat(c.k)} className='group flex items-center gap-2.5 rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105 hover:-translate-y-0.5' style={{background:on?'rgba(255,69,0,.18)':'rgba(255,255,255,.04)',border:'1px solid '+(on?'rgba(255,69,0,.4)':'rgba(255,255,255,.08)'),color:on?'#FF6B00':'#94a3b8',boxShadow:on?'0 0 20px rgba(255,69,0,.15), 0 4px 12px rgba(0,0,0,.2)':'0 2px 8px rgba(0,0,0,.1)',transform:on?'translateY(-1px) scale(1.02)':'none'}}>
            <span className='text-lg transition-transform duration-300' style={{transform:on?'scale(1.15)':'scale(1)',filter:on?'drop-shadow(0 0 6px rgba(255,69,0,0.4))':'none'}}>{c.emoji}</span>
            <span>{c.l}</span>
            {on && <div className='w-1.5 h-1.5 rounded-full bg-[#FF4500] animate-pulse shadow-[0_0_8px_#FF4500]' />}
          </button>
        )})}
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {filt.map((s,i) => <SC key={s.n} sk={s} i={i} ex={exp===s.n} tog={()=>setExp(exp===s.n?null:s.n)} />)}
      </div>
      
      <div className='mt-16'>
        <h3 className='mb-2 text-center text-xl font-bold text-white section-title-glow' data-text='Complete AI Engineer Stack'>Complete AI Engineer Stack</h3>
        <p className='mb-6 text-center text-xs text-[#64748b]'>My end-to-end workflow from data to deployment</p>
        <MWF steps={mw} pp={pp} />
      </div>
    </Section>
  )
}function SC({sk,ex,tog,i}:{sk:Sk;ex:boolean;tog:()=>void;i:number}) {
  const ref = useScrollReveal(i*60);
  const cr = useRef<HTMLDivElement>(null);
  const [r,setR] = useState({x:0,y:0});
  const [h,setH] = useState(false);
  useEffect(()=>{const el=cr.current;if(!el)return;const mv=(e:MouseEvent)=>{if(!h)return;const b=el.getBoundingClientRect();setR({x:-(e.clientY-b.top-b.height/2)/(b.height/2)*6,y:(e.clientX-b.left-b.width/2)/(b.width/2)*6})};const ml=()=>{setH(false);setR({x:0,y:0})};window.addEventListener("mousemove",mv);el.addEventListener("mouseleave",ml);return()=>{window.removeEventListener("mousemove",mv);el.removeEventListener("mouseleave",ml)}},[h]);
  const co=sk.co,t="rotateX("+r.x+"deg) rotateY("+r.y+"deg) scale("+(h?1.015:1)+")";
  return(<div ref={ref} className="reveal" style={{perspective:"1000px"}}>
    <div ref={cr} onMouseEnter={()=>setH(true)} onClick={tog} className="cursor-pointer overflow-hidden rounded-2xl transition-all duration-200" style={{transform:t,transformStyle:"preserve-3d",background:h?"linear-gradient(135deg,rgba(255,255,255,.06),rgba(255,255,255,.02))":"linear-gradient(135deg,rgba(255,255,255,.03),rgba(255,255,255,.01))",border:"1px solid "+(h?co+"33":"rgba(255,255,255,.08)"),boxShadow:h?"0 25px 50px rgba(0,0,0,.3),0 0 40px "+co+"12":"0 4px 24px rgba(0,0,0,.15)"}}>
      <div className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {sk.Icon ? (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{background:co+'15'}}>
                <sk.Icon size={26} style={{transition:'transform .3s',transform:h?'scale(1.15)':'scale(1)'}}/>
              </div>
            ) : (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold" style={{background:(sk.fbBg||co)+'20',color:sk.fbBg||co,boxShadow:h?'0 0 12px '+(sk.fbBg||co)+'30':'none',transition:'all .3s',transform:h?'scale(1.1)':'scale(1)'}}>
                {sk.fb}
              </div>
            )}
            <h4 className="text-sm font-bold leading-tight" style={{color:h?co:'#f0f4ff'}}>{sk.n}</h4>
          </div>
          <div className='rounded-full p-1 transition-transform' style={{transform:ex?'rotate(180deg)':'rotate(0)',color:co}}><ChevronDown size={16}/></div>
        </div>
        <p className="text-xs leading-relaxed text-gray-400">{sk.d}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {sk.t.map(t=><span key={t} className='rounded-full px-2 py-0.5 text-[10px] font-medium' style={{background:co+'15',color:co}}>{t}</span>)}
        </div>
        {ex&&(<div className="mt-4 border-t border-white/5 pt-4">
          <p className='mb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-500'>What I use it for</p>
          <p className="mb-3 text-xs text-gray-300">{sk.u}</p>
          <p className='mb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-500'>Workflow</p>
          <div className="mb-3 flex flex-wrap items-center gap-1">
            {sk.w.map((step,wi)=>(<span key={wi} className="flex items-center gap-1">
              <span className="rounded-md px-1.5 py-0.5 text-[10px] font-medium" style={{background:co+"15",color:co}}>{step}</span>
              {wi<sk.w.length-1&&<ArrowRight size={10} className="text-gray-600"/>}
            </span>))}
          </div>
          <p className='mb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-500'>Related Project</p>
          <p className="text-xs font-medium" style={{color:co}}>{sk.p}</p>
        </div>)}
      </div></div></div>);
}

function MWF({steps,pp}:{steps:{n:string;icon:string;desc:string}[];pp:number}) {
  const row1 = steps.slice(0, 8)
  const row2 = steps.slice(8)

  return(
    <div className="relative overflow-hidden rounded-3xl p-5 md:p-8" style={{background:'linear-gradient(135deg,rgba(255,255,255,.04),rgba(0,0,0,.3))',border:'1px solid rgba(255,255,255,.08)',boxShadow:'0 4px 40px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.04)'}}>
      {/* Background glow blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[200px] rounded-full bg-[#FF4500]/5 blur-[80px]" />
        <div className="absolute top-1/2 right-1/3 w-[300px] h-[200px] rounded-full bg-[#FF8C00]/5 blur-[80px]" />
      </div>

      {/* Running glow line underneath */}
      <div className="absolute bottom-0 left-0 h-1.5 w-full bg-white/[0.03]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#FF4500] via-[#FF8C00] to-[#FF4500] transition-all duration-700 ease-in-out"
          style={{width:((pp+1)/steps.length*100)+'%', boxShadow:'0 0 30px rgba(255,69,0,0.5), 0 0 60px rgba(255,69,0,0.2)'}}
        />
      </div>
      {/* Top glow pulse */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF4500]/20 to-transparent" />

      {/* Row 1: Steps 1-8 with arrows — horizontal scroll on mobile, centered on desktop */}
      <div className="relative z-10 flex items-center gap-0 mb-4 overflow-x-auto md:overflow-visible md:justify-center pb-2 scrollbar-hide">
        {row1.map((s, si) => {
          const actualIdx = si
          const active = actualIdx === pp
          const passed = actualIdx < pp
          return (
            <span key={si} className="flex items-center">
              <span className="shrink-0"><MWFStep s={s} active={active} passed={passed} index={actualIdx} /></span>
              {si < row1.length - 1 && (
                <div className="flex items-center mx-1 md:mx-2 shrink-0">
                  <div className="w-4 md:w-6 h-[2px] transition-colors duration-500" style={{background: passed ? '#FF4500' : actualIdx === pp ? '#FF4500' : '#334155'}} />
                  <span className="text-[10px] transition-colors duration-500" style={{color: passed || actualIdx === pp ? '#FF4500' : '#334155'}}>▶</span>
                </div>
              )}
            </span>
          )
        })}
      </div>

      {/* Row 2: Steps 9-16 with arrows — horizontal scroll on mobile, centered on desktop */}
      <div className="relative z-10 flex items-center gap-0 overflow-x-auto md:overflow-visible md:justify-center pb-2 scrollbar-hide">
        {row2.map((s, si) => {
          const actualIdx = si + 8
          const active = actualIdx === pp
          const passed = actualIdx < pp
          return (
            <span key={si} className="flex items-center">
              <span className="shrink-0"><MWFStep s={s} active={active} passed={passed} index={actualIdx} /></span>
              {si < row2.length - 1 && (
                <div className="flex items-center mx-1 md:mx-2 shrink-0">
                  <div className="w-4 md:w-6 h-[2px] transition-colors duration-500" style={{background: passed ? '#FF4500' : actualIdx === pp ? '#FF4500' : '#334155'}} />
                  <span className="text-[10px] transition-colors duration-500" style={{color: passed || actualIdx === pp ? '#FF4500' : '#334155'}}>▶</span>
                </div>
              )}
            </span>
          )
        })}
      </div>

      {/* Step counter */}
      <div className="absolute top-4 right-5 flex items-center gap-2 z-20">
        <span className="text-[10px] font-mono text-white/30">STEP</span>
        <span className="text-xs font-mono font-bold text-[#FF8C00]">
          {String(pp + 1).padStart(2, '0')}/{String(steps.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}

function MWFStep({s, active, passed, index}: {s:{n:string;icon:string;desc:string}; active:boolean; passed:boolean; index:number}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative flex flex-col items-center gap-1.5 rounded-2xl px-2.5 py-3 md:px-3 md:py-3.5 transition-all duration-500 cursor-default shrink-0 ${active ? 'scale-110' : ''}`}
        style={{
          background: active ? 'rgba(255,69,0,.15)' : passed ? 'rgba(255,69,0,.05)' : 'rgba(255,255,255,.03)',
          border: active ? '1px solid rgba(255,69,0,.6)' : passed ? '1px solid rgba(255,69,0,.2)' : '1px solid rgba(255,255,255,.06)',
          boxShadow: active ? '0 0 30px rgba(255,69,0,.25), 0 4px 20px rgba(0,0,0,.2)' : passed ? '0 0 10px rgba(255,69,0,.05)' : 'none',
          minWidth: '64px',
        }}
      >
        {/* Active pulse ring */}
        {active && <div className="absolute inset-0 rounded-2xl border border-[#FF4500]/30 animate-ping" style={{animationDuration:'2s'}} />}
        {/* Completed checkmark */}
        {passed && (
          <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#FF4500] flex items-center justify-center shadow-lg shadow-[#FF4500]/40">
            <span className="text-[8px] text-white font-bold">✓</span>
          </div>
        )}
        {/* Step number */}
        <span className="text-[8px] font-mono font-bold" style={{color: active ? '#FF4500' : passed ? '#FF8C0080' : '#334155'}}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="text-2xl leading-none transition-transform duration-300" style={{transform: active ? 'scale(1.2)' : 'scale(1)', filter: active ? 'drop-shadow(0 0 8px rgba(255,69,0,0.4))' : 'none'}}>
          {s.icon}
        </span>
        <span className="text-[11px] font-bold whitespace-nowrap leading-tight" style={{color: active ? '#FF8C00' : passed ? '#FF4500' : '#94a3b8'}}>
          {s.n}
        </span>
        <span className="text-[9px] whitespace-nowrap leading-tight" style={{color: active ? '#FF8C0090' : '#475569'}}>
          {s.desc}
        </span>
        {/* Bottom glow line for active */}
        {active && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-[#FF4500] to-transparent rounded-full" style={{boxShadow:'0 0 10px #FF4500'}} />
        )}
      </div>
    </div>
  )
}