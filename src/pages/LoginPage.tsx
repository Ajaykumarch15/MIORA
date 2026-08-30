import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import AuthLayout from "../components/auth/AuthLayout";
import FormInput from "../components/auth/FormInput";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, error, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    try {
      await login(email.trim(), password);
      navigate("/people");
    } catch {
      setSaving(false);
    }
  }

  return (
    <AuthLayout
      heading="Some memories are worth returning to."
      supportingText="Your quiet place for the people and moments that matter."
    >
      <div>
        <h1 className="font-display text-2xl font-medium text-miora-charcoal leading-snug">
          Welcome back.
        </h1>
        <p className="mt-2 text-sm text-miora-muted">
          Return to the memories that matter to you.
        </p>
      </div>

      {error && (
        <div className="mt-6 px-4 py-3 rounded-xl bg-red-50 border border-red-200">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
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
          autoFocus
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
          placeholder="Your password"
          required
          minLength={6}
        />

        <div className="mt-1">
          <button
            type="button"
            className="text-[13px] text-miora-muted hover:text-miora-charcoal transition-colors"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={!email || !password || saving}
          className="w-full h-12 rounded-full bg-miora-astral text-miora-diamond font-medium text-[15px] transition-all hover:bg-miora-turbulent active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          {saving ? (
            <span className="inline-block w-5 h-5 border-2 border-miora-diamond/30 border-t-miora-diamond rounded-full animate-spin" />
          ) : (
            "Continue"
          )}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-miora-muted">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-miora-charcoal hover:text-miora-astral transition-colors"
        >
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
}
