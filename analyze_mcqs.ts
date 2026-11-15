import { generalMCQs } from './src/generalMCQs';

const distribution: Record<number, number> = {};
const topics: Record<number, string[]> = {};

generalMCQs.forEach(mcq => {
  distribution[mcq.chapterId] = (distribution[mcq.chapterId] || 0) + 1;
  if (!topics[mcq.chapterId]) {
    topics[mcq.chapterId] = [];
  }
  if (!topics[mcq.chapterId].includes(mcq.topic)) {
    topics[mcq.chapterId].push(mcq.topic);
  }
});

console.log("Current MCQ distribution by chapter:", distribution);
console.log("Topics by chapter:", topics);
