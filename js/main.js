// 当页面加载完成时
document.addEventListener('DOMContentLoaded', function() {
    // 轮播图功能
    const sliderWrapper = document.querySelector('.slider-wrapper');
    if (sliderWrapper) {  // 确保元素存在
        const slides = sliderWrapper.querySelectorAll('img');
        const dots = document.querySelectorAll('.slider-dot');
        const prevButton = document.querySelector('.prev');
        const nextButton = document.querySelector('.next');
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        // 自动轮播间隔（毫秒）
        const autoPlayInterval = 5000;
        let autoPlayTimer;

        // 切换到指定幻灯片
        function goToSlide(index) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            
            currentSlide = index;
            if (currentSlide >= totalSlides) currentSlide = 0;
            if (currentSlide < 0) currentSlide = totalSlides - 1;
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        // 下一张幻灯片
        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        // 上一张幻灯片
        function prevSlide() {
            goToSlide(currentSlide - 1);
        }

        // 自动播放控制
        function startAutoPlay() {
            autoPlayTimer = setInterval(nextSlide, autoPlayInterval);
        }

        function stopAutoPlay() {
            clearInterval(autoPlayTimer);
        }

        // 事件监听
        if (prevButton && nextButton) {  // 确保按钮存在
            prevButton.addEventListener('click', () => {
                prevSlide();
                stopAutoPlay();
                startAutoPlay();
            });

            nextButton.addEventListener('click', () => {
                nextSlide();
                stopAutoPlay();
                startAutoPlay();
            });
        }

        if (dots.length > 0) {  // 确保指示器存在
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    goToSlide(index);
                    stopAutoPlay();
                    startAutoPlay();
                });
            });
        }

        // 鼠标悬停时停止自动播放
        sliderWrapper.addEventListener('mouseenter', stopAutoPlay);
        sliderWrapper.addEventListener('mouseleave', startAutoPlay);

        // 初始化自动播放
        startAutoPlay();
    }

    // 搜索功能
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const resultsContainer = searchResults.querySelector('.results-list');
    const closeSearch = document.querySelector('.close-search');

    // 模拟的博客数据
    const blogPosts = [
        {
            title: '春日旅行记',
            content: '今天去了附近的公园，樱花开得正盛。阳光温暖，微风轻拂，是一个完美的春日午后...',
            category: '旅行',
            date: '2024-03-20'
        },
        {
            title: '尝试新食谱',
            content: '今天在家尝试了一个新的烘焙配方，虽然过程有点曲折，但最终成品还是很满意的...',
            category: '美食',
            date: '2024-03-18'
        },
        {
            title: '午后时光',
            content: '阳台上新种的绿植已经冒出了新芽，看着它们一天天成长，内心充满喜悦...',
            category: '生活',
            date: '2024-03-15'
        }
    ];

    // 搜索功能
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') return;
        
        const results = blogPosts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) ||
            post.content.toLowerCase().includes(searchTerm) ||
            post.category.toLowerCase().includes(searchTerm)
        );
        
        displayResults(results);
    });

    // 显示搜索结果
    function displayResults(results) {
        resultsContainer.innerHTML = '';
        
        if (results.length === 0) {
            resultsContainer.innerHTML = '<div class="result-item">没有找到相关内容</div>';
        } else {
            results.forEach(post => {
                const resultItem = document.createElement('div');
                resultItem.className = 'result-item';
                resultItem.innerHTML = `
                    <h4>${post.title}</h4>
                    <p>${post.content.substring(0, 100)}...</p>
                    <div class="post-meta">
                        <time>${post.date}</time>
                        <span class="category">${post.category}</span>
                    </div>
                `;
                resultsContainer.appendChild(resultItem);
            });
        }
        
        searchResults.classList.add('active');
    }

    // 关闭搜索结果
    closeSearch.addEventListener('click', () => {
        searchResults.classList.remove('active');
        searchInput.value = '';
    });

    // 点击背景关闭搜索结果
    searchResults.addEventListener('click', (e) => {
        if (e.target === searchResults) {
            searchResults.classList.remove('active');
            searchInput.value = '';
        }
    });

    // 保留移动端菜单功能
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // 点击其他区域关闭菜单
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-links') && !e.target.closest('.menu-toggle')) {
            navLinks.classList.remove('active');
        }
    });
}); 