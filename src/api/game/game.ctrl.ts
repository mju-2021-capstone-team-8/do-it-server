import { promises as fs } from "fs";
import { spawnSync } from "child_process";
import { parseFile } from "music-metadata";
import path from "path";

import { Request, Response } from "express";

const audioDir = path.resolve(__dirname, "..", "..", "..", "audios");

export const info = (req: Request, res: Response) => {
  res.status(200).send({
    msg: "API Test - Song Info",
  });
};

export const audioList = async (req: Request, res: Response) => {
  const dir = await fs.readdir(`${audioDir}/1`, "utf-8");

  res.status(200).json(dir);
};

export const upload = (req: Request, res: Response) => {
  res.status(200).send({
    musicFile: path.basename(req.tmpAudioPath),
  });
};

export const renderTempo = async (req: Request, res: Response) => {
  try {
    const { musicFile } = req.body;

    const duration = String((await parseFile(`${audioDir}/1/${musicFile}`)).format.duration);

    spawnSync("audiowaveform", [
      "-i",
      `${audioDir}/1/${musicFile}`,
      "-o",
      `${audioDir}/1/${musicFile}.json`,
      "-e",
      duration,
    ]);

    const audioData = String(await fs.readFile(`${audioDir}/1/${musicFile}.json`));
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

    await fs.rm(`${audioDir}/1/${musicFile}.json`);

    res.status(200).json({
      msg: "Successfully rendered note positions",
      duration: Math.round(parseFloat(duration)),
      positions: noteTimes,
    });
  } catch (err) {
    throw err;
  }
};
