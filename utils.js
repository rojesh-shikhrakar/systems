document.addEventListener('copy', function (e) {
  // Get the selected text
  const selection = window.getSelection();
  const selectedText = selection.toString();

  // Define your copyright notice
  const copyrightNotice = '\n\n© 2025 RMS. All rights reserved.';

  // Combine the selected text with the copyright notice
  const annotatedText = selectedText + copyrightNotice;

  // Prevent the default copy behavior
  e.preventDefault();

  // Set the modified text to the clipboard
  if (e.clipboardData) {
    e.clipboardData.setData('text/plain', annotatedText);
  } else if (window.clipboardData) {
    // For older versions of IE
    window.clipboardData.setData('Text', annotatedText);
  }
});
