document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Filter functionality
    const typeFilter = document.getElementById('type-filter');
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    const searchInput = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-box button');
    const episodeCards = document.querySelectorAll('.episode-card');
    
    function filterEpisodes() {
        const typeValue = typeFilter.value;
        const categoryValue = categoryFilter.value;
        const sortValue = sortFilter.value;
        const searchValue = searchInput.value.toLowerCase();
        
        episodeCards.forEach(card => {
            const cardType = card.classList.contains('audio') ? 'audio' : 'video';
            const cardCategory = card.querySelector('.category-tag').textContent.toLowerCase();
            const cardText = card.textContent.toLowerCase();
            
            // Type filter
            const typeMatch = typeValue === 'all' || cardType === typeValue;
            
            // Category filter
            const categoryMatch = categoryValue === 'all' || 
                                 cardCategory.includes(categoryValue.toLowerCase());
            
            // Search filter
            const searchMatch = searchValue === '' || cardText.includes(searchValue);
            
            if (typeMatch && categoryMatch && searchMatch) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Sort functionality would go here
        // This would require more complex implementation with actual data
    }
    
    // Event listeners for filters
    typeFilter.addEventListener('change', filterEpisodes);
    categoryFilter.addEventListener('change', filterEpisodes);
    sortFilter.addEventListener('change', filterEpisodes);
    searchBtn.addEventListener('click', filterEpisodes);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            filterEpisodes();
        }
    });
    
    // Initialize with all episodes showing
    filterEpisodes();
});

// LIKE BUTTON FUNCTIONALITY

// Like button functionality
function toggleLike(button) {
    const heartIcon = button.querySelector('i');
    const likeCount = button.querySelector('.like-count');
    let currentLikes = parseInt(likeCount.textContent);
    
    if (heartIcon.classList.contains('far')) {
        heartIcon.classList.remove('far');
        heartIcon.classList.add('fas');
        likeCount.textContent = currentLikes + 1;
    } else {
        heartIcon.classList.remove('fas');
        heartIcon.classList.add('far');
        likeCount.textContent = currentLikes - 1;
    }
}

// Comment functionality
function showCommentBox(button) {
    const card = button.closest('.episode-card');
    const commentSection = card.querySelector('.comment-section');
    commentSection.style.display = commentSection.style.display === 'none' ? 'block' : 'none';
}

function postComment(button) {
    const commentBox = button.previousElementSibling;
    const commentText = commentBox.value.trim();
    
    if (commentText) {
        const commentsList = button.nextElementSibling;
        const newComment = document.createElement('div');
        newComment.className = 'comment';
        newComment.textContent = commentText;
        commentsList.appendChild(newComment);
        commentBox.value = '';
    }
}
// DOWNOLADS

document.querySelector('.download-btn').addEventListener('click', function(e) {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = 'One_Night_Micron_Kellz_feat_Aliet.mp4';
    link.download = 'Micron_Kellz_One_Night.mp4';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// VIEWSSS

document.addEventListener('DOMContentLoaded', function() {
    // Initialize elements
    const episodeCard = document.getElementById('episode-31');
    const playButtons = episodeCard.querySelectorAll('.play-btn, .play-btn-main');
    const likeButton = episodeCard.querySelector('.like-btn');
    const commentButton = episodeCard.querySelector('.comment-btn');
    const postCommentButton = episodeCard.querySelector('.post-comment');
    
    // Initialize view count
    initializeViewCount('episode-31');
    
    // Set up event listeners
    playButtons.forEach(btn => {
        btn.addEventListener('click', () => playEpisode('episode-31'));
    });
    
    likeButton.addEventListener('click', function() {
        toggleLike(this);
    });
    
    commentButton.addEventListener('click', function() {
        showCommentBox(this);
    });
    
    postCommentButton.addEventListener('click', function() {
        postComment(this);
    });
});

// View counter functionality
function initializeViewCount(episodeId) {
    let views = localStorage.getItem(episodeId + '_views');
    if (views === null) {
        views = 1; // Default starting count
        localStorage.setItem(episodeId + '_views', views);
    }
    updateViewCount(episodeId, parseInt(views));
}

function trackView(episodeId) {
    if (!sessionStorage.getItem(episodeId + '_viewed')) {
        let views = parseInt(localStorage.getItem(episodeId + '_views')) || 1;
        views++;
        localStorage.setItem(episodeId + '_views', views);
        sessionStorage.setItem(episodeId + '_viewed', 'true');
        updateViewCount(episodeId, views);
    }
}

function updateViewCount(episodeId, count) {
    const formattedCount = count >= 1000 ? (count/1).toFixed(1) + 'K' : count;
    document.querySelectorAll(`#${episodeId} .view-count`).forEach(el => {
        el.textContent = formattedCount;
    });
}

// Play episode function
function playEpisode(episodeId) {
    // Here you would implement your actual audio player
    console.log(`Playing episode ${episodeId}`);
    
    // Track the view
    trackView(episodeId);
    
    // Start audio playback (pseudo-code)
    // const audioPlayer = new Audio('path/to/audio.mp3');
    // audioPlayer.play();
}

// Like functionality
function toggleLike(button) {
    const heartIcon = button.querySelector('i');
    const likeCount = button.querySelector('.like-count');
    let currentLikes = parseInt(likeCount.textContent);
    
    if (heartIcon.classList.contains('far')) {
        heartIcon.classList.remove('far');
        heartIcon.classList.add('fas');
        likeCount.textContent = currentLikes + 1;
    } else {
        heartIcon.classList.remove('fas');
        heartIcon.classList.add('far');
        likeCount.textContent = currentLikes - 1;
    }
}

// Comment functionality
function showCommentBox(button) {
    const card = button.closest('.episode-card');
    const commentSection = card.querySelector('.comment-section');
    commentSection.style.display = commentSection.style.display === 'none' ? 'block' : 'none';
}

function postComment(button) {
    const commentBox = button.previousElementSibling;
    const commentText = commentBox.value.trim();
    
    if (commentText) {
        const commentsList = button.nextElementSibling;
        const newComment = document.createElement('div');
        newComment.className = 'comment';
        newComment.textContent = commentText;
        commentsList.appendChild(newComment);
        commentBox.value = '';
    }
}

//AUDIOS

function playEpisode(episodeId) {
    const episode = document.getElementById(episodeId);
    const audio = episode.querySelector("audio");
    const progressBar = episode.querySelector(".progress-bar");
    const currentTimeSpan = episode.querySelector(".current-time");
    const durationSpan = episode.querySelector(".duration");
    const volumeSlider = episode.querySelector(".volume-bar");

    // Pause all other audios
    document.querySelectorAll("audio").forEach(a => {
        if (a !== audio) a.pause();
    });

    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }

    audio.onloadedmetadata = () => {
        durationSpan.textContent = formatTime(audio.duration);
    };

    audio.ontimeupdate = () => {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = percent;
        currentTimeSpan.textContent = formatTime(audio.currentTime);
    };

    progressBar.oninput = () => {
        const time = (progressBar.value / 100) * audio.duration;
        audio.currentTime = time;
    };

    volumeSlider.oninput = () => {
        audio.volume = volumeSlider.value / 100;
    };
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
}

let currentAudio = null;

function togglePlayPause(episodeId) {
    const audio = document.getElementById(`${episodeId}-audio`);
    const buttonIcon = document.querySelector(`#${episodeId} .play-btn i`);
    
    // Stop any currently playing audio
    if (currentAudio && currentAudio !== audio) {
        currentAudio.pause();
        document.querySelector(`#${currentAudio.id.replace('-audio', '')} .play-btn i`)
            .className = 'fas fa-play';
    }
    
    // Toggle current audio
    if (audio.paused) {
        audio.play()
            .then(() => {
                buttonIcon.className = 'fas fa-pause';
                currentAudio = audio;
            })
            .catch(error => {
                console.error("Playback failed:", error);
                buttonIcon.className = 'fas fa-play';
            });
    } else {
        audio.pause();
        buttonIcon.className = 'fas fa-play';
        currentAudio = null;
    }
    
    // Handle audio end
    audio.onended = () => {
        buttonIcon.className = 'fas fa-play';
        if (currentAudio === audio) currentAudio = null;
    };
}
audio.play().catch(error => {
    console.error("Audio error:", error);
    playButton.className = 'fas fa-play';
});

// videooooo

