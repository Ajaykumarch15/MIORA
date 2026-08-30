import { Router } from "express";
import { prisma } from "../database.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();
router.use(authenticate);

// GET /settings - Get settings
router.get("/", async (req, res) => {
  let settings = await prisma.settings.findUnique({
    where: { userId: req.userId! },
  });

  if (!settings) {
    settings = await prisma.settings.create({
      data: { userId: req.userId! },
    });
  }

  res.json(serializeSettings(settings));
});

// PATCH /settings - Update settings
router.patch("/", async (req, res) => {
  const { thoughtCooldown } = req.body;

  const validOptions = ["1m", "5m", "15m", "30m"];
  if (thoughtCooldown !== undefined && !validOptions.includes(thoughtCooldown)) {
    res.status(400).json({
      error: `thoughtCooldown must be one of: ${validOptions.join(", ")}`,
    });
    return;
  }

  const settings = await prisma.settings.upsert({
    where: { userId: req.userId! },
    create: {
      userId: req.userId!,
      thoughtCooldown: thoughtCooldown ?? "5m",
    },
    update: {
      ...(thoughtCooldown !== undefined && { thoughtCooldown }),
    },
  });

  res.json(serializeSettings(settings));
});

function serializeSettings(s: {
  id: string;
  thoughtCooldown: string;
  updatedAt: Date;
}) {
  return {
    id: s.id,
    thoughtCooldown: s.thoughtCooldown,
    updatedAt: s.updatedAt.toISOString(),
  };
}

export default router;
