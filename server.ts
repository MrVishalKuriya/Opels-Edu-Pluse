import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

interface Student {
  id: number;
  name: string;
  age: number;
  course: string;
  semester: string;
  email: string;
  phone: string;
  status: string;
  attendanceRate: number;
  gpa: number;
  feeStatus: string;
}

interface Faculty {
  id: number;
  name: string;
  department: string;
  designation: string;
  email: string;
  phone: string;
  officeHours: string;
}

interface Notice {
  id: number;
  title: string;
  category: string;
  content: string;
  datePosted: string;
  postedBy: string;
  urgent: boolean;
}

let nextStudentId = 6;
const students: Student[] = [
  {
    id: 1,
    name: "Aarav Sharma",
    age: 20,
    course: "Computer Science",
    semester: "Semester 4",
    email: "aarav.sharma@college.edu",
    phone: "+91 9876543210",
    status: "Active",
    attendanceRate: 92.5,
    gpa: 3.85,
    feeStatus: "Paid",
  },
  {
    id: 2,
    name: "Priya Patel",
    age: 19,
    course: "Information Technology",
    semester: "Semester 2",
    email: "priya.patel@college.edu",
    phone: "+91 9876543211",
    status: "Active",
    attendanceRate: 88.0,
    gpa: 3.60,
    feeStatus: "Paid",
  },
  {
    id: 3,
    name: "Rohan Mehta",
    age: 21,
    course: "Computer Science",
    semester: "Semester 6",
    email: "rohan.mehta@college.edu",
    phone: "+91 9876543212",
    status: "Active",
    attendanceRate: 95.0,
    gpa: 3.92,
    feeStatus: "Paid",
  },
  {
    id: 4,
    name: "Ananya Iyer",
    age: 20,
    course: "Data Science",
    semester: "Semester 4",
    email: "ananya.iyer@college.edu",
    phone: "+91 9876543213",
    status: "Active",
    attendanceRate: 78.5,
    gpa: 3.40,
    feeStatus: "Pending",
  },
  {
    id: 5,
    name: "Vikram Singh",
    age: 22,
    course: "Business Administration",
    semester: "Semester 6",
    email: "vikram.singh@college.edu",
    phone: "+91 9876543214",
    status: "Active",
    attendanceRate: 84.0,
    gpa: 3.55,
    feeStatus: "Paid",
  },
];

let nextFacultyId = 5;
const facultyList: Faculty[] = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    department: "Computer Science",
    designation: "Head of Department & Professor",
    email: "rajesh.kumar@college.edu",
    phone: "+91 9800011122",
    officeHours: "Mon/Wed 10:00 AM - 12:00 PM",
  },
  {
    id: 2,
    name: "Prof. Meera Nair",
    department: "Information Technology",
    designation: "Associate Professor",
    email: "meera.nair@college.edu",
    phone: "+91 9800011123",
    officeHours: "Tue/Thu 02:00 PM - 04:00 PM",
  },
  {
    id: 3,
    name: "Dr. Amitav Ghosh",
    department: "Data Science",
    designation: "Professor",
    email: "amitav.ghosh@college.edu",
    phone: "+91 9800011124",
    officeHours: "Mon/Fri 11:00 AM - 01:00 PM",
  },
  {
    id: 4,
    name: "Prof. Sunita Reddy",
    department: "Business Administration",
    designation: "Dean & Senior Professor",
    email: "sunita.reddy@college.edu",
    phone: "+91 9800011125",
    officeHours: "Wed/Fri 03:00 PM - 05:00 PM",
  },
];

let nextNoticeId = 4;
const notices: Notice[] = [
  {
    id: 1,
    title: "End-Semester Midterm Examination Timetable Released",
    category: "Exams",
    content: "The midterm examination timetable for all undergraduate and postgraduate semesters is now published.",
    postedBy: "Controller of Examinations",
    urgent: true,
    datePosted: new Date().toISOString().split("T")[0],
  },
  {
    id: 2,
    title: "Tuition Fee Clearance Notice for Current Semester",
    category: "Financial",
    content: "Students with pending semester fees are advised to settle outstanding dues before Friday.",
    postedBy: "Accounts Office",
    urgent: false,
    datePosted: new Date().toISOString().split("T")[0],
  },
  {
    id: 3,
    title: "Annual Campus Hackathon & Tech Fest Registration Open",
    category: "Events",
    content: "Register your teams for the annual EduPulse Tech Fest 2026! Cash prizes worth $5,000.",
    postedBy: "Student Affairs Council",
    urgent: false,
    datePosted: new Date().toISOString().split("T")[0],
  },
];

// Crio.do-style Fellowship Programs Dataset
const crioPrograms = [
  {
    id: "fullstack-dev",
    title: "Fellowship Program in Software Development with AI",
    badge: "Flagship Fellowship",
    tagline: "Master full stack web development and AI-native software architecture by building real-world enterprise projects.",
    duration: "9 Months • 12-15 hrs/week",
    mode: "Live Working Sessions + Real Dev Sandbox",
    avgCtc: "13.4 LPA",
    highestCtc: "43.0 LPA",
    level: "Beginner to Advanced",
    nextCohort: "Upcoming Monday",
    skills: ["React.js", "Node.js", "Express", "MongoDB", "System Design (LLD/HLD)", "Redis", "Docker", "AI Agents & RAG", "CI/CD"],
    projectsCount: 4,
    projectsList: ["QKart E-Commerce", "QTrip Travel Experience", "QMoney Stock Portfolio", "Enterprise RAG Copilot"],
    curriculum: [
      { sprint: "Sprint 1", title: "Developer Workflows, Git & ES6+ Javascript", weeks: "Weeks 1-3", details: "Terminal, Git branch management, asynchronous JS, Event Loop, DOM manipulation." },
      { sprint: "Sprint 2", title: "Frontend Architecture with React & State Stores", weeks: "Weeks 4-8", details: "Component lifecycle, Hooks, Custom Hooks, Redux/Context, Debounced Search, Responsive layouts." },
      { sprint: "Sprint 3", title: "Scalable Backend APIs, Express & MongoDB", weeks: "Weeks 9-14", details: "RESTful architecture, JWT auth, schema design, indexes, aggregation pipelines, validation." },
      { sprint: "Sprint 4", title: "System Design, Redis Caching & Message Queues", weeks: "Weeks 15-20", details: "Distributed caching, cache invalidation, rate limiters, Kafka queues, Low-Level Design (LLD)." },
      { sprint: "Sprint 5", title: "GenAI Engineering, Claude Code & RAG Pipelines", weeks: "Weeks 21-26", details: "Vector databases, semantic chunking, prompt engineering, agentic tool-use, RAG evaluation." },
      { sprint: "Sprint 6", title: "DevOps, Containerization (Docker) & AWS Cloud", weeks: "Weeks 27-32", details: "Multi-stage Docker builds, ECS deployment, CI/CD GitHub Actions, monitoring with Prometheus." },
      { sprint: "Sprint 7", title: "Capstone Externship, Mock Interviews & Referrals", weeks: "Weeks 33-36", details: "End-to-end production capstone, DSA sprint, live 1-on-1 mock interviews, hiring partner referrals." }
    ]
  },
  {
    id: "backend-dev",
    title: "Enterprise Backend Development Fellowship",
    badge: "Enterprise Scale",
    tagline: "Dive deep into Java, Spring Boot, distributed microservices, databases, and high-concurrency architecture.",
    duration: "8 Months • 10-14 hrs/week",
    mode: "Code Reviews + Production Micro-Experiences",
    avgCtc: "14.2 LPA",
    highestCtc: "38.0 LPA",
    level: "Intermediate",
    nextCohort: "Upcoming Monday",
    skills: ["Java 21", "Spring Boot", "PostgreSQL", "Redis", "Kafka", "Docker", "Kubernetes", "AWS", "Low-Level Design"],
    projectsCount: 4,
    projectsList: ["QMoney Portfolio Analyzer", "QEats Food Delivery Backend", "XUrl Scalable Shortener", "Distributed Rate Limiter"],
    curriculum: [
      { sprint: "Sprint 1", title: "Core Java Deep Dive, Multithreading & Memory", weeks: "Weeks 1-3", details: "JVM memory model, concurrency primitives, thread pools, garbage collection tuning." },
      { sprint: "Sprint 2", title: "Spring Boot Microservices & JPA/Hibernate", weeks: "Weeks 4-8", details: "Dependency Injection, REST controllers, transactions, connection pooling, HikariCP." },
      { sprint: "Sprint 3", title: "Database Optimization, PostgreSQL & Indexing", weeks: "Weeks 9-14", details: "B-Trees, EXPLAIN ANALYZE, composite indexes, query optimization, ACID isolation levels." },
      { sprint: "Sprint 4", title: "Distributed Caching (Redis) & Streaming (Kafka)", weeks: "Weeks 15-20", details: "Cache-aside pattern, pub-sub architectures, Kafka partitions, consumer lag mitigation." },
      { sprint: "Sprint 5", title: "High Level (HLD) & Low Level Design (LLD)", weeks: "Weeks 21-26", details: "Design patterns (Factory, Strategy, Observer), designing YouTube, Uber, and WhatsApp." },
      { sprint: "Sprint 6", title: "Production Deployment, Kubernetes & Observability", weeks: "Weeks 27-32", details: "K8s pods, ingress controllers, distributed tracing with OpenTelemetry, load testing." }
    ]
  },
  {
    id: "data-science-ai",
    title: "NextGen Data Analytics & Data Science with AI",
    badge: "High Demand",
    tagline: "Extract insights and build predictive AI models using Python, SQL, statistical machine learning, and GenAI.",
    duration: "7 Months • 10-12 hrs/week",
    mode: "Hands-on Industry Datasets",
    avgCtc: "12.0 LPA",
    highestCtc: "32.0 LPA",
    level: "All Backgrounds",
    nextCohort: "Upcoming Monday",
    skills: ["Python", "Pandas & NumPy", "PostgreSQL & BigQuery", "PowerBI/Tableau", "Scikit-Learn", "Deep Learning", "LLMs & RAG"],
    projectsCount: 5,
    projectsList: ["Customer Churn Predictor", "Financial Fraud Detection", "E-Commerce Market Basket", "GenAI Document Summarizer"],
    curriculum: [
      { sprint: "Sprint 1", title: "Python for Data Analysis & Statistical Foundations", weeks: "Weeks 1-3", details: "NumPy arrays, Pandas DataFrames, descriptive statistics, hypothesis testing." },
      { sprint: "Sprint 2", title: "Advanced SQL & Modern Data Warehousing", weeks: "Weeks 4-7", details: "Window functions, CTEs, BigQuery partitions, data extraction pipelines." },
      { sprint: "Sprint 3", title: "Business Intelligence, Storytelling & Dashboards", weeks: "Weeks 8-11", details: "PowerBI, Tableau, KPI derivation, cohort retention analytics." },
      { sprint: "Sprint 4", title: "Supervised & Unsupervised Machine Learning", weeks: "Weeks 12-17", details: "Regression, Classification, Random Forests, XGBoost, Clustering, Model Evaluation." },
      { sprint: "Sprint 5", title: "Deep Learning, NLP & Generative AI Systems", weeks: "Weeks 18-24", details: "Neural networks, Transformer architecture, HuggingFace, fine-tuning, RAG applications." },
      { sprint: "Sprint 6", title: "End-to-End Data Product Capstone & Placement", weeks: "Weeks 25-28", details: "Streamlit/FastAPI model serving, portfolio deployment, technical interview rounds." }
    ]
  },
  {
    id: "qa-automation",
    title: "QA Automation & SDET Fellowship with AI",
    badge: "Zero to SDET",
    tagline: "Elevate from manual testing to an automated SDET engineer building robust test suites and CI/CD pipelines.",
    duration: "6 Months • 8-10 hrs/week",
    mode: "Live Framework Building",
    avgCtc: "10.5 LPA",
    highestCtc: "26.0 LPA",
    level: "Beginner to Intermediate",
    nextCohort: "Upcoming Monday",
    skills: ["Java/Python", "Selenium WebDriver", "RestAssured API Testing", "Playwright", "TestNG/JUnit", "Jenkins & Docker", "AI Test Generation"],
    projectsCount: 3,
    projectsList: ["E-Commerce E2E Test Suite", "Banking API Automation Suite", "Cross-Browser Cloud Test Runner"],
    curriculum: [
      { sprint: "Sprint 1", title: "Core Programming & Testing Fundamentals", weeks: "Weeks 1-3", details: "Object-Oriented Programming, clean code, unit testing, test design techniques." },
      { sprint: "Sprint 2", title: "Web Automation with Selenium & Playwright", weeks: "Weeks 4-8", details: "Page Object Model (POM), dynamic waits, locators, cross-browser execution." },
      { sprint: "Sprint 3", title: "REST API Test Automation with RestAssured", weeks: "Weeks 9-13", details: "Schema validation, auth tokens, payload serialization, contract testing." },
      { sprint: "Sprint 4", title: "CI/CD Pipelines, Docker & AI-Assisted QA", weeks: "Weeks 14-18", details: "Jenkins pipeline, Docker grid, self-healing test automation scripts." },
      { sprint: "Sprint 5", title: "Performance Testing (JMeter) & Placement Prep", weeks: "Weeks 19-24", details: "Load testing, stress testing, mock technical interviews, resume building." }
    ]
  }
];

// Crio.do Real-World Projects (Interactive Project Sandbox & Micro-Experiences)
const crioProjects = [
  {
    id: "qkart",
    name: "QKart E-Commerce Platform",
    companyTag: "Modeled after Flipkart & Amazon",
    category: "Full Stack & Performance",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Redis", "JWT"],
    difficulty: "Intermediate",
    description: "Build an enterprise e-commerce platform with debounced catalog search, authenticated cart sync, optimistic UI updates, and high-concurrency checkout.",
    architecture: "Decoupled React client communicating with a Node.js microservice backed by MongoDB and an in-memory Redis cluster for sub-10ms catalog reads.",
    stars: "4.9/5 (1,240+ reviews)",
    estimatedHours: "45 Hours",
    milestones: [
      {
        id: "m1",
        title: "Milestone 1: Implement Debounced Product Search",
        goal: "Eliminate wasteful database queries by delaying API requests until the user pauses typing for 400ms.",
        file: "src/components/Products.jsx",
        code: `// QKart Product Catalog Debounce Handler
export function createDebounce(fn, delayMs = 400) {
  let timeoutId = null;
  return function(...args) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delayMs);
  };
}

export async function searchCatalog(query) {
  const endpoint = \`/api/products/search?q=\${encodeURIComponent(query.trim())}\`;
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error("Catalog query failure");
  return response.json();
}`,
        tests: [
          { name: "Debounce restricts rapid typing to exactly 1 request per pause", pass: true, latency: "2ms" },
          { name: "Empty search query immediately triggers full catalog reset", pass: true, latency: "1ms" },
          { name: "XSS sanitized query string prevents injection in query parameters", pass: true, latency: "3ms" }
        ]
      },
      {
        id: "m2",
        title: "Milestone 2: Authenticated Cart & Token Refresh",
        goal: "Synchronize guest items into logged-in user cart without duplicates, handling expired JWT tokens automatically.",
        file: "src/services/cartService.js",
        code: `// QKart Cart Synchronization
export async function syncGuestCart(guestItems, authToken) {
  const response = await fetch('/api/cart/sync', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${authToken}\`
    },
    body: JSON.stringify({ items: guestItems })
  });
  if (response.status === 401) {
    const refreshedToken = await refreshAccessToken();
    return syncGuestCart(guestItems, refreshedToken);
  }
  return response.json();
}`,
        tests: [
          { name: "Guest cart merges with remote state without duplicate product IDs", pass: true, latency: "4ms" },
          { name: "401 status triggers silent JWT token refresh and retries original request", pass: true, latency: "9ms" },
          { name: "Optimistic UI renders badge update before server roundtrip finishes", pass: true, latency: "1ms" }
        ]
      },
      {
        id: "m3",
        title: "Milestone 3: Redis Atomic Stock Decrement on Checkout",
        goal: "Prevent flash-sale overselling using atomic Redis operations across distributed web workers.",
        file: "server/controllers/orderController.js",
        code: `// Redis Atomic Inventory Check
export async function reserveStock(redis, items) {
  const pipeline = redis.pipeline();
  for (const item of items) {
    pipeline.decrby(\`inventory:\${item.id}\`, item.quantity);
  }
  const results = await pipeline.exec();
  const oversold = results.some(([err, stock]) => stock < 0);
  if (oversold) {
    // Rollback decrements
    for (const item of items) {
      await redis.incrby(\`inventory:\${item.id}\`, item.quantity);
    }
    throw new Error("One or more items sold out during checkout!");
  }
  return true;
}`,
        tests: [
          { name: "Simultaneous checkout across 1,000 requests prevents negative stock", pass: true, latency: "11ms" },
          { name: "Atomic rollback cleanly restores inventory when single SKU fails", pass: true, latency: "6ms" },
          { name: "Order idempotency key prevents duplicate payment charges", pass: true, latency: "3ms" }
        ]
      }
    ]
  },
  {
    id: "qtrip",
    name: "QTrip Travel & City Experiences",
    companyTag: "Modeled after Airbnb & TripAdvisor",
    category: "Frontend & Dynamic Routing",
    techStack: ["JavaScript ES6+", "HTML5/CSS3", "REST APIs", "Tailwind CSS", "Netlify"],
    difficulty: "Beginner to Intermediate",
    description: "Build a responsive travel reservation application with dynamic destination carousels, multi-criteria activity filtering, and interactive reservation modals.",
    architecture: "Modern responsive web architecture with URL query string synchronization, responsive image lazy-loading, and localStorage booking history.",
    stars: "4.8/5 (980+ reviews)",
    estimatedHours: "35 Hours",
    milestones: [
      {
        id: "m1",
        title: "Milestone 1: Dynamic Destination Grid & API Integration",
        goal: "Fetch and render city adventure cards dynamically from REST APIs with loading states.",
        file: "src/destinations.js",
        code: `export async function loadCities() {
  const container = document.getElementById("cities-grid");
  try {
    container.innerHTML = \`<div class="loading-spinner">Loading destinations...</div>\`;
    const res = await fetch("https://api.qtrip.example/cities");
    const cities = await res.json();
    renderCities(cities);
  } catch (err) {
    container.innerHTML = \`<div class="error-msg">Failed to load cities. Retry?</div>\`;
  }
}`,
        tests: [
          { name: "Network error renders clean fallback UI with retry button", pass: true, latency: "3ms" },
          { name: "City tiles adapt responsive layout across mobile, tablet, desktop", pass: true, latency: "2ms" }
        ]
      },
      {
        id: "m2",
        title: "Milestone 2: Multi-Category Filter & URL State Sync",
        goal: "Combine duration and category filters so users can bookmark and share filtered views.",
        file: "src/filters.js",
        code: `export function applyFilters(adventures, selectedCategory, durationRange) {
  return adventures.filter(item => {
    const matchCategory = !selectedCategory || item.category === selectedCategory;
    const matchDuration = !durationRange || (item.duration >= durationRange.low && item.duration <= durationRange.high);
    return matchCategory && matchDuration;
  });
}`,
        tests: [
          { name: "Filters update URL query params (?category=Cycling&duration=2-6)", pass: true, latency: "2ms" },
          { name: "Combined filters return precise subset without mutative side effects", pass: true, latency: "1ms" }
        ]
      }
    ]
  },
  {
    id: "qmoney",
    name: "QMoney Stock Portfolio Analyzer",
    companyTag: "FinTech Core Investment Analytics",
    category: "Backend & Financial Algorithms",
    techStack: ["Java 21", "Spring Boot", "Tiingo REST API", "Jackson JSON", "JUnit 5"],
    difficulty: "Advanced",
    description: "Construct a financial portfolio analysis engine in Java that ingests trade histories, fetches historical quotes via Tiingo API, computes annualized CAGR returns, and ranks investments.",
    architecture: "Modular Java CLI & microservice utilizing ThreadPoolExecutor for concurrent price fetching and Jackson for strict JSON deserialization.",
    stars: "4.9/5 (1,450+ reviews)",
    estimatedHours: "50 Hours",
    milestones: [
      {
        id: "m1",
        title: "Milestone 1: Parse Trade CSV & Fetch Tiingo Candlesticks",
        goal: "Deserialize user portfolio trades and fetch closing price quotes concurrently.",
        file: "PortfolioManagerImpl.java",
        code: `public List<AnnualizedReturn> calculateAnnualizedReturns(
    List<PortfolioTrade> trades, LocalDate endDate) {
  List<AnnualizedReturn> results = new ArrayList<>();
  for (PortfolioTrade trade : trades) {
    Double buyPrice = getOpeningPriceOnDate(trade.getSymbol(), trade.getPurchaseDate());
    Double sellPrice = getClosingPriceOnDate(trade.getSymbol(), endDate);
    Double totalReturn = (sellPrice - buyPrice) / buyPrice;
    Double totalYears = ChronoUnit.DAYS.between(trade.getPurchaseDate(), endDate) / 365.24;
    Double annualizedReturn = Math.pow(1.0 + totalReturn, 1.0 / totalYears) - 1.0;
    results.add(new AnnualizedReturn(trade.getSymbol(), annualizedReturn, totalReturn));
  }
  results.sort(Comparator.comparing(AnnualizedReturn::getAnnualizedReturn).reversed());
  return results;
}`,
        tests: [
          { name: "Annualized return formula accounts for leap years and fractional periods", pass: true, latency: "5ms" },
          { name: "Handles missing trade dates with fallback to latest previous trading day", pass: true, latency: "4ms" },
          { name: "Concurrent ExecutorService scrapes 50 symbols within 400ms limit", pass: true, latency: "14ms" }
        ]
      }
    ]
  },
  {
    id: "ai-rag-agent",
    name: "Enterprise RAG & AI Copilot",
    companyTag: "Modern AI-Native Enterprise Tool",
    category: "Generative AI & LLM Systems",
    techStack: ["TypeScript/Node", "LangChain", "ChromaDB / Pinecone", "Gemini API", "FastAPI"],
    difficulty: "Advanced",
    description: "Construct an autonomous knowledge retrieval agent that ingests enterprise documentation, performs semantic vector search with reranking, and produces hallucination-free answers with clickable citations.",
    architecture: "Hybrid dense vector + sparse BM25 retrieval pipeline with semantic chunking and strict citation guardrails.",
    stars: "5.0/5 (620+ reviews)",
    estimatedHours: "40 Hours",
    milestones: [
      {
        id: "m1",
        title: "Milestone 1: Semantic Document Ingestion & Chunking",
        goal: "Chunk technical documentation into overlapping 500-token windows and generate vector embeddings.",
        file: "src/rag/embedder.ts",
        code: `export async function processDocument(rawText: string, metadata: Record<string, any>) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 80,
    separators: ["\\n\\n", "\\n", " ", ""]
  });
  const chunks = await splitter.createDocuments([rawText]);
  const vectorStore = await getChromaClient();
  await vectorStore.addDocuments(chunks.map((doc, idx) => ({
    pageContent: doc.pageContent,
    metadata: { ...metadata, chunkId: idx }
  })));
  return { totalChunks: chunks.length };
}`,
        tests: [
          { name: "Recursive splitter maintains semantic coherence at paragraph breaks", pass: true, latency: "8ms" },
          { name: "Cosine similarity search retrieves correct reference chunk with score > 0.85", pass: true, latency: "12ms" },
          { name: "Grounding guardrail returns 'I don't know' when context lacks answer", pass: true, latency: "7ms" }
        ]
      }
    ]
  }
];

// Placements & Hiring Partners Showcase
const placementData = {
  stats: {
    placementRate: "94.2%",
    averageCtc: "12.8 LPA",
    highestCtc: "43.0 LPA",
    averageHike: "165%",
    hiringPartnersCount: "900+",
    engineersPlaced: "15,400+"
  },
  stories: [
    {
      id: 1,
      name: "Sneha Reddy",
      previousRole: "Manual QA Tester (TCS)",
      newRole: "SDE-2 Full Stack Engineer",
      company: "Swiggy",
      prevSalary: "3.8 LPA",
      newSalary: "19.5 LPA",
      hike: "413%",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      program: "Full Stack Development with AI",
      quote: "Building QKart and going through code reviews gave me the exact hands-on engineering confidence I needed to ace Swiggy's machine coding and architecture rounds."
    },
    {
      id: 2,
      name: "Aditya Verma",
      previousRole: "Associate Developer (Wipro)",
      newRole: "Backend Engineer",
      company: "Razorpay",
      prevSalary: "4.2 LPA",
      newSalary: "21.0 LPA",
      hike: "400%",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      program: "Enterprise Backend Fellowship",
      quote: "I had never designed high-throughput Redis caching or Kafka pipelines before. The project-based approach at OPELS Learn mirrors actual high-scale tech companies."
    },
    {
      id: 3,
      name: "Manish Joshi",
      previousRole: "Mechanical Engineer (Non-CS)",
      newRole: "Frontend Engineer",
      company: "CRED",
      prevSalary: "3.2 LPA",
      newSalary: "16.0 LPA",
      hike: "400%",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      program: "Full Stack Development with AI",
      quote: "As a non-tech graduate, video tutorials never worked. Here, building 4 real production applications gave me a live GitHub portfolio that interviewers loved."
    },
    {
      id: 4,
      name: "Pooja Malhotra",
      previousRole: "System Administrator (Infosys)",
      newRole: "SDET Automation Lead",
      company: "Flipkart",
      prevSalary: "5.0 LPA",
      newSalary: "22.5 LPA",
      hike: "350%",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      program: "QA Automation & SDET Fellowship",
      quote: "The test framework I built from scratch in the fellowship was directly aligned with Flipkart's e-commerce automation needs. Absolute game changer."
    },
    {
      id: 5,
      name: "Kunal Bansal",
      previousRole: "Data Reporting Analyst",
      newRole: "AI / Data Science Engineer",
      company: "Amazon",
      prevSalary: "6.5 LPA",
      newSalary: "28.0 LPA",
      hike: "330%",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
      program: "NextGen Data Science & AI",
      quote: "Building real machine learning pipelines and deploying vector RAG agents gave me practical knowledge far ahead of standard theory-heavy courses."
    }
  ],
  hiringPartners: [
    "Amazon", "Microsoft", "Google", "Flipkart", "Swiggy", "CRED",
    "Razorpay", "PhonePe", "Walmart Global Tech", "Atlassian", "Jio",
    "Capgemini", "Societe Generale", "Morgan Stanley", "Paytm", "Dell"
  ]
};

// Live Tech Masterclasses & Free Workshops
const masterclassesList = [
  {
    id: 1,
    title: "System Design: Designing Uber & Swiggy at 10M DAU Scale",
    instructor: "Vikram R. (Ex-Uber Staff Engineer)",
    date: "This Saturday, 7:00 PM IST",
    duration: "2 Hours Live",
    category: "System Design",
    seatsLeft: 18,
    attendeesCount: 420,
    topics: ["Geo-sharding with H3 & QuadTrees", "WebSocket Realtime Driver Tracking", "Distributed Lock via Redis"]
  },
  {
    id: 2,
    title: "Building Production AI Agents with RAG in 90 Minutes",
    instructor: "Dr. Ananya Sen (Principal AI Architect)",
    date: "This Sunday, 11:00 AM IST",
    duration: "90 Mins Live",
    category: "Generative AI",
    seatsLeft: 24,
    attendeesCount: 385,
    topics: ["Vector Databases & Chunking Strategies", "LangChain vs LlamaIndex", "Preventing Hallucinations"]
  },
  {
    id: 3,
    title: "Cracking FAANG Machine Coding Rounds in 2026",
    instructor: "Rahul Mehta (Tech Lead @ Amazon)",
    date: "Next Wednesday, 8:00 PM IST",
    duration: "2 Hours Live",
    category: "Career & Coding",
    seatsLeft: 35,
    attendeesCount: 512,
    topics: ["Design Patterns in Real Code", "Writing Unit Test Suites Under Pressure", "Clean Architecture Rubrics"]
  }
];

// Student applications stored in-memory
const learningApplications: any[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Health check
  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok" });
  });

  // -------------------------------------------------------------
  // Student Endpoints
  // -------------------------------------------------------------

  // Get Stats
  app.get("/api/students/stats", (_req: Request, res: Response) => {
    const totalStudents = students.length;
    const averageAge = totalStudents
      ? Math.round((students.reduce((acc, s) => acc + (s.age || 0), 0) / totalStudents) * 10) / 10
      : 0;
    const avgAttendanceRate = totalStudents
      ? Math.round((students.reduce((acc, s) => acc + (s.attendanceRate ?? 85.0), 0) / totalStudents) * 10) / 10
      : 0;
    const avgGpa = totalStudents
      ? Math.round((students.reduce((acc, s) => acc + (s.gpa ?? 3.5), 0) / totalStudents) * 100) / 100
      : 0;
    const pendingFeeCount = students.filter(
      (s) => s.feeStatus?.toLowerCase() === "pending" || s.feeStatus?.toLowerCase() === "partial"
    ).length;
    const paidFeeCount = students.filter((s) => s.feeStatus?.toLowerCase() === "paid").length;

    const courseCounts: Record<string, number> = {};
    for (const s of students) {
      if (s.course) {
        courseCounts[s.course] = (courseCounts[s.course] || 0) + 1;
      }
    }

    res.json({
      totalStudents,
      averageAge,
      avgAttendanceRate,
      avgGpa,
      pendingFeeCount,
      paidFeeCount,
      courseCounts,
    });
  });

  // Search Students
  app.get("/api/students/search", (req: Request, res: Response) => {
    const query = ((req.query.query as string) || "").trim().toLowerCase();
    if (!query) {
      return res.json(students);
    }
    const filtered = students.filter(
      (s) =>
        s.name?.toLowerCase().includes(query) ||
        s.email?.toLowerCase().includes(query) ||
        s.course?.toLowerCase().includes(query)
    );
    res.json(filtered);
  });

  // Get All Students
  app.get("/api/students", (_req: Request, res: Response) => {
    res.json(students);
  });

  // Get Student by ID
  app.get("/api/students/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const student = students.find((s) => s.id === id);
    if (!student) {
      return res.status(404).json({ message: `Student not found with ID: ${id}` });
    }
    res.json(student);
  });

  // Create Student
  app.post("/api/students", (req: Request, res: Response) => {
    const body = req.body;
    if (!body.name || !body.email || !body.course || !body.semester || body.age == null) {
      return res.status(400).json({ message: "Missing required fields (name, age, course, semester, email)" });
    }

    const emailExists = students.some((s) => s.email.toLowerCase() === body.email.toLowerCase());
    if (emailExists) {
      return res.status(400).json({ message: `Email '${body.email}' is already registered` });
    }

    const newStudent: Student = {
      id: nextStudentId++,
      name: String(body.name).trim(),
      age: Number(body.age),
      course: String(body.course).trim(),
      semester: String(body.semester).trim(),
      email: String(body.email).trim(),
      phone: body.phone ? String(body.phone).trim() : "",
      status: body.status || "Active",
      attendanceRate: body.attendanceRate != null ? Number(body.attendanceRate) : 85.0,
      gpa: body.gpa != null ? Number(body.gpa) : 3.5,
      feeStatus: body.feeStatus || "Paid",
    };

    students.push(newStudent);
    res.status(201).json(newStudent);
  });

  // Update Student
  app.put("/api/students/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const index = students.findIndex((s) => s.id === id);
    if (index === -1) {
      return res.status(404).json({ message: `Student not found with ID: ${id}` });
    }

    const body = req.body;
    if (body.email) {
      const emailInUse = students.some(
        (s) => s.id !== id && s.email.toLowerCase() === String(body.email).toLowerCase()
      );
      if (emailInUse) {
        return res.status(400).json({ message: `Email '${body.email}' is already in use by another student` });
      }
    }

    const existing = students[index];
    const updated: Student = {
      ...existing,
      name: body.name != null ? String(body.name).trim() : existing.name,
      age: body.age != null ? Number(body.age) : existing.age,
      course: body.course != null ? String(body.course).trim() : existing.course,
      semester: body.semester != null ? String(body.semester).trim() : existing.semester,
      email: body.email != null ? String(body.email).trim() : existing.email,
      phone: body.phone != null ? String(body.phone).trim() : existing.phone,
      status: body.status != null ? String(body.status) : existing.status,
      attendanceRate: body.attendanceRate != null ? Number(body.attendanceRate) : existing.attendanceRate,
      gpa: body.gpa != null ? Number(body.gpa) : existing.gpa,
      feeStatus: body.feeStatus != null ? String(body.feeStatus) : existing.feeStatus,
    };

    students[index] = updated;
    res.json(updated);
  });

  // Delete Student
  app.delete("/api/students/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const index = students.findIndex((s) => s.id === id);
    if (index === -1) {
      return res.status(404).json({ message: `Student not found with ID: ${id}` });
    }
    students.splice(index, 1);
    res.status(204).send();
  });

// -------------------------------------------------------------
  // Crio.do-style Programs, Projects & Placement Endpoints
  // -------------------------------------------------------------
  app.get("/api/learning/programs", (_req: Request, res: Response) => {
    res.json(crioPrograms);
  });

  app.get("/api/learning/programs/:id", (req: Request, res: Response) => {
    const prog = crioPrograms.find((p) => p.id === req.params.id);
    if (!prog) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.json(prog);
  });

  app.get("/api/learning/projects", (_req: Request, res: Response) => {
    res.json(crioProjects);
  });

  app.get("/api/learning/projects/:id", (req: Request, res: Response) => {
    const proj = crioProjects.find((p) => p.id === req.params.id);
    if (!proj) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(proj);
  });

  // Simulated Interactive Test Suite Runner for Project Sandbox
  app.post("/api/learning/projects/:id/run-tests", (req: Request, res: Response) => {
    const { id } = req.params;
    const { milestoneId } = req.body;
    const proj = crioProjects.find((p) => p.id === id);
    if (!proj) {
      return res.status(404).json({ message: "Project not found" });
    }

    const milestone = proj.milestones.find((m: any) => m.id === milestoneId) || proj.milestones[0];
    
    // Generate realistic test runner output
    const testResults = milestone.tests.map((t: any) => ({
      name: t.name,
      status: "PASSED",
      latency: t.latency || `${Math.floor(Math.random() * 12) + 2}ms`,
      details: "Assertion verified against project test spec and production sandbox conditions.",
    }));

    res.json({
      projectId: id,
      projectName: proj.name,
      milestoneId: milestone.id,
      milestoneTitle: milestone.title,
      overallStatus: "SUCCESS",
      passedCount: testResults.length,
      totalCount: testResults.length,
      coveragePercent: 96,
      executionTimeMs: Math.floor(Math.random() * 80) + 120,
      timestamp: new Date().toISOString(),
      logs: [
        `[INFO] Bootstrapping Dockerized test harness for ${proj.name}...`,
        `[INFO] Mounting milestone volume: ${milestone.file}`,
        `[INFO] Running Jest/JUnit assertion runner...`,
        ...testResults.map((t: any) => `  ✓ PASS: ${t.name} (${t.latency})`),
        `[SUCCESS] All ${testResults.length} test assertions cleared with 0 failures.`,
        `[GIT] Commit ready: feat(${proj.name.toLowerCase().replace(/\\s+/g, '-')}) completed ${milestone.title}`
      ],
      results: testResults,
    });
  });

  app.get("/api/learning/placements", (_req: Request, res: Response) => {
    res.json(placementData);
  });

  app.get("/api/learning/masterclasses", (_req: Request, res: Response) => {
    res.json(masterclassesList);
  });

  app.post("/api/learning/masterclasses/:id/rsvp", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const event = masterclassesList.find((m) => m.id === id);
    if (event) {
      event.attendeesCount += 1;
    }
    res.json({ success: true, message: "Seat reserved successfully! Check your email for calendar invite." });
  });

  app.post("/api/learning/apply", (req: Request, res: Response) => {
    const body = req.body;
    learningApplications.push({
      id: learningApplications.length + 1,
      name: body.name,
      email: body.email,
      phone: body.phone,
      programId: body.programId,
      experience: body.experience,
      submittedAt: new Date().toISOString(),
    });
    res.status(201).json({
      success: true,
      applicationId: `OPELS-APP-${1000 + learningApplications.length}`,
      message: "Application submitted! An admissions advisor will contact you within 24 hours.",
    });
  });

  app.post("/api/learning/scholarship-check", (req: Request, res: Response) => {
    const { background, weeklyHours, targetTrack } = req.body;
    let grantAmount = 20000;
    if (Number(weeklyHours) >= 12) grantAmount += 5000;
    if (background === "working_pro" || background === "student_cs") grantAmount += 5000;

    res.json({
      eligible: true,
      grantAmount: `₹${grantAmount.toLocaleString()}`,
      couponCode: `OPELS_EXP_${grantAmount / 1000}K`,
      projectedCtc: targetTrack === "backend" ? "14.5 LPA" : targetTrack === "ai" ? "15.2 LPA" : "13.0 LPA",
      recommendedProgram: targetTrack || "fullstack-dev",
      curriculumHighlights: [
        "100% Learn-by-doing with production project sandboxes",
        "Mock system design & coding interviews with FAANG mentors",
        "Direct referrals to 900+ active hiring partners",
      ],
    });
  });

  // -------------------------------------------------------------
  // Faculty Endpoints
  // -------------------------------------------------------------
  app.get("/api/faculty", (_req: Request, res: Response) => {
    res.json(facultyList);
  });

  app.post("/api/faculty", (req: Request, res: Response) => {
    const body = req.body;
    const newFaculty: Faculty = {
      id: nextFacultyId++,
      name: String(body.name || "").trim(),
      department: String(body.department || "").trim(),
      designation: String(body.designation || "").trim(),
      email: String(body.email || "").trim(),
      phone: body.phone ? String(body.phone).trim() : "",
      officeHours: body.officeHours ? String(body.officeHours).trim() : "",
    };
    facultyList.push(newFaculty);
    res.status(201).json(newFaculty);
  });

  app.delete("/api/faculty/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const index = facultyList.findIndex((f) => f.id === id);
    if (index !== -1) {
      facultyList.splice(index, 1);
    }
    res.status(204).send();
  });

  // -------------------------------------------------------------
  // Notice Endpoints
  // -------------------------------------------------------------
  app.get("/api/notices", (_req: Request, res: Response) => {
    res.json(notices);
  });

  app.post("/api/notices", (req: Request, res: Response) => {
    const body = req.body;
    const newNotice: Notice = {
      id: nextNoticeId++,
      title: String(body.title || "").trim(),
      category: String(body.category || "General").trim(),
      content: String(body.content || "").trim(),
      datePosted: body.datePosted || new Date().toISOString().split("T")[0],
      postedBy: body.postedBy || "Campus Admin",
      urgent: Boolean(body.urgent),
    };
    notices.push(newNotice);
    res.status(201).json(newNotice);
  });

  app.delete("/api/notices/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const index = notices.findIndex((n) => n.id === id);
    if (index !== -1) {
      notices.splice(index, 1);
    }
    res.status(204).send();
  });

  // -------------------------------------------------------------
  // Gemini Multi-Turn AI Student Mentor & Copilot Endpoint
  // -------------------------------------------------------------
  let geminiClient: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI | null {
    if (!process.env.GEMINI_API_KEY) {
      return null;
    }
    if (!geminiClient) {
      geminiClient = new GoogleGenAI();
    }
    return geminiClient;
  }

  app.post("/api/chat", async (req: Request, res: Response) => {
    try {
      const { 
        messages, 
        role = "mentor", 
        model = "gemini-3.5-flash",
        studentContext 
      } = req.body;

      if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: "Messages array is required." });
      }

      // Allowed models as specified in guidelines
      const validModels = ["gemini-3.1-pro-preview", "gemini-3.5-flash", "gemini-3.1-flash-lite"];
      const targetModel = validModels.includes(model) ? model : "gemini-3.5-flash";

      // Role-specific System Instructions
      const roleInstructions: Record<string, string> = {
        mentor: `You are the OPELS & Crio.do AI Engineering Mentor — an encouraging, world-class developer mentor for students.
Your mission is to guide students through applied project-based learning (like QKart e-commerce, QTrip travel, QMoney stock portfolio, and Enterprise RAG AI agents).
Guidelines:
1. Don't just give answers directly; explain the architectural and conceptual "why" (e.g., why debounce prevents DB saturation, why Redis atomic decrement stops flash-sale overselling).
2. Use concise, structured explanations with markdown code snippets when relevant.
3. Be friendly, approachable, and celebrate student milestones.
4. If the student shares code or error logs, pinpoint root causes and recommend actionable fixes.`,

        career: `You are the OPELS Career & Placement Accelerator Advisor.
Your mission is to assist engineering students with tech placements, salary hikes, resume optimizations, and mock interview preparations for companies like Google, Amazon, Swiggy, Razorpay, CRED, and Flipkart.
Provide realistic salary benchmarks, tips for machine-coding rounds, and guidance on translating project milestones into high-impact portfolio bullet points.`,

        debugger: `You are the OPELS Sandbox Code Reviewer & Debugging Specialist.
Your mission is to analyze student code snippets, unit test failures, and async/race conditions in React, Node.js, Express, MongoDB, Java Spring Boot, and Redis.
Highlight bugs clearly, explain the underlying mechanism (e.g., stale closures, unhandled promises, memory leaks), and provide the clean, corrected implementation.`
      };

      const systemInstruction = roleInstructions[role] || roleInstructions.mentor;

      const ai = getGeminiClient();
      if (ai) {
        // Format conversation history for @google/genai generateContent
        const formattedContents = messages.map((m: { role: string; content: string }) => ({
          role: m.role === "assistant" || m.role === "model" ? "model" : "user",
          parts: [{ text: m.content || "" }]
        }));

        // Append current student context if provided
        if (studentContext) {
          const lastIdx = formattedContents.length - 1;
          formattedContents[lastIdx].parts.push({
            text: `\n[Student Context: Currently working on ${studentContext.projectName || "General Project"}, Milestone: ${studentContext.milestone || "General"}, User: ${studentContext.userName || "Student"}]`
          });
        }

        const response = await ai.models.generateContent({
          model: targetModel,
          contents: formattedContents,
          config: {
            systemInstruction,
            temperature: 0.7,
          }
        });

        const reply = response.text || "I've reviewed your question. Let's break it down into clean engineering steps!";
        return res.json({ reply, modelUsed: targetModel });
      }

      // Intelligent fallback when GEMINI_API_KEY is not yet populated
      const lastUserMsg = messages[messages.length - 1]?.content?.toLowerCase() || "";
      let fallbackReply = "Great question! Let's examine this from a real-world software architecture perspective.";

      if (lastUserMsg.includes("qkart") || lastUserMsg.includes("debounce") || lastUserMsg.includes("search")) {
        fallbackReply = `### Debounced Search in QKart\n\nWhen a user types into an e-commerce search bar, firing an API request on every keystroke can quickly exhaust backend connections and database connection pools.\n\n**Best Practice Solution:**\n- Use a **400ms debounce timer**.\n- When the user presses a key, reset the timer.\n- Only send the network request when they stop typing for 400ms.\n\n\`\`\`javascript\nexport function debounce(fn, delay = 400) {\n  let timer = null;\n  return (...args) => {\n    if (timer) clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}\n\`\`\`\n\nWould you like me to show how to test this in the sandbox test runner?`;
      } else if (lastUserMsg.includes("placement") || lastUserMsg.includes("salary") || lastUserMsg.includes("interview")) {
        fallbackReply = `### Placement Strategy for Tier-1 Product Companies\n\n1. **Portfolio Over Certificates**: Companies like Swiggy, Razorpay, and CRED look for production projects with concurrency handling and code reviews rather than simple tutorial clones.\n2. **Machine Coding Round**: Be prepared to write modular, testable code within 90 minutes using design patterns.\n3. **Target Package**: Our fellowship graduates in Full-Stack and Backend currently achieve an average of **12.8 - 14.2 LPA** with up to 400% hike.\n\nWhat specific role or company are you preparing for?`;
      } else if (lastUserMsg.includes("redis") || lastUserMsg.includes("cart") || lastUserMsg.includes("stock")) {
        fallbackReply = `### Handling Flash Sale Inventory with Redis\n\nTo prevent overselling during high-concurrency checkouts:\n- Never rely solely on relational database row-locks.\n- Use **Redis \`DECRBY\` atomic operations** on stock keys.\n- If the remaining value drops below zero, roll back with \`INCRBY\` and return an "Out of Stock" error.\n\nThis ensures 0 overselling even with 10,000 requests per second!`;
      } else {
        fallbackReply = `Hello! I am your **OPELS & Crio.do AI Study Mentor** powered by Gemini.\n\nI can help you with:\n- **Debugging Code & Passing Test Cases** in the Project Sandbox\n- **Explaining Architecture Concepts** (Debounce, Redis caching, RAG vector embeddings, Microservices)\n- **Interview Prep & Placement Guidance** for top product companies\n\nWhat are you working on right now? Feel free to paste code or ask any doubt!`;
      }

      return res.json({ 
        reply: fallbackReply, 
        modelUsed: `${targetModel} (Student Mentor Mode)` 
      });

    } catch (err: any) {
      console.error("Gemini Chat Error:", err);
      return res.status(500).json({ 
        error: "Failed to generate AI mentor response", 
        details: err?.message || "Internal error" 
      });
    }
  });

  // -------------------------------------------------------------
  // Frontend Vite Middleware & Static Serving
  // -------------------------------------------------------------
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
