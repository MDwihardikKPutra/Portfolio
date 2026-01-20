export const makeBold = (text: string, boldTexts: string[]) => {
  const parts = [];
  let lastIndex = 0;
  
  // Find all bold text positions
  const positions = [];
  boldTexts.forEach(boldText => {
    let searchIndex = 0;
    while (true) {
      const index = text.indexOf(boldText, searchIndex);
      if (index === -1) break;
      positions.push({ index, text: boldText, length: boldText.length });
      searchIndex = index + 1;
    }
  });
  
  // Sort by index
  positions.sort((a, b) => a.index - b.index);
  
  // Remove overlapping positions (keep the first one)
  const filteredPositions = [];
  positions.forEach((pos) => {
    if (filteredPositions.length === 0 || pos.index >= filteredPositions[filteredPositions.length - 1].index + filteredPositions[filteredPositions.length - 1].length) {
      filteredPositions.push(pos);
    }
  });
  
  // Build parts array
  filteredPositions.forEach((pos) => {
    // Add text before bold
    if (pos.index > lastIndex) {
      parts.push({ text: text.substring(lastIndex, pos.index), bold: false });
    }
    // Add bold text
    parts.push({ text: pos.text, bold: true });
    lastIndex = pos.index + pos.length;
  });
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push({ text: text.substring(lastIndex), bold: false });
  }
  
  // If no bold texts found, return original text
  if (parts.length === 0) {
    return [{ text, bold: false }];
  }
  
  return parts;
};