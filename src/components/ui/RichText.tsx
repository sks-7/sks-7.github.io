/** Renders text where **segments** become emphasized, matching the resume's bold terms. */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-medium text-fg">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}
