// Centralized Datasets for Crio.do Applied Learning Platform
// Guarantees reliable offline fallback and high-speed data access

export const crioPrograms = [
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

export const crioProjects = [
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
        code: `export async function processDocument(rawText, metadata) {
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

export const placementData = {
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

export const masterclassesList = [
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
