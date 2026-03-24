# Way Maker – Upload to Shared Hosting

## 1. File name

- Your main page **must** be named exactly: **index.html** (already done).

---

## 2. Folder structure (what to upload)

Use this structure on your host. All external resources (Tailwind, Fonts, Font Awesome, Unsplash images) use absolute URLs and need no upload.

```
your-site-root/
├── index.html          ← main page (required)
└── assets/             ← optional: only if you use local images
    └── (your images, e.g. hero.jpg, gallery-1.jpg)
```

---

## 3. Exact files to upload (minimum)

For the site to work **as-is** (all images via URLs), upload only:

| File / folder      | Required | Notes |
|--------------------|----------|--------|
| **index.html**     | Yes      | In the **root** of your web folder (e.g. `public_html` or `www`). |
| **thanks.html**    | Yes*     | *Required* if you use the FormSubmit thank-you redirect (`_next`). Upload next to `index.html`. |
| **assets/**        | No       | Only if you switch any image `src` in index.html to local files (e.g. `assets/hero.jpg`). Can be empty or contain README.txt. |

So the **minimum upload** is: **index.html** in the root.  
If you use local images later, also upload the **assets** folder and the image files inside it.

---

## 4. How to zip for hosting upload

### Windows (File Explorer)

1. Open the folder: `Way-Maker` (the one that contains `index.html`).
2. Select:
   - **index.html** (the file)
   - **assets** (the folder)
3. Right‑click → **Send to** → **Compressed (zipped) folder**.
4. Name the zip e.g. **way-maker-site.zip**.

**Important:** The zip must be structured so that when the host extracts it, **index.html** is in the root of the extracted folder (or in `public_html` / `www`). So zip the **contents** of Way-Maker, not the parent folder:

- **Correct:** Open `Way-Maker` → select `index.html` + `assets` → zip. Result: zip contains `index.html` and `assets/`.
- **Wrong:** Zipping the `Way-Maker` folder itself gives `Way-Maker/index.html` inside the zip; many hosts expect `index.html` at the top level.

### Windows (PowerShell)

From the folder that **contains** the `Way-Maker` folder (e.g. `Documents`):

```powershell
Compress-Archive -Path "Way-Maker\index.html", "Way-Maker\assets" -DestinationPath "way-maker-site.zip"
```

This creates **way-maker-site.zip** with `index.html` and `assets` at the top level.

---

## 5. Upload to your host

1. Log in to your shared hosting control panel (cPanel, Plesk, or similar).
2. Open **File Manager** and go to the web root (**public_html**, **www**, or whatever your host uses).
3. Upload **way-maker-site.zip**.
4. **Extract** the zip in that folder so **index.html** sits in the root (e.g. `public_html/index.html`).
5. Optional: delete the zip after extraction.
6. Visit your domain (e.g. `https://yourdomain.com`) – the site should load.

---

## 6. If you use local images later

1. Put image files in the **assets** folder (e.g. `assets/hero.jpg`, `assets/gallery-1.jpg`).
2. In **index.html**, change the image `src` from the full URL to the relative path, e.g.:
   - From: `https://images.unsplash.com/photo-xxx...`
   - To: `assets/hero.jpg`
3. Upload the updated **index.html** and the **assets** folder (with the new images) to the same web root, keeping the same structure.

---

## 7. Contact form redirect (`thanks.html`) & GitHub Pages

The contact form uses **FormSubmit** with a hidden field **`_next`** so users land on a thank-you page after sending (instead of FormSubmit’s default page).

- **GitHub Pages** (repo `bondback-io/waymaker`): enable **Settings → Pages** → deploy from branch **`main`**, folder **`/` (root)**. The thank-you URL is:
  - `https://bondback-io.github.io/waymaker/thanks.html`
- Upload **`thanks.html`** next to **`index.html`** whenever you deploy.
- **Custom domain** (`waymakerrubbishsolutions.com.au`): after DNS points to your host and the site loads, edit **`index.html`** and set `_next` to:
  - `https://waymakerrubbishsolutions.com.au/thanks.html`  
  (Using the domain before DNS is ready causes “site can’t be reached” after submit.)

---

## 8. Checklist before go-live

- [ ] **index.html** is in the document root (e.g. `public_html/index.html`).
- [ ] **thanks.html** is uploaded next to **index.html** if you use FormSubmit with `_next`.
- [ ] Zip was created so that **index.html** is at the top level inside the zip (not inside an extra folder).
- [ ] If you use local images, **assets** and the image files are uploaded.
- [ ] Test the site: open your domain and check nav, forms, and images (or image URLs).
- [ ] If using **GitHub Pages**, confirm Pages is enabled and the `_next` URL in **index.html** matches your live site (GitHub URL or custom domain).
