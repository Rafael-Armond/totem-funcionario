import Image from "next/image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import "./style.css";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back(); // Voltar para a página anterior
  };

  return (
    <div className="header">
      <div className="header-back" onClick={handleBack}>
        <ArrowBackIcon style={{ fontSize: "2rem", cursor: "pointer" }} />
      </div>
      <div className="header-logo">
        <Image
          src="/assets/images/logo.png"
          alt="Logo da Aplicação"
          width={180}
          height={100}
        />
      </div>
      <div className="header-title">{title}</div>
    </div>
  );
}
