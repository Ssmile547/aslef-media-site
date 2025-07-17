document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('nav ul');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navUl.classList.toggle('active');
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            hamburger.classList.remove('active');
            navUl.classList.remove('active');
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Video Placeholder Click Handler
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            // In a real implementation, this would launch a video modal or similar
            alert('Video player would launch here!');
        });
    }
    
    // Sticky Header on Scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
});

// Audio player functionality
const player = document.getElementById('episode-player');
const playBtn = document.querySelector('.play-btn');
const progressBar = document.querySelector('.progress-bar');
const currentTimeEl = document.querySelector('.current-time');
const durationEl = document.querySelector('.duration');
const muteBtn = document.querySelector('.mute-btn');

// Play/pause toggle
playBtn.addEventListener('click', () => {
  if (player.paused) {
    player.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    player.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
});

// Update progress bar
player.addEventListener('timeupdate', () => {
  const percent = (player.currentTime / player.duration) * 100;
  progressBar.value = percent;
  currentTimeEl.textContent = formatTime(player.currentTime);
});

// Seek functionality
progressBar.addEventListener('input', () => {
  const seekTime = (progressBar.value / 100) * player.duration;
  player.currentTime = seekTime;
});

// Format time (00:00)
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Duration display
player.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(player.duration);
});

// Mute toggle
muteBtn.addEventListener('click', () => {
  player.muted = !player.muted;
  muteBtn.innerHTML = player.muted 
    ? '<i class="fas fa-volume-mute"></i>' 
    : '<i class="fas fa-volume-up"></i>';
});

// Auto-convert platform links to embeds
document.querySelectorAll('.episode-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const url = new URL(link.href);
    
    if (url.hostname.includes('youtube.com')) {
      const videoId = url.searchParams.get('v');
      showEmbed(`https://www.youtube.com/embed/${videoId}`);
    }
    else if (url.hostname.includes('spotify.com')) {
      const pathParts = url.pathname.split('/');
      const episodeId = pathParts[pathParts.length - 1];
      showEmbed(`https://open.spotify.com/embed/episode/${episodeId}`);
    }
    else {
      window.open(link.href, '_blank');
    }
  });
});

function showEmbed(embedUrl) {
  const embedHTML = `
    <div class="embed-container">
      <iframe src="${embedUrl}" frameborder="0" allowfullscreen></iframe>
      <button class="close-embed">×</button>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', embedHTML);
  document.querySelector('.close-embed').addEventListener('click', () => {
    document.querySelector('.embed-container').remove();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    togglePlay();
  } else if (e.code === 'ArrowRight') {
    nextEpisode();
  } else if (e.code === 'ArrowLeft') {
    prevEpisode();
  }
});

async function loadPlaylist() {
  const response = await fetch('news.json');
  const episodes = await response.json();
  
  const listContainer = document.querySelector('.episode-list');
  listContainer.innerHTML = '';
  
  episodes.forEach((ep, index) => {
    listContainer.innerHTML += `
      <div class="episode" data-src="${ep.audio}" data-cover="${ep.cover}">
        <div class="episode-number">${String(index + 1).padStart(2, '0')}</div>
        <img src="${ep.thumb}" alt="${ep.title}" class="episode-thumb">
        <div class="episode-details">
          <h4>${ep.title}</h4>
          <p>With ${ep.guest} • ${ep.duration}</p>
        </div>
        <button class="play-btn"><i class="fas fa-play"></i></button>
      </div>
    `;
  });
}

audio.addEventListener('play', () => {
  fetch(`/track-play?episode=${currentEpisodeIndex}`);
});

// search bar codes

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const searchInput = document.getElementById('business-search');
    const searchButton = document.getElementById('search-button');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const businessCards = document.querySelectorAll('.business-card');
    
    // Search Functionality
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeCategory = document.querySelector('.filter-btn.active').dataset.category;
        
        businessCards.forEach(card => {
            const cardText = card.textContent.toLowerCase();
            const cardCategory = card.dataset.category || '';
            
            const matchesSearch = searchTerm === '' || cardText.includes(searchTerm);
            const matchesCategory = activeCategory === 'all' || cardCategory.includes(activeCategory);
            
            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Event Listeners
    searchButton.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            performSearch();
        });
    });
    
    // Initialize with all businesses visible
    performSearch(business news);
});