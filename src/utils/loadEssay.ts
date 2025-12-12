import type { Language } from "../translations";

// Import markdown files
import iAmAngryEn from "../docs/essays/i-am-angry-and-disappointed.md?raw";
import iAmAngryId from "../docs/essays/i-am-angry-and-disappointed.id.md?raw";
import artOfSilenceEn from "../docs/essays/the-art-of-silence.md?raw";
import artOfSilenceId from "../docs/essays/the-art-of-silence.id.md?raw";
import photographyEn from "../docs/essays/on-photography-and-memory.md?raw";
import photographyId from "../docs/essays/on-photography-and-memory.id.md?raw";
import routineEn from "../docs/essays/the-routine-of-existence.md?raw";
import routineId from "../docs/essays/the-routine-of-existence.id.md?raw";
import writingEn from "../docs/essays/writing-as-thinking.md?raw";
import writingId from "../docs/essays/writing-as-thinking.id.md?raw";
import expectationsEn from "../docs/essays/the-weight-of-expectations.md?raw";
import expectationsId from "../docs/essays/the-weight-of-expectations.id.md?raw";

// Parse markdown to extract title and content
const parseMarkdown = (md: string): { title: string; content: string } => {
  const lines = md.split("\n");
  const titleLine = lines.find((line) => line.startsWith("# "));
  const title = titleLine ? titleLine.replace("# ", "").trim() : "";
  const contentStart = titleLine ? lines.indexOf(titleLine) + 1 : 0;
  // Get content after title, remove empty lines at start and end
  const contentLines = lines.slice(contentStart);
  // Remove leading empty lines
  let startIdx = 0;
  while (startIdx < contentLines.length && contentLines[startIdx].trim() === "") {
    startIdx++;
  }
  // Remove trailing empty lines
  let endIdx = contentLines.length;
  while (endIdx > startIdx && contentLines[endIdx - 1].trim() === "") {
    endIdx--;
  }
  const content = contentLines.slice(startIdx, endIdx).join("\n").trim();
  return { title, content };
};

// Extract excerpt from content (first paragraph)
const extractExcerpt = (content: string, maxLength: number = 200): string => {
  const paragraphs = content.split("\n\n").filter((p) => p.trim());
  if (paragraphs.length === 0) return "";
  const firstParagraph = paragraphs[0].trim();
  if (firstParagraph.length <= maxLength) return firstParagraph;
  return firstParagraph.substring(0, maxLength).trim() + "...";
};

export interface EssayMetadata {
  id: string;
  date: string;
}

const essayMetadata: EssayMetadata[] = [
  { id: "i-am-angry-and-disappointed", date: "2025-01-15" },
  { id: "the-art-of-silence", date: "2025-01-10" },
  { id: "on-photography-and-memory", date: "2025-01-05" },
  { id: "the-routine-of-existence", date: "2024-12-28" },
  { id: "writing-as-thinking", date: "2024-12-20" },
  { id: "the-weight-of-expectations", date: "2024-12-15" },
];

const essayContentMap: Record<string, { en: string; id: string }> = {
  "i-am-angry-and-disappointed": { en: iAmAngryEn, id: iAmAngryId },
  "the-art-of-silence": { en: artOfSilenceEn, id: artOfSilenceId },
  "on-photography-and-memory": { en: photographyEn, id: photographyId },
  "the-routine-of-existence": { en: routineEn, id: routineId },
  "writing-as-thinking": { en: writingEn, id: writingId },
  "the-weight-of-expectations": { en: expectationsEn, id: expectationsId },
};

export interface Essay {
  id: string;
  title: string;
  titleId: string;
  excerpt: string;
  excerptId: string;
  content: string;
  contentId: string;
  date: string;
}

export const getEssays = (language: Language): Essay[] => {
  return essayMetadata.map((meta) => {
    const contents = essayContentMap[meta.id];
    if (!contents) {
      throw new Error(`Essay content not found for id: ${meta.id}`);
    }

    const enParsed = parseMarkdown(contents.en);
    const idParsed = parseMarkdown(contents.id);

    return {
      id: meta.id,
      title: enParsed.title,
      titleId: idParsed.title,
      excerpt: extractExcerpt(enParsed.content),
      excerptId: extractExcerpt(idParsed.content),
      content: enParsed.content,
      contentId: idParsed.content,
      date: meta.date,
    };
  });
};

export const getEssayById = (id: string, language: Language): Essay | undefined => {
  return getEssays(language).find((essay) => essay.id === id);
};

