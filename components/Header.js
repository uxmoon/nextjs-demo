import headerStyles from '../styles/Header.module.css'

const Header = () => {
  // const x = 1
  return (
    <>
      <h1 className={headerStyles.title}>
        <span>Next.js</span> Crash Course
      </h1>
      <p className={headerStyles.description}>
        Based on Traversy Media crash course
      </p>
      {/* <style jsx>
        {`
          .title {
            color: ${x > 3 ? '#f00' : '#00f'};
          }
        `}
      </style> */}
    </>
  )
}

export default Header
