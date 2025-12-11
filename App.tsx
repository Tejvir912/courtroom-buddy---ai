import React, { useState } from 'react';
import { Scale, FileText, ChevronRight, Languages, Download, Loader2, Info } from 'lucide-react';
import FileUpload from './components/FileUpload';
import DocumentViewer from './components/DocumentViewer';
import AnalysisPanel from './components/AnalysisPanel';
import { analyzeDocument } from './services/geminiService';
import { AnalysisResult, Language } from './types';

function App() {
  const [step, setStep] = useState<'landing' | 'processing' | 'results'>('landing');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [lang, setLang] = useState<Language>('en');
  const [highlightedBlock, setHighlightedBlock] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);

  const handleFileUpload = async (file: File) => {
    if (!consent) {
        alert("Please accept the terms to proceed.");
        return;
    }
    setStep('processing');
    try {
      const data = await analyzeDocument(file);
      setResult(data);
      setStep('results');
    } catch (error) {
      console.error("Analysis failed", error);
      setStep('landing');
    }
  };

  const handleRiskClick = (blockId: string) => {
    setHighlightedBlock(blockId);
    // Smooth scroll to element
    const element = document.getElementById(`block-${blockId}`);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2" onClick={() => setStep('landing')}>
            <div className="bg-slate-900 p-1.5 rounded-lg">
                <Scale className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 cursor-pointer">Courtroom Buddy</h1>
          </div>

          <div className="flex items-center gap-4">
             {step === 'results' && (
                 <button 
                    onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
                    className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 bg-slate-100 px-3 py-1.5 rounded-md transition-colors"
                 >
                    <Languages className="w-4 h-4" />
                    {lang === 'en' ? 'Hindi' : 'English'}
                 </button>
             )}
             {step === 'results' && (
                 <button className="flex items-center gap-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 px-3 py-1.5 rounded-md transition-colors shadow-sm">
                    <Download className="w-4 h-4" />
                    Export
                 </button>
             )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6 lg:p-8 flex flex-col">
        
        {step === 'landing' && (
          <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in duration-500">
            <div className="text-center max-w-2xl mb-12">
               <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                Understand your legal documents <br/>
                <span className="text-blue-600">before you sign.</span>
               </h2>
               <p className="text-lg text-slate-500 leading-relaxed">
                 Instant AI analysis for contracts, notices, and agreements. 
                 Identify risks, hidden clauses, and get actionable advice in plain English or Hindi.
               </p>
            </div>

            <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
                <FileUpload onFileSelect={handleFileUpload} />
                
                <div className="mt-6 pt-6 border-t border-slate-100 flex items-start gap-3">
                    <input 
                        type="checkbox" 
                        id="consent" 
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="consent" className="text-xs text-slate-500 cursor-pointer select-none">
                        I understand that Courtroom Buddy provides information only and is not a substitute for a licensed lawyer. 
                        Files are processed temporarily and deleted immediately after the session.
                    </label>
                </div>
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center max-w-4xl">
                 <div className="p-4 rounded-lg bg-white border border-slate-100 shadow-sm">
                    <div className="w-10 h-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Info className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-1">Risk Detection</h3>
                    <p className="text-sm text-slate-500">Spot unfair clauses, penalties, and jurisdiction issues instantly.</p>
                 </div>
                 <div className="p-4 rounded-lg bg-white border border-slate-100 shadow-sm">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Languages className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-1">Bilingual Support</h3>
                    <p className="text-sm text-slate-500">Get summaries and explanations in both English and Hindi.</p>
                 </div>
                 <div className="p-4 rounded-lg bg-white border border-slate-100 shadow-sm">
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FileText className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-1">Action Plans</h3>
                    <p className="text-sm text-slate-500">Don't just read it. Know exactly what to ask and what to do next.</p>
                 </div>
            </div>
          </div>
        )}

        {step === 'processing' && (
          <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
            <div className="flex flex-col items-center gap-6">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold text-slate-900">Analyzing Document...</h3>
                    <p className="text-slate-500">Identifying clauses, extracting entities, and calculating risk score.</p>
                </div>
                <div className="w-64 h-2 bg-slate-100 rounded-full overflow-hidden mt-4">
                    <div className="h-full bg-blue-600 rounded-full animate-progress origin-left"></div>
                </div>
            </div>
          </div>
        )}

        {step === 'results' && result && (
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-8rem)] min-h-[600px]">
                {/* Left Panel: Document */}
                <div className="lg:col-span-7 h-full animate-in slide-in-from-left duration-500">
                    <DocumentViewer 
                        pages={result.transcript} 
                        highlightBlockId={highlightedBlock}
                    />
                </div>
                
                {/* Right Panel: Analysis */}
                <div className="lg:col-span-5 h-full animate-in slide-in-from-right duration-500">
                    <AnalysisPanel 
                        data={result} 
                        lang={lang} 
                        onRiskClick={handleRiskClick}
                    />
                </div>
            </div>
        )}

      </main>
      
      <style>{`
        @keyframes progress {
            0% { width: 0% }
            50% { width: 70% }
            100% { width: 95% }
        }
        .animate-progress {
            animation: progress 3.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default App;