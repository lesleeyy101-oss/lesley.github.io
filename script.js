// 立即创建缺失的元素，防止错误
document.addEventListener('DOMContentLoaded', function() {
  console.log('开始修复页面...');
  
  // 1. 创建缺失的互动元素
  createMissingElements();
  
  // 2. 立即显示页面
  document.body.style.opacity = '1';
  document.body.style.visibility = 'visible';
  
  // 3. 立即跳过开屏动画
  setTimeout(function() {
    const splash = document.getElementById('splashScreen');
    if (splash) {
      splash.style.opacity = '0';
      splash.style.pointerEvents = 'none';
      setTimeout(() => {
        splash.style.display = 'none';
      }, 800);
    }
  }, 100);
});

// 创建缺失的元素
function createMissingElements() {
  const worksInfo = document.querySelector('.works-info');
  if (worksInfo) {
    // 添加互动区域
    const interactionHTML = `
      <!-- 互动区域 -->
      <div class="works-interaction">
        <div class="interaction-buttons">
          <button class="interaction-btn like-btn">
            <span class="btn-icon">❤️</span>
            <span class="btn-text">点赞</span>
            <span class="count" id="like-count">0</span>
          </button>
          <button class="interaction-btn comment-btn">
            <span class="btn-icon">💬</span>
            <span class="btn-text">评论</span>
            <span class="count" id="comment-count">0</span>
          </button>
        </div>
        
        <!-- 评论预览 -->
        <div class="comments-preview">
          <div class="comments-header">
            <h5>最新评论</h5>
            <button class="view-all-comments">查看全部</button>
          </div>
          <div class="comments-list" id="comments-list">
            <!-- 评论会通过JS动态生成 -->
          </div>
        </div>
      </div>
    `;
    
    // 插入到作品详情后面
    const worksDetails = document.querySelector('.works-details');
    if (worksDetails) {
      const existingInteraction = worksDetails.querySelector('.works-interaction');
      if (!existingInteraction) {
        const description = worksDetails.querySelector('.works-description');
        if (description) {
          description.insertAdjacentHTML('afterend', interactionHTML);
        }
      }
    }
  }
}


// 修复自定义鼠标功能
function initSimpleCursor() {
  const cursor = document.querySelector('.cursor');
  if (!cursor) {
    console.warn('找不到自定义鼠标元素');
    return;
  }
  
  console.log('初始化自定义鼠标...');
  
  // 确保全局样式
  document.body.style.cursor = 'none';
  
  // 确保自定义鼠标可见
  cursor.style.display = 'block';
  cursor.style.opacity = '1';
  cursor.style.visibility = 'visible';
  cursor.style.zIndex = '99999';
  
  // 鼠标跟踪
  document.addEventListener('mousemove', function(e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  
  // 点击效果
  document.addEventListener('mousedown', function() {
    cursor.classList.add('click');
  });
  
  document.addEventListener('mouseup', function() {
    cursor.classList.remove('click');
  });
  
  // hover效果
  const hoverElements = document.querySelectorAll('a, button, .skill-card, .magnetic, .nav-btn, .filter-btn, .interaction-btn');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', function() {
      cursor.classList.add('hover');
    });
    el.addEventListener('mouseleave', function() {
      cursor.classList.remove('hover');
    });
  });
  
  console.log('自定义鼠标初始化完成');
}

// 作品数据
const worksData = [
  {
    id: 1,
    title: "响应式企业官网设计",
    category: "web",  // 网页设计
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop",
    size: "1920x1080px",
    format: "PNG",
    date: "2025.03",
    time: "创作周期：2周",
    tools: "工具：Figma, React, GSAP",
    tags: ["UI设计", "响应式", "现代风格", "企业官网"],
    likes: 24,
    comments: 8,
    description: "这是一个为科技公司设计的现代化响应式官网..."
  },
  {
    id: 2,
    title: "移动端电商APP界面",
    category: "web",  // 网页设计
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop",
    size: "1080x1920px",
    format: "JPG",
    date: "2025.02",
    time: "创作周期：3周",
    tools: "工具：Sketch, Swift, Firebase",
    tags: ["移动端", "电商", "用户体验", "APP设计"],
    likes: 42,
    comments: 15,
    description: "为电商平台设计的移动端APP界面..."
  },
  {
    id: 3,
    title: "秋天的样子 我画给你看",  // P2作品
    category: "poster",  // 海报设计
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&auto=format&fit=crop",
    size: "2480x3508px",
    format: "JPG",
    date: "2026.03.18",
    time: "创作周期：1天",
    tools: "工具：Procreate, Photoshop",
    tags: ["插画", "秋季", "海报", "艺术"],
    likes: 36,
    comments: 12,
    description: "一幅描绘秋季氛围的创意插画海报..."
  },
  {
    id: 4,
    title: "SMART CHASSIS 智能底盘",  // P3作品
    category: "poster",  // 海报设计
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop",
    size: "2480x3508px",
    format: "AI",
    date: "2026.03.18",
    time: "创作周期：1天",
    tools: "工具：Illustrator, After Effects",
    tags: ["科技", "汽车", "信息图", "海报"],
    likes: 28,
    comments: 7,
    description: "为汽车智能底盘技术设计的宣传海报..."
  },
  {
    id: 5,
    title: "品牌视觉识别系统",
    category: "other",  // 其他
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop",
    size: "2480x3508px",
    format: "AI",
    date: "2025.01",
    time: "创作周期：1个月",
    tools: "工具：Illustrator, Photoshop, InDesign",
    tags: ["品牌设计", "VI系统", "视觉识别"],
    likes: 18,
    comments: 6,
    description: "完整的品牌视觉识别系统设计..."
  },
  {
    id: 6,
    title: "年终汇报PPT模板",
    category: "ppt",  // PPT设计分类
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop",
    size: "1920x1080px",
    format: "PPTX",
    date: "2025.11",
    time: "创作周期：1周",
    tools: "工具：PowerPoint, Keynote",
    tags: ["PPT", "模板", "商务"],
    likes: 15,
    comments: 5,
    description: "为年终汇报设计的专业PPT模板..."
  },
  {
    id: 7,
    title: "产品宣传文案",
    category: "copywriting",  // 文案撰写分类
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&auto=format&fit=crop",
    size: "A4",
    format: "DOCX",
    date: "2025.09",
    time: "创作周期：3天",
    tools: "工具：Word, Grammarly",
    tags: ["文案", "营销", "写作"],
    likes: 22,
    comments: 4,
    description: "为新产品发布撰写的宣传文案..."
  }
];

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM加载完成');
  
  // 初始化鼠标功能
  initSimpleCursor();
  
  // 检查鼠标元素
  setTimeout(() => {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
      console.log('鼠标元素位置：', cursor.style.left, cursor.style.top);
      console.log('鼠标元素可见性：', cursor.style.display, cursor.style.visibility);
    }
  }, 1000);
  
  // 开屏动画功能 - 简化版
function skipSplash() {
  console.log('跳过开屏动画');
  const splash = document.getElementById('splashScreen');
  if (!splash) {
    console.warn('找不到开屏动画元素');
    return;
  }
  
  // 直接隐藏，不添加过渡效果
  splash.style.display = 'none';
  splash.style.opacity = '0';
  splash.style.pointerEvents = 'none';
  
  // 确保页面可交互
  document.body.style.overflow = 'auto';
  document.body.style.pointerEvents = 'auto';
}

// 页面加载完成后
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM加载完成');
  
  // 检查开屏动画
  const splash = document.getElementById('splashScreen');
  if (splash) {
    console.log('开屏动画已找到');
    
    // 强制设置样式
    splash.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #FDE8D3 0%, #F2E4D9 100%);
      opacity: 1;
      pointer-events: auto;
    `;
    
    // 5秒后自动跳过
    setTimeout(skipSplash, 5000);
    
    // 点击跳过
    splash.addEventListener('click', function(e) {
      console.log('点击跳过');
      e.stopPropagation();
      skipSplash();
    });
    
    // 键盘任意键跳过
    document.addEventListener('keydown', function(e) {
      console.log('按键:', e.key);
      if (splash.style.display !== 'none') {
        skipSplash();
      }
    });
  } else {
    console.warn('未找到开屏动画元素');
  }
});

// 页面完全加载后
window.addEventListener('load', function() {
  console.log('页面完全加载');
  
  // 确保页面可见
  document.body.style.opacity = '1';
  document.body.style.visibility = 'visible';
  
  // 最后检查开屏动画
  setTimeout(function() {
    const splash = document.getElementById('splashScreen');
    if (splash && splash.style.display !== 'none') {
      console.log('强制隐藏开屏动画');
      splash.style.display = 'none';
    }
  }, 6000); // 最多等6秒
});
  
// 作品展示模块功能
function initWorksGallery() {
  console.log('初始化作品展示...');
  
  const worksModal = document.getElementById('works-modal');
  if (!worksModal) {
    console.error('作品展示弹窗未找到');
    return;
  }
  
  let currentIndex = 0;
  let currentFilter = 'all';
  let filteredWorks = [...worksData];
  
  // 获取DOM元素
  const filterButtons = document.querySelectorAll('.filter-btn');
  const prevBtn = document.getElementById('prev-works');
  const nextBtn = document.getElementById('next-works');
  const counter = document.getElementById('works-counter');
  const thumbnails = document.getElementById('thumbnails');
  const toggleDescBtn = document.getElementById('toggle-desc');
  const descriptionContent = document.getElementById('description-content');
  const zoomInBtn = document.getElementById('zoom-in');
  const zoomOutBtn = document.getElementById('zoom-out');
  const fullscreenBtn = document.getElementById('fullscreen');
  const mainImage = document.getElementById('main-image');
  
  // 1. 分类筛选功能
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // 移除所有按钮的active类
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // 给当前点击的按钮添加active类
      this.classList.add('active');
      
      // 获取筛选条件
      currentFilter = this.dataset.filter;
      currentIndex = 0; // 重置为第一个作品
      
      // 筛选作品
      if (currentFilter === 'all') {
        filteredWorks = [...worksData];
      } else {
        filteredWorks = worksData.filter(work => work.category === currentFilter);
      }
      
      // 如果没有作品，显示空状态
      if (filteredWorks.length === 0) {
        showEmptyState();
      } else {
        // 显示第一个作品
        showWork(currentIndex);
        // 更新缩略图
        updateThumbnails();
      }
    });
  });
  
  // 2. 显示作品详情
  function showWork(index) {
    if (filteredWorks.length === 0) return;
    
    const work = filteredWorks[index];
    
    // 更新主图
    if (mainImage) {
      mainImage.src = work.image;
      mainImage.alt = work.title;
    }
    
    // 更新信息
    updateElementText('works-title', work.title);
    updateElementText('works-time', work.time);
    updateElementText('works-tools', work.tools);
    updateElementText('image-size', work.size);
    updateElementText('image-format', work.format);
    updateElementText('image-date', work.date);
    updateElementText('like-count', work.likes);
    updateElementText('comment-count', work.comments);
    
    // 更新标签
    const worksTags = document.getElementById('works-tags');
    if (worksTags) {
      worksTags.innerHTML = '';
      work.tags.forEach(tag => {
        const tagSpan = document.createElement('span');
        tagSpan.className = 'tag';
        tagSpan.textContent = tag;
        worksTags.appendChild(tagSpan);
      });
    }
    
    // 更新描述
    if (descriptionContent) {
      const firstPara = descriptionContent.querySelector('p');
      if (firstPara) {
        firstPara.textContent = work.description;
      } else {
        descriptionContent.innerHTML = `<p>${work.description}</p>`;
      }
    }
    
    // 更新计数器
    if (counter) {
      counter.textContent = `${index + 1} / ${filteredWorks.length}`;
    }
    
    // 更新导航按钮状态
    updateButtonState(prevBtn, index === 0);
    updateButtonState(nextBtn, index === filteredWorks.length - 1);
  }
  
  function updateElementText(id, text) {
    const element = document.getElementById(id);
    if (element) element.textContent = text;
  }
  
  function updateButtonState(button, disabled) {
    if (button) {
      button.disabled = disabled;
      button.style.opacity = disabled ? '0.5' : '1';
      button.style.cursor = disabled ? 'not-allowed' : 'pointer';
    }
  }
  
  // 3. 更新缩略图
  function updateThumbnails() {
    if (!thumbnails) return;
    
    thumbnails.innerHTML = '';
    
    filteredWorks.forEach((work, index) => {
      const thumbnail = document.createElement('div');
      thumbnail.className = 'thumbnail';
      if (index === currentIndex) {
        thumbnail.classList.add('active');
      }
      
      thumbnail.innerHTML = `<img src="${work.image}" alt="${work.title}">`;
      
      thumbnail.addEventListener('click', () => {
        currentIndex = index;
        showWork(currentIndex);
        updateThumbnails();
      });
      
      thumbnails.appendChild(thumbnail);
    });
  }
  
  // 4. 显示空状态
  function showEmptyState() {
    if (mainImage) {
      mainImage.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNjY2MiPuaCqOe7hOS7tuS4jeWtmOWcqC4uLjwvdGV4dD48L3N2Zz4=';
      mainImage.alt = '暂无作品';
    }
    
    updateElementText('works-title', '暂无作品');
    updateElementText('works-counter', '0 / 0');
    updateElementText('works-time', '');
    updateElementText('works-tools', '');
    updateElementText('image-size', '');
    updateElementText('image-format', '');
    updateElementText('image-date', '');
    updateElementText('like-count', '0');
    updateElementText('comment-count', '0');
    
    const worksTags = document.getElementById('works-tags');
    if (worksTags) worksTags.innerHTML = '';
    
    if (descriptionContent) {
      descriptionContent.innerHTML = '<p>当前分类下暂无作品，敬请期待！</p>';
    }
    
    if (thumbnails) thumbnails.innerHTML = '';
    
    updateButtonState(prevBtn, true);
    updateButtonState(nextBtn, true);
  }
  
  // 5. 上一页/下一页功能
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        showWork(currentIndex);
        updateThumbnails();
      }
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentIndex < filteredWorks.length - 1) {
        currentIndex++;
        showWork(currentIndex);
        updateThumbnails();
      }
    });
  }
  
  // 6. 展开/收起描述
  if (toggleDescBtn && descriptionContent) {
    toggleDescBtn.addEventListener('click', function() {
      const isExpanded = descriptionContent.classList.contains('expanded');
      
      if (isExpanded) {
        descriptionContent.classList.remove('expanded');
        this.textContent = '展开详情 ↓';
      } else {
        descriptionContent.classList.add('expanded');
        this.textContent = '收起详情 ↑';
      }
    });
  }
  
  // 7. 图片缩放功能
  if (zoomInBtn && mainImage) {
    zoomInBtn.addEventListener('click', function() {
      let currentScale = parseFloat(mainImage.style.transform.replace('scale(', '').replace(')', '')) || 1;
      mainImage.style.transform = `scale(${currentScale + 0.2})`;
    });
  }
  
  if (zoomOutBtn && mainImage) {
    zoomOutBtn.addEventListener('click', function() {
      let currentScale = parseFloat(mainImage.style.transform.replace('scale(', '').replace(')', '')) || 1;
      if (currentScale > 0.5) {
        mainImage.style.transform = `scale(${currentScale - 0.2})`;
      }
    });
  }
  
  if (fullscreenBtn && mainImage) {
    fullscreenBtn.addEventListener('click', function() {
      if (mainImage.requestFullscreen) {
        mainImage.requestFullscreen();
      } else if (mainImage.webkitRequestFullscreen) {
        mainImage.webkitRequestFullscreen();
      } else if (mainImage.mozRequestFullScreen) {
        mainImage.mozRequestFullScreen();
      } else if (mainImage.msRequestFullscreen) {
        mainImage.msRequestFullscreen();
      }
    });
  }
  
  // 8. 键盘导航
  document.addEventListener('keydown', function(e) {
    if (!worksModal.classList.contains('show')) return;
    
    if (e.key === 'ArrowLeft') {
      if (currentIndex > 0) {
        currentIndex--;
        showWork(currentIndex);
        updateThumbnails();
      }
    } else if (e.key === 'ArrowRight') {
      if (currentIndex < filteredWorks.length - 1) {
        currentIndex++;
        showWork(currentIndex);
        updateThumbnails();
      }
    } else if (e.key === 'Escape') {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }
  });
  
  // 初始化显示
  showWork(currentIndex);
  updateThumbnails();
  
  console.log('作品展示初始化完成');
}

// 平滑跳过功能
function skipSplash() {
  console.log('跳过开屏动画');
  
  const splashScreen = document.getElementById('splashScreen');
  if (!splashScreen) return;
  
  // 创建波纹效果
  createRippleEffect();
  
  // 添加淡出效果
  splashScreen.style.opacity = '0';
  splashScreen.style.transform = 'scale(0.98)';
  splashScreen.style.pointerEvents = 'none';
  splashScreen.style.transition = 'opacity 0.8s ease, transform 1s ease';
  
  // 短暂延迟后隐藏
  setTimeout(() => {
    splashScreen.style.display = 'none';
  }, 800);
}

// 创建点击波纹效果
function createRippleEffect() {
  const splashScreen = document.getElementById('splashScreen');
  if (!splashScreen) return;
  
  const ripple = document.createElement('div');
  
  ripple.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(circle, rgba(153, 205, 216, 0.2) 0%, transparent 70%);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 10000;
  `;
  
  splashScreen.appendChild(ripple);
  
  // 波纹动画
  requestAnimationFrame(() => {
    ripple.style.width = '200px';
    ripple.style.height = '200px';
    ripple.style.opacity = '0';
    ripple.style.transition = 'all 0.6s ease-out';
  });
  
  // 清理
  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.parentNode.removeChild(ripple);
    }
  }, 600);
}

// 修复作品展示弹窗功能
document.addEventListener('DOMContentLoaded', function() {
  // 检查弹窗是否存在
  const worksModal = document.getElementById('works-modal');
  const worksLink = document.getElementById('works-link');
  const closeWorks = document.getElementById('close-works');
  
  if (!worksModal || !worksLink || !closeWorks) {
    console.error('作品展示弹窗元素未找到！');
    return;
  }
  
  console.log('作品展示功能初始化...');
  
  // 打开弹窗
  worksLink.addEventListener('click', function(e) {
    e.preventDefault();
    worksModal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // 确保鼠标可见
    const cursor = document.querySelector('.cursor');
    if (cursor) {
      cursor.style.zIndex = '10000';
    }
  });
  
  // 关闭弹窗
  closeWorks.addEventListener('click', function() {
    worksModal.classList.remove('show');
    document.body.style.overflow = '';
  });
  
  // 点击背景关闭
  worksModal.addEventListener('click', function(e) {
    if (e.target === worksModal) {
      worksModal.classList.remove('show');
      document.body.style.overflow = '';
    }
  });
  
  // ESC键关闭
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && worksModal.classList.contains('show')) {
      worksModal.classList.remove('show');
      document.body.style.overflow = '';
    }
  });
  
  // 初始化作品展示
  initWorksGallery();
});

// 确保页面完全加载后执行
window.addEventListener('load', function() {
  console.log('页面完全加载完成');
  
  // 再次确保开屏动画正常工作
  const splashScreen = document.getElementById('splashScreen');
  if (splashScreen) {
    console.log('开屏动画状态：', splashScreen.style.display);
  }
});
