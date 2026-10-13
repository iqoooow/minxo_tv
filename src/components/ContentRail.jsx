import PosterCard from './PosterCard';
import { IconChevronRight } from './Icons';

export default function ContentRail({
  id,
  title,
  heading,
  items = [],
  linkText = 'Barchasi',
  onSelect,
  selectedId,
}) {
  const displayTitle = heading || title;

  // Hide rail if it has no items
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="section" id={id} aria-label={displayTitle}>
      <div className="section-header">
        <h2 className="section-title">{displayTitle}</h2>
        <a href={`#${id}`} className="section-link">
          {linkText}
          <IconChevronRight size={16} />
        </a>
      </div>

      <div className="scroll-rail">
        {items.map((item) => (
          <PosterCard
            key={item.id}
            item={item}
            onSelect={onSelect}
            isSelected={selectedId === item.id}
          />
        ))}
      </div>
    </section>
  );
}
