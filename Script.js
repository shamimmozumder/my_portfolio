AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  offset: 100
});

document.addEventListener('DOMContentLoaded', function() {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 70;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    }
  });
});

window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('shadow');
  } else {
    navbar.classList.remove('shadow');
  }
});

const typedTextSpan = document.querySelector('.text-gradient');
if (typedTextSpan) {
  const textToType = typedTextSpan.textContent;
  typedTextSpan.textContent = '';
  
  let i = 0;
  function typeWriter() {
    if (i < textToType.length) {
      typedTextSpan.textContent += textToType.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }
  
  setTimeout(typeWriter, 500);
}

window.addEventListener('scroll', function() {
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    heroSection.style.transform = `translateY(${parallax}px)`;
  }
});

document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

const cursor = {
  delay: 8,
  _x: 0,
  _y: 0,
  endX: (window.innerWidth / 2),
  endY: (window.innerHeight / 2),
  cursorVisible: true,
  cursorEnlarged: false,
  $dot: document.createElement('div'),
  $outline: document.createElement('div'),
  
  init: function() {
    this.$dot.classList.add('cursor-dot');
    this.$outline.classList.add('cursor-outline');
    
    document.body.appendChild(this.$dot);
    document.body.appendChild(this.$outline);
    
    this.$dot.style.opacity = 0;
    this.$outline.style.opacity = 0;
    
    this.setupEventListeners();
    this.animateDotOutline();
  },
  
  setupEventListeners: function() {
    const self = this;
    
    document.querySelectorAll('a, button, .skill-card, .project-card, .contact-card').forEach(el => {
      el.addEventListener('mouseenter', function() {
        self.cursorEnlarged = true;
        self.toggleCursorSize();
      });
      el.addEventListener('mouseleave', function() {
        self.cursorEnlarged = false;
        self.toggleCursorSize();
      });
    });
    
    document.addEventListener('mousedown', function() {
      self.cursorEnlarged = true;
      self.toggleCursorSize();
    });
    document.addEventListener('mouseup', function() {
      self.cursorEnlarged = false;
      self.toggleCursorSize();
    });
    
    document.addEventListener('mousemove', function(e) {
      self.cursorVisible = true;
      self.toggleCursorVisibility();
      self.endX = e.pageX;
      self.endY = e.pageY;
      self.$dot.style.top = self.endY + 'px';
      self.$dot.style.left = self.endX + 'px';
    });
    
    document.addEventListener('mouseenter', function() {
      self.cursorVisible = true;
      self.toggleCursorVisibility();
      self.$dot.style.opacity = 1;
      self.$outline.style.opacity = 1;
    });
    
    document.addEventListener('mouseleave', function() {
      self.cursorVisible = false;
      self.toggleCursorVisibility();
      self.$dot.style.opacity = 0;
      self.$outline.style.opacity = 0;
    });
  },
  
  animateDotOutline: function() {
    const self = this;
    
    self._x += (self.endX - self._x) / self.delay;
    self._y += (self.endY - self._y) / self.delay;
    self.$outline.style.top = self._y + 'px';
    self.$outline.style.left = self._x + 'px';
    
    requestAnimationFrame(this.animateDotOutline.bind(self));
  },
  
  toggleCursorSize: function() {
    if (this.cursorEnlarged) {
      this.$dot.style.transform = 'translate(-50%, -50%) scale(0.75)';
      this.$outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
    } else {
      this.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
      this.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
    }
  },
  
  toggleCursorVisibility: function() {
    if (this.cursorVisible) {
      this.$dot.style.opacity = 1;
      this.$outline.style.opacity = 1;
    } else {
      this.$dot.style.opacity = 0;
      this.$outline.style.opacity = 0;
    }
  }
};

if (window.innerWidth > 768) {
}