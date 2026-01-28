document.addEventListener('DOMContentLoaded', function() {
  const autoTypeElements = document.querySelectorAll('.fake-code[data-autotype]');
  
  autoTypeElements.forEach(element => {
    let speed = parseInt(element.getAttribute('data-autotype')) || 50;
    let lineDelay = parseInt(element.getAttribute('data-line-delay')) || 3;
    const cursorType = element.getAttribute('data-cursor') || 'block'; // 'block', 'underscore', or 'none'
    const originalContent = element.innerHTML;
    element.innerHTML = '';
    element.style.visibility = 'visible';
    
    // Shared speed object so we can modify it on click
    const speedObj = { speed: speed, lineDelay: lineDelay };
    
    // Add click handler to instantly render
    element.addEventListener('click', function() {
      speedObj.speed = 0;
      speedObj.lineDelay = 0;
    });
    
    // Create cursor element if needed
    let cursor = null;
    if (cursorType !== 'none') {
      cursor = document.createElement('span');
      cursor.className = 'autotype-cursor';
      cursor.classList.add(cursorType === 'underscore' ? 'cursor-underscore' : 'cursor-block');
      cursor.textContent = cursorType === 'underscore' ? '_' : '█';
    }
    
    typeHTML(element, originalContent, speedObj, cursor);
  });
});

function typeHTML(container, html, speedObj, cursor) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');
  const nodes = Array.from(doc.body.firstChild.childNodes);
  
  let currentIndex = 0;
  
  // Add cursor to container
  if (cursor) {
    container.appendChild(cursor);
  }
  
  function typeNextNode() {
    if (currentIndex >= nodes.length) {
      // Finished typing, keep cursor blinking at the end
      return;
    }
    
    const node = nodes[currentIndex];
    currentIndex++;
    
    if (node.nodeType === Node.TEXT_NODE) {
      typeTextNode(container, node.textContent, speedObj, cursor, typeNextNode);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const clone = node.cloneNode(false);
      container.insertBefore(clone, cursor);
      
      // Check if this is a <br> tag
      if (node.tagName === 'BR') {
        setTimeout(() => {
          typeNextNode();
        }, speedObj.speed * speedObj.lineDelay);
      } else if (node.childNodes.length > 0) {
        typeChildNodes(clone, Array.from(node.childNodes), speedObj, cursor, typeNextNode);
      } else {
        typeNextNode();
      }
    }
  }
  
  typeNextNode();
}

function typeChildNodes(parent, nodes, speedObj, cursor, callback) {
  let index = 0;
  
  function typeNext() {
    if (index >= nodes.length) {
      callback();
      return;
    }
    
    const node = nodes[index];
    index++;
    
    if (node.nodeType === Node.TEXT_NODE) {
      typeTextNode(parent, node.textContent, speedObj, null, typeNext);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const clone = node.cloneNode(false);
      parent.appendChild(clone);
      
      // Check if this is a <br> tag
      if (node.tagName === 'BR') {
        setTimeout(() => {
          typeNext();
        }, speedObj.speed * speedObj.lineDelay);
      } else if (node.childNodes.length > 0) {
        typeChildNodes(clone, Array.from(node.childNodes), speedObj, null, typeNext);
      } else {
        typeNext();
      }
    }
  }
  
  typeNext();
}

function typeTextNode(parent, text, speedObj, cursor, callback) {
  let i = 0;
  const textNode = document.createTextNode('');
  
  // Insert text node before cursor if it exists
  if (cursor && cursor.parentNode === parent) {
    parent.insertBefore(textNode, cursor);
  } else {
    parent.appendChild(textNode);
  }
  
  function typeChar() {
    if (i < text.length) {
      textNode.textContent += text.charAt(i);
      i++;
      setTimeout(typeChar, speedObj.speed);
    } else {
      callback();
    }
  }
  
  typeChar();
}
