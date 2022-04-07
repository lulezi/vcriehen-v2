export function DangerButton({
  className,
  children,
  ...props
}: JSX.ElementChildrenAttribute & { className?: string }): JSX.Element {
  return (
    <button
      className={
        className +
        " rounded bg-red-500 py-2 px-4 text-white hover:bg-red-600 focus:bg-red-400"
      }
      {...props}
    >
      {children}
    </button>
  );
}
