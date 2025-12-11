# Courtroom Buddy — AI Legal Document Understanding Assistant
Courtroom Buddy is an AI-powered assistant built with Google AI Studio (Build) and Bolt, designed to help users understand legal documents easily in simple Hindi and English.
The system extracts text, identifies risky clauses, computes a legal risk score, generates summaries, lawyer-ready questions, and a complete action plan. It outputs a strict JSON structure suitable for UI rendering or downstream workflows.
This repository contains the Master JSON Prompt Bundle, micro-prompts, UI configuration, API contract, deployment instructions, and test cases used to build the full system.

# 🧠 Project Summary

## Courtroom Buddy solves a critical problem:

People struggle to understand legal language, hidden clauses, penalties, risks, and their rights.
This AI system automatically:
Extracts text from PDF/DOC/DOCX/Images
Cleans and segments the document
Runs legal micro-prompts for chunk-level interpretation
Detects risk-heavy clauses (termination, indemnity, penalties, data sharing, jurisdiction, etc.)
Computes a unified, explainable risk score
Generates plain-language summaries (EN + HI)
Prepares 8–12 lawyer-ready questions
Produces a 1–7 step action plan with templates
Outputs a complete JSON report matching a strict schema
This project is built to be production-grade, scalable, and ready for deployment.

# 📦 Features (Based on the JSON Specification)

🔍 1. OCR + Text Parsing : 
Extracts text from PDF, DOCX, DOC, Images
Preserves headings, clauses, dates, parties, tables, and bounding boxes
Provides OCR confidence scores

# ✂️ 2. Chunking Pipeline

Document is split into logical chunks (≤1000 tokens) with metadata:
Page number
Block ID
Bounding box
Paragraph type

# 🧩 3. Micro-Prompt Framework

Each chunk runs through 8 specialized micro-prompts:
OCR Preprocess
Chunk Summarizer (EN + HI)
Clause Risk Classifier
Risk Scoring Engine
Highlights & Evidence
Questions for Lawyer
Action Plan Generator
Simple Summary Builder

# ⚖️ 4. Document-Level Risk Aggregation

### Weighted scoring:
HIGH = +25
MEDIUM = +12
LOW = +4

### Risk Categories:
Financial Risk
Legal Procedure Risk
Privacy Risk
Operational Risk

# 🧾 5. Final JSON Output Schema

Includes:
Full transcript
Summaries
All risks + explanations + highlights
Key clauses
Lawyer questions
Action plan
Explainability
Confidence scores
Download links (PDF/JSON/DOCX)



User Upload
     │
     ▼
UI (Google AI Studio Build)
- Upload interface
- Consent modal
- Viewer with highlights
- Summary cards & risk dial
     │
     ▼
Pipeline Orchestration (AI Studio)
- OCR
- Chunking
- Micro-prompts
- Risk scoring
- JSON assembly
     │
     ▼
Bolt Backend (optional)
- /analyze endpoint
- File handling
- Async processing
- Temporary storage
     │
     ▼
Frontend Output
- Human Report
- Raw JSON tab
- Export (PDF/Docx/JSON)

# 🔌 API Contract

POST /analyze
Headers:
Authorization: Bearer <API_KEY>
Body (multipart/form-data):
file
lang_pref
user_consent=true

Responses:

200 → Full synchronous result
202 → Accepted (session queued)

GET /health
Returns:
{ "status": "ok", "version": "1.0" }

# 🧬 Pipeline Steps (From Your JSON Spec)

sanitize_store – secure temp storage
extract_text – OCR + native text parsing
language_detection – EN/HI/Mixed
chunking – 1000 token max, metadata preserved
micro_prompts – run all 8 legal micro-prompts
aggregate_risks – compute score + categories
report_generation – create human + JSON output
cleanup – secure delete

| Clause Issue                | Weight |
| --------------------------- | ------ |
| Termination without cause   | 25     |
| Arbitration outside India   | 25     |
| Uncapped indemnity          | 25     |
| Automatic renewal + penalty | 12     |
| Excessive late fees         | 12     |
| Broad confidentiality       | 25     |
| Missing party/amount        | 12     |
| Admin clause                | 4      |

## Buckets:
0–20 → LOW
21–50 → MEDIUM
51–100 → HIGH

# 🧪 Test Cases Included

Consumer notice with unilateral termination
Rental agreement with auto-renewal
Loan agreement with penalties
Employment contract with vague obligations
NDA with data sharing risks

### Each includes expected:
Flags
Questions
Risk outcomes

# 🔐 Privacy & Data Handling

All files are processed temporarily
Auto-deleted after session
No PII stored
No legal advice is provided

# 👨‍💻 Developer Notes

Use temperature = 0.0 for deterministic outputs
Long-context model recommended
Micro-prompts must be configured in Studio Build
UI elements must map to the output schema fields

# ⭐ Contributors
Tejvir Singh Rathore  — AI / Backend / Prompt Engineering

# MIT License

Copyright (c) 2024 Tejvir

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
