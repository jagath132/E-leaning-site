export const Dialog = ({
  children,
  open,
  onOpenChange,
}: {
  children: React.ReactNode;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={() => onOpenChange?.(false)}
    >
      {children}
    </div>
  );
};

export const DialogContent = ({ children, className = "", ...props }: any) => {
  return (
    <div
      className={`bg-white border rounded shadow p-6 max-w-md ${className}`}
      onClick={(e) => e.stopPropagation()}
      {...props}
    >
      {children}
    </div>
  );
};

export const DialogHeader = ({ children, ...props }: any) => {
  return (
    <div className="mb-4" {...props}>
      {children}
    </div>
  );
};

export const DialogTitle = ({ children, ...props }: any) => {
  return (
    <h2 className="text-xl font-bold" {...props}>
      {children}
    </h2>
  );
};

export const DialogFooter = ({ children, className = "", ...props }: any) => {
  return (
    <div
      className={`flex items-center justify-end gap-2 mt-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
