import fs from "fs/promises";
import { spawnSync } from "child_process";
import { parseFile } from "music-metadata";

import { Request, Response } from "express";

export const info = (req: Request, res: Response) => {
  res.status(200).send({
    msg: "API Test - Song Info",
  });
};

export const renderTempo = async (req: Request, res: Response) => {
  try {
    if (!req.files) {
      return res.status(400).send({
        msg: "File is not uploaded",
      });
    }

    const { tmpAudioPath, tmpOutputJsonPath } = req;

    if (!tmpAudioPath || !tmpOutputJsonPath) {
      return res.status(500).send({
        msg: "Temporary file paths are not handled",
      });
    }

    const duration = String((await parseFile(tmpAudioPath)).format.duration);

    spawnSync("audiowaveform", [
      "-i",
      tmpAudioPath,
      "-o",
      tmpOutputJsonPath,
      "-e",
      duration,
    ]);

    const audioData = String(await fs.readFile(tmpOutputJsonPath));
    const audioAmps = JSON.parse(audioData).data.map((a: number) =>
      Math.abs(a)
    );
    const diffRates = [] as number[];
    const noteTimes = [] as number[];

    const maxAmp = audioAmps.length;

    for (let i = 1; i < maxAmp; i++) {
      if (audioAmps[i - 1] !== 0) {
        diffRates.push((audioAmps[i] - audioAmps[i - 1]) / audioAmps[i - 1]);
      }
    }

    const avgDiffRate =
      diffRates.reduce((a: number, c: number) => (c > 0 ? a + c : a)) /
      diffRates.length;

    diffRates.forEach((d: number, i: number) => {
      if (d > avgDiffRate) {
        noteTimes.push(((i + 1) * parseFloat(duration)) / maxAmp);
      }
    });

    await fs.rm(tmpAudioPath);
    await fs.rm(tmpOutputJsonPath);

    res.status(200).json({
      msg: "Successfully rendered note positions",
      duration: Math.round(parseFloat(duration)),
      positions: noteTimes,
    });
  } catch (err) {
    throw err;
  }
};
