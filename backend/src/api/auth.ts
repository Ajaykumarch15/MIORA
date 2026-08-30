import { Router } from "express";
import bcrypt from "bcrypt";
import jwt, { type SignOptions } from "jsonwebtoken";
import { prisma } from "../database.js";
import { config } from "../config.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

// POST /auth/register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || typeof email !== "string" || !email.includes("@")) {
    res.status(400).json({ error: "Valid email is required" });
    return;
  }
  if (!password || typeof password !== "string" || password.length < 6) {
    res.status(400).json({ error: "Password must be at least 6 characters" });
    return;
  }
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    res.status(400).json({ error: "Name is required" });
    return;
  }

  const existing = await prisma.user.findUnique({
    where: { email: email.trim().toLowerCase() },
  });
  if (existing) {
    res.status(409).json({ error: "An account with this email already exists" });
    return;
  }

  const passwordHash = await bcrypt.hash(password, config.bcryptRounds);
  const user = await prisma.user.create({
    data: {
      email: email.trim().toLowerCase(),
      name: name.trim(),
      passwordHash,
      settings: { create: {} },
    },
  });

  const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  } as SignOptions);

  res.status(201).json({
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
});

// POST /auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  const user = await prisma.user.findUnique({
    where: { email: email.trim().toLowerCase() },
  });
  if (!user) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  } as SignOptions);

  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
});

// GET /auth/me
router.get("/me", authenticate, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId! },
    select: { id: true, name: true, email: true },
  });
  if (!user) {
    res.status(401).json({ error: "User not found" });
    return;
  }
  res.json(user);
});

// POST /auth/logout (client-side, but endpoint for consistency)
router.post("/logout", (_req, res) => {
  res.json({ ok: true });
});

export default router;
