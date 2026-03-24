# Preview Way Maker website on localhost:3001

## Quick start (recommended)

1. **Open a terminal** in the `Way-Maker` folder:
   - In File Explorer: go to `Way-Maker`, type `powershell` in the address bar and press Enter, or  
   - In VS Code/Cursor: open the `Way-Maker` folder, then **Terminal → New Terminal**.

2. **Start the server** using one of the options below.

3. **Open in your browser:**  
   **http://localhost:3001**

---

## Option A – Using the script (easiest)

In PowerShell, from the `Way-Maker` folder:

```powershell
.\start-preview.ps1
```

If you get “script execution disabled”, run once:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then run `.\start-preview.ps1` again.

---

## Option B – Node.js (npx serve)

If you have [Node.js](https://nodejs.org) installed:

```powershell
cd "c:\Users\redfoxxx\Documents\Way-Maker"
npx --yes serve -l 3001
```

Then open **http://localhost:3001** in your browser.

---

## Option C – Python

If you have [Python](https://www.python.org/downloads/) installed:

```powershell
cd "c:\Users\redfoxxx\Documents\Way-Maker"
python -m http.server 3001
```

Then open **http://localhost:3001** in your browser.

---

## Stop the server

In the terminal where the server is running, press **Ctrl+C**.

---

## Troubleshooting

| Issue | What to do |
|--------|------------|
| Port 3001 already in use | Close the app using 3001, or use another port (e.g. `serve -l 3002` or `python -m http.server 3002`) and open `http://localhost:3002`. |
| “Python/node not found” | Install [Node.js](https://nodejs.org) or [Python](https://www.python.org/downloads/) and ensure it’s added to your PATH. |
| Page doesn’t load | Make sure you’re in the `Way-Maker` folder (where `index.html` is) when you start the server. |
