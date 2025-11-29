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

  return (
    <div
      ref={ref}
      className={`absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded shadow-lg z-50 ${className}`}
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
      className={`px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
