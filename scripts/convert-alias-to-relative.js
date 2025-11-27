#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function toPosix(p) {
  return p.split(path.sep).join('/');
}

function replaceInFile(file) {
  const content = fs.readFileSync(file, 'utf8');
  let changed = false;

  const regex = /(["'`])@\/(.+?)\1/g;

  const newContent = content.replace(regex, (match, quote, importPath) => {
    const absTarget = path.resolve(root, importPath);
    const rel = path.relative(path.dirname(file), absTarget);
    let relPath = rel === '' ? '.' : rel;
    if (!relPath.startsWith('.')) relPath = './' + relPath;
    relPath = toPosix(relPath);
    changed = true;
    return quote + relPath + quote;
  });

  if (changed) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Updated', path.relative(root, file));
  }
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.next', 'public', 'dist'].includes(entry.name)) continue;
      walk(full);
    } else {
      if (/\.(ts|tsx|js|jsx|mts|cts)$/.test(entry.name)) {
        replaceInFile(full);
      }
    }
  }
}

walk(root);

