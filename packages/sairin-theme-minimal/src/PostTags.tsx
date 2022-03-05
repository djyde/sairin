import fontColorContrast from "font-color-contrast";

export default function PostTags(props: {
  labels: { color: string; name: string }[];
}) {
  return (
    <div className="flex gap-2 my-2">
      {props.labels.map((label) => {
        return (
          <span
            className="rounded-full border-solid border px-4 text-sm"
            style={{
              backgroundColor: label.color,
              color: fontColorContrast(label.color),
            }}
          >
            {label.name}
          </span>
        );
      })}
    </div>
  );
}
