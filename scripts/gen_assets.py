#!/usr/bin/env python3
"""Generate tasteful 9:16 posters + short muted preview videos for the AI Content Engine.
No external network needed. Uses Pillow + numpy + ffmpeg (all preinstalled).
"""
import os, subprocess, math, random
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

ROOT = "/data/ai-content-engine/public"
POSTERS = os.path.join(ROOT, "posters")
PREV = os.path.join(ROOT, "previews")
os.makedirs(POSTERS, exist_ok=True)
os.makedirs(PREV, exist_ok=True)

W, H = 720, 1280
INK = (10, 10, 11)
OFFWHITE = (242, 239, 230)

# project-specific palettes (deep, cinematic, not neon)
PROJECTS = [
    {"slug": "food",     "n": "01", "cat": "TikTok Affiliate", "title": "ẨM THỰC",   "handle": "@taphoa.baoanngon", "a": (240, 176, 102), "b": (28, 16, 10)},
    {"slug": "fashion",  "n": "02", "cat": "TikTok Affiliate", "title": "THỜI TRANG", "handle": "@nome.nome2026",   "a": (232, 120, 170), "b": (24, 12, 20)},
    {"slug": "home",     "n": "03", "cat": "TikTok Affiliate", "title": "GIA DỤNG",  "handle": "@nome_nome26",    "a": (110, 214, 196), "b": (10, 22, 22)},
    {"slug": "workflow", "n": "04", "cat": "Production System", "title": "THE ENGINE", "handle": "AI content pipeline", "a": (198, 242, 78), "b": (16, 20, 8)},
]

def font(size, bold=True):
    candidates = [
        "/usr/share/fonts/liberation/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/liberation/LiberationSans-Regular.ttf",
        "/usr/share/fonts/liberation-fonts/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/liberation-fonts/LiberationSans-Regular.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
        "/usr/share/fonts/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/dejavu-sans-fonts/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/dejavu-sans-fonts/DejaVuSans.ttf",
    ]
    for c in candidates:
        if os.path.exists(c):
            return ImageFont.truetype(c, size)
    return ImageFont.load_default()

def radial_bg(a, b):
    # vertical-ish radial gradient from accent-tinted center to deep ink
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    cx, cy = W * 0.5, H * 0.34
    d = np.sqrt(((xx - cx) / (W * 0.85))**2 + ((yy - cy) / (H * 0.7))**2)
    d = np.clip(d, 0, 1)
    # mix between a darkened accent and ink
    a_dark = np.array([a[0]*0.32, a[1]*0.32, a[2]*0.32])
    ink = np.array(b)
    img = np.zeros((H, W, 3), np.float32)
    for i in range(3):
        img[..., i] = a_dark[i] * (1 - d) + ink[i] * d
    # base ink floor
    img = np.maximum(img, np.array(INK))
    # grain
    noise = (np.random.rand(H, W, 1) - 0.5) * 14
    img = np.clip(img + noise, 0, 255).astype(np.uint8)
    return Image.fromarray(img, "RGB")

def rounded(draw, box, r, **kw):
    draw.rounded_rectangle(box, radius=r, **kw)

def make_poster(p):
    img = radial_bg(p["a"], p["b"]).convert("RGBA")
    d = ImageDraw.Draw(img)
    accent = p["a"]

    # subtle 9:16 framing ticks (left & right safe margins) -> feels like content framing
    m = 54
    for y in range(120, H - 120, 64):
        d.line([(m, y), (m, y + 28)], fill=(255, 255, 255, 26), width=2)
        d.line([(W - m, y), (W - m, y + 28)], fill=(255, 255, 255, 26), width=2)

    # top bar: category tag + number
    d.text((m, 70), p["cat"].upper(), font=font(22), fill=(accent[0], accent[1], accent[2], 255))
    big = font(40)
    d.text((W - m - d.textlength(p["n"], font=big), 64), p["n"], font=big, fill=(255, 255, 255, 160))

    # accent rule
    d.line([(m, 112), (m + 64, 112)], fill=(accent[0], accent[1], accent[2], 255), width=3)

    # center title (editorial, large)
    tf = font(78)
    title = p["title"]
    # shrink to fit
    while d.textlength(title, font=tf) > W - 2 * m and tf.size > 30:
        tf = font(tf.size - 4)
    d.text((m, H * 0.5 - 60), title, font=tf, fill=OFFWHITE + (255,))
    d.text((m, H * 0.5 + 34), p["handle"], font=font(30, bold=False), fill=(accent[0], accent[1], accent[2], 235))

    # bottom: AI-produced tag + faux waveform
    by = H - 150
    d.text((m, by), "AI-PRODUCED SHORT-FORM", font=font(20), fill=(255, 255, 255, 150))
    random.seed(hash(p["slug"]) & 0xffff)
    wx = m
    while wx < W - m:
        bh = random.randint(6, 46)
        d.rounded_rectangle([wx, by + 54 + (46 - bh) // 2, wx + 5, by + 54 + (46 - bh) // 2 + bh], radius=2,
                            fill=(accent[0], accent[1], accent[2], 210))
        wx += 11

    # play glyph in a ring (center-top)
    cx, cy, rr = W * 0.5, H * 0.30, 46
    d.ellipse([cx - rr, cy - rr, cx + rr, cy + rr], outline=(255, 255, 255, 200), width=3)
    d.polygon([(cx - 12, cy - 18), (cx - 12, cy + 18), (cx + 22, cy)], fill=(255, 255, 255, 230))

    # vignette
    vig = Image.new("L", (W, H), 0)
    vd = ImageDraw.Draw(vig)
    vd.ellipse([-W*0.3, -H*0.2, W*1.3, H*1.1], fill=255)
    vig = vig.filter(ImageFilter.GaussianBlur(160))
    dark = Image.new("RGBA", (W, H), (0, 0, 0, 255))
    img = Image.composite(img, Image.alpha_composite(img, dark), vig)

    out = os.path.join(POSTERS, f"{p['slug']}.jpg")
    img.convert("RGB").save(out, "JPEG", quality=82, optimize=True)
    print("poster", out, os.path.getsize(out) // 1024, "KB")
    return out

def make_preview(p, poster_path):
    """Short muted looping preview via subtle zoom/pan (Ken Burns) from the poster."""
    out = os.path.join(PREV, f"{p['slug']}.mp4")
    # 4s, 540x960, slow zoom in, low bitrate, no audio
    vf = (
        "scale=1080:1920,"
        "zoompan=z='min(zoom+0.0006,1.10)':d=120:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=540x960:fps=30,"
        "format=yuv420p"
    )
    cmd = [
        "ffmpeg", "-y", "-loop", "1", "-i", poster_path, "-t", "4",
        "-vf", vf, "-an", "-c:v", "libx264", "-preset", "veryfast",
        "-crf", "30", "-movflags", "+faststart", "-pix_fmt", "yuv420p", out,
    ]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print("ffmpeg ERR", p["slug"], r.stderr[-400:])
    else:
        print("preview", out, os.path.getsize(out) // 1024, "KB")
    return out

def make_mark():
    # simple LMN monogram favicon/svg
    svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0a0a0b"/><text x="32" y="42" font-family="Arial,Helvetica,sans-serif" font-size="24" font-weight="700" fill="#C6F24E" text-anchor="middle">LMN</text></svg>'''
    with open(os.path.join(ROOT, "lmn-mark.svg"), "w") as f:
        f.write(svg)
    print("mark written")

if __name__ == "__main__":
    make_mark()
    for p in PROJECTS:
        pp = make_poster(p)
        make_preview(p, pp)
    print("DONE")
