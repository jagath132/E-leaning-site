import React, { ReactElement, useState, useRef, useEffect } from "react";

export const DropdownMenu = ({ children }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(
            child as ReactElement<any>,
            { open, setOpen } as any
          );
        }
        return child;
      })}
    </div>
  );
};

export const DropdownMenuTrigger = ({
  asChild,
  children,
  open,
  setOpen,
  ...props
}: any) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as ReactElement<any>, {
      onClick: () => setOpen?.(!open),
      ...props,
    });
  }
  return (
    <button onClick={() => setOpen?.(!open)} {...props}>
      {children}
    </button>
  );
};

export const DropdownMenuContent = ({
  children,
  className = "",
  align = "start",
  open,
  setOpen,
  ...props
}: any) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen?.(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open, setOpen]);

  if (!open) return null;

  const alignmentClass = align === "end" ? "right-0" : "left-0";

  return (
    <div
      ref={ref}
      className={`absolute top-full ${alignmentClass} mt-2 bg-white border border-gray-200 rounded shadow-lg z-50 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const DropdownMenuItem = ({
  children,
  className = "",
  ...props
}: any) => {
  return (
    <div
      className={`px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer flex items-center ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const DropdownMenuLabel = ({
  children,
  className = "",
  ...props
}: any) => {
  return (
    <div
      className={`px-4 py-2 text-sm font-semibold ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const DropdownMenuSeparator = ({ className = "", ...props }: any) => {
  return (
    <div className={`-mx-1 my-1 h-px bg-muted ${className}`} {...props} />
  );
};
