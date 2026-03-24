import { useState, useRef, useEffect } from "react";

const C = {
  bg: "#0F1A0E", surface: "#1A2B18", card: "#213D1E",
  accent: "#7EE854", accentDim: "#4A9B2A",
  text: "#EDF5E8", muted: "#8BA882", border: "#2E4A2A",
  danger: "#FF6B6B",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:${C.bg};color:${C.text};font-family:'DM Sans',sans-serif;min-height:100vh;}
  .app{max-width:900px;margin:0 auto;padding:0 1.5rem 4rem;}

  .header{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 0;border-bottom:1px solid ${C.border};margin-bottom:2rem;}
  .logo{font-family:'Syne',sans-serif;font-size:1.4rem;font-weight:700;color:${C.accent};letter-spacing:-0.02em;cursor:pointer;}
  .logo span{color:${C.text};}
  .nav{display:flex;gap:8px;flex-wrap:wrap;}
  .nav-btn{background:transparent;border:1px solid ${C.border};color:${C.muted};padding:8px 14px;border-radius:100px;cursor:pointer;font-size:0.82rem;font-family:'DM Sans',sans-serif;transition:all 0.2s;}
  .nav-btn:hover{border-color:${C.accent};color:${C.accent};}
  .nav-btn.active{background:${C.accent};border-color:${C.accent};color:${C.bg};font-weight:500;}

  .hero{text-align:center;padding:3rem 0 2rem;}
  .hero h1{font-family:'Syne',sans-serif;font-size:clamp(2rem,5vw,3.2rem);font-weight:700;line-height:1.1;letter-spacing:-0.03em;margin-bottom:1rem;}
  .hero h1 em{font-style:normal;color:${C.accent};}
  .hero p{color:${C.muted};font-size:1.05rem;max-width:500px;margin:0 auto 2rem;line-height:1.7;}
  .cards-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem;}
  .feature-card{background:${C.surface};border:1px solid ${C.border};border-radius:16px;padding:1.5rem;cursor:pointer;transition:all 0.25s;position:relative;overflow:hidden;}
  .feature-card:hover{border-color:${C.accentDim};transform:translateY(-2px);}
  .feature-card .icon{font-size:2rem;margin-bottom:1rem;display:block;}
  .feature-card h3{font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:600;margin-bottom:0.5rem;}
  .feature-card p{color:${C.muted};font-size:0.88rem;line-height:1.6;}
  .feature-card .tag{position:absolute;top:1rem;right:1rem;background:${C.accentDim}22;color:${C.accent};font-size:0.7rem;padding:3px 10px;border-radius:100px;border:1px solid ${C.accentDim}44;}

  .topbar{display:flex;align-items:center;gap:12px;margin-bottom:1.8rem;}
  .back-btn{display:inline-flex;align-items:center;gap:6px;background:transparent;border:1px solid ${C.border};color:${C.muted};padding:7px 14px;border-radius:100px;cursor:pointer;font-size:0.83rem;font-family:'DM Sans',sans-serif;transition:all 0.2s;flex-shrink:0;}
  .back-btn:hover{border-color:${C.accent};color:${C.accent};}
  .breadcrumb{display:flex;align-items:center;gap:6px;font-size:0.8rem;color:${C.muted};}
  .breadcrumb .crumb{padding:4px 12px;border-radius:100px;border:1px solid ${C.border};}
  .breadcrumb .crumb.done{color:${C.accent};border-color:${C.accentDim}44;background:${C.accentDim}18;}
  .breadcrumb .crumb.active{background:${C.accent};color:${C.bg};border-color:${C.accent};font-weight:500;}
  .breadcrumb .sep{font-size:0.65rem;opacity:0.4;}

  .page-title{font-family:'Syne',sans-serif;font-size:1.6rem;font-weight:700;letter-spacing:-0.02em;margin-bottom:0.4rem;}
  .page-subtitle{color:${C.muted};margin-bottom:2rem;font-size:0.95rem;}

  .source-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem;}
  .source-card{background:${C.surface};border:1px solid ${C.border};border-radius:16px;padding:2rem 1.5rem;text-align:center;cursor:pointer;transition:all 0.25s;}
  .source-card:hover{border-color:${C.accent};background:${C.card};}
  .source-card .sc-icon{font-size:2.4rem;display:block;margin-bottom:1rem;}
  .source-card h3{font-family:'Syne',sans-serif;font-size:1rem;font-weight:600;margin-bottom:0.4rem;}
  .source-card p{color:${C.muted};font-size:0.82rem;line-height:1.5;}

  .cam-wrap{position:relative;border-radius:16px;overflow:hidden;background:#000;border:1px solid ${C.border};}
  .cam-wrap video{width:100%;display:block;max-height:400px;object-fit:cover;}
  .cam-overlay{position:absolute;bottom:0;left:0;right:0;padding:1.2rem;display:flex;align-items:center;justify-content:center;gap:1rem;background:linear-gradient(transparent,rgba(0,0,0,0.75));}
  .cam-shutter{width:64px;height:64px;border-radius:50%;background:${C.accent};border:3px solid #fff;cursor:pointer;transition:transform 0.15s;display:flex;align-items:center;justify-content:center;}
  .cam-shutter:hover{transform:scale(1.06);}
  .cam-shutter:active{transform:scale(0.94);}
  .cam-flip{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);color:#fff;border-radius:50%;width:44px;height:44px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background 0.2s;}
  .cam-flip:hover{background:rgba(255,255,255,0.22);}
  .cam-error{background:${C.surface};border:1px solid #ff6b6b44;border-radius:16px;padding:2.5rem;text-align:center;color:${C.muted};}

  .upload-zone{border:2px dashed ${C.border};border-radius:16px;padding:3rem 2rem;text-align:center;cursor:pointer;transition:all 0.2s;background:${C.surface};}
  .upload-zone:hover,.upload-zone.drag{border-color:${C.accent};background:${C.card};}
  .upload-zone .upload-icon{font-size:2.5rem;margin-bottom:1rem;display:block;}
  .upload-zone h3{font-family:'Syne',sans-serif;font-size:1rem;margin-bottom:0.5rem;}
  .upload-zone p{color:${C.muted};font-size:0.85rem;}

  .preview-wrap{position:relative;border-radius:16px;overflow:hidden;border:1px solid ${C.border};}
  .preview-wrap img{width:100%;display:block;max-height:380px;object-fit:cover;}
  .preview-badge{position:absolute;top:12px;left:12px;background:rgba(0,0,0,0.6);backdrop-filter:blur(6px);color:#fff;font-size:0.75rem;padding:4px 12px;border-radius:100px;border:1px solid rgba(255,255,255,0.15);}

  .btn{padding:11px 22px;border-radius:100px;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:0.9rem;font-weight:500;transition:all 0.2s;border:none;display:inline-flex;align-items:center;gap:8px;}
  .btn-primary{background:${C.accent};color:${C.bg};}
  .btn-primary:hover{background:#96f570;}
  .btn-primary:disabled{opacity:0.45;cursor:not-allowed;}
  .btn-secondary{background:transparent;border:1px solid ${C.border};color:${C.text};}
  .btn-secondary:hover{border-color:${C.muted};}
  .btn-danger{background:transparent;border:1px solid #ff6b6b44;color:${C.danger};}
  .btn-danger:hover{border-color:${C.danger};}
  .actions-row{display:flex;gap:10px;flex-wrap:wrap;margin-top:1rem;}

  .result-card{background:${C.surface};border:1px solid ${C.border};border-radius:16px;padding:1.5rem;margin-top:1.2rem;}
  .result-card h3{font-family:'Syne',sans-serif;font-size:1rem;color:${C.accent};margin-bottom:1rem;}
  .food-item{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid ${C.border};}
  .food-item:last-child{border-bottom:none;}
  .fname{font-size:0.95rem;}
  .fdetails{display:flex;gap:10px;align-items:center;}
  .fqty{font-size:0.8rem;color:${C.muted};}
  .fcal{font-size:0.83rem;font-weight:500;color:${C.accent};background:${C.accentDim}22;padding:3px 10px;border-radius:100px;}
  .total-row{display:flex;justify-content:space-between;padding:1rem 0 0;margin-top:0.5rem;border-top:1px solid ${C.border};}
  .tlabel{font-weight:500;}
  .tvalue{font-family:'Syne',sans-serif;font-size:1.4rem;font-weight:700;color:${C.accent};}
  .macros-row{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:1rem;}
  .macro-box{background:${C.card};border-radius:10px;padding:10px 12px;text-align:center;}
  .mval{font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:600;}
  .mlbl{font-size:0.72rem;color:${C.muted};margin-top:2px;}

  /* HISTORY */
  .history-day{margin-bottom:1.5rem;}
  .history-day-label{font-family:'Syne',sans-serif;font-size:0.82rem;color:${C.accent};text-transform:uppercase;letter-spacing:0.08em;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center;}
  .history-day-cal{font-size:0.85rem;color:${C.muted};font-family:'DM Sans',sans-serif;text-transform:none;letter-spacing:0;}
  .history-item{background:${C.surface};border:1px solid ${C.border};border-radius:14px;padding:1rem 1.2rem;margin-bottom:8px;display:flex;gap:1rem;align-items:center;}
  .history-thumb{width:56px;height:56px;border-radius:10px;object-fit:cover;flex-shrink:0;border:1px solid ${C.border};}
  .history-thumb-placeholder{width:56px;height:56px;border-radius:10px;background:${C.card};flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:1.4rem;border:1px solid ${C.border};}
  .history-info{flex:1;min-width:0;}
  .history-name{font-family:'Syne',sans-serif;font-size:0.95rem;font-weight:600;margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .history-meta{font-size:0.78rem;color:${C.muted};}
  .history-cal{font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:700;color:${C.accent};flex-shrink:0;}
  .history-delete{background:transparent;border:none;cursor:pointer;color:${C.muted};font-size:1rem;padding:4px;transition:color 0.2s;flex-shrink:0;}
  .history-delete:hover{color:${C.danger};}
  .empty-history{text-align:center;padding:3rem 1rem;color:${C.muted};}
  .empty-history .eh-icon{font-size:2.5rem;display:block;margin-bottom:1rem;}

  .daily-summary{background:${C.card};border-radius:12px;padding:1rem 1.2rem;margin-bottom:1.5rem;display:grid;grid-template-columns:repeat(4,1fr);gap:8px;}
  .ds-box{text-align:center;}
  .ds-val{font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:700;color:${C.accent};}
  .ds-lbl{font-size:0.7rem;color:${C.muted};margin-top:2px;}

  /* PLANNER */
  .form-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem;}
  .form-group{display:flex;flex-direction:column;gap:6px;}
  .form-group.full{grid-column:1/-1;}
  .form-group label{font-size:0.8rem;color:${C.muted};font-weight:500;text-transform:uppercase;letter-spacing:0.05em;}
  .form-group input,.form-group select{background:${C.surface};border:1px solid ${C.border};border-radius:10px;padding:12px 14px;color:${C.text};font-family:'DM Sans',sans-serif;font-size:0.95rem;outline:none;transition:border-color 0.2s;}
  .form-group input:focus,.form-group select:focus{border-color:${C.accent};}
  .form-group select option{background:${C.surface};}
  .pills{display:flex;flex-wrap:wrap;gap:8px;}
  .pill{padding:7px 15px;border-radius:100px;border:1px solid ${C.border};cursor:pointer;font-size:0.84rem;color:${C.muted};transition:all 0.2s;background:transparent;font-family:'DM Sans',sans-serif;}
  .pill:hover{border-color:${C.accentDim};color:${C.text};}
  .pill.selected{background:${C.accentDim}33;border-color:${C.accent};color:${C.accent};}
  .stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:2rem;}
  .stat-box{background:${C.surface};border-radius:12px;padding:14px;border:1px solid ${C.border};}
  .sval{font-family:'Syne',sans-serif;font-size:1.3rem;font-weight:700;color:${C.accent};}
  .slbl{font-size:0.75rem;color:${C.muted};margin-top:2px;}
  .diet-section{background:${C.surface};border:1px solid ${C.border};border-radius:16px;padding:1.5rem;margin-bottom:1rem;}
  .diet-section h3{font-family:'Syne',sans-serif;font-size:1rem;color:${C.accent};margin-bottom:1rem;}

  .loading{display:flex;align-items:center;gap:12px;padding:1.5rem;background:${C.surface};border-radius:12px;color:${C.muted};margin-top:1rem;}
  .spinner{width:20px;height:20px;border:2px solid ${C.border};border-top-color:${C.accent};border-radius:50%;animation:spin 0.8s linear infinite;flex-shrink:0;}
  @keyframes spin{to{transform:rotate(360deg);}}
  .error-box{background:#ff6b6b11;border:1px solid #ff6b6b44;border-radius:12px;padding:1rem 1.25rem;color:${C.danger};font-size:0.9rem;margin-top:1rem;}
  .success-box{background:${C.accentDim}18;border:1px solid ${C.accentDim}44;border-radius:12px;padding:1rem 1.25rem;color:${C.accent};font-size:0.9rem;margin-top:1rem;}

  @media(max-width:600px){
    .cards-grid,.source-grid{grid-template-columns:1fr;}
    .form-grid{grid-template-columns:1fr;}
    .stats-row,.daily-summary{grid-template-columns:repeat(2,1fr);}
    .actions-row{flex-direction:column;}
    .actions-row .btn{width:100%;justify-content:center;}
  }
`;

// ── API helper (usa proxy en /api/claude) ─────────────────────────────────────

async function callClaude(messages, system = "") {
  const res = await fetch("/api/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system,
      messages,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Error ${res.status}`);
  }
  const data = await res.json();
  return data.content?.find((b) => b.type === "text")?.text || "";
}

function parseJSON(text) {
  try {
    const m = text.match(/```json\s*([\s\S]*?)```/) || text.match(/(\{[\s\S]*\})/);
    return JSON.parse(m ? m[1] : text);
  } catch { return null; }
}

// ── Historia de comidas (localStorage) ───────────────────────────────────────

const HISTORY_KEY = "nutriai_history";

function loadHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; }
  catch { return []; }
}

function saveHistory(h) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(h));
}

function addMealToHistory(meal) {
  const h = loadHistory();
  h.unshift(meal);
  if (h.length > 100) h.pop();
  saveHistory(h);
}

function deleteMealFromHistory(id) {
  saveHistory(loadHistory().filter((m) => m.id !== id));
}

function formatDate(iso) {
  const d = new Date(iso);
  const today = new Date();
  const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return "Hoy";
  if (d.toDateString() === yesterday.toDateString()) return "Ayer";
  return d.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });
}

function groupByDay(history) {
  const groups = {};
  history.forEach((m) => {
    const key = new Date(m.date).toDateString();
    if (!groups[key]) groups[key] = { label: formatDate(m.date), meals: [], total: 0 };
    groups[key].meals.push(m);
    groups[key].total += m.calorias;
  });
  return Object.values(groups);
}

// ── Icons ─────────────────────────────────────────────────────────────────────

const IcoBack = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const IcoCam = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);
const IcoFlip = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 4v6h6"/><path d="M23 20v-6h-6"/>
    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15"/>
  </svg>
);

// ── FOOD ANALYZER ─────────────────────────────────────────────────────────────

function FoodAnalyzer({ onBack, onMealSaved }) {
  const [step, setStep] = useState("pick");
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);

  const videoRef = useRef();
  const streamRef = useRef(null);
  const [camError, setCamError] = useState(null);
  const [facingMode, setFacingMode] = useState("environment");

  const startCam = async (facing) => {
    if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: facing }, width: { ideal: 1280 } }, audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCamError(null);
    } catch (e) {
      setCamError(e.name === "NotAllowedError"
        ? "Permiso de cámara denegado. Actívalo en los ajustes del navegador."
        : "No se pudo acceder a la cámara.");
    }
  };

  const stopCam = () => {
    if (streamRef.current) { streamRef.current.getTracks().forEach((t) => t.stop()); streamRef.current = null; }
  };

  useEffect(() => {
    if (step === "camera") startCam(facingMode);
    else stopCam();
    return () => stopCam();
  }, [step]);

  const flipCam = () => {
    const next = facingMode === "environment" ? "user" : "environment";
    setFacingMode(next); startCam(next);
  };

  const capture = () => {
    const v = videoRef.current;
    if (!v) return;
    const c = document.createElement("canvas");
    c.width = v.videoWidth; c.height = v.videoHeight;
    c.getContext("2d").drawImage(v, 0, 0);
    const dataURL = c.toDataURL("image/jpeg", 0.92);
    setImageData({ src: dataURL, base64: dataURL.split(",")[1], mediaType: "image/jpeg", source: "camera" });
    setError(null); setSaved(false); setStep("preview");
  };

  const fileInputRef = useRef();
  const [drag, setDrag] = useState(false);
  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageData({ src: e.target.result, base64: e.target.result.split(",")[1], mediaType: file.type, source: "upload" });
      setError(null); setSaved(false); setStep("preview");
    };
    reader.readAsDataURL(file);
  };

  const analyze = async () => {
    setLoading(true); setError(null);
    try {
      const text = await callClaude([{
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: imageData.mediaType, data: imageData.base64 } },
          { type: "text", text: `Analiza esta imagen de comida con precisión. Devuelve ÚNICAMENTE JSON válido:
{"plato":"nombre descriptivo del plato","alimentos":[{"nombre":"nombre del alimento","cantidad":"cantidad en gramos o unidades","calorias":número entero}],"macros":{"proteinas":número,"carbohidratos":número,"grasas":número},"total_calorias":número entero,"consejo":"consejo nutricional breve de máximo 2 frases"}
Si no hay comida en la imagen devuelve {"error":"No se detecta comida en la imagen"}.` }
        ],
      }], "Eres un nutricionista experto con conocimiento detallado de alimentos españoles y mediterráneos. Estimas cantidades visuales con precisión y calculas valores nutricionales realistas.");
      const parsed = parseJSON(text);
      if (!parsed) throw new Error("No se pudo interpretar la respuesta. Prueba con otra foto más clara.");
      if (parsed.error) throw new Error(parsed.error);
      setResult(parsed);
      setStep("result");
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  const saveMeal = () => {
    if (!result || saved) return;
    addMealToHistory({
      id: Date.now().toString(),
      date: new Date().toISOString(),
      plato: result.plato,
      calorias: result.total_calorias,
      macros: result.macros,
      alimentos: result.alimentos,
      thumbnail: imageData.src,
    });
    setSaved(true);
    if (onMealSaved) onMealSaved();
  };

  const reset = () => { setImageData(null); setResult(null); setError(null); setSaved(false); setStep("pick"); };

  const goBack = () => {
    if (step === "result") { setStep("preview"); return; }
    if (step === "preview") { setStep(imageData?.source === "camera" ? "camera" : "upload"); return; }
    if (step === "camera" || step === "upload") { setStep("pick"); return; }
    onBack();
  };

  const ANA_STEPS = [{ key: "pick", label: "Método" }, { key: "preview", label: "Confirmar" }, { key: "result", label: "Resultado" }];
  const currentStep = step === "camera" || step === "upload" ? "pick" : step;

  return (
    <div>
      <div className="topbar">
        <button className="back-btn" onClick={goBack}><IcoBack /> {step === "pick" ? "Inicio" : "Atrás"}</button>
        <div className="breadcrumb">
          {ANA_STEPS.map((s, i) => {
            const idx = ANA_STEPS.findIndex(x => x.key === currentStep);
            const mine = ANA_STEPS.findIndex(x => x.key === s.key);
            const state = mine === idx ? "active" : mine < idx ? "done" : "";
            return (
              <span key={s.key} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {i > 0 && <span className="sep">›</span>}
                <span className={`crumb ${state}`}>{s.label}</span>
              </span>
            );
          })}
        </div>
      </div>

      <div className="page-title">Analizador de comida</div>
      <div className="page-subtitle">Fotografía tu plato o sube una imagen — la IA calculará las calorías.</div>

      {step === "pick" && (
        <div className="source-grid">
          <div className="source-card" onClick={() => setStep("camera")}>
            <span className="sc-icon">📷</span><h3>Usar cámara</h3>
            <p>Fotografía tu plato en el momento para un análisis más preciso.</p>
          </div>
          <div className="source-card" onClick={() => setStep("upload")}>
            <span className="sc-icon">🖼</span><h3>Subir imagen</h3>
            <p>Elige una foto guardada en tu galería o dispositivo.</p>
          </div>
        </div>
      )}

      {step === "camera" && (
        <div>
          {camError ? (
            <div className="cam-error">
              <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "1rem" }}>📵</span>
              <p style={{ marginBottom: "1.2rem", lineHeight: 1.6 }}>{camError}</p>
              <div className="actions-row" style={{ justifyContent: "center" }}>
                <button className="btn btn-secondary" onClick={() => setStep("upload")}>Subir foto en su lugar</button>
              </div>
            </div>
          ) : (
            <div className="cam-wrap">
              <video ref={videoRef} autoPlay playsInline muted style={{ transform: facingMode === "user" ? "scaleX(-1)" : "none" }} />
              <div className="cam-overlay">
                <div style={{ width: 44 }} />
                <button className="cam-shutter" onClick={capture}><IcoCam /></button>
                <button className="cam-flip" onClick={flipCam}><IcoFlip /></button>
              </div>
            </div>
          )}
          <p style={{ marginTop: "0.75rem", fontSize: "0.8rem", color: C.muted, textAlign: "center" }}>
            Centra bien el plato · Buena iluminación mejora la precisión
          </p>
        </div>
      )}

      {step === "upload" && (
        <div>
          <div
            className={`upload-zone${drag ? " drag" : ""}`}
            onClick={() => fileInputRef.current.click()}
            onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files[0]); }}
          >
            <span className="upload-icon">📂</span>
            <h3>Arrastra o haz clic para elegir</h3>
            <p>JPG, PNG, WEBP</p>
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFile(e.target.files[0])} />
        </div>
      )}

      {step === "preview" && imageData && (
        <div>
          <div className="preview-wrap">
            <img src={imageData.src} alt="Tu plato" />
            <span className="preview-badge">{imageData.source === "camera" ? "📷 Foto tomada" : "🖼 Imagen subida"}</span>
          </div>
          {error && <div className="error-box">⚠ {error}</div>}
          {loading
            ? <div className="loading"><div className="spinner" /><span>Analizando tu plato con IA…</span></div>
            : (
              <div className="actions-row">
                <button className="btn btn-primary" onClick={analyze}>⚡ Analizar calorías</button>
                <button className="btn btn-secondary" onClick={() => setStep(imageData.source === "camera" ? "camera" : "upload")}>
                  {imageData.source === "camera" ? "↩ Repetir foto" : "↩ Elegir otra"}
                </button>
                <button className="btn btn-danger" onClick={reset}>Cancelar</button>
              </div>
            )
          }
        </div>
      )}

      {step === "result" && result && (
        <div>
          <div className="actions-row" style={{ marginBottom: "0.5rem" }}>
            <button className="btn btn-secondary" onClick={() => setStep("preview")}>← Ver foto</button>
            <button className="btn btn-secondary" onClick={reset}>Analizar otro plato</button>
          </div>

          {saved
            ? <div className="success-box">✅ Comida guardada en tu historial</div>
            : (
              <div style={{ background: C.card, border: `1px solid ${C.accentDim}44`, borderRadius: 12, padding: "0.9rem 1.2rem", marginTop: "0.8rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.88rem", color: C.muted }}>¿Guardar esta comida en tu historial?</span>
                <button className="btn btn-primary" style={{ padding: "8px 18px", fontSize: "0.83rem" }} onClick={saveMeal}>💾 Guardar</button>
              </div>
            )
          }

          <div className="result-card">
            <h3>🍽 {result.plato}</h3>
            {result.alimentos?.map((a, i) => (
              <div key={i} className="food-item">
                <span className="fname">{a.nombre}</span>
                <div className="fdetails"><span className="fqty">{a.cantidad}</span><span className="fcal">{Math.round(a.calorias)} kcal</span></div>
              </div>
            ))}
            <div className="total-row"><span className="tlabel">Total calorías</span><span className="tvalue">{Math.round(result.total_calorias)} kcal</span></div>
          </div>

          <div className="result-card">
            <h3>💪 Macronutrientes</h3>
            <div className="macros-row">
              <div className="macro-box"><div className="mval">{Math.round(result.macros?.proteinas || 0)}g</div><div className="mlbl">Proteínas</div></div>
              <div className="macro-box"><div className="mval">{Math.round(result.macros?.carbohidratos || 0)}g</div><div className="mlbl">Carbohidratos</div></div>
              <div className="macro-box"><div className="mval">{Math.round(result.macros?.grasas || 0)}g</div><div className="mlbl">Grasas</div></div>
            </div>
          </div>

          {result.consejo && (
            <div className="result-card">
              <h3>💡 Consejo</h3>
              <p style={{ color: C.muted, fontSize: "0.92rem", lineHeight: 1.7 }}>{result.consejo}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── HISTORIAL ─────────────────────────────────────────────────────────────────

function HistoryPage({ onBack, refreshKey }) {
  const [history, setHistory] = useState([]);

  useEffect(() => { setHistory(loadHistory()); }, [refreshKey]);

  const handleDelete = (id) => {
    deleteMealFromHistory(id);
    setHistory(loadHistory());
  };

  const today = new Date().toDateString();
  const todayMeals = history.filter((m) => new Date(m.date).toDateString() === today);
  const todayCals = todayMeals.reduce((s, m) => s + m.calorias, 0);
  const todayProteinas = todayMeals.reduce((s, m) => s + (m.macros?.proteinas || 0), 0);
  const todayCarbs = todayMeals.reduce((s, m) => s + (m.macros?.carbohidratos || 0), 0);
  const todayGrasas = todayMeals.reduce((s, m) => s + (m.macros?.grasas || 0), 0);

  const groups = groupByDay(history);

  return (
    <div>
      <div className="topbar">
        <button className="back-btn" onClick={onBack}><IcoBack /> Inicio</button>
      </div>
      <div className="page-title">Historial de comidas</div>
      <div className="page-subtitle">Registro de todo lo que has analizado.</div>

      {history.length > 0 && (
        <div className="daily-summary">
          <div className="ds-box"><div className="ds-val">{Math.round(todayCals)}</div><div className="ds-lbl">kcal hoy</div></div>
          <div className="ds-box"><div className="ds-val">{Math.round(todayProteinas)}g</div><div className="ds-lbl">Proteínas</div></div>
          <div className="ds-box"><div className="ds-val">{Math.round(todayCarbs)}g</div><div className="ds-lbl">Carbohidratos</div></div>
          <div className="ds-box"><div className="ds-val">{Math.round(todayGrasas)}g</div><div className="ds-lbl">Grasas</div></div>
        </div>
      )}

      {history.length === 0 ? (
        <div className="empty-history">
          <span className="eh-icon">🍽</span>
          <p style={{ marginBottom: "0.5rem", fontFamily: "'Syne', sans-serif", fontSize: "1rem" }}>Aún no has guardado ninguna comida</p>
          <p style={{ fontSize: "0.85rem" }}>Analiza un plato y pulsa "Guardar" para verlo aquí.</p>
        </div>
      ) : (
        <div>
          {groups.map((group, gi) => (
            <div key={gi} className="history-day">
              <div className="history-day-label">
                <span>{group.label}</span>
                <span className="history-day-cal">{Math.round(group.total)} kcal totales</span>
              </div>
              {group.meals.map((meal) => (
                <div key={meal.id} className="history-item">
                  {meal.thumbnail
                    ? <img src={meal.thumbnail} className="history-thumb" alt={meal.plato} />
                    : <div className="history-thumb-placeholder">🍽</div>
                  }
                  <div className="history-info">
                    <div className="history-name">{meal.plato}</div>
                    <div className="history-meta">
                      {new Date(meal.date).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
                      {meal.alimentos?.length > 0 && ` · ${meal.alimentos.map(a => a.nombre).slice(0, 2).join(", ")}${meal.alimentos.length > 2 ? "…" : ""}`}
                    </div>
                  </div>
                  <div className="history-cal">{Math.round(meal.calorias)}<span style={{ fontSize: "0.7rem", color: C.muted }}> kcal</span></div>
                  <button className="history-delete" onClick={() => handleDelete(meal.id)} title="Eliminar">✕</button>
                </div>
              ))}
            </div>
          ))}

          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <button className="btn btn-danger" onClick={() => { if (confirm("¿Borrar todo el historial?")) { saveHistory([]); setHistory([]); } }}>
              Borrar todo el historial
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── DIET PLANNER ──────────────────────────────────────────────────────────────

const OBJETIVOS = ["Perder peso","Ganar músculo","Mantenimiento","Mejorar resistencia","Comer más sano"];
const ACTIVIDAD = ["Sedentario","Ligero (1-2 días/sem)","Moderado (3-4 días/sem)","Activo (5+ días/sem)","Muy activo (atleta)"];
const RESTRICCIONES = ["Sin restricciones","Vegetariano","Vegano","Sin gluten","Sin lactosa"];

function DietPlanner({ onBack }) {
  const [form, setForm] = useState({ edad:"",peso:"",altura:"",genero:"hombre",objetivo:"",actividad:"",restriccion:"Sin restricciones",alergias:"" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const up = (k,v) => setForm(f => ({...f,[k]:v}));

  const tdee = () => {
    const {edad,peso,altura,genero,actividad} = form;
    if (!edad||!peso||!altura) return null;
    const bmr = genero==="hombre" ? 10*peso+6.25*altura-5*edad+5 : 10*peso+6.25*altura-5*edad-161;
    const mult = [1.2,1.375,1.55,1.725,1.9][ACTIVIDAD.indexOf(actividad)]||1.2;
    return Math.round(bmr*mult);
  };

  const generate = async () => {
    const {edad,peso,altura,objetivo,actividad} = form;
    if (!edad||!peso||!altura||!objetivo||!actividad) { setError("Rellena todos los campos obligatorios (*)"); return; }
    setLoading(true); setError(null); setResult(null);
    try {
      const cals = tdee();
      const text = await callClaude([{role:"user",content:`Genera un plan personalizado:
- Edad: ${edad}a | Peso: ${peso}kg | Altura: ${altura}cm | Género: ${form.genero}
- Objetivo: ${objetivo} | Actividad: ${actividad}
- Restricción: ${form.restriccion} | Alergias: ${form.alergias||"ninguna"}
- TDEE: ${cals} kcal
Devuelve ÚNICAMENTE JSON:
{"resumen":"...","calorias_objetivo":número,"macros":{"proteinas_g":número,"carbohidratos_g":número,"grasas_g":número},"dieta_semanal":{"lunes":{"desayuno":"...","media_manana":"...","almuerzo":"...","merienda":"...","cena":"..."},"martes":{"desayuno":"...","media_manana":"...","almuerzo":"...","merienda":"...","cena":"..."},"miercoles":{"desayuno":"...","media_manana":"...","almuerzo":"...","merienda":"...","cena":"..."}},"ejercicios":[{"dia":"...","tipo":"...","duracion":"...","descripcion":"..."}],"consejos":["...","...","..."]}`}],
      "Eres nutricionista y entrenador personal experto. Planes precisos, motivadores y saludables.");
      const parsed = parseJSON(text);
      if (!parsed) throw new Error("No se pudo procesar el plan. Inténtalo de nuevo.");
      setResult(parsed);
    } catch(e) { setError(e.message); }
    finally { setLoading(false); }
  };

  const cals = tdee();
  const dias = result?.dieta_semanal ? Object.entries(result.dieta_semanal) : [];

  return (
    <div>
      <div className="topbar">
        <button className="back-btn" onClick={result ? ()=>setResult(null) : onBack}>
          <IcoBack /> {result ? "Editar perfil" : "Inicio"}
        </button>
        {result && (
          <div className="breadcrumb">
            <span className="crumb done">Perfil</span><span className="sep">›</span><span className="crumb active">Tu plan</span>
          </div>
        )}
      </div>
      <div className="page-title">Plan personalizado</div>
      <div className="page-subtitle">Rellena tu perfil y genera dieta + rutina de ejercicio con IA.</div>

      {!result && (
        <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,padding:"1.5rem",marginBottom:"1.5rem"}}>
          <div className="form-grid">
            <div className="form-group"><label>Edad *</label><input type="number" placeholder="25" value={form.edad} onChange={e=>up("edad",e.target.value)}/></div>
            <div className="form-group"><label>Género</label><select value={form.genero} onChange={e=>up("genero",e.target.value)}><option value="hombre">Hombre</option><option value="mujer">Mujer</option></select></div>
            <div className="form-group"><label>Peso (kg) *</label><input type="number" placeholder="70" value={form.peso} onChange={e=>up("peso",e.target.value)}/></div>
            <div className="form-group"><label>Altura (cm) *</label><input type="number" placeholder="175" value={form.altura} onChange={e=>up("altura",e.target.value)}/></div>
            <div className="form-group full"><label>Objetivo *</label><div className="pills">{OBJETIVOS.map(o=><button key={o} className={`pill${form.objetivo===o?" selected":""}`} onClick={()=>up("objetivo",o)}>{o}</button>)}</div></div>
            <div className="form-group full"><label>Nivel de actividad *</label><div className="pills">{ACTIVIDAD.map(a=><button key={a} className={`pill${form.actividad===a?" selected":""}`} onClick={()=>up("actividad",a)}>{a}</button>)}</div></div>
            <div className="form-group full"><label>Restricción alimentaria</label><div className="pills">{RESTRICCIONES.map(r=><button key={r} className={`pill${form.restriccion===r?" selected":""}`} onClick={()=>up("restriccion",r)}>{r}</button>)}</div></div>
            <div className="form-group full"><label>Alergias / intolerancias</label><input type="text" placeholder="Ej: frutos secos, marisco…" value={form.alergias} onChange={e=>up("alergias",e.target.value)}/></div>
          </div>
          {cals && <div style={{marginTop:"1rem",padding:"12px 16px",background:`${C.accentDim}22`,borderRadius:10,border:`1px solid ${C.accentDim}44`,fontSize:"0.88rem",color:C.accent}}>⚡ Gasto estimado (TDEE): <strong>{cals} kcal/día</strong></div>}
          {error && <div className="error-box">⚠ {error}</div>}
          {loading
            ? <div className="loading" style={{marginTop:"1.2rem"}}><div className="spinner"/><span>Creando tu plan personalizado…</span></div>
            : <div className="actions-row" style={{marginTop:"1.5rem"}}><button className="btn btn-primary" onClick={generate} disabled={loading}>✨ Generar mi plan</button></div>}
        </div>
      )}

      {result && (
        <div>
          <div className="stats-row">
            <div className="stat-box"><div className="sval">{Math.round(result.calorias_objetivo)} kcal</div><div className="slbl">Objetivo diario</div></div>
            <div className="stat-box"><div className="sval">{Math.round(result.macros?.proteinas_g||0)}g</div><div className="slbl">Proteínas</div></div>
            <div className="stat-box"><div className="sval">{Math.round(result.macros?.carbohidratos_g||0)}g</div><div className="slbl">Carbohidratos</div></div>
            <div className="stat-box"><div className="sval">{Math.round(result.macros?.grasas_g||0)}g</div><div className="slbl">Grasas</div></div>
          </div>
          {result.resumen && <div className="diet-section"><h3>📋 Tu plan</h3><p style={{color:C.muted,fontSize:"0.92rem",lineHeight:1.7}}>{result.resumen}</p></div>}
          {dias.length>0 && (
            <div className="diet-section">
              <h3>🗓 Menú semanal (3 días)</h3>
              {dias.map(([dia,comidas])=>(
                <div key={dia} style={{marginBottom:"1.2rem"}}>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:"0.82rem",color:C.accent,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"8px"}}>{dia}</div>
                  {Object.entries(comidas).map(([momento,desc])=>(
                    <div key={momento} style={{display:"flex",gap:"12px",padding:"8px 0",borderBottom:`1px solid ${C.border}`,fontSize:"0.88rem"}}>
                      <span style={{color:C.muted,width:"110px",flexShrink:0}}>{momento.replace("_"," ")}</span>
                      <span>{desc}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
          {result.ejercicios?.length>0 && (
            <div className="diet-section">
              <h3>🏋️ Rutina de ejercicio</h3>
              {result.ejercicios.map((e,i)=>(
                <div key={i} style={{padding:"12px 0",borderBottom:`1px solid ${C.border}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:"4px"}}>
                    <span style={{fontWeight:500}}>{e.dia} — <span style={{color:C.accentDim}}>{e.tipo}</span></span>
                    <span style={{fontSize:"0.82rem",color:C.muted}}>{e.duracion}</span>
                  </div>
                  <p style={{fontSize:"0.87rem",color:C.muted,lineHeight:1.6}}>{e.descripcion}</p>
                </div>
              ))}
            </div>
          )}
          {result.consejos?.length>0 && (
            <div className="diet-section">
              <h3>💡 Consejos clave</h3>
              {result.consejos.map((c,i)=>(
                <div key={i} style={{display:"flex",gap:"10px",padding:"8px 0",fontSize:"0.9rem",color:C.muted,lineHeight:1.6}}>
                  <span style={{color:C.accent,flexShrink:0}}>→</span><span>{c}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── HOME ──────────────────────────────────────────────────────────────────────

function HomePage({ setPage }) {
  const history = loadHistory();
  const today = new Date().toDateString();
  const todayCals = history.filter(m => new Date(m.date).toDateString() === today).reduce((s,m) => s + m.calorias, 0);

  return (
    <div>
      <div className="hero">
        <h1>Tu nutrición,<br /><em>inteligente</em> desde una foto.</h1>
        <p>Analiza tus comidas con IA, cuenta calorías automáticamente y recibe una dieta y rutina personalizada.</p>
      </div>

      {todayCals > 0 && (
        <div onClick={() => setPage("history")} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "1rem 1.2rem", marginBottom: "1.2rem", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "border-color 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.borderColor = C.accentDim}
          onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
          <div>
            <div style={{ fontSize: "0.78rem", color: C.muted, marginBottom: "3px" }}>Calorías de hoy</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.4rem", fontWeight: 700, color: C.accent }}>{Math.round(todayCals)} kcal</div>
          </div>
          <div style={{ color: C.muted, fontSize: "0.82rem" }}>Ver historial →</div>
        </div>
      )}

      <div className="cards-grid">
        <div className="feature-card" onClick={()=>setPage("analyzer")}>
          <span className="tag">IA Vision</span><span className="icon">📸</span>
          <h3>Analizar comida</h3>
          <p>Usa la cámara o sube una foto para identificar alimentos, cantidades y calorías.</p>
        </div>
        <div className="feature-card" onClick={()=>setPage("planner")}>
          <span className="tag">Personalizado</span><span className="icon">🥗</span>
          <h3>Dieta & Ejercicio</h3>
          <p>Rellena tu perfil y genera un plan nutricional y de entrenamiento a tu medida.</p>
        </div>
        <div className="feature-card" onClick={()=>setPage("history")}>
          <span className="tag">Memoria</span><span className="icon">📅</span>
          <h3>Historial</h3>
          <p>Revisa todas tus comidas anteriores y el seguimiento calórico por día.</p>
        </div>
      </div>
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("home");
  const [historyRefresh, setHistoryRefresh] = useState(0);

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <header className="header">
          <div className="logo" onClick={()=>setPage("home")}>Nutri<span>AI</span></div>
          <nav className="nav">
            <button className={`nav-btn${page==="home"?" active":""}`} onClick={()=>setPage("home")}>Inicio</button>
            <button className={`nav-btn${page==="analyzer"?" active":""}`} onClick={()=>setPage("analyzer")}>Analizar</button>
            <button className={`nav-btn${page==="history"?" active":""}`} onClick={()=>setPage("history")}>Historial</button>
            <button className={`nav-btn${page==="planner"?" active":""}`} onClick={()=>setPage("planner")}>Mi plan</button>
          </nav>
        </header>
        <main>
          {page==="home" && <HomePage setPage={setPage}/>}
          {page==="analyzer" && <FoodAnalyzer onBack={()=>setPage("home")} onMealSaved={()=>setHistoryRefresh(r=>r+1)}/>}
          {page==="history" && <HistoryPage onBack={()=>setPage("home")} refreshKey={historyRefresh}/>}
          {page==="planner" && <DietPlanner onBack={()=>setPage("home")}/>}
        </main>
      </div>
    </>
  );
}