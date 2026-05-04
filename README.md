# Sanyam Engineering – Website

Premium dark-mode marketing website for Sanyam Engineering (CNC Precision Machining, Surat).

---

## 📁 Project Structure

```
sanyam-engineering/
├── backend/
│   ├── server.py          ← FastAPI backend (API + Admin auth)
│   ├── requirements.txt   ← Python dependencies
│   ├── .env               ← Environment variables (edit this!)
│   └── start.sh           ← Quick start script
│
└── frontend/
    ├── public/
    │   ├── index.html
    │   └── assets/
    │       └── sanyam-engineering-brochure.pdf   ← DROP YOUR PDF HERE
    ├── src/
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   ├── index.css
    │   └── pages/
    │       ├── Landing.jsx   ← Main website
    │       └── Admin.jsx     ← Admin dashboard
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    └── .env               ← Frontend env (set REACT_APP_BACKEND_URL)
```

---

## ⚙️ Prerequisites

- **Python 3.10+**
- **Node.js 18+** and **npm** (or yarn)
- **MongoDB** (local or cloud — see below)

---

## 🗄️ MongoDB Setup

### Option A – Local MongoDB (Easiest for Development)

1. **Install MongoDB Community Edition:**
   - macOS: `brew tap mongodb/brew && brew install mongodb-community`
   - Ubuntu: https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/
   - Windows: https://www.mongodb.com/try/download/community

2. **Start MongoDB:**
   ```bash
   # macOS
   brew services start mongodb-community
   
   # Ubuntu/Linux
   sudo systemctl start mongod
   sudo systemctl enable mongod  # auto-start on boot
   
   # Windows
   # Start "MongoDB" from Services, or run:
   net start MongoDB
   ```

3. **Verify it's running:**
   ```bash
   mongosh
   # You should see a MongoDB shell prompt
   ```

4. **Keep the default `.env` settings** in `backend/.env`:
   ```
   MONGO_URL="mongodb://localhost:27017"
   DB_NAME="sanyam_engineering"
   ```
   MongoDB will auto-create the database and collection when the first quote is submitted.

---

### Option B – MongoDB Atlas (Free Cloud, Recommended for Production)

1. Go to https://www.mongodb.com/atlas and create a free account.
2. Create a **free M0 cluster**.
3. Under **Database Access**, create a user with read/write permissions.
4. Under **Network Access**, add `0.0.0.0/0` (allow all) or your server IP.
5. Click **Connect → Drivers → Python** and copy the connection string.
   It looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/`
6. Update `backend/.env`:
   ```
   MONGO_URL="mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority"
   DB_NAME="sanyam_engineering"
   ```

---

## 🚀 Running the Backend

```bash
# 1. Navigate to backend folder
cd sanyam-engineering/backend

# 2. Create a virtual environment (recommended)
python3 -m venv venv
source venv/bin/activate        # macOS/Linux
# venv\Scripts\activate         # Windows

# 3. Install dependencies
pip install -r requirements.txt

# 4. Edit .env (set your MongoDB URL, admin email/password, JWT secret)
nano .env   # or open in any text editor

# 5. Start the server
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

The API will be live at: **http://localhost:8001**
- Test it: http://localhost:8001/api/
- API docs: http://localhost:8001/docs

---

## 🌐 Running the Frontend

```bash
# 1. Navigate to frontend folder
cd sanyam-engineering/frontend

# 2. Edit .env — set backend URL
# For local dev, leave as:
#   REACT_APP_BACKEND_URL=http://localhost:8001
# For production, change to your live backend URL.

# 3. Install dependencies
npm install

# 4. Start development server
npm start
```

Frontend runs at: **http://localhost:3000**

---

## 🔐 Admin Credentials

Default credentials (change in `backend/.env`):

| Field    | Value                          |
|----------|-------------------------------|
| URL      | http://localhost:3000/admin    |
| Email    | admin@sanyamengineering.com    |
| Password | SanyamAdmin@2026               |

**Important:** Change `ADMIN_PASSWORD` and `JWT_SECRET` in `backend/.env` before going live.

---

## 📄 Adding the Company Brochure PDF

Place your PDF file at:
```
frontend/public/assets/sanyam-engineering-brochure.pdf
```
The "Download Brochure" button on the homepage will automatically serve it.

---

## 🏭 Production Deployment

### Backend (on a VPS or server)

```bash
# Install gunicorn
pip install gunicorn

# Run with gunicorn (production)
gunicorn server:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8001

# Or use systemd / supervisor / PM2 to keep it running
```

### Frontend (Build for Production)

```bash
cd frontend

# Set your production backend URL in .env first
echo "REACT_APP_BACKEND_URL=https://api.yourdomain.com" > .env

npm run build
# Outputs to frontend/build/
# Serve with Nginx, Apache, or upload to Vercel/Netlify
```

### CORS

In `backend/.env`, set:
```
CORS_ORIGINS="https://yourdomain.com,https://www.yourdomain.com"
```

---

## 🔒 Security Checklist Before Going Live

- [ ] Change `ADMIN_PASSWORD` to a strong password
- [ ] Change `JWT_SECRET` to a random 32+ character string
- [ ] Set `CORS_ORIGINS` to your actual domain (not `*`)
- [ ] Use MongoDB Atlas or secure your local MongoDB with auth
- [ ] Serve backend over HTTPS (use Nginx + Let's Encrypt)
- [ ] Set `REACT_APP_BACKEND_URL` to your production HTTPS URL

---

## 📞 Support

Built for Sanyam Engineering, Surat.
Contact: sidhant@sanyamengineering.com | +91 84608 12572
