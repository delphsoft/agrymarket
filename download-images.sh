#!/bin/bash
# Corré este script UNA VEZ desde la raíz del proyecto:
#   bash download-images.sh
#
# Descarga todas las imágenes necesarias para AGRIMARKET a /public/img/

set -e
mkdir -p public/img

echo "📥 Descargando imágenes de productos..."

# Maíz amarillo
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/YellowCorn.jpg/640px-YellowCorn.jpg" \
  -o public/img/corn.jpg --silent --show-error && echo "  ✓ corn.jpg"

# Soja
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Soja_bg_002.jpg/640px-Soja_bg_002.jpg" \
  -o public/img/soy.jpg --silent --show-error && echo "  ✓ soy.jpg"

# Trigo
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Wheat_harvest.jpg/640px-Wheat_harvest.jpg" \
  -o public/img/wheat.jpg --silent --show-error && echo "  ✓ wheat.jpg"

# Girasol
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Sunflower_sky_backdrop.jpg/640px-Sunflower_sky_backdrop.jpg" \
  -o public/img/sunflower.jpg --silent --show-error && echo "  ✓ sunflower.jpg"

# Cebada
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Barley_au_naturel.jpg/640px-Barley_au_naturel.jpg" \
  -o public/img/barley.jpg --silent --show-error && echo "  ✓ barley.jpg"

# Sorgo
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Sorghum_Mature.jpg/640px-Sorghum_Mature.jpg" \
  -o public/img/sorghum.jpg --silent --show-error && echo "  ✓ sorghum.jpg"

# Arroz
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/White_rice.jpg/640px-White_rice.jpg" \
  -o public/img/rice.jpg --silent --show-error && echo "  ✓ rice.jpg"

# Soja orgánica (campo)
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Soy_beal_Flickr.jpg/640px-Soy_beal_Flickr.jpg" \
  -o public/img/organic-soy.jpg --silent --show-error && echo "  ✓ organic-soy.jpg"

echo ""
echo "📥 Descargando imágenes de banners..."

# Banner 1 — maíz (panel izquierdo)
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/YellowCorn.jpg/800px-YellowCorn.jpg" \
  -o public/img/banner-corn.jpg --silent --show-error && echo "  ✓ banner-corn.jpg"

# Banner 2 — cosecha de trigo (panel derecho oscuro)
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Wheat_harvest.jpg/1200px-Wheat_harvest.jpg" \
  -o public/img/banner-harvest.jpg --silent --show-error && echo "  ✓ banner-harvest.jpg"

# Banner 3 — campos / girasoles (CTA pre-footer)
curl -L "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Sunflower_sky_backdrop.jpg/1200px-Sunflower_sky_backdrop.jpg" \
  -o public/img/banner-fields.jpg --silent --show-error && echo "  ✓ banner-fields.jpg"

echo ""
echo "✅ Listo! Todas las imágenes descargadas en public/img/"
echo "   Ahora hacé: git add public/img && git commit -m 'feat: add product images' && git push"
