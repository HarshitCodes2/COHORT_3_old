import logo from "../assets/friskayLogo.svg";
import split from "../assets/verticalSplit.svg";

export function NavBar(){
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="flex items-center gap-[46px]">
          <img src={logo} className="h-logo"/>
          <img src={split} className="h-split" />
          <div>Home</div>
        </div>
        <div></div>
      </div>
    </>
  )
}