// 获取所有 class 为 "module" 的 div 元素
const modules = document.querySelectorAll('.module');

// 遍历所有 div 元素，如果其下面有一个 a 标签的 href 值为 "39.html"，则将其隐藏
modules.forEach(module => {
  const link = module.querySelector('a[href="39.html"]');
  if (link) {
    module.style.display = 'none';
  }
});
