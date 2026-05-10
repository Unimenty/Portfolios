// Hero Enter Button Logic
const enterBtn = document.getElementById('enter-btn');
const heroOverlay = document.getElementById('hero-overlay');

enterBtn.addEventListener('click', () => {
    heroOverlay.classList.add('hidden');
    // Staggered reveal as the curtain lifts
        items.sort((a, b) => {
            const distA = Math.hypot(a.initialX, a.initialY);
            const distB = Math.hypot(b.initialX, b.initialY);
            return distA - distB;
        });

    items.forEach((item, index) => {
        setTimeout(() => {
            item.el.classList.add('revealed');
            }, index * 15);
    });
});

// ── PLATINUM GRID ENGINE ──
const container = document.getElementById('gallery-container');
const grid = document.getElementById('grid');
const isMobile = window.matchMedia("(pointer: coarse)").matches;

const itemActualW = isMobile ? 200 : 256;
const itemActualH = isMobile ? 300 : 336;
const gap = isMobile ? 15 : 30;
const itemW = itemActualW + gap;
const itemH = itemActualH + gap;

// Buffer zones: 14x12 grid instead of 12x10
const cols = 14;
const rows = 12;
const totalW = cols * itemW;
const totalH = rows * itemH;

// Using pre-computed imageSources (same as before)
const imageSources = [
    { src: './i.am.kakpe/485492466_17925309888025731_7626418343488923576_n.jpg', name: 'Kojo Kwarteng' },
    { src: './i.am.kakpe/486655536_18492561112006462_5981196424839271321_n.jpg', name: 'Kojo Kwarteng' },
    { src: './i.am.kakpe/491461718_17927838315025731_6073027245294905678_n.jpg', name: 'Kojo Kwarteng' },
    { src: './i.am.kakpe/491464833_17930133522025731_5717421072113813218_n.jpg', name: 'Kojo Kwarteng' },
    { src: './i.am.kakpe/544112729_17944078593025731_1577401041159391254_n.jpg', name: 'Kojo Kwarteng' },
    { src: './i.am.kakpe/547942206_17944375704025731_924546056585511851_n.jpg', name: 'Kojo Kwarteng' },
    { src: './i.am.kakpe/563603449_17947642101025731_8240427030025265659_n.jpg', name: 'Kojo Kwarteng' },
    { src: './i.am.kakpe/568021435_17948316738025731_14891363825318792_n.jpg', name: 'Kojo Kwarteng' },
    { src: './i.am.kakpe/571928297_17949224442025731_4615989955436880727_n.jpg', name: 'Kojo Kwarteng' },
    { src: './i.am.kakpe/573624568_17950409133025731_7709427011070255576_n.jpg', name: 'Kojo Kwarteng' },
    { src: './i.am.kakpe/581689614_17951088090025731_3893918756976328602_n.jpg', name: 'Kojo Kwarteng' },
    { src: './i.am.kakpe/586396316_17951765907025731_3082191570876175228_n.jpg', name: 'Kojo Kwarteng' },
    { src: './i.am.kakpe/588242088_17952482418025731_9020525219639298917_n (1).jpg', name: 'Kojo Kwarteng' },
    { src: './i.am.kakpe/589907324_17953197831025731_1048182770484030898_n.jpg', name: 'Kojo Kwarteng' },
    { src: './i.am.kakpe/613087115_17956955853025731_7176167438606832514_n.jpg', name: 'Kojo Kwarteng' },
    { src: './i.am.kakpe/633018569_17960716107025731_643253903948355596_n.jpg', name: 'Kojo Kwarteng' },
    { src: './i.am.kakpe/639600504_17961398136025731_5380457280195206564_n.jpeg', name: 'Kojo Kwarteng' },
    { src: './i.am.kakpe/639820016_17961398052025731_6952355782499714920_n.jpg', name: 'Kojo Kwarteng' },
    { src: './i.am.kakpe/639885522_17961398118025731_8162838456740941080_n.jpeg', name: 'Kojo Kwarteng' },
    { src: './i.am.kakpe/642751844_18510753667072578_5985830290176820310_n.jpg', name: 'Kojo Kwarteng' }
];

// ── ENHANCED DISTRIBUTION ALGORITHM ──
// Deck-based shuffle with larger forbidden radius and multiple grid patterns

const FORBIDDEN_RADIUS = 2; // Check 5x5 area instead of 3x3
const NUM_GRID_PATTERNS = 3; // Create 3 different grid arrangements
const gridPatterns = [];

// Helper: Get all positions within forbidden radius
function getForbiddenPositions(col, row, cols, rows, radius) {
    const forbidden = new Set();
    for (let i = col - radius; i <= col + radius; i++) {
        for (let j = row - radius; j <= row + radius; j++) {
            if (i >= 0 && i < cols && j >= 0 && j < rows) {
                forbidden.add(`${i},${j}`);
            }
        }
    }
    return forbidden;
}

// Helper: Create a single grid pattern with enhanced distribution
function createGridPattern(patternOffset) {
    const patternMatrix = Array.from({ length: cols }, () => Array(rows).fill(null));
    const positionList = [];
    
    // Create ordered list of all positions, shuffled differently per pattern
    for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
            positionList.push({ col: c, row: r });
        }
    }
    
    // Shuffle positions with pattern-specific seed
    positionList.sort((a, b) => {
        const seedA = (a.col * 73 + a.row * 151 + patternOffset * 337) % 1000;
        const seedB = (b.col * 73 + b.row * 151 + patternOffset * 337) % 1000;
        return seedA - seedB;
    });
    
    // Track usage count for each image to ensure even distribution
    const usageCount = new Map(imageSources.map((_, idx) => [idx, 0]));
    
    // Assign images using deck-based approach
    positionList.forEach(({ col, row }) => {
        // Get forbidden positions for current cell
        const forbiddenPos = getForbiddenPositions(col, row, cols, rows, FORBIDDEN_RADIUS);
        
        // Collect images used in forbidden zone
        const forbiddenImages = new Set();
        forbiddenPos.forEach(posKey => {
            if (posKey !== `${col},${row}`) {
                const [ci, ri] = posKey.split(',').map(Number);
                if (patternMatrix[ci][ri]) {
                    forbiddenImages.add(patternMatrix[ci][ri]);
                }
            }
        });
        
        // Find available images (not in forbidden zone), prioritizing least-used
        let available = imageSources
            .map((src, idx) => ({ src, idx }))
            .filter(item => !forbiddenImages.has(item.idx));
        
        // If too few available (edge cases), expand search slightly but still avoid immediate neighbors
        if (available.length < 3) {
            const immediateForbidden = new Set();
            for (let i = col - 1; i <= col + 1; i++) {
                for (let j = row - 1; j <= row + 1; j++) {
                    if (i >= 0 && i < cols && j >= 0 && j < rows && patternMatrix[i][j]) {
                        immediateForbidden.add(patternMatrix[i][j]);
                    }
                }
            }
            available = imageSources
                .map((src, idx) => ({ src, idx }))
                .filter(item => !immediateForbidden.has(item.idx));
        }
        
        // Select image with lowest usage count (most even distribution)
        available.sort((a, b) => usageCount.get(a.idx) - usageCount.get(b.idx));
        
        // Add small randomness among top candidates to avoid rigid patterns
        const topCandidates = available.slice(0, Math.min(5, available.length));
        const selected = topCandidates[Math.floor(Math.random() * topCandidates.length)];
        
        patternMatrix[col][row] = selected.idx;
        usageCount.set(selected.idx, usageCount.get(selected.idx) + 1);
    });
    
    return patternMatrix;
}

// Generate multiple grid patterns
for (let p = 0; p < NUM_GRID_PATTERNS; p++) {
    gridPatterns.push(createGridPattern(p));
}

// Create DOM elements and assign to items array
const items = [];
const gridMatrix = gridPatterns[0]; // Use first pattern for initial render

for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
        const el = document.createElement('div');
        el.className = 'gallery-item';
        el.style.width = itemActualW + 'px';
        el.style.height = itemActualH + 'px';
        el.setAttribute('role', 'button');
        el.tabIndex = -1; // Managed by render() for visibility
        const inner = document.createElement('div');
        inner.className = 'gallery-item-inner';

        const sourceIdx = gridMatrix[c][r];
        const source = imageSources[sourceIdx];
        el.setAttribute('aria-label', `View ${source.name}`);

        const img = document.createElement('img');
        img.src = source.src;
        img.loading = "lazy";
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        const title = document.createElement('h3');
        title.innerText = source.name;

        overlay.appendChild(title);
        inner.appendChild(img);
        inner.appendChild(overlay);
        el.appendChild(inner);
        grid.appendChild(el);

        // Store click handler index in the element itself for dynamic updates
        el.dataset.sourceIdx = sourceIdx;
        el.addEventListener('click', () => { 
            if (!wasDragged) openLightbox(parseInt(el.dataset.sourceIdx)); 
        });
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(parseInt(el.dataset.sourceIdx));
            }
        });

        items.push({
            el,
            initialX: (c - Math.floor(cols / 2)) * itemW,
            initialY: (r - Math.floor(rows / 2)) * itemH,
            gridCol: c,
            gridRow: r,
            sourceIdx: sourceIdx
        });
    }
}

// Track which pattern is currently active for seamless transitions
let currentPatternIndex = 0;

// Function to switch to next grid pattern when panning beyond threshold
function updateGridPatternIfNeeded() {
    const totalCols = cols;
    const totalRows = rows;
    const patternWidth = totalCols * itemW;
    const patternHeight = totalRows * itemH;
    
    // Calculate which pattern section we're in based on scroll position
    const normalizedX = ((currentX % patternWidth) + patternWidth) % patternWidth;
    const normalizedY = ((currentY % patternHeight) + patternHeight) % patternHeight;
    
    // Determine pattern index based on position (creates virtual tiling)
    const newPatternIndex = Math.floor(normalizedX / (patternWidth / NUM_GRID_PATTERNS)) % NUM_GRID_PATTERNS;
    
    if (newPatternIndex !== currentPatternIndex) {
        currentPatternIndex = newPatternIndex;
        const newPattern = gridPatterns[currentPatternIndex];
        
        // Update items with new pattern assignments
        items.forEach((item) => {
            const c = item.gridCol;
            const r = item.gridRow;
            const newSourceIdx = newPattern[c][r];
            
            if (newSourceIdx !== item.sourceIdx) {
                const newSource = imageSources[newSourceIdx];
                item.sourceIdx = newSourceIdx;
                
                // Update image source, caption, and click handler data attribute
                const img = item.el.querySelector('.gallery-item-inner img');
                const title = item.el.querySelector('.overlay h3');
                if (img) img.src = newSource.src;
                if (title) title.innerText = newSource.name;
                item.el.dataset.sourceIdx = newSourceIdx;
            }
        });
    }
}

let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
let isDragging = false, wasDragged = false;
let dragStartX, dragStartY, prevMouseX, prevMouseY;
let velocityX = 0, velocityY = 0;
let animationId;

function wrap(value, min, max) {
    const range = max - min;
    return ((((value - min) % range) + range) % range) + min;
}

function render() {
    const winW = window.innerWidth, winH = window.innerHeight;
    // Buffer Margin (images cull 600px beyond screen, well before the wrap at ~2000px)
    const margin = 600;

    items.forEach(item => {
        const x = wrap(item.initialX + currentX, -totalW / 2, totalW / 2);
        const y = wrap(item.initialY + currentY, -totalH / 2, totalH / 2);

        if (x < -itemW - margin || x > winW + margin || y < -itemH - margin || y > winH + margin) {
            item.el.style.visibility = 'hidden';
            if (item.el.tabIndex !== -1) item.el.tabIndex = -1;
        } else {
            item.el.style.visibility = 'visible';
            item.el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            if (item.el.tabIndex !== 0) item.el.tabIndex = 0;
        }
    });
}


function loop() {
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;
    if (!isDragging) {
        velocityX *= 0.94; velocityY *= 0.94;
        if (Math.abs(velocityX) < 0.01) velocityX = 0;
        if (Math.abs(velocityY) < 0.01) velocityY = 0;
        targetX += velocityX; targetY += velocityY;
    }
    
    // Check for pattern transitions during panning
    updateGridPatternIfNeeded();
    
    render();
    animationId = requestAnimationFrame(loop);
}
const portfolioHeader = document.getElementById('portfolio-header');
function dragStart(e) {
    isDragging = true;
    wasDragged = false;
    portfolioHeader.classList.add('smart-hide');

    prevMouseX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    prevMouseY = e.type.includes('mouse') ? e.pageY : e.touches[0].clientY;
    dragStartX = prevMouseX;
    dragStartY = prevMouseY;
    velocityX = 0;
    velocityY = 0;
}
function drag(e) {
    if (!isDragging) return;
    const x = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    const y = e.type.includes('mouse') ? e.pageY : e.touches[0].clientY;

    if (Math.hypot(x - dragStartX, y - dragStartY) > 10) {
        wasDragged = true;
        grid.classList.add('dragging'); // Only shield when real movement occurs
    }

    velocityX = x - prevMouseX;
    velocityY = y - prevMouseY;
    prevMouseX = x;
    prevMouseY = y;

    targetX += velocityX;
    targetY += velocityY;
}

function dragEnd() {
    isDragging = false;
    portfolioHeader.classList.remove('smart-hide');
    grid.classList.remove('dragging');
}

container.addEventListener('mousedown', dragStart);
container.addEventListener('touchstart', dragStart, { passive: true });
window.addEventListener('mousemove', drag);
window.addEventListener('touchmove', drag, { passive: false });
window.addEventListener('mouseup', dragEnd);
window.addEventListener('touchend', dragEnd);
window.addEventListener('wheel', (e) => { targetX -= e.deltaX; targetY -= e.deltaY; }, { passive: true });
loop();


// ── LIGHTBOX LOGIC ──
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
const lbCaption = document.getElementById('lightbox-caption');
let currentLbIndex = 0;
let lastFocusedElement = null;

function openLightbox(index) {
    lastFocusedElement = document.activeElement;
    currentLbIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.getElementById('lightbox-close').focus();
}

function updateLightbox() {
    lbImg.src = imageSources[currentLbIndex].src;
    lbCaption.innerText = imageSources[currentLbIndex].name;
}

function closeLightbox() {
    lightbox.classList.remove('active');
    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }
}

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);

document.getElementById('lightbox-prev').addEventListener('click', (e) => {
    e.stopPropagation();
    currentLbIndex = (currentLbIndex - 1 + imageSources.length) % imageSources.length;
    updateLightbox();
});

document.getElementById('lightbox-next').addEventListener('click', (e) => {
    e.stopPropagation();
    currentLbIndex = (currentLbIndex + 1) % imageSources.length;
    updateLightbox();
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.id === 'lightbox-content') {
        closeLightbox();
    }
});

// Keydown listener for lightbox
window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        currentLbIndex = (currentLbIndex - 1 + imageSources.length) % imageSources.length;
        updateLightbox();
    } else if (e.key === 'ArrowRight') {
        currentLbIndex = (currentLbIndex + 1) % imageSources.length;
        updateLightbox();
    }
});

// ── MENU OVERLAY LOGIC ──
const burgerBtn = document.getElementById('burger-btn');
const navOverlay = document.getElementById('nav-overlay');

burgerBtn.addEventListener('click', () => {
    const isActive = burgerBtn.classList.toggle('active');
    navOverlay.classList.toggle('active');

    // Prevent scrolling on the grid when menu is up
    document.body.style.overflow = isActive ? 'hidden' : '';
});

// Generic Nav Link Handler (Specialized for single page interaction)
document.querySelectorAll('.nav-link, #brand-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        // Reset everything first
        heroOverlay.classList.remove('hidden');
        document.getElementById('services').classList.remove('active');

        if (href === '#hero-overlay') {
            // Already resetting by removing 'hidden'
        } else if (href === '#gallery-container') {
            heroOverlay.classList.add('hidden');
        } else if (href === '#services') {
            e.preventDefault();
            document.getElementById('services').classList.add('active');
        }

        burgerBtn.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Services close
document.getElementById('services-close').addEventListener('click', () => {
    document.getElementById('services').classList.remove('active');
});

// Close menu on background click
navOverlay.addEventListener('click', (e) => {
    if (e.target === navOverlay) {
        burgerBtn.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close services on background click
document.getElementById('services').addEventListener('click', (e) => {
    if (e.target === document.getElementById('services')) {
        document.getElementById('services').classList.remove('active');
    }
});

// ── CUSTOM CURSOR LOGIC ──
const ring = document.getElementById('cursor-ring');
const dot = document.getElementById('cursor-dot');

if (!isMobile) {
    ring.style.display = 'block';
    dot.style.display = 'block';

    window.addEventListener('mousemove', (e) => {
        const target = e.target;

        // Parallax Hero
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg && !heroOverlay.classList.contains('hidden')) {
            heroBg.style.transform = `scale(1.05) translate(${moveX}px, ${moveY}px)`;
        }

        const isMagnetic = target.closest('.enter-btn-pill, .social-link, .burger-btn, .nav-link, .menu-inquiry-btn');

        // Custom Cursor movement
        ring.style.left = e.clientX + 'px';
        ring.style.top = e.clientY + 'px';
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';

        if (target.closest('a, button, .gallery-item, .burger-btn')) {
            document.body.classList.add('cursor-active');
        } else {
            document.body.classList.remove('cursor-active');
        }

        // Magnetic Effect
        if (isMagnetic) {
            const m = isMagnetic;
            const rect = m.getBoundingClientRect();
            const relX = e.clientX - rect.left - rect.width / 2;
            const relY = e.clientY - rect.top - rect.height / 2;
            m.style.transform = `translate(${relX * 0.3}px, ${relY * 0.3}px)`;
        }
    });

    // Reset Magnetic on Mouseleave
    document.querySelectorAll('.enter-btn-pill, .social-link, .burger-btn, .nav-link, .menu-inquiry-btn').forEach(btn => {
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}
