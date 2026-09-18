#!/usr/bin/env python3
"""Generate editorial-style placeholder JPGs for fragrance notes (no text)."""

from pathlib import Path
from PIL import Image, ImageDraw
import math

OUT = Path(__file__).resolve().parents[1] / "public" / "assets" / "notes"
SIZE = 480

# Soft luxury palettes keyed by note category / id hints
PALETTES = {
    "sweet": ((245, 230, 210), (180, 120, 70), (90, 55, 30)),
    "woody": ((232, 220, 200), (140, 110, 80), (70, 50, 35)),
    "floral": ((245, 235, 240), (200, 140, 160), (120, 60, 90)),
    "citrus": ((250, 245, 220), (220, 180, 60), (160, 110, 30)),
    "spicy": ((245, 228, 210), (180, 80, 50), (90, 40, 30)),
    "fresh": ((230, 240, 235), (120, 170, 150), (50, 90, 80)),
    "gourmand": ((240, 225, 210), (150, 95, 55), (70, 40, 25)),
    "amber": ((245, 230, 200), (200, 150, 80), (120, 80, 40)),
    "musky": ((235, 230, 228), (170, 160, 155), (90, 80, 75)),
    "green": ((230, 240, 225), (110, 150, 90), (50, 80, 45)),
    "default": ((240, 232, 220), (160, 130, 100), (80, 60, 45)),
}

NOTE_STYLE = {
    "vanilla": ("sweet", "pods"),
    "coffee": ("gourmand", "beans"),
    "pear": ("fresh", "fruit"),
    "pink-pepper": ("spicy", "berries"),
    "orange-blossom": ("floral", "blossom"),
    "jasmine": ("floral", "blossom"),
    "egyptian-jasmine": ("floral", "blossom"),
    "bitter-almond": ("gourmand", "nuts"),
    "licorice": ("sweet", "sticks"),
    "cashmere-wood": ("woody", "wood"),
    "cedar": ("woody", "wood"),
    "cedarwood": ("woody", "wood"),
    "patchouli": ("woody", "leaves"),
    "rose": ("floral", "rose"),
    "sandalwood": ("woody", "wood"),
    "oud": ("woody", "wood"),
    "bergamot": ("citrus", "citrus"),
    "lemon": ("citrus", "citrus"),
    "orange": ("citrus", "citrus"),
    "mandarin": ("citrus", "citrus"),
    "citron": ("citrus", "citrus"),
    "lavender": ("floral", "spikes"),
    "iris": ("floral", "iris"),
    "tuberose": ("floral", "blossom"),
    "ylang-ylang": ("floral", "blossom"),
    "violet": ("floral", "blossom"),
    "geranium": ("floral", "leaves"),
    "musk": ("musky", "soft"),
    "amber": ("amber", "resin"),
    "ambergris": ("amber", "resin"),
    "amberwood": ("woody", "wood"),
    "benzoin": ("amber", "resin"),
    "labdanum": ("amber", "resin"),
    "tonka-bean": ("gourmand", "beans"),
    "coconut": ("gourmand", "round"),
    "cinnamon": ("spicy", "sticks"),
    "cardamom": ("spicy", "pods"),
    "ginger": ("spicy", "root"),
    "black-pepper": ("spicy", "berries"),
    "pepper": ("spicy", "berries"),
    "nutmeg": ("spicy", "round"),
    "saffron": ("spicy", "threads"),
    "leather": ("woody", "soft"),
    "tobacco": ("woody", "leaves"),
    "vetiver": ("green", "grass"),
    "oakmoss": ("green", "moss"),
    "fig": ("green", "fruit"),
    "fig-leaf": ("green", "leaves"),
    "tea": ("green", "leaves"),
    "pine-needles": ("green", "needles"),
    "birch": ("woody", "wood"),
    "guaiac-wood": ("woody", "wood"),
    "rosewood": ("woody", "wood"),
    "papyrus": ("woody", "leaves"),
    "fir-resin": ("green", "resin"),
    "incense": ("amber", "smoke"),
    "blackcurrant": ("fresh", "berries"),
    "pineapple": ("fresh", "fruit"),
    "quince": ("fresh", "fruit"),
    "green-notes": ("green", "leaves"),
    "woody-notes": ("woody", "wood"),
    "ambrette": ("musky", "seeds"),
    "ambroxan": ("musky", "soft"),
    "cashmeran": ("woody", "soft"),
    "hedione": ("floral", "soft"),
    "iso-e-super": ("woody", "soft"),
}


def palette_for(note_id, category):
    style = NOTE_STYLE.get(note_id)
    if style:
        return PALETTES.get(style[0], PALETTES["default"]), style[1]
    key = category if category in PALETTES else "default"
    return PALETTES[key], "soft"


def draw_bg(draw, bg, accent):
    for y in range(SIZE):
        t = y / SIZE
        r = int(bg[0] * (1 - t) + accent[0] * t * 0.35)
        g = int(bg[1] * (1 - t) + accent[1] * t * 0.35)
        b = int(bg[2] * (1 - t) + accent[2] * t * 0.35)
        draw.line([(0, y), (SIZE, y)], fill=(r, g, b))


def oval(draw, cx, cy, rx, ry, fill, outline=None, width=1):
    draw.ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=fill, outline=outline, width=width)


def draw_motif(draw, motif, mid, deep):
    cx = cy = SIZE // 2
    if motif == "pods":
        for i, dx in enumerate((-70, 0, 70)):
            oval(draw, cx + dx, cy, 28, 110, mid, deep, 2)
            oval(draw, cx + dx, cy - 40, 10, 18, deep)
            oval(draw, cx + dx, cy + 10, 10, 18, deep)
            oval(draw, cx + dx, cy + 55, 10, 18, deep)
    elif motif == "beans":
        for i, (dx, dy) in enumerate([(-55, -30), (55, -30), (-30, 50), (40, 45), (0, 0)]):
            oval(draw, cx + dx, cy + dy, 42, 28, mid, deep, 2)
            draw.arc([cx + dx - 20, cy + dy - 12, cx + dx + 20, cy + dy + 12], 200, 340, fill=deep, width=2)
    elif motif == "fruit":
        oval(draw, cx, cy + 10, 90, 100, mid, deep, 2)
        oval(draw, cx - 20, cy - 20, 25, 35, (255, 255, 255, 40) if False else tuple(min(255, c + 40) for c in mid))
        draw.polygon([(cx, cy - 110), (cx - 18, cy - 70), (cx + 18, cy - 70)], fill=deep)
        oval(draw, cx + 30, cy - 100, 35, 18, mid)
    elif motif == "berries":
        for angle in range(0, 360, 60):
            rad = math.radians(angle)
            oval(draw, cx + int(math.cos(rad) * 70), cy + int(math.sin(rad) * 70), 32, 32, mid, deep, 2)
        oval(draw, cx, cy, 28, 28, deep)
    elif motif == "blossom":
        for angle in range(0, 360, 45):
            rad = math.radians(angle)
            oval(draw, cx + int(math.cos(rad) * 55), cy + int(math.sin(rad) * 55), 38, 55, mid, deep, 1)
        oval(draw, cx, cy, 36, 36, deep)
    elif motif == "rose":
        for r in (100, 75, 50, 28):
            oval(draw, cx, cy, r, int(r * 0.9), mid if r > 40 else deep, deep, 2)
        for angle in range(0, 360, 40):
            rad = math.radians(angle)
            oval(draw, cx + int(math.cos(rad) * 55), cy + int(math.sin(rad) * 55), 28, 40, mid)
    elif motif == "leaves":
        for i, (dx, rot) in enumerate([(-40, -25), (10, 10), (50, 35)]):
            pts = [
                (cx + dx, cy - 100),
                (cx + dx - 45, cy),
                (cx + dx, cy + 100),
                (cx + dx + 45, cy),
            ]
            draw.polygon(pts, fill=mid, outline=deep)
            draw.line([(cx + dx, cy - 90), (cx + dx, cy + 90)], fill=deep, width=2)
    elif motif == "wood":
        for i, dx in enumerate((-90, -30, 30, 90)):
            draw.rounded_rectangle([cx + dx - 28, cy - 120, cx + dx + 28, cy + 120], radius=8, fill=mid, outline=deep)
            for y in range(cy - 90, cy + 100, 35):
                draw.arc([cx + dx - 20, y - 8, cx + dx + 20, y + 8], 0, 180, fill=deep, width=2)
    elif motif == "citrus":
        oval(draw, cx, cy, 110, 110, mid, deep, 3)
        for angle in range(0, 360, 30):
            rad = math.radians(angle)
            draw.line(
                [cx, cy, cx + int(math.cos(rad) * 100), cy + int(math.sin(rad) * 100)],
                fill=deep,
                width=1,
            )
        oval(draw, cx, cy, 18, 18, deep)
    elif motif == "sticks":
        for i, dx in enumerate((-60, -20, 20, 60)):
            draw.rounded_rectangle([cx + dx - 14, cy - 130, cx + dx + 14, cy + 130], radius=6, fill=mid, outline=deep)
    elif motif == "nuts":
        for dx, dy in [(-50, -20), (50, -20), (0, 50)]:
            oval(draw, cx + dx, cy + dy, 55, 45, mid, deep, 2)
            oval(draw, cx + dx - 10, cy + dy - 8, 12, 10, deep)
    elif motif == "resin":
        pts = [(cx, cy - 100), (cx + 90, cy - 20), (cx + 70, cy + 90), (cx - 70, cy + 90), (cx - 90, cy - 20)]
        draw.polygon(pts, fill=mid, outline=deep)
        oval(draw, cx + 10, cy - 10, 20, 30, tuple(min(255, c + 50) for c in mid))
    elif motif == "smoke":
        for i, dx in enumerate((-40, 0, 40)):
            for j in range(5):
                oval(draw, cx + dx + (j % 2) * 8, cy + 80 - j * 40, 28 - j * 2, 18, mid)
    elif motif == "spikes":
        for dx in range(-90, 100, 30):
            draw.polygon([(cx + dx, cy - 120), (cx + dx - 12, cy + 40), (cx + dx + 12, cy + 40)], fill=mid, outline=deep)
            oval(draw, cx + dx, cy - 100, 10, 18, deep)
    elif motif == "iris":
        for angle in (-40, 0, 40):
            rad = math.radians(angle - 90)
            oval(draw, cx + int(math.cos(rad) * 20), cy + int(math.sin(rad) * 20) - 20, 35, 80, mid, deep, 1)
        oval(draw, cx, cy + 10, 25, 25, deep)
    elif motif == "grass":
        for dx in range(-100, 110, 18):
            draw.line([(cx + dx, cy + 100), (cx + dx + (dx % 20) - 10, cy - 110)], fill=mid, width=4)
    elif motif == "moss":
        for _i, (dx, dy, r) in enumerate([(-60, -40, 50), (40, -50, 55), (-20, 40, 60), (70, 30, 45), (0, 0, 40)]):
            oval(draw, cx + dx, cy + dy, r, int(r * 0.7), mid, deep, 1)
    elif motif == "needles":
        for angle in range(-70, 80, 12):
            rad = math.radians(angle - 90)
            draw.line(
                [cx, cy + 40, cx + int(math.cos(rad) * 140), cy + 40 + int(math.sin(rad) * 140)],
                fill=mid,
                width=3,
            )
    elif motif == "threads":
        for i in range(12):
            x = cx - 80 + i * 14
            draw.arc([x, cy - 80, x + 40, cy + 80], 200, 340, fill=mid, width=3)
    elif motif == "seeds":
        for dx, dy in [(-40, -30), (40, -30), (-50, 40), (50, 40), (0, 10)]:
            oval(draw, cx + dx, cy + dy, 28, 40, mid, deep, 2)
    elif motif == "root":
        draw.polygon([(cx - 30, cy - 100), (cx + 30, cy - 100), (cx + 50, cy + 100), (cx - 50, cy + 100)], fill=mid, outline=deep)
        for dy in (-40, 0, 40):
            draw.line([(cx - 20, cy + dy), (cx + 20, cy + dy)], fill=deep, width=2)
    elif motif == "round":
        oval(draw, cx, cy, 100, 100, mid, deep, 3)
        oval(draw, cx - 25, cy - 25, 20, 28, tuple(min(255, c + 35) for c in mid))
    else:  # soft
        oval(draw, cx, cy, 100, 100, mid, deep, 2)
        oval(draw, cx - 20, cy - 25, 40, 50, tuple(min(255, c + 30) for c in mid))


def make_note_image(note_id, category):
    (bg, mid, deep), motif = palette_for(note_id, category)
    img = Image.new("RGB", (SIZE, SIZE), bg)
    draw = ImageDraw.Draw(img)
    draw_bg(draw, bg, mid)
    # soft vignette ring
    oval(draw, SIZE // 2, SIZE // 2, 200, 200, None, (*mid, ), 1)
    draw_motif(draw, motif, mid, deep)
    return img


def main():
    import json

    notes_path = Path(__file__).resolve().parents[1] / "src" / "data" / "notes.json"
    notes = json.loads(notes_path.read_text(encoding="utf-8"))
    OUT.mkdir(parents=True, exist_ok=True)

    for note in notes:
        note_id = note["id"]
        filename = note.get("image") or f"{note_id}.jpg"
        path = OUT / filename
        img = make_note_image(note_id, note.get("category") or "default")
        img.save(path, "JPEG", quality=88, optimize=True)
        print(f"wrote {path.name}")

    print(f"Done: {len(notes)} note images → {OUT}")


if __name__ == "__main__":
    main()
