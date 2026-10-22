import { useTranslation } from "react-i18next";
import CenteredPage from "../centered-page/centered-page";

export default function LoadingPage() {
  const { t } = useTranslation();

  return (
    <CenteredPage>
      <h1>{t("common:loading")}</h1>
    </CenteredPage>
  );
}
