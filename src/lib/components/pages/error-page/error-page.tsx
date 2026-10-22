import { useTranslation } from "react-i18next";
import CenteredPage from "../centered-page/centered-page";

export default function ErrorPage() {
  const { t } = useTranslation();

  return (
    <CenteredPage>
      <h1>{t("common:error")}</h1>
    </CenteredPage>
  );
}
