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
        else if (type === 'selection') navigator.vibrate(8);
        else if (type === 'medium') navigator.vibrate(18);
        else if (type === 'success') navigator.vibrate([10, 30, 15]);
      } catch (e) {
        // Ignored if browser policy restricts without user activation
      }
    }
  }

  // 2. iOS BOTTOM SHEET PULL-TO-DISMISS GESTURE ENGINE (FLUID DYNAMICS)
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
      backdrop.style.transition = 'none';
    }, { passive: true });

    dragTarget.addEventListener('touchmove', function (e) {
      if (!isDragging) return;
      currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;

      if (deltaY > 0) {
        // Downward drag: translate sheet and interpolate backdrop opacity
        content.style.transform = 'translateY(' + deltaY + 'px)';
        const maxDrag = window.innerHeight * 0.55;
        const progress = Math.min(deltaY / maxDrag, 1);
        backdrop.style.backgroundColor = 'rgba(2, 4, 8, ' + (0.85 * (1 - progress * 0.75)) + ')';
      } else {
        // Upward drag: subtle logarithmic rubber-band resistance
        const dampened = -Math.log10(1 + Math.abs(deltaY) * 0.05) * 18;
        content.style.transform = 'translateY(' + dampened + 'px)';
      }
    }, { passive: true });

    dragTarget.addEventListener('touchend', function () {
      if (!isDragging) return;
      isDragging = false;
      const deltaY = currentY - startY;
      const dragDuration = Date.now() - startTimestamp;
      const velocity = deltaY / (dragDuration || 1);

      content.style.transition = 'transform 0.36s cubic-bezier(0.32, 0.72, 0, 1)';
      backdrop.style.transition = 'opacity 0.30s ease, background-color 0.30s ease';

      // Dismiss if dragged down more than 75px or flicked downwards with speed
      if (deltaY > 75 || (deltaY > 30 && velocity > 0.35)) {
        content.style.transform = 'translateY(100%)';
        backdrop.style.opacity = '0';
        triggerHaptic('light');
        setTimeout(function () {
          if (typeof closeCallback === 'function') {
            closeCallback();
          } else {
            backdrop.classList.remove('open', 'active');
          }
          content.style.transform = '';
          content.style.transition = '';
          backdrop.style.backgroundColor = '';
          backdrop.style.opacity = '';
          backdrop.style.transition = '';
        }, 300);
      } else {
        // Snap back to resting open position
        content.style.transform = 'translateY(0)';
        backdrop.style.backgroundColor = '';
        setTimeout(function () {
          content.style.transition = '';
          backdrop.style.transition = '';
        }, 360);
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

  // 4. FORENSIC EVIDENCE DOUBLE-TAP LOUPE / ZOOM
  function initEvidencePhotoZoom() {
    const modalImg = document.getElementById('modal-img');
    if (!modalImg) return;
    
    let lastTap = 0;
    let isZoomed = false;

    modalImg.addEventListener('touchend', function (e) {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;
      if (tapLength < 320 && tapLength > 40) {
        // Double tap detected!
        e.preventDefault();
        e.stopPropagation();
        isZoomed = !isZoomed;
        triggerHaptic(isZoomed ? 'medium' : 'light');
        if (isZoomed) {
          modalImg.style.transform = 'scale(2.2)';
          modalImg.style.cursor = 'zoom-out';
          modalImg.style.transition = 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)';
        } else {
          modalImg.style.transform = 'scale(1)';
          modalImg.style.cursor = 'zoom-in';
          modalImg.style.transition = 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)';
        }
      }
      lastTap = currentTime;
    });

    // Reset zoom when modal closes
    const resetZoom = function () {
      isZoomed = false;
      if (modalImg) {
        modalImg.style.transform = 'scale(1)';
        modalImg.style.transition = '';
      }
    };
    
    const photoModal = document.getElementById('photo-modal');
    if (photoModal) {
      const observer = new MutationObserver(function () {
        if (!photoModal.classList.contains('open') && photoModal.style.display === 'none') {
          resetZoom();
        }
      });
      observer.observe(photoModal, { attributes: true, attributeFilter: ['class', 'style'] });
    }
  }

  // 5. FLOATING DOCK, CARDS & INTERACTION HAPTICS
  function initInteractiveHaptics() {
    document.querySelectorAll('.nav-item, .vg-nav-item, .tab-btn, .case-card, .profile-card, .btn-enter-case, .back-btn, .vg-reader-dock-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        triggerHaptic('light');
      });
    });
  }

  // 6. VIEWPORT RESIZE & ORIENTATION MONITOR (100dvh Fix)
  function syncViewportUnits() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
    document.documentElement.style.setProperty('--vg-dvh', window.innerHeight + 'px');
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
    initInteractiveHaptics();
    initEvidencePhotoZoom();
  }

  // Export to window for global access
  window.VestigoTouch = {
    triggerHaptic: triggerHaptic,
    initBottomSheetGesture: initBottomSheetGesture,
    initProgressiveDisclosure: initProgressiveDisclosure,
    initEvidencePhotoZoom: initEvidencePhotoZoom
  };

})();
