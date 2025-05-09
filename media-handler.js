document.addEventListener('DOMContentLoaded', function() {
    // Handle image clicks for zooming
    const contentImages = document.querySelectorAll('.post-content img:not(.no-zoom)');
    
    contentImages.forEach(img => {
      img.addEventListener('click', function() {
        // Create modal for image viewing
        const modal = document.createElement('div');
        modal.classList.add('image-modal');
        
        const modalImg = document.createElement('img');
        modalImg.src = this.src;
        modalImg.alt = this.alt;
        
        const caption = document.createElement('div');
        caption.classList.add('modal-caption');
        caption.textContent = this.alt || '';
        
        const closeBtn = document.createElement('button');
        closeBtn.classList.add('modal-close');
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', () => {
          document.body.removeChild(modal);
          document.body.classList.remove('modal-open');
        });
        
        modal.appendChild(closeBtn);
        modal.appendChild(modalImg);
        if (this.alt) modal.appendChild(caption);
        
        document.body.appendChild(modal);
        document.body.classList.add('modal-open');
        
        // Close modal when clicking outside the image
        modal.addEventListener('click', function(e) {
          if (e.target === modal) {
            document.body.removeChild(modal);
            document.body.classList.remove('modal-open');
          }
        });
      });
    });
    
    // Detect and format media galleries
    const postContent = document.querySelector('.post-content');
    if (postContent) {
      // Find sequences of consecutive images and wrap them in galleries
      let elements = Array.from(postContent.children);
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].tagName === 'P' && elements[i].querySelector('img')) {
          let consecutiveImageParagraphs = [elements[i]];
          let j = i + 1;
          
          while (j < elements.length && 
                 elements[j].tagName === 'P' && 
                 elements[j].querySelector('img')) {
            consecutiveImageParagraphs.push(elements[j]);
            j++;
          }
          
          if (consecutiveImageParagraphs.length >= 2) {
            // Create gallery
            const gallery = document.createElement('div');
            gallery.classList.add('media-gallery');
            
            consecutiveImageParagraphs.forEach(p => {
              const img = p.querySelector('img');
              gallery.appendChild(img.cloneNode(true));
            });
            
            // Replace first paragraph with gallery and remove others
            elements[i].parentNode.insertBefore(gallery, elements[i]);
            consecutiveImageParagraphs.forEach(p => p.parentNode.removeChild(p));
            
            // Update our elements array
            elements = Array.from(postContent.children);
            i--; // Reprocess this index since we replaced elements
          }
        }
      }
    }
    
    // Make external links open in new tab
    const externalLinks = document.querySelectorAll('.post-content a[href^="http"]');
    externalLinks.forEach(link => {
      if (!link.getAttribute('href').includes(window.location.hostname)) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  });
  