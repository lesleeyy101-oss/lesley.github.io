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

// 作品展示模块功能
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
  
  // 填充示例数据
  populateExampleData();
});

// 填充示例数据
function populateExampleData() {
  const works = [
    {
      id: 1,
      title: "响应式企业官网设计",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop",
      size: "1920x1080px",
      format: "PNG",
      date: "2025.03",
      time: "创作周期：2周",
      tools: "工具：Figma, React, GSAP",
      tags: ["UI设计", "响应式", "现代风格"],
      likes: 24,
      comments: 8
    },
    {
      id: 2,
      title: "移动端电商APP界面",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop",
      size: "1080x1920px",
      format: "JPG",
      date: "2025.02",
      time: "创作周期：3周",
      tools: "工具：Sketch, Swift, Firebase",
      tags: ["移动端", "电商", "用户体验"],
      likes: 42,
      comments: 15
    },
    {
      id: 3,
      title: "品牌视觉识别系统",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop",
      size: "2480x3508px",
      format: "AI",
      date: "2025.01",
      time: "创作周期：1个月",
      tools: "工具：Illustrator, Photoshop, InDesign",
      tags: ["品牌设计", "VI系统", "视觉识别"],
      likes: 18,
      comments: 6
    }
  ];
  
  // 显示第一个作品
  if (works.length > 0) {
    const work = works[0];
    
    // 更新主图
    const mainImage = document.getElementById('main-image');
    if (mainImage) mainImage.src = work.image;
    
    // 更新信息
    const worksTitle = document.getElementById('works-title');
    if (worksTitle) worksTitle.textContent = work.title;
    
    const worksTime = document.getElementById('works-time');
    if (worksTime) worksTime.textContent = work.time;
    
    const worksTools = document.getElementById('works-tools');
    if (worksTools) worksTools.textContent = work.tools;
    
    const imageSize = document.getElementById('image-size');
    if (imageSize) imageSize.textContent = work.size;
    
    const imageFormat = document.getElementById('image-format');
    if (imageFormat) imageFormat.textContent = work.format;
    
    const imageDate = document.getElementById('image-date');
    if (imageDate) imageDate.textContent = work.date;
    
    const likeCount = document.getElementById('like-count');
    if (likeCount) likeCount.textContent = work.likes;
    
    const commentCount = document.getElementById('comment-count');
    if (commentCount) commentCount.textContent = work.comments;
    
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
  }
}

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