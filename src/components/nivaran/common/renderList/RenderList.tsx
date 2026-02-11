export default function RenderList<T>({
  data,
  render,
}: {
  data: T[];
  render: (t: T, index?: number) => React.ReactNode;
}) {
  return data?.map(render);
}
