import { UserButton } from "@clerk/nextjs";

export const Navbar = () => {
  return (
    <div className="flex justify-between p-3 px-10 border-b-[1px]">
        <div className="italic text-3xl ">
            Cab<span className="green_gradient">Connect</span>
        </div>
        <UserButton afterSignOutUrl="/"/>
    </div>
  )
}
