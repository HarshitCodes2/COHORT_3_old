import userPfp from "../../assets/icon/action/userPfp.svg" 

export function UserInfo({ fName, lName }){
  
  return (
    <div className="mt-8">
      <div className="flex gap-1">
        <img src={userPfp} className="w-10" />
        <p className="w-64 self-center font-medium text-xl">{fName} {lName}</p>
      </div>
    </div>
  )
}