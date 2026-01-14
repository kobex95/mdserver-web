/*
 * Modern UI Enhancements
 * Version: 1.0.0
 * Description: Advanced JavaScript interactions and animations
 */

class ModernUI {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initializeComponents();
    this.setupAnimations();
    this.setupDarkMode();
  }

  setupEventListeners() {
    // 菜单悬停效果
    $('.menu a').on('mouseenter', this.handleMenuHover.bind(this));
    $('.menu a').on('mouseleave', this.handleMenuLeave.bind(this));
    
    // 卡片悬停效果
    $('.bgw').on('mouseenter', this.handleCardHover.bind(this));
    $('.bgw').on('mouseleave', this.handleCardLeave.bind(this));
    
    // 按钮点击波纹效果
    $('.btn').on('click', this.createRippleEffect.bind(this));
    
    // 表单元素增强
    this.enhanceFormElements();
    
    // 滚动监听
    $(window).on('scroll', this.handleScroll.bind(this));
  }

  initializeComponents() {
    // 初始化工具提示
    this.initTooltips();
    
    // 初始化模态框增强
    this.enhanceModals();
    
    // 初始化表格排序
    this.initTableSorting();
    
    // 初始化加载指示器
    this.initLoadingIndicators();
  }

  setupAnimations() {
    // 页面加载动画
    this.pageLoadAnimation();
    
    // 元素入场动画
    this.observeElements();
    
    // 平滑滚动
    this.smoothScrolling();
  }

  // ========== 菜单交互效果 ==========
  handleMenuHover(event) {
    const $element = $(event.currentTarget);
    const $menuItem = $element.closest('li');
    
    // 添加悬停类
    $menuItem.addClass('menu-item-hover');
    
    // 创建光晕效果
    const glow = $('<div class="menu-glow"></div>');
    $menuItem.append(glow);
    
    // 动画效果
    gsap.to($element, {
      x: 10,
      duration: 0.3,
      ease: "power2.out"
    });
  }

  handleMenuLeave(event) {
    const $element = $(event.currentTarget);
    const $menuItem = $element.closest('li');
    
    // 移除悬停类
    $menuItem.removeClass('menu-item-hover');
    
    // 移除光晕
    $menuItem.find('.menu-glow').remove();
    
    // 动画复位
    gsap.to($element, {
      x: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  }

  // ========== 卡片交互效果 ==========
  handleCardHover(event) {
    const $card = $(event.currentTarget);
    
    gsap.to($card, {
      y: -5,
      boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
      duration: 0.4,
      ease: "power2.out"
    });
    
    // 添加光泽效果
    if (!$card.find('.card-shine').length) {
      const shine = $('<div class="card-shine"></div>');
      $card.prepend(shine);
    }
  }

  handleCardLeave(event) {
    const $card = $(event.currentTarget);
    
    gsap.to($card, {
      y: 0,
      boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
      duration: 0.4,
      ease: "power2.out"
    });
    
    // 移除光泽效果
    $card.find('.card-shine').remove();
  }

  // ========== 波纹点击效果 ==========
  createRippleEffect(event) {
    const $button = $(event.currentTarget);
    const $ripple = $('<span class="ripple-effect"></span>');
    
    // 获取点击位置
    const rect = $button[0].getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    // 设置波纹样式
    $ripple.css({
      width: size,
      height: size,
      left: x,
      top: y
    });
    
    // 添加到按钮
    $button.append($ripple);
    
    // 动画完成后移除
    setTimeout(() => {
      $ripple.remove();
    }, 600);
  }

  // ========== 表单元素增强 ==========
  enhanceFormElements() {
    // 输入框焦点效果
    $('.form-control').on('focus', function() {
      $(this).parent('.form-group').addClass('focused');
    }).on('blur', function() {
      $(this).parent('.form-group').removeClass('focused');
      if ($(this).val()) {
        $(this).parent('.form-group').addClass('filled');
      } else {
        $(this).parent('.form-group').removeClass('filled');
      }
    });

    // 实时验证
    $('.form-control[data-validate]').on('input', this.validateInput.bind(this));
  }

  validateInput(event) {
    const $input = $(event.target);
    const validationType = $input.data('validate');
    const value = $input.val();
    const $group = $input.closest('.form-group');
    
    let isValid = true;
    
    switch(validationType) {
      case 'email':
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        break;
      case 'phone':
        isValid = /^[\d\-\+\(\)\s]{10,}$/.test(value);
        break;
      case 'password':
        isValid = value.length >= 6;
        break;
      default:
        isValid = value.length > 0;
    }
    
    $group.toggleClass('valid', isValid).toggleClass('invalid', !isValid);
  }

  // ========== 工具提示增强 ==========
  initTooltips() {
    $('[data-tooltip]').each(function() {
      const $element = $(this);
      const tooltipText = $element.data('tooltip');
      const placement = $element.data('placement') || 'top';
      
      $element.attr('title', tooltipText);
      
      // 自定义工具提示
      $element.on('mouseenter', function() {
        const tooltip = $(`
          <div class="custom-tooltip tooltip-${placement}">
            ${tooltipText}
            <div class="tooltip-arrow"></div>
          </div>
        `);
        
        $('body').append(tooltip);
        
        // 定位工具提示
        const offset = $element.offset();
        const elementWidth = $element.outerWidth();
        const elementHeight = $element.outerHeight();
        const tooltipWidth = tooltip.outerWidth();
        const tooltipHeight = tooltip.outerHeight();
        
        let top, left;
        
        switch(placement) {
          case 'top':
            top = offset.top - tooltipHeight - 10;
            left = offset.left + (elementWidth - tooltipWidth) / 2;
            break;
          case 'bottom':
            top = offset.top + elementHeight + 10;
            left = offset.left + (elementWidth - tooltipWidth) / 2;
            break;
          case 'left':
            top = offset.top + (elementHeight - tooltipHeight) / 2;
            left = offset.left - tooltipWidth - 10;
            break;
          case 'right':
            top = offset.top + (elementHeight - tooltipHeight) / 2;
            left = offset.left + elementWidth + 10;
            break;
        }
        
        tooltip.css({ top, left }).addClass('show');
      });
      
      $element.on('mouseleave', function() {
        $('.custom-tooltip').remove();
      });
    });
  }

  // ========== 模态框增强 ==========
  enhanceModals() {
    // 监听模态框打开事件
    $(document).on('shown.bs.modal', '.modal', function() {
      const $modal = $(this);
      
      // 添加入场动画
      gsap.from($modal.find('.modal-dialog'), {
        y: -50,
        opacity: 0,
        duration: 0.4,
        ease: "back.out(1.7)"
      });
      
      // 背景模糊效果
      $('body').addClass('modal-open-enhanced');
    });
    
    // 监听模态框关闭事件
    $(document).on('hidden.bs.modal', '.modal', function() {
      $('body').removeClass('modal-open-enhanced');
    });
  }

  // ========== 表格排序 ==========
  initTableSorting() {
    $('.sortable th[data-sort]').on('click', function() {
      const $th = $(this);
      const column = $th.data('sort');
      const $table = $th.closest('table');
      const $tbody = $table.find('tbody');
      const order = $th.hasClass('asc') ? 'desc' : 'asc';
      
      // 更新排序图标
      $th.siblings().removeClass('asc desc');
      $th.removeClass('asc desc').addClass(order);
      
      // 排序数据
      const rows = $tbody.find('tr').toArray().sort((a, b) => {
        const aVal = $(a).find(`td:eq(${$th.index()})`).text();
        const bVal = $(b).find(`td:eq(${$th.index()})`).text();
        
        if (order === 'asc') {
          return aVal.localeCompare(bVal, undefined, {numeric: true});
        } else {
          return bVal.localeCompare(aVal, undefined, {numeric: true});
        }
      });
      
      // 重新排列行
      $tbody.empty().append(rows);
    });
  }

  // ========== 加载指示器 ==========
  initLoadingIndicators() {
    // AJAX请求加载指示器
    $(document).ajaxStart(function() {
      if (!$('#global-loading').length) {
        const loader = `
          <div id="global-loading" class="loading-overlay">
            <div class="spinner">
              <div class="spinner-ring"></div>
              <div class="spinner-ring"></div>
              <div class="spinner-ring"></div>
              <div class="spinner-ring"></div>
            </div>
          </div>
        `;
        $('body').append(loader);
      }
    });
    
    $(document).ajaxStop(function() {
      $('#global-loading').fadeOut(300, function() {
        $(this).remove();
      });
    });
  }

  // ========== 页面加载动画 ==========
  pageLoadAnimation() {
    // 延迟显示内容
    $('.main-content').css('opacity', 0);
    
    setTimeout(() => {
      gsap.to('.main-content', {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      });
      
      // 依次动画显示各个组件
      gsap.utils.toArray('.bgw').forEach((element, i) => {
        gsap.from(element, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: "power2.out"
        });
      });
    }, 300);
  }

  // ========== 元素观察者 ==========
  observeElements() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          $(entry.target).addClass('fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    // 观察所有需要动画的元素
    gsap.utils.toArray('.bgw, .circle-box, .menu li').forEach(el => {
      observer.observe(el);
    });
  }

  // ========== 平滑滚动 ==========
  smoothScrolling() {
    $('a[href^="#"]').on('click', function(e) {
      e.preventDefault();
      const target = $($(this).attr('href'));
      
      if (target.length) {
        gsap.to(window, {
          scrollTo: {
            y: target.offset().top - 80,
            autoKill: false
          },
          duration: 0.8,
          ease: "power2.inOut"
        });
      }
    });
  }

  // ========== 滚动处理 ==========
  handleScroll() {
    const scrollTop = $(window).scrollTop();
    
    // 顶部导航栏效果
    if (scrollTop > 100) {
      $('.index-pos-box').addClass('scrolled');
    } else {
      $('.index-pos-box').removeClass('scrolled');
    }
    
    // 进度条
    const scrollPercent = (scrollTop / ($(document).height() - $(window).height())) * 100;
    if (!$('#scroll-progress').length) {
      $('body').append('<div id="scroll-progress"></div>');
    }
    $('#scroll-progress').css('width', scrollPercent + '%');
  }

  // ========== 暗黑模式 ==========
  setupDarkMode() {
    // 检查系统偏好
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.enableDarkMode();
    }
    
    // 切换按钮
    if ($('#dark-mode-toggle').length) {
      $('#dark-mode-toggle').on('click', () => {
        if ($('body').hasClass('dark-mode')) {
          this.disableDarkMode();
        } else {
          this.enableDarkMode();
        }
      });
    }
  }

  enableDarkMode() {
    $('body').addClass('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
  }

  disableDarkMode() {
    $('body').removeClass('dark-mode');
    localStorage.setItem('darkMode', 'disabled');
  }

  // ========== 公共方法 ==========
  showToast(message, type = 'info', duration = 3000) {
    const toast = $(`
      <div class="toast toast-${type}">
        <div class="toast-content">
          <span class="toast-icon">${this.getToastIcon(type)}</span>
          <span class="toast-message">${message}</span>
        </div>
      </div>
    `);
    
    $('body').append(toast);
    
    // 显示动画
    gsap.fromTo(toast, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3 }
    );
    
    // 自动隐藏
    setTimeout(() => {
      gsap.to(toast, {
        y: 50,
        opacity: 0,
        duration: 0.3,
        onComplete: () => toast.remove()
      });
    }, duration);
  }

  getToastIcon(type) {
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
    return icons[type] || icons.info;
  }

  showNotification(title, message, options = {}) {
    const defaults = {
      icon: '🔔',
      timeout: 5000,
      position: 'top-right'
    };
    
    const config = { ...defaults, ...options };
    
    const notification = $(`
      <div class="notification ${config.position}">
        <div class="notification-header">
          <span class="notification-icon">${config.icon}</span>
          <span class="notification-title">${title}</span>
          <button class="notification-close">&times;</button>
        </div>
        <div class="notification-body">${message}</div>
      </div>
    `);
    
    $('body').append(notification);
    
    // 显示动画
    gsap.fromTo(notification,
      { x: 300, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
    );
    
    // 关闭按钮
    notification.find('.notification-close').on('click', () => {
      this.hideNotification(notification);
    });
    
    // 自动关闭
    if (config.timeout > 0) {
      setTimeout(() => {
        this.hideNotification(notification);
      }, config.timeout);
    }
  }

  hideNotification($notification) {
    gsap.to($notification, {
      x: 300,
      opacity: 0,
      duration: 0.3,
      onComplete: () => $notification.remove()
    });
  }
}

// GSAP 动画配置
gsap.config({
  force3D: true,
  nullTargetWarn: false
});

// 初始化现代UI
$(document).ready(function() {
  window.modernUI = new ModernUI();
  
  // 全局错误处理
  $(document).ajaxError(function(event, xhr, settings, thrownError) {
    if (xhr.status !== 200) {
      window.modernUI.showToast('请求失败: ' + (thrownError || xhr.statusText), 'error');
    }
  });
});

// 导出到全局作用域
window.ModernUI = ModernUI;