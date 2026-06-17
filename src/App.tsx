import ReloadPrompt from "@/components/ReloadPrompt";
import MainLayout from "@/components/mainLayout";
import CoinFlip from "@/components/coinFlip";

const App: React.FC = () => {
  return <>
    <MainLayout>
      <CoinFlip />
    </MainLayout>
    <ReloadPrompt />
  </>;
}

export default App;
