import Link from "next/link";
import ThemeToggleButton from "./theme-toggle-button";


export default async function HeaderComponent() {

  return (
    <>
      <header className="h-full flex-col md:flex">
        <div className="flex flex-col items-start justify-between space-y-2 py-4 px-8 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <Link href="/" >
            <h2 className="text-lg font-semibold">DataDraw</h2>
          </Link>
          <ThemeToggleButton />
        </div>
        <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full"></div>
      </header>
    </>

  );
}
