/**
 * ============================================================================
 * VESTIGO — MOBILE TOUCH & GESTURE ENGINE (v2.0)
 * Native iOS Bottom Sheet Pull-to-Dismiss, Haptics & Progressive Disclosure
 * ============================================================================
 */

(function () {
  'use strict';

  // 1. SAFE HAPTIC VIBRATION
  function triggerHaptic(type) {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        if (type === 'light') navigator.vibrate(10);
        else if (type === 'medium') navigator.vibrate(18);
        else if (type === 'success') navigator.vibrate([10, 30, 15]);
      } catch (e) {
        // Ignored if browser policy restricts without user activation
      }
    }
  }

  // 2. iOS BOTTOM SHEET PULL-TO-DISMISS GESTURE ENGINE
  function initBottomSheetGesture(modalId, contentSelector, handleSelector, closeCallback) {
    const backdrop = document.getElementById(modalId);
    if (!backdrop) return;
    const content = backdrop.querySelector(contentSelector);
    if (!content) return;
    const handle = content.querySelector(handleSelector);

    let startY = 0;
    let currentY = 0;
    let isDragging = false;
    let startTimestamp = 0;

    const dragTarget = handle || content.querySelector('.modal-header') || content;

    dragTarget.addEventListener('touchstart', function (e) {
      if (content.scrollTop > 5 && !e.target.closest(handleSelector)) {
        return; // Allow internal body scrolling if not touching handle
      }
      startY = e.touches[0].clientY;
      currentY = startY;
      isDragging = true;
      startTimestamp = Date.now();
      content.style.transition = 'none';
    }, { passive: true });

    dragTarget.addEventListener('touchmove', function (e) {
      if (!isDragging) return;
      currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;

      // Only allow downward drag
      if (deltaY > 0) {
        content.style.transform = 'translateY(' + deltaY + 'px)';
      } else {
        // Subtle resistance when dragging upwards
        content.style.transform = 'translateY(' + (deltaY * 0.15) + 'px)';
      }
    }, { passive: true });

    dragTarget.addEventListener('touchend', function () {
      if (!isDragging) return;
      isDragging = false;
      const deltaY = currentY - startY;
      const dragDuration = Date.now() - startTimestamp;
      const velocity = deltaY / (dragDuration || 1);

      content.style.transition = 'transform 0.34s cubic-bezier(0.16, 1, 0.3, 1)';

      // Dismiss if dragged down more than 80px or flicked downwards with speed
      if (deltaY > 80 || (deltaY > 35 && velocity > 0.45)) {
        content.style.transform = 'translateY(100%)';
        triggerHaptic('light');
        setTimeout(function () {
          if (typeof closeCallback === 'function') {
            closeCallback();
          } else {
            backdrop.classList.remove('open', 'active');
          }
          content.style.transform = '';
          content.style.transition = '';
        }, 280);
      } else {
        // Snap back to open position
        content.style.transform = 'translateY(0)';
        setTimeout(function () {
          content.style.transition = '';
        }, 340);
      }
    });
  }

  // 3. PROGRESSIVE DISCLOSURE (TAP-TO-EXPAND CHIPS)
  function initProgressiveDisclosure() {
    document.querySelectorAll('.vg-disclosure-trigger').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        triggerHaptic('light');
        
        const targetId = btn.getAttribute('data-target');
        let targetEl = targetId ? document.getElementById(targetId) : btn.previousElementSibling;
        
        if (targetEl) {
          const isExpanded = targetEl.classList.toggle('expanded');
          const expandText = btn.getAttribute('data-expand-text') || 'Ver detalles ▾';
          const collapseText = btn.getAttribute('data-collapse-text') || 'Ocultar ▲';
          btn.textContent = isExpanded ? collapseText : expandText;
        }
      });
    });
  }

  // 4. FLOATING DOCK & VIEW SYNCHRONIZATION
  function initDockHaptics() {
    document.querySelectorAll('.nav-item, .vg-nav-item, .tab-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        triggerHaptic('light');
      });
    });
  }

  // 5. VIEWPORT RESIZE & ORIENTATION MONITOR (100dvh Fix)
  function syncViewportUnits() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  }

  // INITIALIZE ON DOM READY
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }

  function bootstrap() {
    syncViewportUnits();
    window.addEventListener('resize', syncViewportUnits);
    window.addEventListener('orientationchange', function () {
      setTimeout(syncViewportUnits, 150);
    });

    // Initialize bottom sheet gesture for photo-modal
    initBottomSheetGesture('photo-modal', '.modal-content', '.vg-sheet-handle-wrap', function () {
      if (typeof window.closePhotoModal === 'function') {
        window.closePhotoModal();
      } else {
        const modal = document.getElementById('photo-modal');
        if (modal) modal.classList.remove('open');
      }
    });

    initProgressiveDisclosure();
    initDockHaptics();
  }

  // Export to window for global access
  window.VestigoTouch = {
    triggerHaptic: triggerHaptic,
    initBottomSheetGesture: initBottomSheetGesture,
    initProgressiveDisclosure: initProgressiveDisclosure
  };

})();
