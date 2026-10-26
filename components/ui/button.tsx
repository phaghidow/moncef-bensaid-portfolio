import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  variant: ButtonVariant;
  children: ReactNode;
  href?: string;
  target?: string;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
} & Omit<
  ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>,
  "children" | "href" | "onClick" | "target"
>;

const variantClasses: Record<ButtonVariant, string> = {
  primary: "btn-sweep bg-accent text-bg hover:opacity-90",
  secondary: "border border-accent bg-transparent text-accent hover:bg-accent-soft",
};

const sharedClasses =
  "inline-flex min-h-11 items-center justify-center rounded-md px-5 py-2.5 font-mono text-sm transition-colors duration-fast";

export function Button({
  variant,
  children,
  href,
  target,
  onClick,
  className,
  ...props
}: ButtonProps) {
  const classes = `${sharedClasses} ${variantClasses[variant]}${className ? ` ${className}` : ""}`;

  if (href) {
    return (
      <a href={href} target={target} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  );
}