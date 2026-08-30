import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopBar from "../components/layout/TopBar";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useAuth } from "../auth/AuthProvider";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, error, clearError } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    try {
      await register(name.trim(), email.trim(), password);
      navigate("/people");
    } catch {
      setSaving(false);
    }
  }

  const isValid = name.trim().length > 0 && email.includes("@") && password.length >= 6;

  return (
    <div className="flex flex-col min-h-dvh">
      <TopBar title="Create Account" showBack />
      <div className="flex-1 flex flex-col px-6 pt-6 pb-6">
        <p className="text-miora-charcoal text-[15px] font-medium mb-8 leading-relaxed">
          Begin your MIORA.
        </p>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          <div className="flex flex-col gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-[13px] font-medium text-miora-muted mb-2.5"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); clearError(); }}
                placeholder="Your name"
                autoFocus
                required
                maxLength={100}
                className="w-full h-12 px-4 rounded-xl bg-miora-frost border border-miora-line/70 text-miora-charcoal text-[15px] placeholder:text-miora-muted/40 focus:outline-none focus:border-miora-steel/60 focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-[13px] font-medium text-miora-muted mb-2.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); clearError(); }}
                placeholder="your@email.com"
                required
                className="w-full h-12 px-4 rounded-xl bg-miora-frost border border-miora-line/70 text-miora-charcoal text-[15px] placeholder:text-miora-muted/40 focus:outline-none focus:border-miora-steel/60 focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-[13px] font-medium text-miora-muted mb-2.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); clearError(); }}
                placeholder="At least 6 characters"
                required
                minLength={6}
                className="w-full h-12 px-4 rounded-xl bg-miora-frost border border-miora-line/70 text-miora-charcoal text-[15px] placeholder:text-miora-muted/40 focus:outline-none focus:border-miora-steel/60 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="mt-auto pt-8">
            <PrimaryButton type="submit" fullWidth disabled={!isValid} loading={saving}>
              Create Account
            </PrimaryButton>
          </div>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-sm text-miora-muted hover:text-miora-charcoal transition-colors"
          >
            Already have an account? <span className="font-medium">Sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
