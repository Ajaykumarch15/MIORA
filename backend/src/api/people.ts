import { Router } from "express";
import { prisma } from "../database.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();
router.use(authenticate);

// GET /people - List active people
router.get("/", async (req, res) => {
  const people = await prisma.person.findMany({
    where: { userId: req.userId!, archivedAt: null },
    orderBy: { createdAt: "desc" },
  });
  res.json(people.map(serializePerson));
});

// GET /people/archived - List archived people
router.get("/archived", async (req, res) => {
  const people = await prisma.person.findMany({
    where: { userId: req.userId!, archivedAt: { not: null } },
    orderBy: { archivedAt: "desc" },
  });
  res.json(people.map(serializePerson));
});

// POST /people - Create a person
router.post("/", async (req, res) => {
  const { name, nickname } = req.body;
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    res.status(400).json({ error: "Name is required" });
    return;
  }
  const person = await prisma.person.create({
    data: {
      userId: req.userId!,
      name: name.trim(),
      nickname: nickname?.trim() || null,
    },
  });
  res.status(201).json(serializePerson(person));
});

// GET /people/:id - Get a person
router.get("/:id", async (req, res) => {
  const person = await prisma.person.findFirst({
    where: { id: req.params.id, userId: req.userId! },
  });
  if (!person) {
    res.status(404).json({ error: "Person not found" });
    return;
  }
  res.json(serializePerson(person));
});

// PATCH /people/:id - Update a person
router.patch("/:id", async (req, res) => {
  const { name, nickname } = req.body;
  const data: Record<string, unknown> = {};
  if (name !== undefined) data.name = name;
  if (nickname !== undefined) data.nickname = nickname || null;

  try {
    const person = await prisma.person.update({
      where: { id: req.params.id, userId: req.userId! },
      data,
    });
    res.json(serializePerson(person));
  } catch {
    res.status(404).json({ error: "Person not found" });
  }
});

// POST /people/:id/archive - Archive a person
router.post("/:id/archive", async (req, res) => {
  try {
    const person = await prisma.person.update({
      where: { id: req.params.id, userId: req.userId! },
      data: { archivedAt: new Date() },
    });
    res.json(serializePerson(person));
  } catch {
    res.status(404).json({ error: "Person not found" });
  }
});

// POST /people/:id/restore - Restore a person
router.post("/:id/restore", async (req, res) => {
  try {
    const person = await prisma.person.update({
      where: { id: req.params.id, userId: req.userId! },
      data: { archivedAt: null, deletionRequestedAt: null, deletionScheduledFor: null },
    });
    res.json(serializePerson(person));
  } catch {
    res.status(404).json({ error: "Person not found" });
  }
});

// POST /people/:id/deletion - Request deletion
router.post("/:id/deletion", async (req, res) => {
  const scheduledFor = new Date();
  scheduledFor.setDate(scheduledFor.getDate() + 30);

  try {
    const person = await prisma.person.update({
      where: { id: req.params.id, userId: req.userId! },
      data: {
        deletionRequestedAt: new Date(),
        deletionScheduledFor: scheduledFor,
      },
    });
    res.json(serializePerson(person));
  } catch {
    res.status(404).json({ error: "Person not found" });
  }
});

// DELETE /people/:id/deletion - Cancel deletion
router.delete("/:id/deletion", async (req, res) => {
  try {
    const person = await prisma.person.update({
      where: { id: req.params.id, userId: req.userId! },
      data: { deletionRequestedAt: null, deletionScheduledFor: null },
    });
    res.json(serializePerson(person));
  } catch {
    res.status(404).json({ error: "Person not found" });
  }
});

function serializePerson(p: {
  id: string;
  name: string;
  nickname: string | null;
  createdAt: Date;
  archivedAt: Date | null;
  deletionRequestedAt: Date | null;
  deletionScheduledFor: Date | null;
}) {
  return {
    id: p.id,
    name: p.name,
    nickname: p.nickname,
    createdAt: p.createdAt.toISOString(),
    archivedAt: p.archivedAt?.toISOString() ?? null,
    deletionRequestedAt: p.deletionRequestedAt?.toISOString() ?? null,
    deletionScheduledFor: p.deletionScheduledFor?.toISOString() ?? null,
  };
}

export default router;
