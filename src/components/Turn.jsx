export function Turn ({ children, isSelected }) {
  return (
    <p className={`text-3xl w-12 h-12 grid place-content-center rounded-lg ${isSelected ? 'bg-blue-500' : ''}`}>
      {children}
    </p>
  )
}
