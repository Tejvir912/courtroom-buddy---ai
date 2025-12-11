export type Language = 'en' | 'hi';

export interface DocumentMeta {
  filename: string;
  pages: number;
  language_detected: string[];
  upload_ts: string;
}

export interface Block {
  block_id: string;
  type: 'heading' | 'clause' | 'paragraph' | 'table';
  text: string;
  bbox?: number[]; // [x, y, width, height]
  ocr_confidence: number;
}

export interface Page {
  page_number: number;
  blocks: Block[];
}

export interface RiskFlag {
  risk_id: string;
  level: 'HIGH' | 'MEDIUM' | 'LOW';
  type: string;
  page: number;
  block_id: string;
  excerpt: string;
  explanation_en: string;
  explanation_hi: string;
}

export interface RiskCategory {
  FinancialRisk: number;
  LegalProcedureRisk: number;
  PrivacyRisk: number;
  OperationalRisk: number;
}

export interface RiskProfile {
  score: number;
  by_category: RiskCategory;
  flags: RiskFlag[];
}

export interface Question {
  q_id: string;
  question_en: string;
  question_hi: string;
  ref: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface ActionStep {
  step: number;
  description_en: string;
  description_hi: string;
  templates?: string[];
  urgency: 'Immediate' | 'Soon' | 'Later';
}

export interface AnalysisResult {
  session_id: string;
  document_meta: DocumentMeta;
  transcript: Page[];
  summaries: {
    summary_en: string;
    summary_hi: string;
  };
  risk: RiskProfile;
  key_clauses: Array<{ clause_tag: string; page: number; block_id: string; text: string }>;
  questions_for_lawyer: Question[];
  action_plan: ActionStep[];
  confidence: {
    overall: number;
    ocr: number;
    nlp: number;
  };
}
