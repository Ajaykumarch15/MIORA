import { Router } from "express";
import { prisma } from "../database.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();
router.use(authenticate);

// GET /timeline - Get unified timeline for current user
router.get("/", async (req, res) => {
  const remembrances = await prisma.remembrance.findMany({
    where: { person: { userId: req.userId! } },
    include: {
      contexts: true,
      person: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const items: unknown[] = [];

  for (const r of remembrances) {
    items.push({
      id: r.id,
      personId: r.personId,
      personName: r.person.name,
      type: "remembrance",
      content: "Remembered",
      createdAt: r.createdAt.toISOString(),
    });

    for (const ctx of r.contexts) {
      items.push({
        id: ctx.id,
        personId: r.personId,
        personName: r.person.name,
        type: ctx.type,
        content: ctx.content,
        createdAt: ctx.createdAt.toISOString(),
      });
    }
  }

  items.sort(
    (a, b) =>
      new Date((b as { createdAt: string }).createdAt).getTime() -
      new Date((a as { createdAt: string }).createdAt).getTime(),
  );

  res.json(items);
});

export default router;
