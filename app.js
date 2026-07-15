/**
 * Aura & Frame - Core Application Logic
 */

// Initial Default Portfolio Showcase Items (with Thumbnail Covers for Video Items)
const DEFAULT_PORTFOLIO = [
  {
    id: 'd1',
    type: 'video',
    url: 'https://vjs.zencdn.net/v/oceans.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    title: 'The Silent Ocean',
    description: 'A meditative cinematic story filmed along the Amalfi Coast, blending quiet wind and ambient piano.',
    category: 'Love Story',
    timestamp: Date.now() - 900000000
  },
  {
    id: 'd2',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    title: 'Ethereal Garden',
    description: 'Sun-dappled portraits of Beatrice & Julian under the ancient olive groves of Tuscany.',
    category: 'Portrait Photography',
    timestamp: Date.now() - 800000000
  },
  {
    id: 'd3',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    title: 'The Kiss in Milan',
    description: 'An editorial capture of pure, unscripted joy against the Duomo\'s historical architecture.',
    category: 'Editorial Photo',
    timestamp: Date.now() - 700000000
  },
  {
    id: 'd4',
    type: 'video',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    title: 'Wild Hearts Run Free',
    description: 'A cinematic high-octane editorial film shot in the golden desert horizons of Rajasthan.',
    category: 'Wedding Film',
    timestamp: Date.now() - 600000000
  },
  {
    id: 'd5',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    title: 'Dawn Bride',
    description: 'Capturing the soft, golden luminescence of dawn reflecting off delicate hand-stitched bridal lace.',
    category: 'Portrait Photography',
    timestamp: Date.now() - 500000000
  },
  {
    id: 'd6',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1550005813-f9adfecbc314?auto=format&fit=crop&w=1200&q=80',
    title: 'Shadow & Ivory',
    description: 'High-contrast monochrome groom portraits using classical chiaroscuro lighting.',
    category: 'Editorial Photo',
    timestamp: Date.now() - 400000000
  },
  {
    id: 'd7',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
    title: 'Midnight Rain',
    description: 'A dramatic, backlit capture of an embrace under a transparent umbrella in the streets of Milan.',
    category: 'Love Story',
    timestamp: Date.now() - 300000000
  },
  {
    id: 'd8',
    type: 'video',
    url: 'https://vjs.zencdn.net/v/oceans.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&w=800&q=80',
    title: 'Under the Tuscan Sky',
    description: 'A vibrant celebration of love and dinner set in a rustic, candle-lit Italian vineyard.',
    category: 'Wedding Film',
    timestamp: Date.now() - 200000000
  },
  {
    id: 'd9',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80',
    title: 'Mist & Meadows',
    description: 'Candid sunrise portraits in the fog-drenched fields of the Swiss Alps.',
    category: 'Portrait Photography',
    timestamp: Date.now() - 100000000
  }
];

// State variables
let currentFilter = 'all';
let dbMediaItems = [];
let selectedFile = null;
let filePreviewUrl = null;

// DOM Elements
const galleryGrid = document.getElementById('galleryGrid');
const filterBtns = document.querySelectorAll('.filter-btn');

// Header Scroll Event
window.addEventListener('scroll', () => {
  const header = document.getElementById('mainHeader');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Toast Notifications System
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const iconSvg = type === 'success' 
    ? `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`
    : `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`;
    
  toast.innerHTML = `
    <div class="toast-icon">${iconSvg}</div>
    <div class="toast-message">${message}</div>
  `;
  
  container.appendChild(toast);
  
  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 50);
  
  // Auto remove
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// -------------------------------------------------------------
// ADVENTUROUS HERO CAROUSEL LOGIC
// -------------------------------------------------------------
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.carousel-dots .dot');
const btnPrevSlide = document.getElementById('btnPrevSlide');
const btnNextSlide = document.getElementById('btnNextSlide');
let currentSlide = 0;
let carouselInterval = null;

function showSlide(index) {
  // Bound check
  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;
  
  // Update slides classes
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
  
  // Update dots classes
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
  
  currentSlide = index;
}

function startCarouselTimer() {
  stopCarouselTimer();
  carouselInterval = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 6000);
}

function stopCarouselTimer() {
  if (carouselInterval) {
    clearInterval(carouselInterval);
  }
}

// Event Bindings
btnPrevSlide.addEventListener('click', () => {
  showSlide(currentSlide - 1);
  startCarouselTimer(); // Reset auto rotation clock
});

btnNextSlide.addEventListener('click', () => {
  showSlide(currentSlide + 1);
  startCarouselTimer();
});

dots.forEach(dot => {
  dot.addEventListener('click', (e) => {
    const slideIdx = parseInt(e.target.dataset.slide, 10);
    showSlide(slideIdx);
    startCarouselTimer();
  });
});

// -------------------------------------------------------------
// GALLERY LAYOUT RENDERING
// -------------------------------------------------------------

async function loadAndRenderGallery(filter = currentFilter) {
  currentFilter = filter;
  
  // Fetch user uploaded files from DB
  try {
    if (window.AuraDB) {
      dbMediaItems = await window.AuraDB.getMediaItems();
    }
  } catch (err) {
    console.error('Error fetching database items:', err);
    showToast('Failed to load local media database.', 'error');
  }
  
  // Convert DB Blobs to local object URLs
  const formattedDBItems = dbMediaItems.map(item => {
    const objectUrl = URL.createObjectURL(item.file);
    return {
      id: item.id,
      type: item.type,
      url: objectUrl,
      title: item.title,
      description: item.description,
      category: item.category,
      timestamp: item.timestamp,
      isUserUpload: true
    };
  });
  
  // Combine lists and sort by newest timestamp first
  const allItems = [...formattedDBItems, ...DEFAULT_PORTFOLIO].sort((a, b) => b.timestamp - a.timestamp);
  
  // Apply filtering
  const filteredItems = allItems.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });
  
  // Clear Grid
  galleryGrid.innerHTML = '';
  
  if (filteredItems.length === 0) {
    galleryGrid.innerHTML = `
      <div class="empty-gallery">
        <div class="empty-gallery-icon">
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
        </div>
        <h3>No media found</h3>
        <p>Try clearing filters or upload a new photo/video in the Creator Studio.</p>
      </div>
    `;
    return;
  }
  
  // Render cards
  filteredItems.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'gallery-card reveal-in';
    card.setAttribute('data-type', item.type);
    card.style.transitionDelay = `${(index % 3) * 0.15}s`;
    
    // Play or View icons depending on media type
    const iconMarkup = item.type === 'video'
      ? `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>` // Play button
      : `<svg viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>`;
      
    // Render cover element (Prevents empty/black video tags by loading static covers for defaults)
    let mediaElement = '';
    if (item.type === 'video') {
      if (item.thumbnailUrl) {
        mediaElement = `<img src="${item.thumbnailUrl}" alt="${item.title}" loading="lazy">`;
      } else {
        // User uploads: render native video with frame loading
        mediaElement = `<video src="${item.url}" preload="metadata" muted playsinline></video>`;
      }
    } else {
      mediaElement = `<img src="${item.url}" alt="${item.title}" loading="lazy">`;
    }
    
    // Check if user uploaded, add a delete/remove button if true
    const deleteBtn = item.isUserUpload
      ? `<button class="btn-remove-file delete-card-btn" data-id="${item.id}" title="Delete Post" style="position: absolute; top: 1rem; right: 1rem; z-index: 10; background: rgba(0,0,0,0.5); border-radius: 50%; width: 32px; height: 32px; display: flex; justify-content: center; align-items: center; color: white;">
           <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
         </button>`
      : '';
      
    card.innerHTML = `
      ${deleteBtn}
      <div class="gallery-media-wrapper">
        ${mediaElement}
        <div class="card-icon">${iconMarkup}</div>
        <div class="card-overlay">
          <span class="card-category">${item.category}</span>
          <h3 class="card-title">${item.title}</h3>
          <p class="card-desc">${item.description}</p>
        </div>
      </div>
    `;
    
    // Card interaction (Open Lightbox/Video)
    card.querySelector('.gallery-media-wrapper').addEventListener('click', () => {
      if (item.type === 'video') {
        openVideoPlayer(item.url);
      } else {
        openLightbox(item.url, item.title, item.description);
      }
    });
    
    // Delete item click
    if (item.isUserUpload) {
      card.querySelector('.delete-card-btn').addEventListener('click', async (e) => {
        e.stopPropagation();
        if (confirm(`Are you sure you want to remove "${item.title}" from the feed?`)) {
          if (window.AuraDB) {
            await window.AuraDB.deleteMediaItem(item.id);
            showToast('Post removed successfully.', 'success');
            loadAndRenderGallery();
          }
        }
      });
    }
    
    galleryGrid.appendChild(card);
  });
  
  initScrollAnimations();
}

// -------------------------------------------------------------
// ADVENTUROUS SCROLL PARALLAX & REVEAL INTERSECTORS
// -------------------------------------------------------------
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal-in, .gallery-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(el => observer.observe(el));
}

// Parallax scrolling translation effect on overlapping storytelling visuals
window.addEventListener('scroll', () => {
  const parallaxSection = document.getElementById('parallaxStory');
  if (parallaxSection) {
    const rect = parallaxSection.getBoundingClientRect();
    const scrollOffset = window.innerHeight - rect.top;
    
    // Apply movement when visible on viewport
    if (scrollOffset > 0 && rect.bottom > 0) {
      const backLayer = parallaxSection.querySelector('.back-layer');
      const frontLayer = parallaxSection.querySelector('.front-layer');
      if (backLayer) {
        backLayer.style.transform = `translateY(${scrollOffset * -0.06}px)`;
      }
      if (frontLayer) {
        frontLayer.style.transform = `translateY(${scrollOffset * 0.04}px)`;
      }
    }
  }
});

// Filter Event Listeners
filterBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    filterBtns.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    loadAndRenderGallery(e.target.dataset.filter);
  });
});

// -------------------------------------------------------------
// HORIZONTAL GRAB-TO-SCROLL (HORIZON TRACK)
// -------------------------------------------------------------
const horizonScrollContainer = document.querySelector('.horizon-scroll-container');
if (horizonScrollContainer) {
  let isDown = false;
  let startX;
  let scrollLeft;

  horizonScrollContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    horizonScrollContainer.style.cursor = 'grabbing';
    startX = e.pageX - horizonScrollContainer.offsetLeft;
    scrollLeft = horizonScrollContainer.scrollLeft;
  });

  horizonScrollContainer.addEventListener('mouseleave', () => {
    isDown = false;
    horizonScrollContainer.style.cursor = 'grab';
  });

  horizonScrollContainer.addEventListener('mouseup', () => {
    isDown = false;
    horizonScrollContainer.style.cursor = 'grab';
  });

  horizonScrollContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - horizonScrollContainer.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed scaling factor
    horizonScrollContainer.scrollLeft = scrollLeft - walk;
  });
}

// -------------------------------------------------------------
// CREATOR STUDIO: UPLOAD PORTAL WORKFLOW
// -------------------------------------------------------------
const uploadDrawer = document.getElementById('uploadDrawer');
const btnOpenUpload = document.getElementById('btnOpenUpload');
const btnCloseUpload = document.getElementById('btnCloseUpload');
const fileDropzone = document.getElementById('fileDropzone');
const mediaFileInput = document.getElementById('mediaFileInput');
const previewContainer = document.getElementById('previewContainer');
const previewMediaBox = document.getElementById('previewMediaBox');
const previewName = document.getElementById('previewName');
const previewSize = document.getElementById('previewSize');
const btnRemoveFile = document.getElementById('btnRemoveFile');
const uploadForm = document.getElementById('uploadForm');
const btnPublish = document.getElementById('btnPublish');
const uploadProgressBarContainer = document.getElementById('uploadProgressBarContainer');
const uploadProgressBarFill = document.getElementById('uploadProgressBarFill');

// Toggle Drawer
btnOpenUpload.addEventListener('click', () => {
  uploadDrawer.classList.add('active');
});

btnCloseUpload.addEventListener('click', () => {
  uploadDrawer.classList.remove('active');
  resetUploadForm();
});

// Mobile Hamburger toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
mobileMenuBtn.addEventListener('click', () => {
  uploadDrawer.classList.add('active');
});

// File Selection Handlers
fileDropzone.addEventListener('click', () => mediaFileInput.click());

fileDropzone.addEventListener('dragover', (e) => {
  e.preventDefault();
  fileDropzone.classList.add('dragover');
});

fileDropzone.addEventListener('dragleave', () => {
  fileDropzone.classList.remove('dragover');
});

fileDropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  fileDropzone.classList.remove('dragover');
  
  if (e.dataTransfer.files.length > 0) {
    handleFileSelection(e.dataTransfer.files[0]);
  }
});

mediaFileInput.addEventListener('change', (e) => {
  if (e.target.files.length > 0) {
    handleFileSelection(e.target.files[0]);
  }
});

function handleFileSelection(file) {
  const isImage = file.type.startsWith('image/');
  const isVideo = file.type.startsWith('video/');
  
  if (!isImage && !isVideo) {
    showToast('Invalid file format. Please select an image or a video file.', 'error');
    return;
  }
  
  const maxSize = 50 * 1024 * 1024;
  if (file.size > maxSize) {
    showToast('File is too large. Maximum size is 50MB.', 'error');
    return;
  }
  
  selectedFile = file;
  filePreviewUrl = URL.createObjectURL(file);
  
  previewName.textContent = file.name;
  previewSize.textContent = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
  
  previewMediaBox.innerHTML = '';
  if (isImage) {
    previewMediaBox.innerHTML = `<img src="${filePreviewUrl}" alt="Upload Preview">`;
  } else {
    previewMediaBox.innerHTML = `<video src="${filePreviewUrl}" muted playsinline></video>`;
  }
  
  fileDropzone.style.display = 'none';
  previewContainer.style.display = 'flex';
}

btnRemoveFile.addEventListener('click', () => {
  resetFileSelection();
});

function resetFileSelection() {
  selectedFile = null;
  if (filePreviewUrl) {
    URL.revokeObjectURL(filePreviewUrl);
    filePreviewUrl = null;
  }
  mediaFileInput.value = '';
  fileDropzone.style.display = 'flex';
  previewContainer.style.display = 'none';
  uploadProgressBarContainer.style.display = 'none';
  uploadProgressBarFill.style.width = '0%';
}

function resetUploadForm() {
  uploadForm.reset();
  resetFileSelection();
}

// Submit Form (Save to IndexedDB)
uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  if (!selectedFile) {
    showToast('Please select a photo or video to upload.', 'error');
    return;
  }
  
  const title = document.getElementById('uploadTitle').value.trim();
  const category = document.getElementById('uploadCategory').value;
  const description = document.getElementById('uploadDescription').value.trim();
  const type = selectedFile.type.startsWith('video/') ? 'video' : 'photo';
  
  btnPublish.disabled = true;
  btnPublish.textContent = 'Publishing...';
  
  uploadProgressBarContainer.style.display = 'block';
  let progress = 0;
  
  const progressInterval = setInterval(async () => {
    progress += 10;
    uploadProgressBarFill.style.width = `${progress}%`;
    
    if (progress >= 100) {
      clearInterval(progressInterval);
      
      const newItem = {
        type,
        file: selectedFile,
        title,
        category,
        description,
        timestamp: Date.now()
      };
      
      try {
        if (window.AuraDB) {
          await window.AuraDB.saveMediaItem(newItem);
          showToast('Cinematic post published successfully!', 'success');
          
          uploadDrawer.classList.remove('active');
          resetUploadForm();
          loadAndRenderGallery();
        } else {
          throw new Error('Database object unavailable');
        }
      } catch (err) {
        console.error('Error saving item:', err);
        showToast('Failed to save media upload.', 'error');
      } finally {
        btnPublish.disabled = false;
        btnPublish.textContent = 'Publish to Feed';
      }
    }
  }, 150);
});

// -------------------------------------------------------------
// PHOTOGRAPHY LIGHTBOX MODAL
// -------------------------------------------------------------
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDesc = document.getElementById('lightboxDesc');
const btnCloseLightbox = document.getElementById('btnCloseLightbox');

function openLightbox(url, title, desc) {
  lightboxImg.src = url;
  lightboxTitle.textContent = title;
  lightboxDesc.textContent = desc;
  lightboxModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightboxModal.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(() => { lightboxImg.src = ''; }, 400);
}

btnCloseLightbox.addEventListener('click', closeLightbox);
lightboxModal.addEventListener('click', (e) => {
  if (e.target === lightboxModal) closeLightbox();
});

// -------------------------------------------------------------
// CUSTOM VIDEO PLAYER MODAL
// -------------------------------------------------------------
const videoModal = document.getElementById('videoModal');
const playerVideo = document.getElementById('playerVideo');
const btnCloseVideo = document.getElementById('btnCloseVideo');
const btnVideoPlay = document.getElementById('btnVideoPlay');
const videoPlayIcon = document.getElementById('videoPlayIcon');
const videoTimelineContainer = document.getElementById('videoTimelineContainer');
const videoTimelineFill = document.getElementById('videoTimelineFill');
const videoTimeText = document.getElementById('videoTimeText');
const btnVideoMute = document.getElementById('btnVideoMute');
const videoVolumeIcon = document.getElementById('videoVolumeIcon');
const videoVolumeSlider = document.getElementById('videoVolumeSlider');
const videoVolumeFill = document.getElementById('videoVolumeFill');
const btnVideoFullscreen = document.getElementById('btnVideoFullscreen');
const videoLoadingSpinner = document.getElementById('videoLoadingSpinner');

function openVideoPlayer(url) {
  // Pause any active background music
  bgAudio.pause();
  audioPlayIcon.innerHTML = `<path d="M8 5v14l11-7z" fill="currentColor"/>`;
  audioWaveform.classList.remove('playing');

  // Trigger loading spinner
  if (videoLoadingSpinner) videoLoadingSpinner.classList.add('active');

  playerVideo.src = url;
  videoModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  playerVideo.play()
    .then(() => updateVideoPlayButton(true))
    .catch(err => {
      console.log('Autoplay blocked. User action needed.', err);
      updateVideoPlayButton(false);
    });
}

function closeVideoPlayer() {
  playerVideo.pause();
  videoModal.classList.remove('active');
  document.body.style.overflow = '';
  // Dismiss spinner
  if (videoLoadingSpinner) videoLoadingSpinner.classList.remove('active');
  setTimeout(() => { playerVideo.src = ''; }, 400);
}

// Video buffering and loading events
if (playerVideo) {
  playerVideo.addEventListener('loadstart', () => {
    if (videoLoadingSpinner) videoLoadingSpinner.classList.add('active');
  });

  playerVideo.addEventListener('waiting', () => {
    if (videoLoadingSpinner) videoLoadingSpinner.classList.add('active');
  });

  playerVideo.addEventListener('playing', () => {
    if (videoLoadingSpinner) videoLoadingSpinner.classList.remove('active');
  });

  playerVideo.addEventListener('canplay', () => {
    if (videoLoadingSpinner) videoLoadingSpinner.classList.remove('active');
  });

  playerVideo.addEventListener('seeking', () => {
    if (videoLoadingSpinner) videoLoadingSpinner.classList.add('active');
  });

  playerVideo.addEventListener('seeked', () => {
    if (videoLoadingSpinner) videoLoadingSpinner.classList.remove('active');
  });

  playerVideo.addEventListener('error', () => {
    if (videoLoadingSpinner) videoLoadingSpinner.classList.remove('active');
    showToast('Failed to load video file. Please check your network.', 'error');
  });
}

btnCloseVideo.addEventListener('click', closeVideoPlayer);
videoModal.addEventListener('click', (e) => {
  if (e.target === videoModal) closeVideoPlayer();
});

btnVideoPlay.addEventListener('click', () => {
  if (playerVideo.paused) {
    playerVideo.play();
    updateVideoPlayButton(true);
  } else {
    playerVideo.pause();
    updateVideoPlayButton(false);
  }
});

function updateVideoPlayButton(isPlaying) {
  if (isPlaying) {
    videoPlayIcon.innerHTML = `<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />`;
  } else {
    videoPlayIcon.innerHTML = `<path d="M8 5v14l11-7z" />`;
  }
}

playerVideo.addEventListener('timeupdate', () => {
  if (playerVideo.duration) {
    const percentage = (playerVideo.currentTime / playerVideo.duration) * 100;
    videoTimelineFill.style.width = `${percentage}%`;
    videoTimeText.textContent = `${formatTime(playerVideo.currentTime)} / ${formatTime(playerVideo.duration)}`;
  }
});

videoTimelineContainer.addEventListener('click', (e) => {
  const rect = videoTimelineContainer.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const percentage = clickX / rect.width;
  playerVideo.currentTime = percentage * playerVideo.duration;
});

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

btnVideoMute.addEventListener('click', () => {
  playerVideo.muted = !playerVideo.muted;
  updateVideoVolumeUI();
});

videoVolumeSlider.addEventListener('click', (e) => {
  const rect = videoVolumeSlider.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  let volume = clickX / rect.width;
  volume = Math.max(0, Math.min(1, volume));
  
  playerVideo.volume = volume;
  playerVideo.muted = false;
  updateVideoVolumeUI();
});

function updateVideoVolumeUI() {
  const volume = playerVideo.muted ? 0 : playerVideo.volume;
  videoVolumeFill.style.width = `${volume * 100}%`;
  
  if (volume === 0) {
    videoVolumeIcon.innerHTML = `<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.03c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z" />`;
  } else if (volume < 0.5) {
    videoVolumeIcon.innerHTML = `<path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>`;
  } else {
    videoVolumeIcon.innerHTML = `<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>`;
  }
}

btnVideoFullscreen.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    playerVideo.requestFullscreen().catch(err => {
      console.error(`Error attempting to enable fullscreen: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeVideoPlayer();
    uploadDrawer.classList.remove('active');
  }
});

// -------------------------------------------------------------
// ORIGINAL SOUNDSCAPES: AUDIO PLAYER
// -------------------------------------------------------------
const bgAudio = document.getElementById('bgAudio');
const btnPlayAudio = document.getElementById('btnPlayAudio');
const audioPlayIcon = document.getElementById('audioPlayIcon');
const audioProgressBar = document.getElementById('audioProgressBar');
const audioProgressFill = document.getElementById('audioProgressFill');
const audioCurrentTime = document.getElementById('audioCurrentTime');
const audioDuration = document.getElementById('audioDuration');
const audioWaveform = document.getElementById('audioWaveform');

btnPlayAudio.addEventListener('click', () => {
  if (bgAudio.paused) {
    playerVideo.pause();
    updateVideoPlayButton(false);
    
    bgAudio.play();
    audioPlayIcon.innerHTML = `<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"/>`;
    audioWaveform.classList.add('playing');
  } else {
    bgAudio.pause();
    audioPlayIcon.innerHTML = `<path d="M8 5v14l11-7z" fill="currentColor"/>`;
    audioWaveform.classList.remove('playing');
  }
});

bgAudio.addEventListener('timeupdate', () => {
  if (bgAudio.duration) {
    const percentage = (bgAudio.currentTime / bgAudio.duration) * 100;
    audioProgressFill.style.width = `${percentage}%`;
    audioCurrentTime.textContent = formatTime(bgAudio.currentTime);
  }
});

bgAudio.addEventListener('loadedmetadata', () => {
  audioDuration.textContent = formatTime(bgAudio.duration);
});

if (bgAudio.readyState >= 1) {
  audioDuration.textContent = formatTime(bgAudio.duration);
}

audioProgressBar.addEventListener('click', (e) => {
  const rect = audioProgressBar.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const percentage = clickX / rect.width;
  bgAudio.currentTime = percentage * bgAudio.duration;
});

bgAudio.addEventListener('ended', () => {
  audioPlayIcon.innerHTML = `<path d="M8 5v14l11-7z" fill="currentColor"/>`;
  audioWaveform.classList.remove('playing');
  audioProgressFill.style.width = '0%';
  audioCurrentTime.textContent = '00:00';
});

// -------------------------------------------------------------
// INITIALIZATION
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', async () => {
  // Initialize IndexedDB database
  if (window.AuraDB) {
    try {
      await window.AuraDB.getMediaItems();
    } catch (e) {
      console.error('Failed to initialize DB store on load', e);
    }
  }
  
  // Render feed gallery
  loadAndRenderGallery();
  
  // Start Hero Carousel auto scroll
  startCarouselTimer();
});
