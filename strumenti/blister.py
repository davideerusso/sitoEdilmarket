# Uso: python3 strumenti/blister.py foto.jpg site/img/shop/nome angolo
# Scontorna un prodotto fotografato su fondo bianco e crea la plastica del blister sagomata attorno.
# Produce nome-prodotto.webp, nome-bolla.webp e nome-anteprima.png (l anteprima non va pubblicata).
import sys, numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage as nd
src, out, ang = sys.argv[1], sys.argv[2], float(sys.argv[3])
im = Image.open(src).convert('RGB'); a = np.asarray(im).astype(int)
# sfondo: quasi bianco e collegato al bordo
light = (np.abs(a - 255).max(axis=2) < 22)
lab, n = nd.label(light)
edge = set(np.unique(np.r_[lab[0], lab[-1], lab[:,0], lab[:,-1]])) - {0}
bg = np.isin(lab, list(edge))
fg = nd.binary_fill_holes(~bg)
fg = nd.binary_opening(fg, iterations=1)
# il foro nel manico deve restare vuoto: lo riapro (zona chiara racchiusa e grande)
holes = light & ~bg
hl, hn = nd.label(holes)
for i in range(1, hn+1):
    m = hl == i
    if m.sum() > 30: fg &= ~m
alpha = nd.binary_erosion(fg, iterations=1).astype(np.uint8) * 255
alpha = np.asarray(Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(.8)))
rgba = np.dstack([a.astype(np.uint8), alpha])
pen = Image.fromarray(rgba, 'RGBA')
pad = 60
pen = pen.crop(pen.getbbox())
big = Image.new('RGBA', (pen.width + 2*pad, pen.height + 2*pad)); big.paste(pen, (pad, pad))
pen = big.rotate(ang, resample=Image.BICUBIC, expand=True)
m = np.asarray(pen)[:, :, 3] > 128
# plastica termoformata: contorno gonfiato e arrotondato attorno al pennello
d = nd.distance_transform_edt(~m)
shell = d < 20
shell = nd.binary_fill_holes(shell)
sb = np.asarray(Image.fromarray((shell*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(14))) > 128
din = nd.distance_transform_edt(sb)            # distanza dal bordo, dentro la bolla
H, W = sb.shape
yy, xx = np.mgrid[0:H, 0:W]
S = np.zeros((H, W, 4), float)
def add(mask_alpha, rgb):
    global S
    al = np.clip(mask_alpha, 0, 1)[..., None]
    S[..., :3] = S[..., :3] * (1 - al) + np.array(rgb) * al
    S[..., 3:] = S[..., 3:] + al * (1 - S[..., 3:])
inside = sb.astype(float)
add(inside * .10, (255, 255, 255))                                   # velo di plastica
add(inside * np.clip(1 - din / 14, 0, 1) ** 1.6 * .55, (176, 184, 196))  # spessore: più scuro verso il bordo
add(((din > 0) & (din < 1.8)) * .75, (118, 126, 138))                # filo esterno
# riflesso forte lungo il bordo in alto a sinistra, appena dentro
sh = nd.shift(sb.astype(float), (6, 6), order=0) > .5
rim = sb & ~sh & (din > 2) & (din < 9)
add(np.asarray(Image.fromarray((rim*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.5)))/255 * .95, (255, 255, 255))
# ombra interna in basso a destra
sh2 = nd.shift(sb.astype(float), (-7, -7), order=0) > .5
low = sb & ~sh2 & (din < 12)
add(np.asarray(Image.fromarray((low*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(3)))/255 * .35, (80, 88, 100))
# striscia lucida diagonale
t = (xx * .55 + yy) / (W * .55 + H)
for c, w, k in [(.30, .04, .6), (.37, .012, .55), (.68, .025, .35)]:
    add(inside * np.clip(1 - np.abs(t - c) / w, 0, 1) * k, (255, 255, 255))
shellimg = Image.fromarray(np.clip(S * [1, 1, 1, 255], 0, 255).astype(np.uint8), 'RGBA')
box = shellimg.getbbox()
pen.crop(box).save(out + '-prodotto.webp', quality=88, method=6)
shellimg.crop(box).save(out + '-bolla.webp', quality=90, method=6)
# anteprima su cartoncino
prev = Image.new('RGBA', (box[2]-box[0]+40, box[3]-box[1]+40), (232, 234, 238, 255))
prev.alpha_composite(pen.crop(box), (20, 20)); prev.alpha_composite(shellimg.crop(box), (20, 20))
prev.save(out + '-anteprima.png'); print(box[2]-box[0], box[3]-box[1])
