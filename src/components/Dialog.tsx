import { type ReactNode, type Ref, useId } from "react";

type DialogProps = {
  ref: Ref<HTMLDialogElement>;
  title: string;
  children: ReactNode;
};

const Dialog = ({ ref, title, children }: DialogProps) => {
  const titleId = useId();

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      className="mt-auto w-full max-w-none rounded-t-xl bg-background p-6 text-foreground backdrop:bg-black/50 md:m-auto md:max-w-120 md:rounded-xl"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 id={titleId} className="text-xl font-bold">
          {title}
        </h2>
        <button
          type="button"
          aria-label="Close"
          onClick={(event) => event.currentTarget.closest("dialog")?.close()}
          className="flex min-h-11 min-w-11 items-center justify-center rounded-md text-2xl text-muted hover:text-foreground"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="mt-4">{children}</div>
    </dialog>
  );
};

export default Dialog;
