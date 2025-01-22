interface CardButtonProps {
  title: string;
  subtitle?: string;
}

export function CardButton({ title, subtitle }: CardButtonProps) {
  return (
    <div
      style={{
        cursor: "pointer",
        padding: "20px",
        backgroundColor: "#f0f0f0",
        border: "1px solid #ccc",
        borderRadius: "10px",
        textAlign: "center",
        width: "200px",
        transition: "transform 0.2s",
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <h3
        style={{
          color: "black",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          color: "black",
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}
