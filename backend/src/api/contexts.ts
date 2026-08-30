import { Router, type Request, type Response } from "express";
import { prisma } from "../database.js";
import { authenticate } from "../middleware/auth.js";

const router = Router({ mergeParams: true });
router.use(authenticate);

interface PersonParams {
  personId: string;
}

// GET /people/:personId/contexts - List contexts for a person
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

  const contexts = await prisma.context.findMany({
    where: { personId },
    orderBy: { createdAt: "desc" },
  });
  res.json(contexts.map(serializeContext));
});

// POST /people/:personId/contexts - Create a context
router.post("/", async (req: Request<PersonParams>, res: Response) => {
  const { personId } = req.params;
  const { remembranceId, type, content } = req.body;

  if (!remembranceId || !type || !content) {
    res.status(400).json({ error: "remembranceId, type, and content are required" });
    return;
  }

  const validTypes = ["memory", "conversation", "feeling", "place"];
  if (!validTypes.includes(type)) {
    res.status(400).json({ error: `type must be one of: ${validTypes.join(", ")}` });
    return;
  }

  // Verify person belongs to user
  const person = await prisma.person.findFirst({
    where: { id: personId, userId: req.userId! },
  });
  if (!person) {
    res.status(404).json({ error: "Person not found" });
    return;
  }

  const remembrance = await prisma.remembrance.findUnique({
    where: { id: remembranceId },
  });
  if (!remembrance || remembrance.personId !== personId) {
    res.status(404).json({ error: "Remembrance not found for this person" });
    return;
  }

  const context = await prisma.context.create({
    data: {
      remembranceId,
      personId,
      type,
      content: content.trim(),
    },
  });

  res.status(201).json(serializeContext(context));
});

function serializeContext(c: {
  id: string;
  remembranceId: string;
  type: string;
  content: string;
  createdAt: Date;
}) {
  return {
    id: c.id,
    remembranceId: c.remembranceId,
    type: c.type,
    content: c.content,
    createdAt: c.createdAt.toISOString(),
  };
}

export default router;
