export function FieldIssue({ id, message }: { id?: string; message?: string | null }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1 text-sm leading-snug text-[#e82828]">
      {message}
    </p>
  );
}

export function focusClaimField(id: string) {
  const element = document.getElementById(id);
  if (!element) return;
  element.scrollIntoView({ behavior: "smooth", block: "center" });
  if (element instanceof HTMLElement) {
    element.focus({ preventScroll: true });
  }
}
