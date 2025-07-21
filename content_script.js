
/* This script applies a dark mode effect by modifying background colors of bright elements.
// It runs after the DOM is fully loaded and CSS has been applied.*/
document.addEventListener('DOMContentLoaded', function() {
  function processNode(node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const style = window.getComputedStyle(node);
      const bgColor = style.backgroundColor;

      // Check if the element has a valid, non-transparent background color
      if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
        const match = bgColor.match(/rgba?\((\d+), (\d+), (\d+)(, ([.\d]+))?\)/); // Updated regex to capture alpha correctly
        if (match) {
          const r = parseInt(match[1]);
          const g = parseInt(match[2]);
          const b = parseInt(match[3]);
          const alpha = match[5] ? parseFloat(match[5]) : 1; // match[5] will be the alpha value if present

          // Calculate brightness (average of RGB components)
          const brightness = (r + g + b) / 3;

          // Debugging: Log element, background color, and brightness
          console.log(`Processing element: ${node.tagName}, Background: ${bgColor}, Brightness: ${brightness.toFixed(2)}`);

          // Apply dark mode only to bright colors (brightness between 40 and 250)
          if (brightness > 40 && brightness < 250) {
            // Invert RGB values for dark mode effect
            const newR = 255 - r;
            const newG = 255 - g;
            const newB = 255 - b;

            node.style.backgroundColor = `rgba(${newR}, ${newG}, ${newB}, ${alpha})`;
            console.log(`Changed background of: ${node.tagName} from ${bgColor} to rgba(${newR}, ${newG}, ${newB}, ${alpha})`);
          }
        }
      }
    }

    // Recursively process child nodes
    node.childNodes.forEach(processNode);
  }

  // Start processing from the document body
  processNode(document.body);
});
