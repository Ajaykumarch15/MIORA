import { Router, type Request, type Response } from "express";
import { prisma } from "../database.js";
import { authenticate } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

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
  const { remembranceId, type, title, content, photoUrl, memoryDate, location, whyMatters } = req.body;

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
      title: title?.trim() || null,
      content: content.trim(),
      photoUrl: photoUrl || null,
      memoryDate: memoryDate ? new Date(memoryDate) : null,
      location: location?.trim() || null,
      whyMatters: whyMatters?.trim() || null,
    },
  });

  res.status(201).json(serializeContext(context));
});

// POST /contexts/:id/photo - Upload photo for a context
router.post("/:id/photo", upload.single("photo"), async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  const photoUrl = `/uploads/${req.file.filename}`;

  try {
    const context = await prisma.context.update({
      where: { id },
      data: { photoUrl },
    });
    res.json(serializeContext(context));
  } catch {
    res.status(404).json({ error: "Context not found" });
  }
});

// PATCH /contexts/:id - Update a context
router.patch("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, photoUrl, memoryDate, location, whyMatters } = req.body;

  const data: Record<string, unknown> = {};
  if (title !== undefined) data.title = title || null;
  if (content !== undefined) data.content = content;
  if (photoUrl !== undefined) data.photoUrl = photoUrl || null;
  if (memoryDate !== undefined) data.memoryDate = memoryDate ? new Date(memoryDate) : null;
  if (location !== undefined) data.location = location || null;
  if (whyMatters !== undefined) data.whyMatters = whyMatters || null;

  try {
    const context = await prisma.context.update({
      where: { id },
      data,
    });
    res.json(serializeContext(context));
  } catch {
    res.status(404).json({ error: "Context not found" });
  }
});

// DELETE /contexts/:id - Delete a context
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.context.delete({
      where: { id },
    });
    res.status(204).send();
  } catch {
    res.status(404).json({ error: "Context not found" });
  }
});

function serializeContext(c: {
  id: string;
  remembranceId: string;
  type: string;
  title: string | null;
  content: string;
  photoUrl: string | null;
  memoryDate: Date | null;
  location: string | null;
  whyMatters: string | null;
  createdAt: Date;
}) {
  return {
    id: c.id,
    remembranceId: c.remembranceId,
    type: c.type,
    title: c.title,
    content: c.content,
    photoUrl: c.photoUrl,
    memoryDate: c.memoryDate?.toISOString() ?? null,
    location: c.location,
    whyMatters: c.whyMatters,
    createdAt: c.createdAt.toISOString(),
  };
}

export default router;
