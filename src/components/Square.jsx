export function Square ({ children, index, updateSquare }) {
  const handleClick = () => {
    updateSquare(index)
  }

  return (
    <div onClick={handleClick} className='w-24 h-24 border rounded-lg grid place-content-center cursor-pointer' key={index}>
      <span className='text-3xl'>{children}</span>
    </div>
  )
}
