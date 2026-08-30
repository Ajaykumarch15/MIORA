import { Router, type Request, type Response } from "express";
import { prisma } from "../database.js";
import { authenticate } from "../middleware/auth.js";

const router = Router({ mergeParams: true });
router.use(authenticate);

interface PersonParams {
  personId: string;
}

// GET /people/:personId/remembrances - List remembrances for a person
router.get("/", async (req: Request<PersonParams>, res: Response) => {
  const { personId } = req.params;

  // Verify person belongs to user
  const person = await prisma.person.findFirst({
    where: { id: personId, userId: req.userId! },
  });
  if (!person) {
    res.status(404).json({ error: "Person not found" });
    return;
  }

  const remembrances = await prisma.remembrance.findMany({
    where: { personId },
    orderBy: { createdAt: "desc" },
    include: { contexts: true },
  });
  res.json(remembrances.map(serializeRemembrance));
});

// POST /people/:personId/remembrances - Create a remembrance
router.post("/", async (req: Request<PersonParams>, res: Response) => {
  const { personId } = req.params;

  // Verify person belongs to user
  const person = await prisma.person.findFirst({
    where: { id: personId, userId: req.userId! },
  });
  if (!person) {
    res.status(404).json({ error: "Person not found" });
    return;
  }

  const remembrance = await prisma.remembrance.create({
    data: { personId },
    include: { contexts: true },
  });

  res.status(201).json(serializeRemembrance(remembrance));
});

function serializeRemembrance(r: {
  id: string;
  personId: string;
  createdAt: Date;
  contexts: { id: string; type: string; content: string; createdAt: Date }[];
}) {
  return {
    id: r.id,
    personId: r.personId,
    createdAt: r.createdAt.toISOString(),
    contexts: r.contexts.map((c) => ({
      id: c.id,
      type: c.type,
      content: c.content,
      createdAt: c.createdAt.toISOString(),
    })),
  };
}

export default router;
