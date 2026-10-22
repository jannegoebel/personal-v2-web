import { useTranslation } from "react-i18next";
import CenteredPage from "../lib/components/pages/centered-page/centered-page";

export default function Imprint() {
  const { t } = useTranslation();

  return (
    <CenteredPage>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl">{t("imprint:title")}</h1>
        <h3 className="text-lg font-medium normal-case">
          {t("imprint:content.legalNote")}
        </h3>
        <div className="flex flex-col text-sm">
          <p className="select-none">Janne Göbel</p>
          <p className="select-none">Hallwanger Straße 2</p>
          <p className="select-none">72250 Freudenstadt</p>
          <p>
            {`${t("imprint:content.email")}: `}
            <a
              href="mailto:info@jannegoebel.de"
              className="underline hover:text-orange-400"
            >
              info@jannegoebel.de
            </a>
          </p>
        </div>
      </div>
    </CenteredPage>
  );
}
