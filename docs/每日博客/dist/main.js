import { cutFile } from "./cutFile.js";

const inputFile = document.querySelector('input[type="file"]');

inputFile.onchange = async (e) => {
  const file = e.target.files[0];
  const chunk = await cutFile(file);
  console.log(chunk);
};
