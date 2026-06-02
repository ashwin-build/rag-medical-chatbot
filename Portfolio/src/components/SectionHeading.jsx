const SectionHeading = ({ eyebrow, title, description }) => (
  <div className="max-w-3xl">
    <p className="subtle-label">{eyebrow}</p>
    <h2 className="section-heading mt-3">{title}</h2>
    {description ? (
      <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">{description}</p>
    ) : null}
  </div>
);

export default SectionHeading;
