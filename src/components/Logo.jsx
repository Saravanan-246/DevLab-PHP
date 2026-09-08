function Logo({ compact = false }) {
  return (
    <a href="/" className={`logo ${compact ? "logo--compact" : ""}`}>
      <span className="logo__mark">PHP</span>

      {!compact && (
        <span className="logo__text">
          PHP & MYSQL LAB
        </span>
      )}
    </a>
  );
}

export default Logo;