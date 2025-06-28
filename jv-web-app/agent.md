# 🤖 Agent Instructions for JV Web App (Joint Venture Simulator)

## 📌 Project Purpose
This is a browser-based simulation and negotiation tool for a three-partner trailer manufacturing joint venture. The tool is used live by Partner C to simulate working capital, define partner responsibilities, calculate equity splits, and generate a legally binding MoU.

## 🧱 Tech Stack
- HTML5 (single-page app)
- CSS3 (dark theme using CSS variables)
- Vanilla JavaScript (no frameworks)
- Chart.js for visualizations
- localStorage for in-browser persistence

## 🧩 File Structure
- `index.html`: core layout for 11 modular sections
- `main.css`: global styling
- `main.js`: all JS logic including section toggling and logic wiring
- `modules/calculator/`: prebuilt financial simulator (HTML/CSS/JS)
- `project_log.md`: manually updated log of development progress

## 🧠 Assistant Instructions
- Follow section-by-section development order (1–11)
- DO NOT rewrite the whole file unless explicitly asked
- Use `// === Section X: Title ===` comments in JS
- Use `:root` CSS variables for any theme-related styling
- Store user inputs via `localStorage`, no backend API
- All components must be modular and editable
- Only use Chart.js for graphs
- Always give clear “find this → replace with this” instructions
- Wait for user approval before making changes

## ✅ Current Phase
We are building Section 3 (Contribution & Equity Builder)

## 🛑 Don’t Do
- Don’t use jQuery or any external libraries
- Don’t suggest backend/database features
- Don’t assume a build system — this is pure front-end

## 💬 Example Commands
- “Update Section 3 to calculate equity split”
- “Add chart logic using Chart.js in main.js”
- “Style the slider range in main.css”

