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

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM加载完成');
  initSimpleCursor();
  
  // 延迟检查
  setTimeout(() => {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
      console.log('鼠标元素位置：', cursor.style.left, cursor.style.top);
      console.log('鼠标元素可见性：', cursor.style.display, cursor.style.visibility);
    }
  }, 1000);
});
const cursor = document.querySelector(".cursor");

let mx = 0, my = 0;
let x = 0, y = 0;

/* ===== 鼠标跟随（丝滑） ===== */
document.addEventListener("mousemove", e => {
  mx = e.clientX;
  my = e.clientY;
});

function loop() {
  x += (mx - x) * 0.18;
  y += (my - y) * 0.18;

  cursor.style.left = x + "px";
  cursor.style.top = y + "px";

  requestAnimationFrame(loop);
}
loop();

/* ===== 点击压感 ===== */
document.addEventListener("mousedown", () => {
  cursor.classList.add("click");
});

document.addEventListener("mouseup", () => {
  cursor.classList.remove("click");
});

/* ===== hover 放大（关键） ===== */
document.querySelectorAll("a, .skill-card, .lab-item").forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("hover");
  });
  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
  });
});

/* ===== fade 动画 ===== */
const fades = document.querySelectorAll(".fade");

window.addEventListener("scroll", () => {
  fades.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
});

/* ===== modal ===== */
function openSkill(id) {
  document.getElementById("modal").classList.add("show");

  document.querySelectorAll(".prompt").forEach(el => {
    el.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");
}

function closeSkill() {
  document.getElementById("modal").classList.remove("show");
}

/* ===== lab ===== */
function openLab() {
  const p = document.getElementById("popup");
  p.innerText = "Lab 已打开，请选择 Skill";
  p.classList.add("show");
  setTimeout(() => p.classList.remove("show"), 2000);
}

let currentSkill = null;

/* 选择 skill */
function selectSkill(id){
  console.log("🔥 selectSkill 被调用！id =", id);
  
  currentSkill = id;
  const skillName = id === 'p1' ? '🧠 价值放大系统' : '👨‍💼 面试分析系统';
  
  // 更新显示
  document.getElementById("labSkillIndicator").innerHTML = `🎯 当前选择: <strong>${skillName}</strong>`;
  document.getElementById("currentSkill").innerText = "当前 Skill：" + skillName;
  
  // 显示提示
  const popup = document.getElementById("popup");
  popup.innerText = `已选择: ${skillName}`;
  popup.classList.add("show");
  setTimeout(() => popup.classList.remove("show"), 2000);
  
  // 调试信息
  console.log("✅ 已选择技能:", id, skillName);
  console.log("📊 currentSkill 值:", currentSkill);
}

/* 执行 skill */
function runSkill(){
  console.log("🔥 runSkill 被调用！");
  console.log("📊 currentSkill =", currentSkill);
  
  if(!currentSkill){
    alert("❌ 请先选择 Skill！");
    return;
  }

  const input = document.getElementById("labInput").value.trim();
  console.log("📝 输入内容:", input);
  
  if (!input) {
    alert("❌ 请输入内容");
    return;
  }

  const output = document.getElementById("labOutput");
  output.innerText = "⏳ 正在处理中，请稍候...";
  console.log("✅ 已显示处理中状态");
  
  setTimeout(() => {
    // 获取选中的prompt内容
    const promptEl = document.getElementById(currentSkill);
    let promptPreview = "";
    
    if (promptEl) {
      promptPreview = promptEl.textContent.substring(0, 200) + "...";
    }
    
    let result = "";
    if (currentSkill === 'p1') {
      result = `🧠 价值放大系统运行结果
================================
📥 你的输入：
${input}
--------------------------------
📄 Prompt 内容预览：
${promptPreview}
--------------------------------
💡 使用建议：
1. 点击上方"价值放大系统"卡片查看完整Prompt
2. 复制Prompt内容
3. 粘贴到 ChatGPT/Claude/Kimi 等AI
4. 输入你的需求
5. AI会按照6步流程自动处理
--------------------------------
🚀 处理流程：
1. 🔍 信息检索与验证
2. 🎯 受众与目标分析
3. ✍️ 文字口径选择
4. 📊 数据口径选择
5. 📝 内容创作
6. ✅ 自我检查`;
    } else if (currentSkill === 'p2') {
      result = `👨‍💼 面试分析系统运行结果
================================
📥 你的输入：
${input}
--------------------------------
📄 Prompt 内容预览：
${promptPreview}
--------------------------------
💡 使用建议：
1. 点击上方"面试分析系统"卡片查看完整Prompt
2. 复制Prompt内容
3. 粘贴到支持联网的AI（如Kimi/Claude）
4. 输入：公司名称 + JD描述/链接
5. AI会自动搜索并生成完整分析报告
--------------------------------
🚀 处理流程：
🔸 第零步：招聘链接识别
🔸 第一步：公司全面研究
🔸 第二步：深度商业分析
🔸 第三步：JD深度拆解
🔸 第三步半：技能补足建议
🔸 第四步：面试准备建议
🔸 第五步：综合分析与建议`;
    }
    
    output.innerText = result;
    console.log("✅ 已显示处理结果");
    
    const popup = document.getElementById("popup");
    popup.innerText = "✅ 处理完成！";
    popup.classList.add("show");
    setTimeout(() => popup.classList.remove("show"), 2000);
  }, 1500);
}

function copyPrompt() {
  if (!currentSkill) {
    alert("请先选择 Skill");
    return;
  }
  
  const promptEl = document.getElementById(currentSkill);
  if (!promptEl) {
    alert("找不到Prompt内容");
    return;
  }
  
  const promptText = promptEl.textContent;
  
  // 方法1：使用现代Clipboard API（优先）
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(promptText)
      .then(() => {
        // 显示成功提示，而不是alert
        showPopup("✅ Prompt 已成功复制到剪贴板！");
      })
      .catch(err => {
        console.error("Clipboard API 失败:", err);
        // 降级到方法2
        fallbackCopyText(promptText);
      });
  } else {
    // 浏览器不支持Clipboard API，使用降级方案
    fallbackCopyText(promptText);
  }
}

// 降级复制方法（兼容旧浏览器）
function fallbackCopyText(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand("copy");
    if (successful) {
      showPopup("✅ Prompt 已成功复制到剪贴板！");
    } else {
      showPopup("❌ 复制失败，请手动复制内容");
      // 自动选中文本以便用户手动复制
      textArea.select();
    }
  } catch (err) {
    console.error("降级复制失败:", err);
    showPopup("❌ 复制失败，请手动选中并复制文本");
  }
  
  document.body.removeChild(textArea);
}

// 优化showPopup函数
function showPopup(message) {
  const popup = document.getElementById("popup");
  popup.innerText = message;
  popup.classList.add("show");
  
  // 根据消息类型设置不同样式
  if (message.includes("✅")) {
    popup.style.backgroundColor = "#DAEBE3"; // 绿色背景
    popup.style.color = "#657166";
  } else if (message.includes("❌")) {
    popup.style.backgroundColor = "#F5C3B2"; // 橙色背景
    popup.style.color = "#657166";
  }
  
  setTimeout(() => {
    popup.classList.remove("show");
  }, 3000);
}

/* ===== 磁吸（增强版） ===== */
document.querySelectorAll(".magnetic").forEach(el => {

  el.addEventListener("mousemove", e => {
    const r = el.getBoundingClientRect();

    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);

    el.style.transform = `translate(${dx * 0.15}px, ${dy * 0.15}px)`;
  });

  el.addEventListener("mouseenter", () => {
    cursor.classList.add("hover");
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = "";
    cursor.classList.remove("hover");
  });

});

// 调试：确保函数可用
console.log("script.js 加载完成");
console.log("selectSkill 函数:", typeof selectSkill);
console.log("runSkill 函数:", typeof runSkill);


/* ===== 增强功能函数 ===== */

// 1. 复制Prompt到剪贴板
function copyPrompt() {
  if (!currentSkill) {
    alert("请先选择 Skill");
    return;
  }
  
  const promptEl = document.getElementById(currentSkill);
  if (!promptEl) {
    alert("找不到Prompt内容");
    return;
  }
  
  const promptText = promptEl.textContent;
  navigator.clipboard.writeText(promptText)
    .then(() => {
      showPopup("✅ Prompt 已复制到剪贴板！");
    })
    .catch(err => {
      console.error("复制失败:", err);
      // 降级方案
      const textArea = document.createElement("textarea");
      textArea.value = promptText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      showPopup("✅ Prompt 已复制到剪贴板！");
    });
}

// 2. 打开ChatGPT
function openInChatGPT() {
  if (!currentSkill) {
    alert("请先选择 Skill");
    return;
  }
  
  const promptEl = document.getElementById(currentSkill);
  const input = document.getElementById("labInput").value.trim();
  
  if (!promptEl) {
    alert("找不到Prompt内容");
    return;
  }
  
  // 复制Prompt到剪贴板
  const promptText = promptEl.textContent;
  navigator.clipboard.writeText(promptText)
    .then(() => {
      // 在新标签页打开ChatGPT
      window.open("https://chat.openai.com/", "_blank");
      showPopup("✅ Prompt 已复制，正在打开 ChatGPT...");
      
      // 提示用户下一步操作
      setTimeout(() => {
        if (confirm("Prompt 已复制！\n\n请到 ChatGPT 中：\n1. 粘贴 Prompt\n2. 输入你的需求\n\n是否需要查看使用教程？")) {
          window.open("https://help.openai.com/", "_blank");
        }
      }, 1000);
    })
    .catch(err => {
      console.error("复制失败:", err);
      alert("复制失败，请手动复制Prompt");
    });
}

// 3. 打开Claude
function openInClaude() {
  if (!currentSkill) {
    alert("请先选择 Skill");
    return;
  }
  
  const promptEl = document.getElementById(currentSkill);
  if (!promptEl) {
    alert("找不到Prompt内容");
    return;
  }
  
  const promptText = promptEl.textContent;
  navigator.clipboard.writeText(promptText)
    .then(() => {
      window.open("https://claude.ai/", "_blank");
      showPopup("✅ Prompt 已复制，正在打开 Claude...");
    })
    .catch(err => {
      console.error("复制失败:", err);
      alert("复制失败，请手动复制Prompt");
    });
}

// 4. 打开Kimi
function openInKimi() {
  if (!currentSkill) {
    alert("请先选择 Skill");
    return;
  }
  
  const promptEl = document.getElementById(currentSkill);
  if (!promptEl) {
    alert("找不到Prompt内容");
    return;
  }
  
  const promptText = promptEl.textContent;
  navigator.clipboard.writeText(promptText)
    .then(() => {
      window.open("https://kimi.moonshot.cn/", "_blank");
      showPopup("✅ Prompt 已复制，正在打开 Kimi...");
    })
    .catch(err => {
      console.error("复制失败:", err);
      alert("复制失败，请手动复制Prompt");
    });
}

// 5. 生成分享链接
function generateShareLink() {
  if (!currentSkill) {
    alert("请先选择 Skill");
    return;
  }
  
  const input = document.getElementById("labInput").value.trim();
  if (!input) {
    alert("请输入内容后再生成分享链接");
    return;
  }
  
  // 创建可分享的数据对象
  const shareData = {
    skill: currentSkill,
    input: input,
    timestamp: new Date().toISOString()
  };
  
  // 将数据编码为Base64
  const encodedData = btoa(JSON.stringify(shareData));
  
  // 生成分享链接
  const currentUrl = window.location.href.split('?')[0];
  const shareUrl = `${currentUrl}?share=${encodedData}`;
  
  // 复制链接到剪贴板
  navigator.clipboard.writeText(shareUrl)
    .then(() => {
      showPopup("🔗 分享链接已复制！\n\n将此链接发送给他人，他们可以直接打开你的配置。");
      
      // 显示分享链接预览
      const preview = document.createElement("div");
      preview.innerHTML = `
        <div style="background:#f5f5f5; padding:15px; border-radius:8px; margin-top:10px; word-break:break-all;">
          <strong>分享链接：</strong><br>
          <small>${shareUrl.substring(0, 50)}...</small>
        </div>
      `;
      document.getElementById("labOutput").appendChild(preview);
    })
    .catch(err => {
      console.error("复制失败:", err);
      alert("生成分享链接失败");
    });
}

// 6. 保存模板
function saveTemplate() {
  const input = document.getElementById("labInput").value.trim();
  if (!input) {
    alert("请输入内容后再保存");
    return;
  }
  
  localStorage.setItem("template", input);
  showPopup("✅ 模板已保存到本地！");
}

// 7. 加载上次模板
function loadLastTemplate() {
  const saved = localStorage.getItem("template");
  if (saved) {
    document.getElementById("labInput").value = saved;
    showPopup("✅ 已加载上次保存的模板");
  } else {
    showPopup("ℹ️ 没有找到保存的模板");
  }
}

// 8. 清空输入
function clearInput() {
  if (confirm("确定要清空输入框吗？")) {
    document.getElementById("labInput").value = "";
    showPopup("🗑️ 输入框已清空");
  }
}

// 9. 增强的弹出提示函数
function showPopup(message) {
  const popup = document.getElementById("popup");
  popup.innerHTML = message;
  popup.classList.add("show");
  
  // 自动关闭时间根据消息长度调整
  const duration = Math.min(Math.max(message.length * 50, 2000), 5000);
  setTimeout(() => {
    popup.classList.remove("show");
  }, duration);
}

// 10. 页面加载时检查分享链接
function checkShareLink() {
  const urlParams = new URLSearchParams(window.location.search);
  const shareData = urlParams.get('share');
  
  if (shareData) {
    try {
      const data = JSON.parse(atob(shareData));
      
      // 设置选择的skill
      if (data.skill === 'p1' || data.skill === 'p2') {
        selectSkill(data.skill);
      }
      
      // 设置输入内容
      if (data.input) {
        setTimeout(() => {
          document.getElementById("labInput").value = data.input;
          showPopup("🔗 已加载分享的配置");
        }, 500);
      }
      
      // 清除URL中的分享参数
      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (err) {
      console.error("解析分享链接失败:", err);
    }
  }
  
  // 加载上次的选择
  const lastSkill = localStorage.getItem("lastSkill");
  if (lastSkill && (lastSkill === 'p1' || lastSkill === 'p2')) {
    // 不自动选择，但记录
    console.log("上次选择的Skill:", lastSkill);
  }
}

// 11. 修改selectSkill函数，保存选择
function selectSkill(id){
  currentSkill = id;
  const skillName = id === 'p1' ? '🧠 价值放大系统' : '👨‍💼 面试分析系统';
  
  // 保存到localStorage
  localStorage.setItem("lastSkill", id);
  
  // 更新显示
  document.getElementById("labSkillIndicator").innerHTML = `🎯 当前选择: <strong>${skillName}</strong>`;
  document.getElementById("currentSkill").innerText = "当前 Skill：" + skillName;
  
  // 显示提示
  showPopup(`✅ 已选择: ${skillName}`);
  
  console.log("✅ 已选择技能:", id, skillName);
}

// 页面加载完成后检查分享链接
window.addEventListener('DOMContentLoaded', checkShareLink);

// 3. 添加其他AI平台的跳转函数
function openInGemini() {
  if (!currentSkill) {
    showPopup("请先选择 Skill");
    return;
  }
  window.open("https://gemini.google.com/", "_blank");
  showPopup("✅ 正在打开 Gemini...");
}

function openInPerplexity() {
  if (!currentSkill) {
    showPopup("请先选择 Skill");
    return;
  }
  window.open("https://www.perplexity.ai/", "_blank");
  showPopup("✅ 正在打开 Perplexity...");
}

function openInDeepSeek() {
  if (!currentSkill) {
    showPopup("请先选择 Skill");
    return;
  }
  window.open("https://chat.deepseek.com/", "_blank");
  showPopup("✅ 正在打开 DeepSeek...");
}

function openInTongyi() {
  if (!currentSkill) {
    showPopup("请先选择 Skill");
    return;
  }
  window.open("https://tongyi.aliyun.com/", "_blank");
  showPopup("✅ 正在打开 通义千问...");
}

function openInWenxin() {
  if (!currentSkill) {
    showPopup("请先选择 Skill");
    return;
  }
  window.open("https://yiyan.baidu.com/", "_blank");
  showPopup("✅ 正在打开 文心一言...");
}

function openInSpark() {
  if (!currentSkill) {
    showPopup("请先选择 Skill");
    return;
  }
  window.open("https://xinghuo.xfyun.cn/", "_blank");
  showPopup("✅ 正在打开 讯飞星火...");
}

function openInZhipu() {
  if (!currentSkill) {
    showPopup("请先选择 Skill");
    return;
  }
  window.open("https://chatglm.cn/", "_blank");
  showPopup("✅ 正在打开 智谱清言...");
}

function openInHunyuan() {
  if (!currentSkill) {
    showPopup("请先选择 Skill");
    return;
  }
  window.open("https://hunyuan.tencent.com/", "_blank");
  showPopup("✅ 正在打开 腾讯混元...");
}

function openInMoonshot() {
  if (!currentSkill) {
    showPopup("请先选择 Skill");
    return;
  }
  window.open("https://www.moonshot.cn/", "_blank");
  showPopup("✅ 正在打开 Moonshot...");
}

// 获取弹窗元素
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');

// 点击弹窗的遮罩背景（.modal）时关闭弹窗
modal.addEventListener('click', function(event) {
  // 确保点击事件发生在遮罩层本身，而不是其子元素（如.modal-content）上
  if (event.target === modal) {
    closeModal();
  }
});

// 点击关闭按钮 (.close) 的函数
document.querySelector('.close').addEventListener('click', closeModal);

// 按键盘ESC键关闭弹窗
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && modal.classList.contains('show')) {
    closeModal();
  }
});

function closeModal() {
  modal.classList.remove('show');
  // 如果需要，也可以在这里添加其他关闭逻辑，如重置表单等
}

// 作品数据
const worksData = [
    {
        id: 1,
        title: "产品UI界面设计",
        description: "移动端应用用户界面设计，注重用户体验和视觉美感。",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["UI设计", "产品", "界面"],
        category: "other",
        date: "2025-07-10",
        views: 187
    },
    {
        id: 2,
        title: "品牌VI系统设计",
        description: "为新兴科技公司设计的完整品牌视觉识别系统。",
        image: "https://picsum.photos/800/600/?random=1&ui,design",
        tags: ["品牌设计", "VI系统", "视觉"],
        category: "poster",
        date: "2025-06-28",
        views: 112
    },
    {
        id: 3,
        title: "社交媒体营销文案",
        description: "为多个品牌创作的社交媒体营销文案，提升用户参与度和转化率。",
        image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["文案撰写", "营销", "社交媒体"],
        category: "copywriting",
        date: "2025-06-15",
        views: 204
    },
    {
        id: 4,
        title: "SMART CHASSIS 智能底盘海报",
        description: "汽车智能底盘技术宣传海报，现代简约风格，突出科技感和未来感。",
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["海报设计", "科技", "汽车"],
        category: "poster",
        date: "2025-08-02",
        views: 128
    },
    {
        id: 5,
        title: "公众号推文案例",
        description: "基于公众号推文的展示案例，提升用户参与度和转化率。",
        image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["文案撰写", "公众号", "新闻稿"],
        category: "copywriting",
        date: "2025-07-25",
        views: 96
    },
    {
        id: 6,
        title: "企业年度报告PPT设计",
        description: "年度报告演示文稿，数据可视化呈现清晰，设计专业大气。",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["PPT设计", "企业", "报告"],
        category: "ppt",
        date: "2025-07-18",
        views: 152
    }
];

// DOM元素
const worksGrid = document.getElementById('works-grid');
const filterButtons = document.querySelectorAll('.filter-btn');

// 当前筛选状态
let currentFilter = 'all';

// 初始化
function initWorksPage() {
    renderWorks();
    setupEventListeners();
    setupImageErrorHandling();
    setupWechatModal(); // 初始化公众号推文弹窗
}

// 渲染作品
function renderWorks() {
    let filteredWorks;
    
    if (currentFilter === 'all') {
        filteredWorks = [...worksData];
    } else {
        filteredWorks = worksData.filter(work => work.category === currentFilter);
    }
    
    if (filteredWorks.length === 0) {
        worksGrid.innerHTML = `
            <div class="empty-state">
                <h3>暂无作品</h3>
                <p>当前分类下还没有作品，请尝试其他分类</p>
            </div>
        `;
        return;
    }
    
    worksGrid.innerHTML = filteredWorks.map(work => `
        <div class="grid-item" data-id="${work.id}">
            <div class="grid-img-container">
                <img src="${work.image}" 
                     alt="${work.title}" 
                     class="grid-img"
                     loading="lazy"
                     onerror="this.parentElement.classList.add('img-error')">
            </div>
            <div class="grid-content">
                <h3 class="grid-title">${work.title}</h3>
                <p class="grid-desc">${work.description}</p>
                <div class="grid-tags">
                    ${work.tags.map(tag => `<span class="grid-tag">${tag}</span>`).join('')}
                </div>
                <div class="grid-meta">
                    <span class="grid-date">${work.date}</span>
                    <span class="grid-views">${work.views} 浏览</span>
                </div>
            </div>
        </div>
    `).join('');
    
    // 为每个作品项添加点击事件
    document.querySelectorAll('.grid-item').forEach(item => {
        item.addEventListener('click', function() {
            const workId = this.getAttribute('data-id');
            const work = worksData.find(w => w.id == workId);
            if (work) {
                // 特殊处理：如果是公众号推文案例，打开公众号推文弹窗
                if (work.id === 5) {
                    openWechatModal();
                } else {
                    showWorkDetail(work);
                }
            }
        });
    });
}

// 显示作品详情（简单弹窗）
function showWorkDetail(work) {
    const detailHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        ">
            <div style="
                background: white;
                border-radius: 16px;
                padding: 30px;
                max-width: 600px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
            ">
                <button style="
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #64748B;
                " onclick="this.parentElement.parentElement.remove()">×</button>
                
                <img src="${work.image}" 
                     alt="${work.title}"
                     style="width: 100%; height: 300px; object-fit: cover; border-radius: 12px; margin-bottom: 20px;">
                
                <h2 style="color: #1E293B; margin-bottom: 15px;">${work.title}</h2>
                
                <p style="color: #64748B; margin-bottom: 20px; line-height: 1.6;">${work.description}</p>
                
                <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px;">
                    ${work.tags.map(tag => `<span style="
                        padding: 6px 14px;
                        background: rgba(74, 144, 226, 0.1);
                        border-radius: 20px;
                        color: #4A90E2;
                        font-size: 14px;
                    ">${tag}</span>`).join('')}
                </div>
                
                <div style="
                    display: flex;
                    justify-content: space-between;
                    color: #94A3B8;
                    font-size: 14px;
                    padding-top: 20px;
                    border-top: 1px solid #E2E8F0;
                ">
                    <span>📅 ${work.date}</span>
                    <span>👁️ ${work.views} 浏览</span>
                </div>
            </div>
        </div>
    `;
    
    const detailContainer = document.createElement('div');
    detailContainer.innerHTML = detailHTML;
    document.body.appendChild(detailContainer);
}

// 图片错误处理
function setupImageErrorHandling() {
    document.querySelectorAll('.grid-img').forEach(img => {
        img.addEventListener('error', function() {
            this.parentElement.classList.add('img-error');
        });
    });
}

// 筛选作品
function filterWorks(category) {
    currentFilter = category;
    renderWorks();
}

// 设置事件监听器
function setupEventListeners() {
    // 筛选按钮
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的active类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 给当前点击的按钮添加active类
            this.classList.add('active');
            
            // 获取筛选条件
            const filterType = this.dataset.filter;
            filterWorks(filterType);
        });
    });
    
    // 键盘筛选支持
    document.addEventListener('keydown', function(e) {
        // 按数字键快速筛选
        if (e.key >= '1' && e.key <= '5') {
            const index = parseInt(e.key) - 1;
            if (index < filterButtons.length) {
                filterButtons[index].click();
            }
        }
    });
}

// ============================================
// 公众号推文弹窗相关功能
// ============================================

// 公众号文章数据
const wechatArticles = [
    {
        id: 1,
        title: "昂创科技完成Pre-A轮数千万元融资，长兴基地量产在即，为合作伙伴构建稳定供应链",
        description: "融资+量产双轮驱动，昂创科技以全主动液压悬架技术，赋能新能源汽车底盘升级",
        date: "2025-06-15",
        views: 204,
        link: "article-detail-1.html"
    },
    {
        id: 2,
        title: "新能源汽车智能化发展趋势分析",
        description: "深度解析2025年新能源汽车智能化发展路径与市场机遇",
        date: "2025-05-20",
        views: 156,
        link: "#"
    },
    {
        id: 3,
        title: "智能制造工厂建设指南",
        description: "如何打造高效、智能的现代化生产基地",
        date: "2025-04-10",
        views: 189,
        link: "#"
    },
    {
        id: 4,
        title: "供应链数字化转型升级策略",
        description: "传统制造业供应链数字化转型的实践与思考",
        date: "2025-03-25",
        views: 172,
        link: "#"
    },
    {
        id: 5,
        title: "新能源汽车零部件国产化替代机遇",
        description: "分析关键零部件国产化替代的市场空间与挑战",
        date: "2025-02-18",
        views: 198,
        link: "#"
    }
];

// 初始化公众号推文弹窗
function setupWechatModal() {
    // 创建弹窗HTML结构
    const modalHTML = `
        <div class="wechat-articles-modal" id="wechatArticlesModal">
            <button class="close-modal" onclick="closeWechatModal()">×</button>
            <div class="modal-content">
                <div class="modal-header">
                    <h2>公众号推文速览</h2>
                    <div class="search-box">
                        <input type="text" placeholder="搜索公众号推文..." id="articleSearch">
                    </div>
                </div>
                <div class="articles-list" id="articlesList">
                    <!-- 文章列表会通过JavaScript动态生成 -->
                </div>
            </div>
        </div>
    `;
    
    // 将弹窗添加到页面
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .wechat-articles-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 2000;
            justify-content: center;
            align-items: center;
        }
        
        .wechat-articles-modal.active {
            display: flex;
        }
        
        .wechat-articles-modal .modal-content {
            background: white;
            width: 90%;
            max-width: 800px;
            height: 80vh;
            border-radius: 20px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
        
        .wechat-articles-modal .modal-header {
            padding: 20px 30px;
            background: linear-gradient(135deg, #4A90E2, #FF6B9D);
            color: white;
        }
        
        .wechat-articles-modal .modal-header h2 {
            margin: 0 0 15px 0;
            font-size: 1.5rem;
        }
        
        .wechat-articles-modal .search-box {
            margin-top: 10px;
        }
        
        .wechat-articles-modal .search-box input {
            width: 100%;
            padding: 12px 20px;
            border: none;
            border-radius: 25px;
            background: rgba(255, 255, 255, 0.9);
            font-size: 1rem;
        }
        
        .wechat-articles-modal .articles-list {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
        }
        
        .wechat-articles-modal .article-item {
            background: #f8f9fa;
            border-left: 4px solid #4A90E2;
            padding: 20px;
            margin-bottom: 15px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: block;
            text-decoration: none;
            color: inherit;
        }
        
        .wechat-articles-modal .article-item:hover {
            background: #e9ecef;
            transform: translateX(5px);
            text-decoration: none;
        }
        
        .wechat-articles-modal .article-item h3 {
            margin: 0 0 8px 0;
            color: #333;
        }
        
        .wechat-articles-modal .article-item p {
            margin: 0;
            color: #666;
            font-size: 0.9rem;
        }
        
        .wechat-articles-modal .close-modal {
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            z-index: 3000;
        }
    `;
    document.head.appendChild(style);
    
    // 初始化搜索功能
    setupWechatSearch();
}

// 弹窗控制函数
function openWechatModal() {
    const modal = document.getElementById('wechatArticlesModal');
    const articlesList = document.getElementById('articlesList');
    
    // 渲染文章列表
    articlesList.innerHTML = wechatArticles.map(article => `
        <a href="${article.link}" class="article-item" onclick="${article.id === 1 ? 'openArticleDetail()' : 'closeWechatModal()'}">
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <small>${article.date} | ${article.views} 阅读</small>
        </a>
    `).join('');
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeWechatModal() {
    const modal = document.getElementById('wechatArticlesModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// 设置搜索功能
function setupWechatSearch() {
    const searchInput = document.getElementById('articleSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const filteredArticles = wechatArticles.filter(article => 
                article.title.toLowerCase().includes(searchTerm) || 
                article.description.toLowerCase().includes(searchTerm)
            );
            
            const articlesList = document.getElementById('articlesList');
            if (articlesList) {
                articlesList.innerHTML = filteredArticles.map(article => `
                    <a href="${article.link}" class="article-item" onclick="${article.id === 1 ? 'openArticleDetail()' : 'closeWechatModal()'}">
                        <h3>${article.title}</h3>
                        <p>${article.description}</p>
                        <small>${article.date} | ${article.views} 阅读</small>
                    </a>
                `).join('');
            }
        });
    }
}

// 点击模态框外部关闭
document.addEventListener('click', function(e) {
    const modal = document.getElementById('wechatArticlesModal');
    if (modal && e.target === modal) {
        closeWechatModal();
    }
});

// 打开文章详情页
function openArticleDetail() {
    closeWechatModal();
    // 这里会跳转到新的文章详情页
    window.location.href = 'article-detail-1.html';
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initWorksPage);

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initWorksPage);

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initWorksPage);

// 平滑跳过功能
function skipSplash() {
  const splashScreen = document.getElementById('splashScreen');
  if (!splashScreen) return;
  
  // 创建波纹效果
  createRippleEffect();
  
  // 添加淡出效果
  splashScreen.style.opacity = '0';
  splashScreen.style.transform = 'scale(0.98)';
  splashScreen.style.pointerEvents = 'none';
  
  // 短暂延迟后隐藏
  setTimeout(() => {
    splashScreen.style.display = 'none';
  }, 400);
}

// 创建点击波纹效果
function createRippleEffect() {
  const splashScreen = document.getElementById('splashScreen');
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

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  const splashScreen = document.getElementById('splashScreen');
  
  if (splashScreen) {
    // 5秒后自动隐藏
    setTimeout(() => {
      if (splashScreen.style.display !== 'none') {
        skipSplash();
      }
    }, 5000);
    
    // 点击屏幕任意位置跳过
    splashScreen.addEventListener('click', skipSplash);
    
    // 键盘任意键跳过
    document.addEventListener('keydown', function(e) {
      if (splashScreen.style.display !== 'none') {
        skipSplash();
      }
    });
  }
});