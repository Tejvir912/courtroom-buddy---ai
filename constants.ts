import { AnalysisResult } from './types';

export const MOCK_ANALYSIS_RESULT: AnalysisResult = {
  session_id: "sess_123456789",
  document_meta: {
    filename: "Residential_Rental_Agreement_2024.pdf",
    pages: 1,
    language_detected: ["en"],
    upload_ts: new Date().toISOString()
  },
  transcript: [
    {
      page_number: 1,
      blocks: [
        {
          block_id: "b1",
          type: "heading",
          text: "RESIDENTIAL RENTAL AGREEMENT",
          ocr_confidence: 0.98
        },
        {
          block_id: "b2",
          type: "paragraph",
          text: "This Agreement is made on this 15th day of October 2024, between Mr. Sharma (Landlord) and Mr. John Doe (Tenant).",
          ocr_confidence: 0.99
        },
        {
          block_id: "b3",
          type: "clause",
          text: "1. TERM: The lease shall be for a period of 11 months, automatically renewing for another 11 months unless terminated.",
          ocr_confidence: 0.95
        },
        {
          block_id: "b4",
          type: "clause",
          text: "2. RENT: The monthly rent shall be INR 25,000, payable by the 5th of each month. A late fee of INR 2,000 per day applies for delays.",
          ocr_confidence: 0.96
        },
        {
          block_id: "b5",
          type: "clause",
          text: "3. TERMINATION: The Landlord reserves the right to terminate this agreement at any time without prior notice if the Tenant engages in 'nuisance' behavior.",
          ocr_confidence: 0.92
        },
        {
          block_id: "b6",
          type: "clause",
          text: "4. JURISDICTION: Any disputes arising from this agreement shall be subject to the exclusive jurisdiction of the courts in Singapore.",
          ocr_confidence: 0.94
        },
        {
          block_id: "b7",
          type: "clause",
          text: "5. INDEMNITY: Tenant agrees to indemnify Landlord against all claims, unlimited in amount, regardless of fault.",
          ocr_confidence: 0.90
        }
      ]
    }
  ],
  summaries: {
    summary_en: "A residential rental agreement for 11 months with automatic renewal. It includes high late fees, unilateral termination rights for the landlord, and a suspicious foreign jurisdiction clause.",
    summary_hi: "11 महीने के लिए एक आवासीय किराया समझौता जिसमें स्वतः नवीनीकरण शामिल है। इसमें विलंब शुल्क बहुत अधिक है, मकान मालिक के पास एकतरफा समाप्ति का अधिकार है, और सिंगापुर का क्षेत्राधिकार संदिग्ध है।"
  },
  risk: {
    score: 78, // High risk
    by_category: {
      FinancialRisk: 30,
      LegalProcedureRisk: 50,
      PrivacyRisk: 5,
      OperationalRisk: 15
    },
    flags: [
      {
        risk_id: "r1",
        level: "HIGH",
        type: "Unilateral Termination",
        page: 1,
        block_id: "b5",
        excerpt: "Landlord reserves the right to terminate... without prior notice",
        explanation_en: "Allows the landlord to evict you immediately without giving you time to find a new place.",
        explanation_hi: "मकान मालिक को आपको बिना किसी पूर्व सूचना के तुरंत बेदखल करने की अनुमति देता है।"
      },
      {
        risk_id: "r2",
        level: "HIGH",
        type: "Foreign Jurisdiction",
        page: 1,
        block_id: "b6",
        excerpt: "exclusive jurisdiction of the courts in Singapore",
        explanation_en: "Disputes must be fought in Singapore courts, which is extremely expensive and impractical for an Indian rental.",
        explanation_hi: "विवादों को सिंगापुर की अदालतों में लड़ा जाना चाहिए, जो कि भारतीय किराये के लिए बेहद महंगा और अव्यावहारिक है।"
      },
      {
        risk_id: "r3",
        level: "MEDIUM",
        type: "Excessive Late Fees",
        page: 1,
        block_id: "b4",
        excerpt: "late fee of INR 2,000 per day",
        explanation_en: "₹2,000 per day is likely unlawful and punitive. Standard interest is usually 12-18% per annum.",
        explanation_hi: "₹2,000 प्रतिदिन का शुल्क संभवतः गैरकानूनी है। मानक ब्याज आमतौर पर 12-18% प्रति वर्ष होता है।"
      },
      {
        risk_id: "r4",
        level: "HIGH",
        type: "Uncapped Indemnity",
        page: 1,
        block_id: "b7",
        excerpt: "unlimited in amount, regardless of fault",
        explanation_en: "You are financially responsible for everything, even if it's not your fault. This is very dangerous.",
        explanation_hi: "आप हर चीज के लिए आर्थिक रूप से जिम्मेदार हैं, भले ही वह आपकी गलती न हो। यह बहुत खतरनाक है।"
      }
    ]
  },
  key_clauses: [
    { clause_tag: "term", page: 1, block_id: "b3", text: "11 months + automatic renewal" },
    { clause_tag: "rent", page: 1, block_id: "b4", text: "INR 25,000/month" },
    { clause_tag: "dispute", page: 1, block_id: "b6", text: "Singapore Courts" }
  ],
  questions_for_lawyer: [
    {
      q_id: "q1",
      question_en: "Is the 'Singapore jurisdiction' clause enforceable for an Indian property rental?",
      question_hi: "क्या भारतीय संपत्ति किराये के लिए 'सिंगापुर क्षेत्राधिकार' खंड लागू करने योग्य है?",
      ref: "Clause 4",
      priority: "High"
    },
    {
      q_id: "q2",
      question_en: "Can we cap the indemnity liability to the security deposit amount?",
      question_hi: "क्या हम क्षतिपूर्ति दायित्व को सुरक्षा जमा राशि तक सीमित कर सकते हैं?",
      ref: "Clause 5",
      priority: "High"
    },
    {
      q_id: "q3",
      question_en: "Does 'nuisance' need to be defined to prevent arbitrary eviction?",
      question_hi: "क्या मनमानी बेदखली को रोकने के लिए 'उपद्रव' को परिभाषित करने की आवश्यकता है?",
      ref: "Clause 3",
      priority: "Medium"
    }
  ],
  action_plan: [
    {
      step: 1,
      description_en: "Request removal of Clause 4 (Singapore Jurisdiction). Change to local city courts.",
      description_hi: "धारा 4 (सिंगापुर क्षेत्राधिकार) को हटाने का अनुरोध करें। स्थानीय शहर की अदालतों में बदलें।",
      urgency: "Immediate"
    },
    {
      step: 2,
      description_en: "Negotiate late fee in Clause 2. Propose 12% p.a. interest instead of daily flat fee.",
      description_hi: "धारा 2 में विलंब शुल्क पर बातचीत करें। दैनिक फ्लैट शुल्क के बजाय 12% वार्षिक ब्याज का प्रस्ताव करें।",
      urgency: "Immediate"
    },
    {
      step: 3,
      description_en: "Ask to define 'nuisance' in Clause 3 specifically (e.g., illegal activities, excessive noise).",
      description_hi: "धारा 3 में 'उपद्रव' को विशेष रूप से परिभाषित करने के लिए कहें (उदाहरण के लिए, अवैध गतिविधियां, अत्यधिक शोर)।",
      urgency: "Soon"
    }
  ],
  confidence: {
    overall: 0.88,
    ocr: 0.95,
    nlp: 0.81
  }
};