import ImageCarousel from "./ImageCarousel";
import React from "react";
import path from "path";
import fs from "fs";

interface Props {
  imageDir: string;
  altPrefix?: string;
}

/**
 * @param imageDir the directory where images are stored, relative to the public folder
 */
function getImageNamesFromDir(imageDir: string): string[] {
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
  try {
    const dirPath = path.join(process.cwd(), "public", imageDir);
    return fs
      .readdirSync(dirPath)
      .filter((f) => allowedExtensions.includes(path.extname(f).toLowerCase()));
  } catch {
    return [];
  }
}
export default function ImageCarouselWrapper({ imageDir, altPrefix }: Props) {
  const imageNames = getImageNamesFromDir(imageDir);
  if (!imageNames.length) return null;
  return (
    <ImageCarousel
      imageDir={imageDir}
      imageNames={imageNames}
      altPrefix={altPrefix}
    />
  );
}
