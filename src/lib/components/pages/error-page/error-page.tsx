import { useTranslation } from "react-i18next";
import CenteredPage from "../centered-page/centered-page";
import LinkButton from "../../button/link-button";
import { HomeIcon } from "lucide-react";

export default function ErrorPage() {
  const { t } = useTranslation();

  return (
    <CenteredPage>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl text-red-500">{t("common:error")}</h1>
        <LinkButton
          leftIcon={<HomeIcon className="w-4" />}
          label={t("common:goHome")}
          destination="/"
        />
      </div>
    </CenteredPage>
  );
}
