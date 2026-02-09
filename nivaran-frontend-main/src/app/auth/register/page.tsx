"use client";

import { registerUser } from "@/lib/api/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [serverError, setServerError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const { accessToken } = await registerUser(data.email, data.password); // Assuming token is returned upon registration
      document.cookie = `authToken=${accessToken}; path=/; secure; samesite=strict`; // Store token securely (optional)
      alert("Registration successful!");
      router.push("/auth/login"); // Redirect to the dashboard or login page
    } catch (error: unknown) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      setServerError(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="register-form">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register("email")} />
        {errors.email && (
          <small className="error">{errors.email.message}</small>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input id="password" type="password" {...register("password")} />
        {errors.password && (
          <small className="error">{errors.password.message}</small>
        )}
      </div>
      {serverError && <div className="error-message">{serverError}</div>}
      <button
        type="submit"
        disabled={isSubmitting}
        aria-label="Click to Register"
      >
        {isSubmitting ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
