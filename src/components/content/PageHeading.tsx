type Props = { title: string; subtitle?: string; icon?: React.ReactNode };

export function PageHeading({ title, subtitle, icon }: Props) {
  return (
    <div className="journal-page-heading">
      <h1>{title}{icon}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
