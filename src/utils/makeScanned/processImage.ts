import { main } from "./magicaImporter";

import { generateIFile } from "./utils";

import type { ProcessConfig } from "./processConfig";
import { getProcessCommand } from "./processConfig";

export type processImageFuncType = (
  imageArrayBufferView: ArrayBufferView,
  config: ProcessConfig
) => Promise<ArrayBufferView>;

export const processImage: processImageFuncType = async function (
  imageArrayBufferView,
  config
) {
  const inputFilename = "image.png";
  const outputFilename = "foo.png";

  const file = generateIFile(imageArrayBufferView, inputFilename);

  const result = await main({
    debug: false,
    command: getProcessCommand(config, inputFilename, outputFilename),
    inputFiles: [file],
  });

  const outputFile = result.outputFiles[0];
  const outputFileContent = outputFile.content;
  return outputFileContent;
};
