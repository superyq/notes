import { createChunk } from "./createChunk.js";

onmessage = async (e) => {
  const {
    file,
    CHUNK_SIZE,
    startChunkIndex: start,
    endChunkIndex: end,
  } = e.target;

  const proms = [];
  for (let i = start; i < end; i++) {
    proms.push(createChunk(file, i, CHUNK_SIZE));
  }
  const chunks = await Promise.all(proms);
  postMessage(chunks);
};
