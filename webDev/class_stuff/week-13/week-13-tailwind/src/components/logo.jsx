import logoImg from "../assets/logoIcon.png"

export function Logo(){

  return (
    <div className="flex gap-3 mt-28 align-bottom">
      <img src={logoImg} className="h-8 self-center"/>
      <h1 className="text-teal text-3xl">Webinar<span className="text-white">.gg</span></h1>
    </div>
  )
}