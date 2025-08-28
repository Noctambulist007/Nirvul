
import type { DiffResult, Correction } from '../types';

// This is a simplified implementation of a diff algorithm inspired by Myers diff algorithm,
// adapted for word-level comparison. It's not a full implementation but sufficient for this UI.

// The Patcher function is defined in the module scope so it can be accessed by all functions in this file.
function Patcher(this: any) {}
Patcher.prototype = {
  add: function(this: { components: DiffResult[] }, value: string) {
    this.components.push({ value: value, added: true });
  },
  remove: function(this: { components: DiffResult[] }, value: string) {
    this.components.push({ value: value, removed: true });
  },
  common: function(this: { components: DiffResult[] }, value: string) {
    this.components.push({ value: value });
  }
};

export function diffWords(oldStr: string, newStr: string): DiffResult[] {
  const oldWords = oldStr.split(/(\s+)/);
  const newWords = newStr.split(/(\s+)/);

  const newLen = newWords.length;
  const oldLen = oldWords.length;
  let editLength = 1;
  const maxEditLength = newLen + oldLen;
  
  const bestPath = [{ newPos: -1, components: [] as DiffResult[] }];
  const oldPos = extractCommon(bestPath[0], newWords, oldWords, 0);
  if (bestPath[0].newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
    return bestPath[0].components;
  }

  while (editLength <= maxEditLength) {
    for (let diagonal = -1 * editLength; diagonal <= editLength; diagonal += 2) {
      let basePath;
      const addPath = bestPath[diagonal - 1];
      const removePath = bestPath[diagonal + 1];
      let oldPos = (removePath ? removePath.newPos : 0) - diagonal;
      if (addPath) {
        bestPath[diagonal - 1] = undefined as any;
      }

      const canAdd = addPath && addPath.newPos + 1 < newLen;
      const canRemove = removePath && 0 <= oldPos && oldPos < oldLen;
      if (!canAdd && !canRemove) {
        bestPath[diagonal] = undefined as any;
        continue;
      }

      if (!canAdd || (canRemove && addPath.newPos < removePath.newPos)) {
        basePath = clonePath(removePath);
        const patcher = new (Patcher as any)();
        patcher.components = basePath.components;
        patcher.remove(oldWords[oldPos]);
      } else {
        basePath = addPath;
        basePath.newPos++;
        const patcher = new (Patcher as any)();
        patcher.components = basePath.components;
        patcher.add(newWords[basePath.newPos]);
      }

      oldPos = extractCommon(basePath, newWords, oldWords, diagonal);

      if (basePath.newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
        return basePath.components;
      } else {
        bestPath[diagonal] = basePath;
      }
    }
    editLength++;
  }
  return []; // Should not happen
}

function extractCommon(basePath: { newPos: number, components: DiffResult[] }, newWords: string[], oldWords: string[], diagonal: number): number {
  let newPos = basePath.newPos;
  let oldPos = newPos - diagonal;
  
  let commonCount = 0;
  while (newPos + 1 < newWords.length && oldPos + 1 < oldWords.length && newWords[newPos + 1] === oldWords[oldPos + 1]) {
    newPos++;
    oldPos++;
    commonCount++;
  }

  if (commonCount) {
    const patcher = new (Patcher as any)();
    patcher.components = basePath.components;
    patcher.common(newWords.slice(basePath.newPos + 1, newPos + 1).join(''));
  }

  basePath.newPos = newPos;
  return oldPos;
}

function clonePath(path: { newPos: number, components: DiffResult[] }): { newPos: number, components: DiffResult[] } {
  return { newPos: path.newPos, components: path.components.slice(0) };
}

export function getCorrectionList(diff: DiffResult[]): Correction[] {
  const changes: Correction[] = [];
  let i = 0;
  while (i < diff.length) {
    if (diff[i].removed) {
      const diffStartIndex = i;
      const removedParts: string[] = [];
      const addedParts: string[] = [];
      
      let currentPos = i;
      // Collect all consecutive removed parts
      while (currentPos < diff.length && diff[currentPos].removed) {
        removedParts.push(diff[currentPos].value);
        currentPos++;
      }
      
      // Skip whitespace between removed and added
      while (currentPos < diff.length && !diff[currentPos].added && !diff[currentPos].removed) {
         currentPos++;
      }
      
      // Collect all consecutive added parts
      while (currentPos < diff.length && diff[currentPos].added) {
        addedParts.push(diff[currentPos].value);
        currentPos++;
      }
      
      const from = removedParts.join('').trim();
      const to = addedParts.join('').trim();
      const diffEndIndex = currentPos - 1;

      if (from || to) {
        changes.push({ from: from || " ", to: to || " ", diffStartIndex, diffEndIndex });
      }
      i = currentPos; // Move main cursor to after the change block
    } else {
      i++;
    }
  }
  return changes;
}