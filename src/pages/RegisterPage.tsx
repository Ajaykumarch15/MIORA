import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import AuthLayout from "../components/auth/AuthLayout";
import FormInput from "../components/auth/FormInput";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, error, clearError } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);

  const isValid =
    name.trim().length > 0 &&
    email.includes("@") &&
    password.length >= 6 &&
    password === confirmPassword;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (saving || !isValid) return;
    setSaving(true);
    try {
      await register(name.trim(), email.trim(), password);
      navigate("/people");
    } catch {
      setSaving(false);
    }
  }

  return (
    <AuthLayout
      heading="Keep what matters close."
      supportingText="Create your own quiet place for the people and memories you want to remember."
    >
      <div>
        <h1 className="font-display text-2xl font-medium text-miora-charcoal leading-snug">
          Create your quiet place.
        </h1>
        <p className="mt-2 text-sm text-miora-muted">
          A space for the people and memories you want to keep close.
        </p>
      </div>

      {error && (
        <div className="mt-6 px-4 py-3 rounded-xl bg-red-50 border border-red-200">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <FormInput
          id="name"
          label="Full name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            clearError();
          }}
          placeholder="Your name"
          autoFocus
          required
          maxLength={100}
        />

        <FormInput
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            clearError();
          }}
          placeholder="your@email.com"
          required
        />

        <FormInput
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            clearError();
          }}
          placeholder="At least 6 characters"
          required
          minLength={6}
        />

        <FormInput
          id="confirmPassword"
          label="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            clearError();
          }}
          placeholder="Re-enter your password"
          required
          minLength={6}
        />

        <div className="mt-2">
          <button
            type="submit"
            disabled={!isValid || saving}
            className="w-full h-12 rounded-full bg-miora-astral text-miora-diamond font-medium text-[15px] transition-all hover:bg-miora-turbulent active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {saving ? (
              <span className="inline-block w-5 h-5 border-2 border-miora-diamond/30 border-t-miora-diamond rounded-full animate-spin" />
            ) : (
              "Create account"
            )}
          </button>
        </div>
      </form>

      <p className="mt-8 text-center text-sm text-miora-muted">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-miora-charcoal hover:text-miora-astral transition-colors"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
