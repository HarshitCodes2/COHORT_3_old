import starIcon from '../../assets/star.svg'
import lockIcon from '../../assets/lock.svg'

export const SideBarCard: () => JSX.Element = () => {

  return (
    <>
      <div className="flex items-center justify-between mt-2 p-2 rounded-md bg-leetcode-lightgrey">
        <div className='flex items-center'>
        <img src={starIcon} className='bg-leetcode-white w-6 h-6 p-1 rounded-sm' />
        <p className='text-white text-xs font-medium ml-2 '> Favorite </p>
        </div>
        <img src={lockIcon} className='w-4 h-4' />
      </div>
    </>
  )
}