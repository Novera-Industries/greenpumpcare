"use client";

import { forwardRef } from "react";
import { motion } from "motion/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { buttonHover } from "@/lib/animations";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-semibold transition-colors cursor-pointer whitespace-nowrap",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white hover:bg-primary-dark rounded-pill shadow-card hover:shadow-float",
        secondary:
          "bg-white text-primary border-2 border-primary hover:bg-stripe rounded-pill",
        "secondary-light":
          "bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary-dark rounded-pill",
        ghost:
          "bg-transparent text-primary hover:bg-stripe hover:underline rounded-pill",
        chip:
          "bg-stripe text-text hover:bg-primary hover:text-white rounded-pill",
      },
      size: {
        sm: "px-5 py-2 text-sm",
        md: "px-7 py-3.5 text-base",
        lg: "px-8 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    href?: string;
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size }), className);

    if (href) {
      return (
        <motion.a
          href={href}
          className={classes}
          {...buttonHover}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={classes}
        {...buttonHover}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export { Button, buttonVariants };
