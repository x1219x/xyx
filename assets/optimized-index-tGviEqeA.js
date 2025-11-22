// 移动设备优化JavaScript - 包装在IIFE中
(function() {
  // 移动设备检测函数
  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           window.innerWidth <= 768;
  }

  // 响应式调整函数
  function adjustForResponsive() {
    const isMobile = isMobileDevice();
    
    // 设置全局标志
    window.isMobile = isMobile;
    
    // 调整根元素样式
    const root = document.documentElement;
    if (isMobile) {
      root.style.fontSize = '14px';
      root.classList.add('mobile-view');
    } else {
      root.style.fontSize = '16px';
      root.classList.remove('mobile-view');
    }
  }

  // 心形坐标生成优化
  function generateOptimizedHeartPoints() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isMobile = isMobileDevice();
    const scaleFactor = isMobile ? width / 50 : width / 30;
    
    // 优化的边界计算
    const minX = isMobile ? 50 : 100;
    const maxX = isMobile ? width - 50 : width - 150;
    const maxY = isMobile ? height - 30 : height - 100;
    
    return {
      scaleFactor,
      minX,
      maxX,
      maxY
    };
  }

  // 触摸事件优化
  function optimizeTouchEvents() {
    // 防止双击缩放
    document.addEventListener('touchstart', function preventZoom(e) {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    }, { passive: false });
    
    // 优化触摸滚动
    document.addEventListener('touchmove', function(e) {
      // 允许正常滚动
    }, { passive: true });
  }

  // 初始化函数
  function init() {
    // 优先执行响应式调整
    adjustForResponsive();
    
    // 优化触摸事件
    optimizeTouchEvents();
    
    // 添加窗口大小变化监听
    window.addEventListener('resize', adjustForResponsive);
    
    // 添加屏幕旋转监听
    window.addEventListener('orientationchange', function() {
      // 延迟执行，确保旋转完成
      setTimeout(adjustForResponsive, 300);
    });
    
    // 暴露公共方法
    window.optimizeMobileExperience = {
      isMobile: isMobileDevice,
      adjustLayout: adjustForResponsive,
      getHeartPointsConfig: generateOptimizedHeartPoints
    };
  }

  // 等待DOM加载完成
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();