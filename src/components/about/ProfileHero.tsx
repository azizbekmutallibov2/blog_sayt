import Image from "next/image";
import { DownloadIcon, SocialIcon } from "@/components/icons";

type Props = {
  name: string;
  role: string;
  avatar: string;
  stack: string[];
  cv: { url: string; label: string };
  socials: { label: string; url: string; platform: string }[];
  stats: { label: string; value: string }[];
};

export function ProfileHero({ name, role, avatar, stack, cv, socials, stats }: Props) {
  return (
    <section className="journal-profile">
      <div className="journal-profile-heading">
        <div className="journal-profile-avatar">
          {avatar ? <Image src={avatar} alt={name} fill priority sizes="(min-width: 640px) 144px, 88px" className="object-cover" /> : <span>{name.charAt(0)}</span>}
        </div>
        <div className="min-w-0">
          <h1>{name}</h1>
          {role && <p className="journal-profile-role">{role}</p>}
        </div>
      </div>
      {stack.length > 0 && <ul className="journal-profile-stack">{stack.slice(0, 8).map((s) => <li key={s}>{s}</li>)}</ul>}
      <div className="journal-profile-links">
        {cv.url && <a href={cv.url} target="_blank" rel="noopener noreferrer" download className="journal-button"><DownloadIcon />{cv.label}</a>}
        {socials.map((s) => (
          <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label} className="journal-profile-social"><SocialIcon platform={s.platform} size={19} /></a>
        ))}
      </div>
      {stats.length > 0 && (
        <dl className="journal-profile-stats">
          {stats.map((s) => <div key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>)}
        </dl>
      )}
    </section>
  );
}
