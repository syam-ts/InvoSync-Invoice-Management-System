<h2>📄 InvoSync Frontend</h2>

<p>
  InvoSync is a modern invoice management system built for freelancers and small businesses. This repository contains the frontend built using React.js with Vite, allowing users to manage clients, create and update invoices, view profiles, and download styled PDFs.
</p>

<hr />

<h2>🔧 Tech Stack</h2>

<ul>
  <li>⚛️ React.js (with TypeScript)</li>
  <li>⚡ Vite (build tool)</li>
  <li>🧠 Redux Toolkit (state management)</li>
  <li>🌐 Axios (HTTP requests)</li>
  <li>🎨 Tailwind CSS v4 (styling)</li>
  <li>✅ Formik (form validation)</li>
  <li>🔔 Sonner (toast notifications)</li>
  <li>📄 html2canvas & html2pdf.js (PDF download)</li>
  <li>🐳 Docker (containerized deployment)</li>
  <li>🐳 Docker (containerized deployment)</li>
</ul>

<hr />

<h2>📁 Folder Structure</h2>

<pre>
/invosync-frontend
│
├── <b>public/</b>               # Static assets (logo, favicon)
├── <b>src/</b>
│   ├── <b>assets/</b>           # Icons and images
│   ├── <b>components/</b>       # Reusable components
│   ├── <b>Formik/</b>           # Form validation schemas
│   ├── <b>Route/</b>            # Protected route components
│   ├── <b>pages/</b>            # Page-level components (Dashboard, Clients, etc.)
│   ├── <b>redux/</b>            # Redux store and slices
│   ├── <b>services</b>          # Axios API services
│   ├── <b>style/</b>            # Tailwind & global styles
│   ├── <b>types/</b>            # TypeScript interfaces
│   ├── <b>utils/</b>            # Utility functions (PDF generation, etc.)
│   ├── <b>App.tsx</b>           # Main app component
│   ├── <b>main.tsx</b>          # Entry point
│   └── <b>vite-env.d.ts</b>
│
├── <b>.env</b>                  # Environment variables
├── <b>.gitignore</b>            # Git ignored files
├── <b>Dockerfile</b>            # Docker image configuration
├── <b>docker-compose.yml</b>    # Docker Compose setup (optional)
├── <b>.dockerignore</b>         # Files ignored by Docker
├── <b>index.html</b>            # HTML entry file
├── <b>vite.config.ts</b>        # Vite + Tailwind config
├── <b>eslint.config.js</b>      # ESLint rules
├── <b>tsconfig.json</b>         # Base TS config
├── <b>tsconfig.app.json</b>     # App-specific TS config
├── <b>tsconfig.node.json</b>    # Node-specific TS config
├── <b>package.json</b>          # Dependencies and scripts
├── <b>yarn.lock</b>             # Yarn lockfile
└── <b>README.md</b>             # Project documentation
</pre>

<hr />

<h2>🔑 Features</h2>

<ul>
  <li>👥 Client Management (Add, edit, delete, view)</li>
  <li>🧾 Invoice Management (Create, edit, mark paid, download as PDF)</li>
  <li>👤 User Profile View & Edit</li>
  <li>📄 Styled Invoice PDF Download</li>
  <li>🛡️ JWT Authentication & Protected Routes</li>
  <li>🔐 Persistent Auth with Redux + localStorage</li>
  <li>📱 Fully Responsive & Clean UI</li>
  <li>🐳 Docker-ready for Production Deployment</li>
</ul>

<hr />

<h2>🚀 Getting Started</h2>

<h3>📋 Prerequisites</h3>
<ul>
  <li>Node.js (v18+)</li>
  <li>Yarn</li>
  <li>Backend Server (e.g., Express + MongoDB)</li>
  <li>Docker (optional)</li>
</ul>

<h3>📥 1. Clone the Repository</h3>
<pre><code>git clone https://github.com/syam-ts/invosync.git
cd invosync
</code></pre>

<h3>📦 2. Install Dependencies</h3>
<pre><code>yarn install
</code></pre>

<h3>⚙️ 3. Create .env File</h3>
<pre><code>touch .env
</code></pre>
<p>Add the following variables:</p>
<pre><code>VITE_FRONTEND_URL=http://localhost:5173
VITE_BACKEND_URL=https://invosync-backend.yourdomain.com
</code></pre>

<h3>▶️ 4. Run the Development Server (without Docker)</h3>
<pre><code>yarn dev
</code></pre>
<p>Open in browser: <code>http://localhost:5173</code></p>

<hr />

<h2>🐳 Running with Docker</h2>

<h3>1. Build the Docker Image</h3>
<pre><code>docker build -t invosync .
</code></pre>

<h3>2. Run the Container</h3>
<pre><code>docker run -d -p 5173:80 invosync
</code></pre>
<p>Visit: <code>http://localhost:5173</code></p>


<p><strong>Note:</strong> Ensure the backend is reachable via <code>VITE_BACKEND_URL</code> when running in Docker.</p>
