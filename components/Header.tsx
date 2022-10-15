export default function Header() {
  return (
    <nav className="bg-[#242526]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center align-middle">
            <div className="flex-shrink-0">
              <img className="h-8 w-8" src="/racocon.ico" alt="Racocon" />
            </div>
            <p className="ml-8 font-medium text-2xl text-white uppercase">
              Streamframe
            </p>
            <p className="mx-2 text-white">|</p>
            <p className="text-secondary">Task Management System</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
