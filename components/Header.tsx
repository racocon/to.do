export default function Header() {
  return (
    <nav className="bg-[#242526]">
      <div className="mx-auto md:max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center align-middle">
            <div className="flex-shrink-0">
              <img className="h-8 w-8" src="/todo.ico" alt="Racocon" />
            </div>
            <p className="md:ml-6 ml-4 font-mono font-medium md:text-2xl text-xl text-[#86E99E]">
              to.do
            </p>
            <p className="hidden md:block mx-2 text-white">|</p>
            <p className="hidden md:block font-mono text-white">
              task management system
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}
