import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

const Header = () => {
  return (
    <header className='flex flex-col sm:flex-row justify-between items-center p-3 sm:p-6 gap-3 sm:gap-4 h-auto sm:h-20 shadow-lg'>
        <h1 className='text-lg sm:text-3xl lg:text-2xl font-bold  text-gray-700 text-center sm:text-left'>Task Manager</h1>
        <div className="flex gap-2 sm:gap-4 items-center">
            <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button  className="bg-green-500 text-white rounded-full font-medium text-sm sm:text-base h-9 sm:h-11 px-4 sm:px-6 transition hover:bg-green-600">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>    
        </div>
    </header>
  )
}

export default Header
