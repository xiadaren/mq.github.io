// 视频控制功能
const video = document.getElementById('main-video');
const playBtn = document.getElementById('play-btn');
const progressBar = document.querySelector('.progress-bar');
const progress = document.querySelector('.progress');
const fullscreenBtn = document.getElementById('fullscreen-btn');

// 播放/暂停控制
playBtn.addEventListener('click', function() {
    if (video.paused) {
        video.play();
        playBtn.textContent = '暂停';
    } else {
        video.pause();
        playBtn.textContent = '播放';
    }
});

// 视频进度更新
video.addEventListener('timeupdate', function() {
    const percent = (video.currentTime / video.duration) * 100;
    progress.style.width = percent + '%';
});

// 点击进度条跳转到指定位置
progressBar.addEventListener('click', function(e) {
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
});

// 全屏控制
fullscreenBtn.addEventListener('click', function() {
    if (!document.fullscreenElement) {
        video.requestFullscreen().catch(err => {
            console.log(`全屏错误: ${err.message}`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
});

// 视频结束时重置播放按钮
video.addEventListener('ended', function() {
    playBtn.textContent = '播放';
});

// 图片轮播功能
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let currentSlide = 0;

function showSlide(index) {
    const carouselSlides = document.querySelector('.carousel-slides');
    carouselSlides.style.transform = `translateX(-${index * 100}%)`;
    currentSlide = index;
    
    // 更新所有相关元素的状态
    updateCheckpointBtn(index + 1);
    updateIntro(index + 1);
}

// 下一张
nextBtn.addEventListener('click', function() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
});

// 上一张
prevBtn.addEventListener('click', function() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
});

// 打卡点交互
const checkpointBtns = document.querySelectorAll('.checkpoint-btn');
const introItems = document.querySelectorAll('.intro-item');

function updateCheckpointBtn(checkpointNumber) {
    checkpointBtns.forEach(btn => {
        btn.classList.remove('active');
        if (parseInt(btn.dataset.checkpoint) === checkpointNumber) {
            btn.classList.add('active');
        }
    });
}

function updateIntro(checkpointNumber) {
    introItems.forEach(item => {
        item.classList.remove('active');
        if (parseInt(item.dataset.checkpoint) === checkpointNumber) {
            item.classList.add('active');
        }
    });
}

// 打卡点按钮点击事件
checkpointBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const checkpointNumber = parseInt(this.dataset.checkpoint);
        updateCheckpointBtn(checkpointNumber);
        updateIntro(checkpointNumber);
        // 同步更新轮播图
        showSlide(checkpointNumber - 1);
    });
});

// 自动轮播
let autoplayInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 5000);

// 鼠标悬停时暂停自动轮播
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', function() {
    clearInterval(autoplayInterval);
});

// 鼠标离开时恢复自动轮播
carouselContainer.addEventListener('mouseleave', function() {
    autoplayInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
});

// 初始化
showSlide(0);
updateCheckpointBtn(1);
updateIntro(1);