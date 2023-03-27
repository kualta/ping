import Footer from "./Footer";
import Header from "./Header";

export default function Menu() {
  return (
    <div className="sticky top-0 flex h-screen w-full max-w-xs shrink flex-col place-content-between p-4">
      <Header />
      <Footer />
    </div>
  );
}
