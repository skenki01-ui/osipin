import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  full?: boolean;
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

export default function Button({
  children,
  full = false,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const classes = [
    "app-button",
    `app-button-${variant}`,
    full ? "app-button-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}