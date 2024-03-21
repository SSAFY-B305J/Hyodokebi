import RegForm from "../../components/user/RegForm";
import MainLayout from "../../layouts/Mainlayout";

export default function RegFormPage() {
  return (
    <MainLayout>
      <div className="m-14">
        <RegForm />
      </div>
    </MainLayout>
  );
}
