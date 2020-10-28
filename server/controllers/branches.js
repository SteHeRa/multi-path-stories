const pug = require('pug');
const db = require('../db/models/index');

const getPrompt = async (req, res) => {
  let { prompt } = req.query;
  if (!prompt) {
    prompt = 'Once upon a time, there was a big bad wolf.';
  }
  try {
    const data = await db.Prompt.findOne({
      where: { prompt: prompt },
      include: {
        model: db.Branches,
        attributes: ['north', 'east', 'south', 'west'],
      },
    });
    const page = pug.renderFile('./views/page.pug', {
      prompt: data.prompt,
      north: data.Branch.north,
      east: data.Branch.east,
      south: data.Branch.south,
      west: data.Branch.west,
    });
    res.status(200);
    res.send(page);
  } catch (err) {
    console.log('---> err getting data from db', err);
    res.status(500);
    res.send(err);
  }
};

const postBranch = async (req, res) => {
  async function makeNewBranches() {
    try {
      const newBranch = await db.Branches.create({
        north: undefined,
        east: undefined,
        south: undefined,
        west: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return newBranch;
    } catch (err) {
      console.log('---> error making new branches', err);
      res.status(500);
      res.send(err);
    }
  }

  async function makeNewPrompt(prompt, branchesId) {
    try {
      await db.Prompt.create({
        prompt: prompt,
        branchesId: branchesId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (err) {
      console.log('---> error making new prompt', err);
      res.status(500);
      res.send(err);
    }
  }

  const { north, east, south, west } = req.body;
  try {
    const prompt = await db.Prompt.findOne({
      where: { prompt: req.query.prompt },
      include: {
        model: db.Branches,
        attributes: ['id'],
      },
    });
    const branchId = prompt.Branch.id;
    const branch = await db.Branches.findOne({
      where: { id: branchId },
    });
    if (north) {
      branch.north = north;
      branch.updatedAt = new Date();
      await branch.save();
      const newBranches = await makeNewBranches();
      await makeNewPrompt(north, newBranches.dataValues.id);
    }
    if (east) {
      branch.east = east;
      branch.updatedAt = new Date();
      await branch.save();
      const newBranches = await makeNewBranches();
      console.log('newBranchesId', newBranches.dataValues.id);
      await makeNewPrompt(east, newBranches.dataValues.id);
    }
    if (south) {
      branch.south = south;
      branch.updatedAt = new Date();
      await branch.save();
      const newBranches = await makeNewBranches();
      console.log('newBranchesId', newBranches.id);
      await makeNewPrompt(south, newBranches.dataValues.id);
    }
    if (west) {
      branch.west = west;
      branch.updatedAt = new Date();
      await branch.save();
      const newBranches = await makeNewBranches();
      console.log('newBranchesId', newBranches.id);
      await makeNewPrompt(west, newBranches.dataValues.id);
    }
    const data = await db.Prompt.findOne({
      where: { prompt: req.query.prompt },
      include: {
        model: db.Branches,
        attributes: ['north', 'east', 'south', 'west'],
      },
    });
    const page = pug.renderFile('./views/page.pug', {
      prompt: data.prompt,
      north: data.Branch.north,
      east: data.Branch.east,
      south: data.Branch.south,
      west: data.Branch.west,
    });
    res.status(200);
    res.send(page);
  } catch (err) {
    console.log('---> error posting branch to db', err);
    res.status(500);
    res.send(err);
  }
};

module.exports = {
  getPrompt,
  postBranch,
};
